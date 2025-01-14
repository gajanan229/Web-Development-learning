//Create a react app from scratch.
//It should display a h1 heading.
//It should display an unordered list (bullet points).
//It should contain 3 list elements.

import React from "react";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<div>
    <h1>My favorite Foods</h1>
    <ul>
        <li>bacon</li>
        <li>bacon</li>
        <li>bacon</li>
    </ul>
</div>)