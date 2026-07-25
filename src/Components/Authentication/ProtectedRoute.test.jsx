import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import ProtectedRoute from "./ProtectedRoute";

const mockUseUserAuth = vi.fn();

vi.mock("../../context/UserAuthContext", () => ({
  useUserAuth: () => mockUseUserAuth(),
}));

const LocationProbe = () => {
  const location = useLocation();

  return (
    <div>
      <div data-testid="pathname">{location.pathname}</div>
      <div data-testid="search">{location.search}</div>
      <div data-testid="auth-message">{location.state?.authMessage || ""}</div>
    </div>
  );
};

describe("ProtectedRoute", () => {
  it("shows the session loader while auth is still resolving", () => {
    mockUseUserAuth.mockReturnValue({
      user: null,
      authLoading: true,
    });

    render(
      <MemoryRouter
        initialEntries={["/adoption/adoptable_pets/H001"]}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Routes>
          <Route
            path="/adoption/adoptable_pets/:code"
            element={
              <ProtectedRoute>
                <div>Protected content</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Checking your session...")).toBeInTheDocument();
  });

  it("redirects unauthenticated users to sign in with the full redirect path", () => {
    mockUseUserAuth.mockReturnValue({
      user: null,
      authLoading: false,
    });

    render(
      <MemoryRouter
        initialEntries={["/adoption/adoptable_pets/H001?from=listing"]}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Routes>
          <Route
            path="/adoption/adoptable_pets/:code"
            element={
              <ProtectedRoute>
                <div>Protected content</div>
              </ProtectedRoute>
            }
          />
          <Route path="/sign_in" element={<LocationProbe />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId("pathname")).toHaveTextContent("/sign_in");
    expect(screen.getByTestId("search")).toHaveTextContent(
      "?redirect=%2Fadoption%2Fadoptable_pets%2FH001%3Ffrom%3Dlisting"
    );
    expect(screen.getByTestId("auth-message")).toHaveTextContent(
      "Please sign in to continue."
    );
  });

  it("renders children for authenticated users", () => {
    mockUseUserAuth.mockReturnValue({
      user: { uid: "user-1" },
      authLoading: false,
    });

    render(
      <MemoryRouter
        initialEntries={["/adoption/adoptable_pets/H001"]}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Routes>
          <Route
            path="/adoption/adoptable_pets/:code"
            element={
              <ProtectedRoute>
                <div>Protected content</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Protected content")).toBeInTheDocument();
  });
});
