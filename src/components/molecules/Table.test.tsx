import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Table, type Column } from "./Table";

interface Row {
  id: string;
  name: string;
}

const columns: Column<Row>[] = [
  {
    key: "name",
    header: "Nombre",
    render: (row) => <span>{row.name}</span>,
    className: "text-right",
  },
];

const rows: Row[] = [
  { id: "1", name: "Primero" },
  { id: "2", name: "Segundo" },
];

// Every other test in the suite runs under the jsdom default (matchMedia
// always reports no match, i.e. mobile), so the desktop `<table>` branch
// never renders anywhere else — these tests are its only coverage.
function mockDesktop(matches: boolean) {
  const original = window.matchMedia;
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches,
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

describe("Table", () => {
  let restore: () => void;

  afterEach(() => {
    restore?.();
  });

  it("shows the empty message when there are no rows", () => {
    restore = mockDesktop(true);
    render(
      <Table
        columns={columns}
        rows={[]}
        rowKey={(row) => row.id}
        emptyMessage="Nada por aquí"
      />,
    );
    expect(screen.getByText("Nada por aquí")).toBeInTheDocument();
  });

  it("renders a desktop table with a header per column and a row per item", () => {
    restore = mockDesktop(true);
    render(
      <Table
        columns={columns}
        rows={rows}
        rowKey={(row) => row.id}
        renderMobileCard={() => <div>card</div>}
      />,
    );

    expect(
      screen.getByRole("columnheader", { name: "Nombre" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "Primero" })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "Segundo" })).toBeInTheDocument();
    expect(screen.queryByText("card")).not.toBeInTheDocument();
  });

  it("falls back to the mobile card renderer below the desktop breakpoint", () => {
    restore = mockDesktop(false);
    render(
      <Table
        columns={columns}
        rows={rows}
        rowKey={(row) => row.id}
        renderMobileCard={(row) => <div>{row.name}</div>}
      />,
    );

    expect(screen.queryByRole("table")).not.toBeInTheDocument();
    expect(screen.getByText("Primero")).toBeInTheDocument();
    expect(screen.getByText("Segundo")).toBeInTheDocument();
  });
});
