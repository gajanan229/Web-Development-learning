import React, { useState } from "react";

function App() {
  const [contact, setContact] = useState({
    fName: "",
    lName: "",
    email: ""
  });

  function handleChange(event){
    const value = event.target.value;
    const name = event.target.name;
    setContact((pastState) => {
      if (name === "fName") {
        return {
          fName: value,
          lName: pastState.lName,
          email: pastState.email
        }
      } else if (name === "lName"){
        return {
          fName: pastState.fName,
          lName: value,
          email: pastState.email
        }
      } else {
        return {
          fName: pastState.fName,
          lName: pastState.lName,
          email: value
        }
      }
    })
  }

  return (
    <div className="container">
      <h1>
        Hello {contact.fName} {contact.lName}
      </h1>
      <p>{contact.email}</p>
      <form>
        <input onChange={handleChange} name="fName" placeholder="First Name" />
        <input onChange={handleChange} name="lName" placeholder="Last Name" />
        <input onChange={handleChange} name="email" placeholder="Email" />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
