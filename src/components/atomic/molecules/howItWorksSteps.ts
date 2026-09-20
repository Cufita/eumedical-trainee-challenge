import dashboardShot from "../../../assets/patient-app/dashboard.png";
import consultasShot from "../../../assets/patient-app/consultas.png";
import historialShot from "../../../assets/patient-app/historial.png";
import documentosShot from "../../../assets/patient-app/documentos.png";

export interface HowItWorksStep {
  number: string;
  title: string;
  description: string;
  image: string;
  imageLabel: string;
}

export const howItWorksSteps: HowItWorksStep[] = [
  {
    number: "01",
    title: "El paciente contacta",
    description:
      "A través de la app, teléfono o web, en su propio idioma y a cualquier hora. Desde el panel de inicio reserva una cita, revisa su próxima consulta o contacta con soporte en un solo clic.",
    image: dashboardShot,
    imageLabel: "Panel de inicio",
  },
  {
    number: "02",
    title: "Asignamos al médico",
    description:
      "Nuestro centro de operaciones activa al profesional adecuado de la red local. En Consultas, el paciente ve qué médico fue asignado, su especialidad y el horario ya confirmado.",
    image: consultasShot,
    imageLabel: "Consultas",
  },
  {
    number: "03",
    title: "Se resuelve el caso",
    description:
      "Teleconsulta, visita a domicilio o coordinación hospitalaria, con receta válida. Cada consulta resuelta queda registrada en el Historial, con su resumen médico siempre disponible.",
    image: historialShot,
    imageLabel: "Historial",
  },
  {
    number: "04",
    title: "Seguimiento total",
    description:
      "Informe médico, encuesta de satisfacción y auditoría del servicio prestado. En Documentos, el paciente descarga sus informes cuando los necesita, sin depender de que se los reenvíen.",
    image: documentosShot,
    imageLabel: "Documentos médicos",
  },
];
