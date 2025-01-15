import React, {useState}  from "react";

function CreateArea(props) {
  const [note, setNote] = useState({
      title: "",
      content: ""
    }
  );
  
    function handleChange(event){
      const name = event.target.name;
      name=="title" 
        ? setNote((currNotes) => ({title: event.target.value, content: currNotes.content}))
        : setNote((currNotes) => ({title: currNotes.title, content: event.target.value}))
    }

    function handleSubmit(event) {
      props.onAdd(note);
      setNote({title: "", content: ""});
      event.preventDefault();
    }
  
  return (
    <div>
      <form>
        <input onChange={handleChange} name="title" placeholder="Title" value={note.title}/>
        <textarea onChange={handleChange} name="content" placeholder="Take a note..." rows="3" value={note.content}/>
        <button onClick={handleSubmit}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
