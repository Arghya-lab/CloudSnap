import React from "react";
import ReactDOM from "react-dom/client";
import { PreferenceProvider } from "./context/PreferenceContext";
import { AlertProvider } from "./context/AlertContext";
import { WeatherProvider } from "./context/WeatherContext";
import App from "./App";


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PreferenceProvider>
      <AlertProvider>
        <WeatherProvider>
          <App />
        </WeatherProvider>
      </AlertProvider>
    </PreferenceProvider>
  </React.StrictMode>
)

