import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthContextProvider } from "./contexts/AuthContext.jsx";
import { ThemeContextProvider } from "./contexts/ThemeContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { BookContextProvider } from "./contexts/BookContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <ThemeContextProvider>
          <BookContextProvider>
            <App />
          </BookContextProvider>
        </ThemeContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
);
