// CHALLENGE: uncomment the code below and see the car stats rendered
import React from "react";
import { createRoot } from "react-dom/client";
import cars from "./practice";

const container = document.getElementById("root");
const root = createRoot(container);



const [honda, tesla] = cars;

const {coloursByPopularity: cbp, speedStats: ss} = tesla
const {coloursByPopularity, speedStats} = honda

const [teslaTopColour] = cbp;
const [hondaTopColour] = coloursByPopularity;

const {topSpeed: teslaTopSpeed} = ss
const {topSpeed: hondaTopSpeed} = speedStats

console.log(hondaTopSpeed)

root.render(
    <table>
        <tr>
            <th>Brand</th>
            <th>Top Speed</th>
            <th>Top color</th>
        </tr>
        <tr>
            <td>{tesla.model}</td>
            <td>{teslaTopSpeed}</td>
            <td>{teslaTopColour}</td>
        </tr>
        <tr>
            <td>{honda.model}</td>
            <td>{hondaTopSpeed}</td>
            <td>{hondaTopColour}</td>
        </tr>
    </table>
);
