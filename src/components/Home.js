import React, { useState ,useContext} from "react";
import {NoteContext} from "./context/NoteState"

const Home = () => {
  const context=useContext(NoteContext);
  const {addNote}=context;
  const [note,setNotes] = useState({ title: "", description: "", tag: "" })

  const handleClick = (e)=>{
        e.preventDefault()
        addNote(note.title,note.description,note.tag);
  }
  const onchange = (e)=>{
    setNotes({...note, [e.target.name]: e.target.value})
  }
   return(
   <div>
    <form>
  <div class="mb-3">
    <label for="title" class="form-label">Title</label>
    <input type="text" class="form-control" id="title"  name="title" onChange={onchange} aria-describedby="title"/>
    
  </div>
  <div class="mb-3">
    <label for="description" class="form-label">Description</label>
    <input type="text" class="form-control" id="description" name ="description" onChange={onchange}/>
  </div>
  <div class="mb-3">
    <label for="tag" class="form-label">tag</label>
    <input type="text" class="form-control" id="tag" name ="tag" onChange={onchange}/>
  </div>
  <div class="mb-3 form-check">
  </div>
  <button type="submit" class="btn btn-primary" onClick={handleClick}>save</button>
</form>
</div>
    
    
    
   )
};

export default Home;
