import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const AVAILABLE_COUNTRIES = new Set([
  "Spain",
  "Portugal",
  "France",
  "Germany",
  "Italy",
  "United Kingdom",
  "Ireland",
  "Netherlands",
  "Belgium",
  "Switzerland",
  "Austria",
  "Poland",
  "Sweden",
  "Norway",
  "Denmark",
  "Finland",
  "Greece",
  "Romania",
  "Hungary",
  "Croatia",
  "Bulgaria",
  "Slovakia",
  "Slovenia",
  "Serbia",
  "Iceland",
  "Luxembourg",
  "Malta",
  "Cyprus",
  "Estonia",
  "Latvia",
  "Lithuania",
  "United States of America",
  "Canada",
  "Mexico",
  "Brazil",
  "Argentina",
  "Chile",
  "Colombia",
  "Peru",
  "Uruguay",
  "Panama",
  "Costa Rica",
  "Ecuador",
  "Bolivia",
  "Paraguay",
  "Dominican Rep.",
  "Guatemala",
  "Morocco",
  "Egypt",
  "South Africa",
  "Nigeria",
  "Kenya",
  "Tunisia",
  "Senegal",
  "Ghana",
  "Algeria",
  "Tanzania",
  "United Arab Emirates",
  "Saudi Arabia",
  "Qatar",
  "Israel",
  "Turkey",
  "Jordan",
  "Kuwait",
  "Bahrain",
  "Oman",
  "India",
  "China",
  "Japan",
  "South Korea",
  "Thailand",
  "Vietnam",
  "Singapore",
  "Malaysia",
  "Indonesia",
  "Philippines",
  "Australia",
  "New Zealand",
  "Sri Lanka",
  "Pakistan",
]);

type Ring = [number, number][];
type CountryJson = { name: string; polys: Ring[][] };
type Country = CountryJson & { bbox: [number, number, number, number] };

function pointInRing(lon: number, lat: number, ring: Ring) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    if (
      yi > lat !== yj > lat &&
      lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi
    )
      inside = !inside;
  }
  return inside;
}

function countryContains(country: Country, lon: number, lat: number) {
  const [minLon, minLat, maxLon, maxLat] = country.bbox;
  if (lon < minLon || lon > maxLon || lat < minLat || lat > maxLat)
    return false;

  for (const poly of country.polys) {
    if (!pointInRing(lon, lat, poly[0])) continue;
    if (poly.slice(1).some((ring) => pointInRing(lon, lat, ring))) continue;
    return true;
  }
  return false;
}

function computeBBox(polys: Ring[][]): [number, number, number, number] {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  for (const poly of polys) {
    for (const [x, y] of poly[0]) {
      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
    }
  }
  return [minX, minY, maxX, maxY];
}

function getCountryAnchor(country: Country): [number, number] {
  const [minLon, minLat, maxLon, maxLat] = country.bbox;
  const bboxCenter: [number, number] = [
    (minLon + maxLon) / 2,
    (minLat + maxLat) / 2,
  ];
  if (countryContains(country, bboxCenter[0], bboxCenter[1])) return bboxCenter;

  const outerRing = country.polys[0]?.[0] ?? [];
  if (outerRing.length === 0) return bboxCenter;

  const average: [number, number] = [
    outerRing.reduce((sum, [lon]) => sum + lon, 0) / outerRing.length,
    outerRing.reduce((sum, [, lat]) => sum + lat, 0) / outerRing.length,
  ];
  return countryContains(country, average[0], average[1])
    ? average
    : outerRing[0];
}

function latLonToSpherePosition(lon: number, lat: number, radius: number) {
  const theta = ((lon + 180) * Math.PI) / 180;
  const phi = ((90 - lat) * Math.PI) / 180;
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

function remapSphereUV(geometry: THREE.BufferGeometry) {
  const pos = geometry.attributes.position;
  const uv = new Float32Array(pos.count * 2);
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    const r = Math.sqrt(x * x + y * y + z * z) || 1;
    const phi = Math.acos(Math.min(1, Math.max(-1, y / r)));
    let theta = Math.atan2(z, -x);
    if (theta < 0) theta += Math.PI * 2;
    uv[i * 2] = theta / (Math.PI * 2);
    uv[i * 2 + 1] = 1 - phi / Math.PI;
  }
  geometry.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
}

function makeOceanTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");
  if (!ctx)
    throw new Error("Canvas 2D is not available for globe ocean texture");
  const ocean = ctx.createLinearGradient(0, 0, 0, canvas.height);
  ocean.addColorStop(0, "#0c3a55");
  ocean.addColorStop(0.5, "#12547a");
  ocean.addColorStop(1, "#0c3a55");
  ctx.fillStyle = ocean;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function Globe() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const abort = new AbortController();
    const radius = 1.55;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    // Pulled back slightly from the sphere so high-latitude marker pins
    // (Iceland, Norway, Finland…) keep clearance instead of poking past the
    // top of the camera's vertical field of view.
    camera.position.set(0, 0.13, 4.7);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.domElement.className = "block size-full cursor-grab";
    const stage = document.createElement("div");
    stage.className = "absolute inset-0";
    stage.appendChild(renderer.domElement);
    host.prepend(stage);

    scene.add(new THREE.AmbientLight(0xffffff, 0.32));
    const sun = new THREE.DirectionalLight(0xffffff, 2.6);
    sun.position.set(3.4, 2.4, 3.2);
    scene.add(sun);
    const fill = new THREE.DirectionalLight(0xbcd6e6, 0.32);
    fill.position.set(-2.6, 0.4, 1.6);
    scene.add(fill);
    const rim = new THREE.DirectionalLight(0xefbc0b, 0.6);
    rim.position.set(-3.2, 0.6, -2.6);
    scene.add(rim);

    const globeGroup = new THREE.Group();
    // Spin to the target longitude only — a pure Y rotation, so it keeps the
    // globe's own axis aligned with the camera's orbit axis (set above).
    const initialLongitude = 13;
    globeGroup.rotation.y = THREE.MathUtils.degToRad(-90 - initialLongitude);
    scene.add(globeGroup);

    const colorTex = makeOceanTexture();
    const earthGeo = new THREE.SphereGeometry(radius, 96, 96);
    remapSphereUV(earthGeo);
    const sphere = new THREE.Mesh(
      earthGeo,
      new THREE.MeshStandardMaterial({
        map: colorTex,
        metalness: 0.1,
        roughness: 0.75,
      }),
    );
    globeGroup.add(sphere);

    const bordersGeo = new THREE.SphereGeometry(radius * 1.004, 96, 96);
    remapSphereUV(bordersGeo);
    const bordersMaterial = new THREE.MeshBasicMaterial({
      transparent: true,
      depthWrite: false,
      opacity: 0,
    });
    const borders = new THREE.Mesh(bordersGeo, bordersMaterial);
    globeGroup.add(borders);

    const highlightGeo = new THREE.SphereGeometry(radius * 1.002, 96, 96);
    remapSphereUV(highlightGeo);
    const textureWidth = 2048;
    const textureHeight = 1024;
    const hlCanvas = document.createElement("canvas");
    hlCanvas.width = textureWidth;
    hlCanvas.height = textureHeight;
    const hlCtx = hlCanvas.getContext("2d");
    if (!hlCtx)
      throw new Error("Canvas 2D is not available for globe highlight texture");
    const highlightTex = new THREE.CanvasTexture(hlCanvas);
    const highlightMaterial = new THREE.MeshBasicMaterial({
      map: highlightTex,
      transparent: true,
      depthWrite: false,
      opacity: 0,
    });
    const highlight = new THREE.Mesh(highlightGeo, highlightMaterial);
    globeGroup.add(highlight);

    const markerTexture = new THREE.TextureLoader().load(
      "/eumedical-marker.png",
      undefined,
      undefined,
      (error) =>
        console.error("Unable to load the Eumedical country marker", error),
    );
    const markerGroup = new THREE.Group();
    globeGroup.add(markerGroup);

    const toXY = (lon: number, lat: number) =>
      [
        ((lon + 180) / 360) * textureWidth,
        ((90 - lat) / 180) * textureHeight,
      ] as const;
    const tracePolys = (ctx: CanvasRenderingContext2D, polys: Ring[][]) => {
      ctx.beginPath();
      polys.forEach((poly) => {
        poly.forEach((ring) => {
          ring.forEach(([lon, lat], i) => {
            const [x, y] = toXY(lon, lat);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          });
          ctx.closePath();
        });
      });
    };
    const drawHighlight = (country: Country) => {
      hlCtx.clearRect(0, 0, textureWidth, textureHeight);
      hlCtx.fillStyle = "#e79f1a";
      tracePolys(hlCtx, country.polys);
      hlCtx.fill("evenodd");
      highlightTex.needsUpdate = true;
    };

    let availableCountries: Country[] = [];
    void fetch("/countries.json", { signal: abort.signal })
      .then((response) => {
        if (!response.ok)
          throw new Error(`Unable to load countries.json: ${response.status}`);
        return response.json() as Promise<CountryJson[]>;
      })
      .then((list) => {
        const countries = list.map((country) => ({
          ...country,
          bbox: computeBBox(country.polys),
        }));
        availableCountries = countries.filter((country) =>
          AVAILABLE_COUNTRIES.has(country.name),
        );
        availableCountries.forEach((country) => {
          const [lon, lat] = getCountryAnchor(country);
          const marker = new THREE.Sprite(
            new THREE.SpriteMaterial({
              map: markerTexture,
              transparent: true,
              depthTest: false,
              depthWrite: false,
              sizeAttenuation: true,
            }),
          );
          marker.position.copy(
            latLonToSpherePosition(lon, lat, radius * 1.012),
          );
          marker.scale.set(0.16, 0.193, 1);
          marker.center.set(0.5, 0);
          marker.userData.country = country.name;
          marker.userData.surfaceNormal = marker.position.clone().normalize();
          marker.renderOrder = 10;
          markerGroup.add(marker);
        });
        const borderCanvas = document.createElement("canvas");
        borderCanvas.width = textureWidth;
        borderCanvas.height = textureHeight;
        const borderCtx = borderCanvas.getContext("2d");
        if (!borderCtx)
          throw new Error(
            "Canvas 2D is not available for globe border texture",
          );
        countries.forEach((country) => {
          borderCtx.fillStyle = "#dcebf2";
          tracePolys(borderCtx, country.polys);
          borderCtx.fill("evenodd");
          borderCtx.strokeStyle = "rgba(20,50,60,0.35)";
          borderCtx.lineWidth = 1.4;
          tracePolys(borderCtx, country.polys);
          borderCtx.stroke();
        });
        const bordersTex = new THREE.CanvasTexture(borderCanvas);
        bordersMaterial.map = bordersTex;
        bordersMaterial.opacity = 1;
        bordersMaterial.needsUpdate = true;
        borders.userData.tex = bordersTex;
      })
      .catch((error: unknown) => {
        if (!abort.signal.aborted) console.error(error);
      });

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.045;
    controls.rotateSpeed = 0.35;
    controls.autoRotate = !reduced;
    controls.autoRotateSpeed = 0.045;

    const tooltip = document.createElement("div");
    tooltip.className =
      "pointer-events-none absolute z-[5] whitespace-nowrap rounded-lg bg-navy px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-[0_8px_18px_rgba(30,72,101,.3)] transition-opacity";
    tooltip.style.transform = "translate(-50%, -140%)";
    stage.appendChild(tooltip);

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let hovered: Country | null = null;
    let dragging = false;

    const setSize = () => {
      const w = stage.clientWidth || 1;
      const h = stage.clientHeight || w;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    setSize();
    const ro = new ResizeObserver(setSize);
    ro.observe(stage);

    const onPointerMove = (event: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObject(sphere);
      let found: Country | null = null;
      if (hits.length && hits[0].uv && availableCountries.length) {
        const { uv } = hits[0];
        const lon = uv.x * 360 - 180;
        const lat = 90 - (1 - uv.y) * 180;
        found =
          availableCountries.find((country) =>
            countryContains(country, lon, lat),
          ) ?? null;
      }
      if (found) {
        if (hovered !== found) {
          hovered = found;
          drawHighlight(found);
        }
        tooltip.textContent = found.name;
        tooltip.style.left = `${event.clientX - rect.left}px`;
        tooltip.style.top = `${event.clientY - rect.top}px`;
        tooltip.style.opacity = "1";
        if (!dragging) renderer.domElement.style.cursor = "pointer";
      } else {
        hovered = null;
        tooltip.style.opacity = "0";
        if (!dragging) renderer.domElement.style.cursor = "grab";
      }
    };
    const onPointerLeave = () => {
      hovered = null;
      tooltip.style.opacity = "0";
    };
    const onDragStart = () => {
      dragging = true;
      renderer.domElement.style.cursor = "grabbing";
    };
    const onDragEnd = () => {
      dragging = false;
      renderer.domElement.style.cursor = hovered ? "pointer" : "grab";
    };

    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("pointerleave", onPointerLeave);
    controls.addEventListener("start", onDragStart);
    controls.addEventListener("end", onDragEnd);

    let raf = 0;
    let highlightOpacity = 0;
    const cameraPosition = new THREE.Vector3();
    const markerPosition = new THREE.Vector3();
    const markerNormal = new THREE.Vector3();
    const toCamera = new THREE.Vector3();
    const animate = () => {
      raf = requestAnimationFrame(animate);
      controls.update();
      camera.getWorldPosition(cameraPosition);
      markerGroup.children.forEach((marker) => {
        const surfaceNormal = marker.userData.surfaceNormal;
        if (!(surfaceNormal instanceof THREE.Vector3)) return;
        marker.getWorldPosition(markerPosition);
        markerNormal.copy(surfaceNormal).applyQuaternion(globeGroup.quaternion);
        toCamera.copy(cameraPosition).sub(markerPosition).normalize();
        // Hide pins before the globe's silhouette can slice through them.
        marker.visible = markerNormal.dot(toCamera) > 0.24;
      });
      const target = hovered ? 0.6 : 0;
      highlightOpacity += (target - highlightOpacity) * 0.2;
      highlightMaterial.opacity = highlightOpacity;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      abort.abort();
      cancelAnimationFrame(raf);
      ro.disconnect();
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("pointerleave", onPointerLeave);
      controls.removeEventListener("start", onDragStart);
      controls.removeEventListener("end", onDragEnd);
      controls.dispose();
      scene.traverse((obj) => {
        if ("geometry" in obj && obj.geometry instanceof THREE.BufferGeometry)
          obj.geometry.dispose();
        if ("material" in obj) {
          const material = obj.material;
          if (Array.isArray(material))
            material.forEach((item) => item.dispose());
          else if (material instanceof THREE.Material) material.dispose();
        }
      });
      colorTex.dispose();
      highlightTex.dispose();
      markerTexture.dispose();
      if (borders.userData.tex instanceof THREE.Texture)
        borders.userData.tex.dispose();
      renderer.dispose();
      stage.remove();
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className="relative mx-auto aspect-square w-full max-w-[640px] touch-none"
      role="img"
      aria-label="Globo interactivo con los paises donde opera Eumedical"
    >
      <div className="absolute -left-5 bottom-[18%] z-[2] min-w-[108px] rounded-[18px] bg-navy px-6 py-4 text-center text-white shadow-[0_18px_38px_rgba(30,72,101,.28)] max-sm:left-0">
        <div className="font-display text-[28px] font-semibold leading-none text-gold">
          80+
        </div>
        <div className="mt-1.5 text-[14.5px] font-semibold tracking-[0.05em] text-[#e4edf3]">
          paises
        </div>
      </div>
      <div className="absolute right-2 top-[8%] z-[2] min-w-[108px] rounded-[18px] bg-navy px-6 py-4 text-center text-white shadow-[0_18px_38px_rgba(30,72,101,.28)]">
        <div className="font-display text-[28px] font-semibold leading-none text-gold">
          10+
        </div>
        <div className="mt-1.5 text-[14.5px] font-semibold tracking-[0.05em] text-[#e4edf3]">
          idiomas
        </div>
      </div>
    </div>
  );
}
