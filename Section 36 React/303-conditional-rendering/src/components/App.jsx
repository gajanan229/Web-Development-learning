import React from "react";
import Login from "./Login";

var isLoggedIn = false;
const currentTime = new Date().getHours();

function renderConditionaly(){
  if (isLoggedIn) {
    return <h1>Hello</h1>
  }
  return (
    <Login />
  )
}

function App() {
  return (
    <div className="container">
      {isLoggedIn ? <h1>Hello</h1> : <Login />}

      {currentTime > 12 && <h1>Why are you still working?</h1>}
    </div>
  );
}

export default App;
