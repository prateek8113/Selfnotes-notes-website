import React, { useContext } from 'react';
import { NoteContext } from './context/NoteState';


const Notesitem = (props) => {
  const context = useContext(NoteContext);
  const { deleteNote} = context;
  const { note,openmodal } = props;

  return (
    <>
      <div className="col-md-3 my-3">
        <div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <h6 className="card-subtitle mb-2 text">{note.tag}</h6>
            <p className="card-text">{note.description}</p>
            <div>
              <i className="fa-solid fa-pen-to-square mx-1" onClick={()=>openmodal(note)}></i>
              <i className="fa-solid fa-trash mx-2" onClick={() => deleteNote(note._id)}></i>
            </div>
          </div>
        </div>
      </div>

   
      
    </>
  );
};

export default Notesitem;
