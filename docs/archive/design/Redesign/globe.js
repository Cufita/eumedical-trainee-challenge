import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Countries where Eumedical currently operates (~80) — must match the `name`
// field in countries.json exactly.
const AVAILABLE_COUNTRIES = new Set([
  'Spain','Portugal','France','Germany','Italy','United Kingdom','Ireland','Netherlands','Belgium','Switzerland',
  'Austria','Poland','Sweden','Norway','Denmark','Finland','Greece','Romania','Hungary','Croatia',
  'Bulgaria','Slovakia','Slovenia','Serbia','Iceland','Luxembourg','Malta','Cyprus','Estonia','Latvia',
  'Lithuania','United States of America','Canada','Mexico','Brazil','Argentina','Chile','Colombia','Peru','Uruguay',
  'Panama','Costa Rica','Ecuador','Bolivia','Paraguay','Dominican Rep.','Guatemala','Morocco','Egypt','South Africa',
  'Nigeria','Kenya','Tunisia','Senegal','Ghana','Algeria','Tanzania','United Arab Emirates','Saudi Arabia','Qatar',
  'Israel','Turkey','Jordan','Kuwait','Bahrain','Oman','India','China','Japan','South Korea',
  'Thailand','Vietnam','Singapore','Malaysia','Indonesia','Philippines','Australia','New Zealand','Sri Lanka','Pakistan'
]);

function pointInRing(lon, lat, ring) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i], [xj, yj] = ring[j];
    if (((yi > lat) !== (yj > lat)) && (lon < (xj - xi) * (lat - yi) / (yj - yi) + xi)) inside = !inside;
  }
  return inside;
}
function countryContains(country, lon, lat) {
  const b = country.bbox;
  if (lon < b[0] || lon > b[2] || lat < b[1] || lat > b[3]) return false;
  for (const poly of country.polys) {
    if (!pointInRing(lon, lat, poly[0])) continue;
    let inHole = false;
    for (let k = 1; k < poly.length; k++) { if (pointInRing(lon, lat, poly[k])) { inHole = true; break; } }
    if (!inHole) return true;
  }
  return false;
}
function computeBBox(polys) {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const poly of polys) for (const [x, y] of poly[0]) {
    if (x < minX) minX = x; if (x > maxX) maxX = x;
    if (y < minY) minY = y; if (y > maxY) maxY = y;
  }
  return [minX, minY, maxX, maxY];
}

function remapSphereUV(geometry) {
  const pos = geometry.attributes.position;
  const uv = new Float32Array(pos.count * 2);
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
    const r = Math.sqrt(x * x + y * y + z * z) || 1;
    const phi = Math.acos(Math.min(1, Math.max(-1, y / r)));
    let theta = Math.atan2(z, -x);
    if (theta < 0) theta += Math.PI * 2;
    uv[i * 2] = theta / (Math.PI * 2);
    uv[i * 2 + 1] = 1 - phi / Math.PI;
  }
  geometry.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
}

function makeOceanTexture() {
  const W = 2048, H = 1024;
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const ctx = c.getContext('2d');
  const ocean = ctx.createLinearGradient(0, 0, 0, H);
  ocean.addColorStop(0, '#0c3a55');
  ocean.addColorStop(0.5, '#12547a');
  ocean.addColorStop(1, '#0c3a55');
  ctx.fillStyle = ocean;
  ctx.fillRect(0, 0, W, H);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function initGlobe(host) {
  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const R = 1.55;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 0.12, 4.35);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  const stage = document.createElement('div');
  stage.style.position = 'absolute';
  stage.style.inset = '0';
  host.insertBefore(stage, host.firstChild);
  stage.appendChild(renderer.domElement);
  renderer.domElement.style.cursor = 'grab';
  renderer.domElement.style.display = 'block';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';

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
  scene.add(globeGroup);

  const colorTex = makeOceanTexture();
  const earthGeo = new THREE.SphereGeometry(R, 96, 96);
  remapSphereUV(earthGeo);
  const sphere = new THREE.Mesh(
    earthGeo,
    new THREE.MeshStandardMaterial({ map: colorTex, metalness: 0.1, roughness: 0.75 })
  );
  globeGroup.add(sphere);

  const bordersGeo = new THREE.SphereGeometry(R * 1.004, 96, 96);
  remapSphereUV(bordersGeo);
  const borders = new THREE.Mesh(
    bordersGeo,
    new THREE.MeshBasicMaterial({ transparent: true, depthWrite: false, opacity: 0 })
  );
  globeGroup.add(borders);

  const highlightGeo = new THREE.SphereGeometry(R * 1.002, 96, 96);
  remapSphereUV(highlightGeo);
  const HW = 2048, HH = 1024;
  const hlCanvas = document.createElement('canvas');
  hlCanvas.width = HW; hlCanvas.height = HH;
  const hlCtx = hlCanvas.getContext('2d');
  const highlightTex = new THREE.CanvasTexture(hlCanvas);
  const highlight = new THREE.Mesh(
    highlightGeo,
    new THREE.MeshBasicMaterial({ map: highlightTex, transparent: true, depthWrite: false, opacity: 0 })
  );
  globeGroup.add(highlight);

  const toXY = (lon, lat) => [((lon + 180) / 360) * HW, ((90 - lat) / 180) * HH];
  function tracePolys(ctx, polys) {
    ctx.beginPath();
    polys.forEach(poly => {
      poly.forEach(ring => {
        ring.forEach(([lon, lat], i) => {
          const [x, y] = toXY(lon, lat);
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        });
        ctx.closePath();
      });
    });
  }
  function drawHighlight(country) {
    hlCtx.clearRect(0, 0, HW, HH);
    hlCtx.fillStyle = '#e79f1a';
    tracePolys(hlCtx, country.polys);
    hlCtx.fill('evenodd');
    highlightTex.needsUpdate = true;
  }

  let countries = [];
  let availableCountries = [];
  fetch('./countries.json').then(r => r.json()).then(list => {
    countries = list.map(c => ({ name: c.name, polys: c.polys, bbox: computeBBox(c.polys) }));
    availableCountries = countries.filter(c => AVAILABLE_COUNTRIES.has(c.name));
    const bc = document.createElement('canvas');
    bc.width = HW; bc.height = HH;
    const bctx = bc.getContext('2d');
    countries.forEach(c => {
      bctx.fillStyle = '#dcebf2';
      tracePolys(bctx, c.polys);
      bctx.fill('evenodd');
      bctx.strokeStyle = 'rgba(20,50,60,0.35)';
      bctx.lineWidth = 1.4;
      tracePolys(bctx, c.polys);
      bctx.stroke();
    });
    const tex = new THREE.CanvasTexture(bc);
    borders.material.map = tex;
    borders.material.opacity = 1;
    borders.material.needsUpdate = true;
    borders.userData.tex = tex;
  }).catch(() => {});


  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.enableDamping = true;
  controls.dampingFactor = 0.045;
  controls.rotateSpeed = 0.35;
  controls.autoRotate = !reduced;
  controls.autoRotateSpeed = 0.028;
  controls.addEventListener('start', () => { dragging = true; renderer.domElement.style.cursor = 'grabbing'; });
  controls.addEventListener('end', () => { dragging = false; renderer.domElement.style.cursor = hovered ? 'pointer' : 'grab'; });

  const tooltip = document.createElement('div');
  tooltip.style.position = 'absolute';
  tooltip.style.pointerEvents = 'none';
  tooltip.style.transform = 'translate(-50%,-140%)';
  tooltip.style.background = '#1e4865';
  tooltip.style.color = '#ffffff';
  tooltip.style.font = '500 12px Outfit,sans-serif';
  tooltip.style.padding = '5px 10px';
  tooltip.style.borderRadius = '8px';
  tooltip.style.whiteSpace = 'nowrap';
  tooltip.style.boxShadow = '0 8px 18px rgba(30,72,101,.3)';
  tooltip.style.opacity = '0';
  tooltip.style.transition = 'opacity .15s';
  tooltip.style.zIndex = '5';
  host.style.position = host.style.position || 'relative';
  stage.appendChild(tooltip);

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let hovered = null;
  let dragging = false;

  function setSize() {
    const w = stage.clientWidth || 1;
    const h = stage.clientHeight || w;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  setSize();
  const ro = new ResizeObserver(setSize);
  ro.observe(stage);

  function onPointerMove(e) {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObject(sphere);
    let found = null;
    if (hits.length && hits[0].uv && availableCountries.length) {
      const uv = hits[0].uv;
      const lon = uv.x * 360 - 180;
      const lat = 90 - (1 - uv.y) * 180;
      found = availableCountries.find(c => countryContains(c, lon, lat)) || null;
    }
    if (found) {
      if (hovered !== found) { hovered = found; drawHighlight(found); }
      tooltip.textContent = found.name;
      tooltip.style.left = e.clientX - rect.left + 'px';
      tooltip.style.top = e.clientY - rect.top + 'px';
      tooltip.style.opacity = '1';
      if (!dragging) renderer.domElement.style.cursor = 'pointer';
    } else {
      hovered = null;
      tooltip.style.opacity = '0';
      if (!dragging) renderer.domElement.style.cursor = 'grab';
    }
  }
  function onPointerLeave() { hovered = null; tooltip.style.opacity = '0'; }
  renderer.domElement.addEventListener('pointermove', onPointerMove);
  renderer.domElement.addEventListener('pointerleave', onPointerLeave);

  let raf = null;
  const clock = new THREE.Clock();
  let hlOpacity = 0;
  function animate() {
    raf = requestAnimationFrame(animate);
    controls.update();
    const target = hovered ? 0.6 : 0;
    hlOpacity += (target - hlOpacity) * 0.2;
    highlight.material.opacity = hlOpacity;
    renderer.render(scene, camera);
  }
  animate();

  return function dispose() {
    cancelAnimationFrame(raf);
    ro.disconnect();
    renderer.domElement.removeEventListener('pointermove', onPointerMove);
    renderer.domElement.removeEventListener('pointerleave', onPointerLeave);
    controls.dispose();
    scene.traverse(obj => {
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (Array.isArray(obj.material)) obj.material.forEach(mm => mm.dispose());
        else obj.material.dispose();
      }
    });
    colorTex.dispose();
    highlightTex.dispose();
    if (borders.userData.tex) borders.userData.tex.dispose();
    renderer.dispose();
    stage.remove();
  };
}
