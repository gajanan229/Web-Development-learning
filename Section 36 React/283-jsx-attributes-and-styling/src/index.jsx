import React from "react";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container);

const img = "https://picsum.photos/200";

root.render(
  <div>
    <h1 className="heading" contentEditable="true" spellcheck="false">My Favourite Foods</h1>
    <ul>
      <li>Bacon</li>
      <li>Jamon</li>
      <li>Noodles</li>
    </ul>
    <div>
      <img className="food-img" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Jam%C3%B3n_de_Guijuelo_004_%28cropped%29_4.3.JPG/1200px-Jam%C3%B3n_de_Guijuelo_004_%28cropped%29_4.3.JPG" alt="Bacon" />
      <img className="food-img" src="https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_16:9/k%2Farchive%2Fad4881c2ec9f21cafb7f5d209c83b6849d6b0d23" alt="Jamon" />
      <img className="food-img" src="https://thewoksoflife.com/wp-content/uploads/2020/04/homemade-chinese-egg-noodles-19-e1609271249794.jpg" alt="Noodles" />
    </div>
    <div>
      <img src={img} alt="Random Image" />
    </div>
  </div>
);
