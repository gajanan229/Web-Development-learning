import React from "react";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container);

function Card(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <img
        src={props.img}
        alt="avatar_img"
      />
      <p>{props.number}</p>
      <p>{props.email}</p>
    </div>
  )
}

root.render(
  <div>
    <h1>My Contacts</h1>
    <Card name="Beyonce" img="https://blackhistorywall.files.wordpress.com/2010/02/picture-device-independent-bitmap-119.jpg" number="+123 456 789" email="b@beyonce.com"/>
    <Card name="Chuck Norris" img="https://i.pinimg.com/originals/e3/94/47/e39447de921955826b1e498ccf9a39af.png" number="+918 372 574" email="gmail@chucknorris.com"/>
  </div>
);

