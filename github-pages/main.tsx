import React from "react";
import { createRoot } from "react-dom/client";
import "../app/globals.css";
import MasakPrepApp from "../app/MasakPrepApp";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MasakPrepApp />
  </React.StrictMode>,
);
