import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import MantineBaseProviderAdapter from "./providers/mantine/MantineBaseProvider.tsx";
import QueryClientProvider from "./providers/reactQuery/QueryClientProvider.tsx";
import { Provider } from "react-redux";
import { store } from "./store/globalStore.ts";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineBaseProviderAdapter>
      <QueryClientProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </QueryClientProvider>
    </MantineBaseProviderAdapter>
  </StrictMode>,
);
