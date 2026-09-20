import { Link } from "react-router-dom";
import { Container } from "../../shared/Container";
import { BrandMark } from "../atoms/BrandMark";

export function PublicFooter() {
  return (
    <footer className="bg-navy-2 px-(--edge) py-16 text-[#a9c3d2]">
      <Container>
        <div className="flex flex-wrap justify-between gap-10 border-b border-white/15 pb-10">
          <div>
            <BrandMark light />
            <p className="mt-4 max-w-[24ch] text-sm">
              Asistencia sanitaria digital sin fronteras.
            </p>
          </div>
          <div className="flex gap-10">
            <div>
              <h3 className="font-display text-sm text-white">Servicios</h3>
              <a className="mt-3 block text-sm" href="#eu-servicios">
                Catálogo médico
              </a>
              <a className="block text-sm" href="#eu-como">
                Cómo funciona
              </a>
            </div>
            <div>
              <h3 className="font-display text-sm text-white">Compañía</h3>
              <a className="mt-3 block text-sm" href="#eu-nosotros">
                Nosotros
              </a>
              <a className="block text-sm" href="#eu-contacto">
                Contacto
              </a>
              <Link className="block text-sm" to="/paciente">
                Área paciente
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-3 pt-5 text-sm">
          <span>© 2026 eumedical. Todos los derechos reservados.</span>
          <span>Privacidad · Términos y condiciones</span>
        </div>
      </Container>
    </footer>
  );
}
