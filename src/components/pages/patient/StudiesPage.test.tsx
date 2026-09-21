import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import toast from "react-hot-toast";
import { StudiesPage } from "./StudiesPage";
import { usePatientStore } from "../../../store/patientStore";

vi.mock("react-hot-toast", () => ({
  default: Object.assign(vi.fn(), { success: vi.fn(), error: vi.fn() }),
}));

// Below the md breakpoint (the jsdom default — see Table.test.tsx) rows
// render through StudyCard instead of these columns, so the desktop path
// needs its own matchMedia override to get exercised at all.
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

describe("StudiesPage", () => {
  const initialState = usePatientStore.getState();

  afterEach(() => {
    usePatientStore.setState(initialState, true);
    vi.clearAllMocks();
  });

  it("shows a friendly error instead of following the stub download link", () => {
    render(<StudiesPage />);

    fireEvent.click(
      screen.getByRole("link", { name: "Descargar Radiografía de Tórax AP" }),
    );

    expect(toast.error).toHaveBeenCalledWith(
      'No se pudo descargar "Radiografía de Tórax AP": no hay un archivo real disponible en esta demo.',
    );
  });

  it("renders the desktop table, marking only the newest study, and opens a study on demand", () => {
    const restore = mockDesktop();
    try {
      render(<StudiesPage />);

      const newRow = screen
        .getByRole("cell", { name: "Radiografía de Tórax AP" })
        .closest("tr")!;
      expect(within(newRow).getByText("Nuevo")).toBeInTheDocument();

      const olderRow = screen
        .getByRole("cell", { name: "Analítica General" })
        .closest("tr")!;
      expect(within(olderRow).queryByText("Nuevo")).not.toBeInTheDocument();

      fireEvent.click(
        within(newRow).getByRole("button", { name: "Ver estudio" }),
      );
      expect(toast).toHaveBeenCalledWith('Abriendo "Radiografía de Tórax AP"…');

      fireEvent.click(
        within(newRow).getByRole("link", {
          name: "Descargar Radiografía de Tórax AP",
        }),
      );
      expect(toast.error).toHaveBeenCalledWith(
        'No se pudo descargar "Radiografía de Tórax AP": no hay un archivo real disponible en esta demo.',
      );
    } finally {
      restore();
    }
  });

  it("filters the list by study type and by doctor", () => {
    render(<StudiesPage />);

    fireEvent.click(
      screen.getByRole("button", { name: "Tipo de estudio: Todos" }),
    );
    fireEvent.click(screen.getByRole("menuitem", { name: "Informe" }));
    expect(
      screen.queryByText("Radiografía de Tórax AP"),
    ).not.toBeInTheDocument();
    expect(screen.getByText("Informe Cardiológico")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Doctor: Todos" }));
    fireEvent.click(screen.getByRole("menuitem", { name: "Dra. Ana Torres" }));
    expect(screen.getByText("Informe Cardiológico")).toBeInTheDocument();
    expect(screen.queryByText("Informe Dermatología")).not.toBeInTheDocument();
  });
});
