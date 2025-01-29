// Library imports
import React from "react";
import ReactDOM from "react-dom/client";

// Application components
import App from "./App";
import { QueryProviders } from "./providers/query.provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";

// Styles
import "./index.css";

// Get root element and validate its existence
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Failed to find root element");
}

// Create and render the React application
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <QueryProviders>
      <SidebarProvider>
        <App />
      </SidebarProvider>
      <Toaster position="bottom-right" />
    </QueryProviders>
  </React.StrictMode>,
);
