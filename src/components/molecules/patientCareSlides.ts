import medicosDomicilio from "../../assets/patient-care/medicos-domicilio.mp4";
import medicosDomicilioPoster from "../../assets/patient-care/medicos-domicilio-poster.jpg";
import tecnologiaAvanzada from "../../assets/patient-care/tecnologia-avanzada.mp4";
import tecnologiaAvanzadaPoster from "../../assets/patient-care/tecnologia-avanzada-poster.jpg";
import redPropia from "../../assets/patient-care/red-propia.mp4";
import redPropiaPoster from "../../assets/patient-care/red-propia-poster.jpg";
import atencionDigital from "../../assets/patient-care/atencion-digital.mp4";
import atencionDigitalPoster from "../../assets/patient-care/atencion-digital-poster.jpg";

export interface PatientCareSlideAsset {
  id: "medicosDomicilio" | "tecnologiaAvanzada" | "redPropia" | "atencionDigital";
  video: string;
  poster: string;
}

export interface PatientCareSlide {
  id: PatientCareSlideAsset["id"];
  title: string;
  description: string;
  video: string;
  poster: string;
}

// Ids map to patientCare.slides.* keys in src/i18n/locales — copy lives
// there now (see the ES bundle for the ported eumedical.es original text).
export const patientCareSlideAssets: PatientCareSlideAsset[] = [
  {
    id: "medicosDomicilio",
    video: medicosDomicilio,
    poster: medicosDomicilioPoster,
  },
  {
    id: "tecnologiaAvanzada",
    video: tecnologiaAvanzada,
    poster: tecnologiaAvanzadaPoster,
  },
  {
    id: "redPropia",
    video: redPropia,
    poster: redPropiaPoster,
  },
  {
    id: "atencionDigital",
    video: atencionDigital,
    poster: atencionDigitalPoster,
  },
];
