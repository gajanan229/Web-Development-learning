import React from "react";
import App from "./components/App";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<App />);

//CHALLENGE: I have extracted the Input Area, including the <input> and
//<button> elements into a seperate Component called InputArea.
//Your job is to make the app work as it did before but this time with the
//InputArea as a seperate Component.

// DO NOT: Modify the ToDoItem.jsx
// DO NOT: Move the input/button elements back into the App.jsx

//Hint 1: You will need to think about how to manage the state of the input element
//in InputArea.jsx.
//Hint 2: You will need to think about how to pass the input value back into
//the addItem() function in App.jsx.

