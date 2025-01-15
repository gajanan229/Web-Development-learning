import React, {useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([
    {
      title: "Note title",
      content: "Note content"
    }
  ]);

  function addNotes(note){
    setNotes((currNotes) => ([...currNotes, note]))
  }

  function deleteNotes(id){
    setNotes((currNotes) => {
      return currNotes.filter((item, index) => {
        return index !== id;
      });
    })
  }


  return (
    <div>
      <Header />
      <CreateArea onAdd={addNotes}/>
      {notes.map((note, index) => {
          return (
            <Note 
              key={index} 
              id={index}
              title={note.title} 
              content={note.content} 
              remove={deleteNotes}
            />
          )
        }
      )}
      <Footer />
    </div>
  );
}

export default App;
