import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import toast from "react-hot-toast";
import { PrescriptionsPage } from "./PrescriptionsPage";
import { usePatientStore } from "../../../store/patientStore";

vi.mock("react-hot-toast", () => ({
  default: Object.assign(vi.fn(), { success: vi.fn(), error: vi.fn() }),
}));

// Below the md breakpoint (the jsdom default — see Table.test.tsx) rows
// render through PrescriptionCard instead of these columns, so the desktop
// path needs its own matchMedia override to get exercised at all.
function mockDesktop() {
  const original = window.matchMedia;
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: true,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
  return () => {
    window.matchMedia = original;
  };
}

describe("PrescriptionsPage", () => {
  const initialState = usePatientStore.getState();

  afterEach(() => {
    usePatientStore.setState(initialState, true);
    vi.clearAllMocks();
  });

  it("lists prescriptions with their status", () => {
    render(<PrescriptionsPage />);

    const activeRow = screen.getByText("Ramipril 5 mg").closest("article")!;
    expect(within(activeRow).getByText("Activa")).toBeInTheDocument();

    const expiredRow = screen
      .getByText("Metformina 850 mg")
      .closest("article")!;
    expect(within(expiredRow).getByText("Vencida")).toBeInTheDocument();
  });

  it("requests a renewal for a prescription", () => {
    render(<PrescriptionsPage />);

    const row = screen.getByText("Ramipril 5 mg").closest("article")!;
    fireEvent.click(within(row).getByRole("button", { name: "Solicitar" }));

    expect(toast.success).toHaveBeenCalledWith(
      "Solicitud de renovación enviada para Ramipril 5 mg.",
    );
  });

  it("shows the prescription details", () => {
    render(<PrescriptionsPage />);

    const row = screen.getByText("Ramipril 5 mg").closest("article")!;
    fireEvent.click(within(row).getByRole("button", { name: "Ver detalles" }));

    expect(toast).toHaveBeenCalledWith("Detalles de Ramipril 5 mg");
  });

  it("shows an empty state when there are no prescriptions", () => {
    usePatientStore.setState({ prescriptions: [] });
    render(<PrescriptionsPage />);

    expect(
      screen.getByText("No tienes recetas registradas."),
    ).toBeInTheDocument();
  });

  it("renders the desktop table with a row and status tag per prescription", () => {
    const restore = mockDesktop();
    try {
      render(<PrescriptionsPage />);

      const activeRow = screen
        .getByRole("cell", { name: "Ramipril 5 mg" })
        .closest("tr")!;
      expect(within(activeRow).getByText("Activa")).toBeInTheDocument();

      const expiredRow = screen
        .getByRole("cell", { name: "Metformina 850 mg" })
        .closest("tr")!;
      expect(within(expiredRow).getByText("Vencida")).toBeInTheDocument();

      fireEvent.click(
        within(activeRow).getByRole("button", { name: "Solicitar" }),
      );
      expect(toast.success).toHaveBeenCalledWith(
        "Solicitud de renovación enviada para Ramipril 5 mg.",
      );

      fireEvent.click(
        within(activeRow).getByRole("button", { name: "Ver detalles" }),
      );
      expect(toast).toHaveBeenCalledWith("Detalles de Ramipril 5 mg");
    } finally {
      restore();
    }
  });
});
