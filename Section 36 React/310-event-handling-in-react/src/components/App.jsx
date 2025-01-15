import React, {useState} from "react";

function App() {

  const [headingText, setHeadingText] = useState("Hello");
  const [hoverColor, setHoverColor] = useState({backgroundColor: "white"});

  function handleClick(){
    setHeadingText("Submitted");
  }

  function over(){
    setHoverColor({backgroundColor: "black"});
  }

  function out(){
    setHoverColor({backgroundColor: "white"});
  }


  return (
    <div className="container">
      <h1>{headingText}</h1>
      <input type="text" placeholder="What's your name?" />
      <button style={hoverColor} onClick={handleClick} onMouseOver={over} onMouseOut={out}>Submit</button>
    </div>
  );
}

export default App;
