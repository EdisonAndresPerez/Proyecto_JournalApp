import React from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import JournalApp from "./JournalApp.jsx";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store/store.js";
import { Provider } from "react-redux";
import "./index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <BrowserRouter>
        <JournalApp />
      </BrowserRouter>
    </Provider>
    </QueryClientProvider>
  </StrictMode>
);
