import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom"; // For routing
import { Provider } from "react-redux"; // To wrap component with Redux store
import { configureStore } from "@reduxjs/toolkit";
import App from "./App"; // Path to your App component
import { login } from "./store/slices/authSlice"; // Redux action
import "@testing-library/jest-dom/extend-expect";

// Mock MUI components
jest.mock("@mui/material/Switch", () => () => <div>Mock Switch</div>);
jest.mock("@mui/material/FormGroup", () => () => <div>Mock FormGroup</div>);

// Mock Redux Store
const mockStore = configureStore({
  reducer: {
    auth: (state = { user: {}, token: "" }) => state,
  },
  preloadedState: {
    auth: {
      user: {},
      token: "",
    },
  },
});

// Mock external services
jest.mock("./service/user.service", () => ({
  getUserById: jest.fn().mockResolvedValue({
    data: {
      data: { id: "2", name: "Test User" },
    },
  }),
}));

// Mock external components
jest.mock("./pages/Signin2", () => () => <div>Login Page</div>);

// Mock FontAwesomeIcon (if used)
jest.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: () => <div>Mock Icon</div>,
}));

describe("App Component", () => {
  it("should render without crashing and check for a Suspense fallback", async () => {
    await act(async () => {
      render(
        <Provider store={mockStore}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      );
    });

    // Check for loading fallback during lazy loading
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // Wait for the Login page to be rendered (after lazy load)
    await waitFor(() => {
      expect(screen.getByText("Login Page")).toBeInTheDocument();
    });
  });

  it("should check if the skin mode is applied correctly", () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    // Check if skin mode is set correctly (if the skin mode is present in localStorage)
    expect(localStorage.getItem("skin-mode")).toBe(null); // Update this based on your default
  });

  it("should dispatch login action if token is present in localStorage", async () => {
    // Mock token in localStorage
    localStorage.setItem("token", "test-token");

    // Create a mock dispatch function
    const mockDispatch = jest.fn();

    // Mock Redux store with dispatch
    const mockStoreWithDispatch = configureStore({
      reducer: {
        auth: (state = { user: {}, token: "" }, action) => {
          if (action.type === "auth/login") {
            return {
              ...state,
              user: action.payload.user,
              token: action.payload.token,
            };
          }
          return state;
        },
      },
      middleware: () => [() => (next) => (action) => mockDispatch(action)],
    });

    // Render component with mocked store
    await act(async () => {
      render(
        <Provider store={mockStoreWithDispatch}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      );
    });

    // Verify the login action was dispatched
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(
        login({
          user: { id: "2", name: "Test User" },
          token: "test-token",
        })
      );
    });
  });

  // Uncomment if needed for testing invalid routes
  // it("should show NotFound page for invalid routes", () => {
  //   render(
  //     <Provider store={mockStore}>
  //       <BrowserRouter>
  //         <App />
  //       </BrowserRouter>
  //     </Provider>
  //   );

  //   // Navigate to an invalid route
  //   window.history.pushState({}, "", "/invalid-route");

  //   expect(screen.getByText("Page not found")).toBeInTheDocument(); // Ensure the NotFound page is rendered
  // });
});
