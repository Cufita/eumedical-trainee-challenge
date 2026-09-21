import dashboardShot from "../../../assets/patient-app/dashboard.png";
import consultasShot from "../../../assets/patient-app/consultas.png";
import historialShot from "../../../assets/patient-app/historial.png";
import documentosShot from "../../../assets/patient-app/documentos.png";

export interface HowItWorksStepAsset {
  id: "contact" | "assign" | "resolve" | "followUp";
  number: string;
  image: string;
}

export interface HowItWorksStep extends HowItWorksStepAsset {
  title: string;
  description: string;
  imageLabel: string;
}

// Ids map to howItWorks.steps.* keys in src/i18n/locales — copy lives there
// now (see the ES bundle for the ported eumedical.es original text).
export const howItWorksStepAssets: HowItWorksStepAsset[] = [
  { id: "contact", number: "01", image: dashboardShot },
  { id: "assign", number: "02", image: consultasShot },
  { id: "resolve", number: "03", image: historialShot },
  { id: "followUp", number: "04", image: documentosShot },
];
