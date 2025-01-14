//Create a React app from scratch.
//Show a single h1 that says "Good morning" if between midnight and 12PM.
//or "Good Afternoon" if between 12PM and 6PM.
//or "Good evening" if between 6PM and midnight.
//Apply the "heading" style in the styles.css
//Dynamically change the color of the h1 using inline css styles.
//Morning = red, Afternoon = green, Night = blue.

import React from "react";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container);

const style = {
    color: "red"
}

var hour = new Date(2025, 1, 1, 14).getHours();
var greating = "Good evening";

if (hour > 0 && hour <= 12){
    greating = "Good morning";
    style.color = "green";
} else if (hour > 12 && hour <= 18) {
    greating = "Good Afternoon";
    style.color = "blue";
}


root.render(<h1 className="heading" style={style}>{greating}</h1>)