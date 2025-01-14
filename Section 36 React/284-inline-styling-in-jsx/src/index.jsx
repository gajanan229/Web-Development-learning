import React from "react";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container);

const customStyle = {
    color: "red",
    fontSize: "20px",
    border: "1px solid black"
};

root.render(
    
    <h1 style={customStyle}>Hello World</h1>
    
);




