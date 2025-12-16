import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import ErrorBoundary from "./comp/ErrorBoundary.js";

import App from "./app.js";

import { Provider } from "react-redux";
import store from "./store/redux/store.js";
import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// Ensure TypeScript knows this element is not null
const rootEl = document.getElementById("app") as HTMLElement;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000, 
      // CURRENT: All data is considered fresh for 30 seconds.
      // MEANING: Queries won't refetch within this 30s window.
      //
      // FOR PRODUCTION):
      // Do NOT use one global staleTime.
      // Set staleTime per-query:
      // - Menu items → 30 min to 24 hrs (rare updates)
      // - Orders list → 2–5 sec (must stay live)
      // - Inventory → 10–30 sec
      // - Reports → 5–10 min
      // This global config is ONLY acceptable during development.
    }
  }
});

ReactDOM.createRoot(rootEl).render(
  <StrictMode>
    
    {/* Provides global toast notifications */}
    <SnackbarProvider 
      autoHideDuration={3000} 
      // CURRENT: All snackbars disappear after 3 seconds.
      //
      // FOR PRODUCTION:
      // Use different durations based on message type:
      // - Success → auto-hide in ~2s
      // - Info → auto-hide in ~3s
      // - Warning → auto-hide in ~4s
      // - ERROR (critical) → MUST NOT auto-hide (use persist: true)
      // Auto-hiding all errors in 3s is dangerous in a real POS system.
    >
      
      {/* Provides React Query caching & background sync */}
      <QueryClientProvider client={queryClient}>
        
        {/* Redux provider for app-wide UI/local state */}
        <Provider store={store}>
          
          {/* Catches runtime errors and prevents full app crashes */}
          <ErrorBoundary>
            
            {/* Main POS application */}
            <App />

          </ErrorBoundary>

        </Provider>

      </QueryClientProvider>

    </SnackbarProvider>

  </StrictMode>
);

