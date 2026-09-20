import medicosDomicilio from "../../../assets/patient-care/medicos-domicilio.mp4";
import medicosDomicilioPoster from "../../../assets/patient-care/medicos-domicilio-poster.jpg";
import tecnologiaAvanzada from "../../../assets/patient-care/tecnologia-avanzada.mp4";
import tecnologiaAvanzadaPoster from "../../../assets/patient-care/tecnologia-avanzada-poster.jpg";
import redPropia from "../../../assets/patient-care/red-propia.mp4";
import redPropiaPoster from "../../../assets/patient-care/red-propia-poster.jpg";
import atencionDigital from "../../../assets/patient-care/atencion-digital.mp4";
import atencionDigitalPoster from "../../../assets/patient-care/atencion-digital-poster.jpg";

export interface PatientCareSlide {
  title: string;
  description: string;
  video: string;
  poster: string;
}

// Copy matches the "Cuatro formas de llevar la atención médica hasta donde
// estés" capacidades section in design-reference.html (ported from the live
// eumedical.es copy), not paraphrased.
export const patientCareSlides: PatientCareSlide[] = [
  {
    title: "Médicos a domicilio",
    description: "Coordinación de visitas presenciales en España, Portugal, Italia y Francia.",
    video: medicosDomicilio,
    poster: medicosDomicilioPoster,
  },
  {
    title: "Tecnología avanzada",
    description: "Plataforma segura, fiable y sencilla de usar, sin que tu equipo tenga que desarrollar nada.",
    video: tecnologiaAvanzada,
    poster: tecnologiaAvanzadaPoster,
  },
  {
    title: "Red propia",
    description: "Más de 80 países y 10 idiomas cubiertos con profesionales propios, no subcontratados.",
    video: redPropia,
    poster: redPropiaPoster,
  },
  {
    title: "Atención digital",
    description: "Accesible en cualquier momento y desde cualquier lugar, sin listas de espera.",
    video: atencionDigital,
    poster: atencionDigitalPoster,
  },
];
