import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ResourceTable } from "./ResourceTable";

const resources = [
  {
    id: 1,
    name: "Besprechungsraum Nord",
    category: "ROOM",
    location: "Haus 1, 2. OG",
    capacity: 8,
  },
  {
    id: 2,
    name: "Ultraschallgerät",
    category: "DEVICE",
    location: "Haus 3, Labor",
    capacity: 1,
  },
];

function stubFetchWith(response: Partial<Response>) {
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue(response));
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("ResourceTable", () => {
  it("zeigt die vom Backend gelieferten Ressourcen", async () => {
    stubFetchWith({
      ok: true,
      status: 200,
      json: () => Promise.resolve(resources),
    });

    render(<ResourceTable />);

    expect(
      await screen.findByText("Besprechungsraum Nord"),
    ).toBeInTheDocument();
    expect(screen.getByText("Ultraschallgerät")).toBeInTheDocument();
    // One row per resource plus the header row.
    expect(screen.getAllByRole("row")).toHaveLength(resources.length + 1);
  });

  it("zeigt die Begründung des Backends statt einer leeren Tabelle", async () => {
    stubFetchWith({
      ok: false,
      status: 503,
      statusText: "Service Unavailable",
      json: () =>
        Promise.resolve({
          title: "Nicht erreichbar",
          detail: "Die Datenbank antwortet nicht.",
        }),
    });

    render(<ResourceTable />);

    expect(
      await screen.findByText("Die Datenbank antwortet nicht."),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Erneut versuchen" }),
    ).toBeInTheDocument();
  });
});
