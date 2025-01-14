import React from "react";
import { createRoot } from "react-dom/client";
import pi, { doublePi, triplePi } from "./math.js";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <ul>
    <li>{pi}</li>
    <li>{doublePi()}</li>
    <li>{triplePi()}</li>
  </ul>
);

