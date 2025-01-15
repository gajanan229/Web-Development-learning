import React, {useState} from "react";

function App() {
  const [item, setItem] = useState("");
  const [list, setList] = useState([]);
  const [key, setKey] = useState(0);

  function handleChange(event){
    setItem(event.target.value)
  }

  function handleButton(){
    setList((currList) => ([ ...currList, item]));
    setItem("");
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input type="text" onChange={handleChange} value={item}/>
        <button onClick={handleButton}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {list.map((value) => (<li>{value}</li>))}
        </ul>
      </div>
    </div>
  );
}

export default App;
