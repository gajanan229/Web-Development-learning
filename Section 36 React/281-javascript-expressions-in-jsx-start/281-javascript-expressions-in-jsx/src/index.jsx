import React from "react";
import { createRoot } from "react-dom/client";

const fname = "Gajanan";
const lname = "Vigneswaran";
const luckyNum = Math.floor(Math.random() * 100);

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<div>
    <h1>Hello {fname} {lname}</h1>
    <p>Your lucky number is {luckyNum}</p>
</div>);

