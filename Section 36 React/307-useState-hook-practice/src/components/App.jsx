import React, {useState} from "react";

function App() {
  setInterval(getTime, 100)

  const time = new Date().toLocaleTimeString();
  const [CurrTime, setTime] = useState(time)
  
  function getTime(){
    let newTime = new Date().toLocaleTimeString();
    setTime(newTime)
  }

  return (
    <div className="container">
      <h1>{CurrTime}</h1>
      <button onClick={getTime}>Get Time</button>
    </div>
  );
}

export default App;
