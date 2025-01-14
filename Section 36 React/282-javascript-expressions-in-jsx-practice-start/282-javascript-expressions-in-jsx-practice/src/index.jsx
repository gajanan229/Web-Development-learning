//Create a react app from scratch.
//It should display 2 paragraph HTML elements.
//The paragraphs should say:
//Created by YOURNAME.
//Copyright CURRENTYEAR.
//E.g.
//Created by Angela Yu.
//Copyright 2019.

import React from "react";
import {createRoot} from "react-dom/client";

const name = "Gajanan Vigneswaran";
var currYear = new Date().getFullYear()

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
    <div>
        <p>Created by {name}.</p>
        <p>Copyright {currYear}.</p>
    </div>
)