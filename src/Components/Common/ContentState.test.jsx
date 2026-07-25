import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import ContentState from "./ContentState";

describe("ContentState", () => {
  it("renders content with a navigation action when a target route exists", () => {
    render(
      <MemoryRouter>
        <ContentState
          title="No products match these filters"
          description="Try a broader search term or reset the active filters."
          actionLabel="Reset Filters"
          actionTo="/shop"
          severity="info"
        />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", {
        name: "No products match these filters",
      })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Reset Filters" })).toHaveAttribute(
      "href",
      "/shop"
    );
  });

  it("calls the provided action handler when used as a button", () => {
    const handleAction = vi.fn();

    render(
      <MemoryRouter>
        <ContentState
          title="No lost pet listings right now"
          description="There are currently no active reports to review."
          actionLabel="Try Again"
          onAction={handleAction}
        />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: "Try Again" }));

    expect(handleAction).toHaveBeenCalledTimes(1);
  });
});
