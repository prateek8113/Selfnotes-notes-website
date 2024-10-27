import React, { useEffect, useState, useRef } from 'react';
import Notesitem from './Notesitem';
import { useContext } from 'react';
import { NoteContext } from './context/NoteState';

const Notes = () => {
  const { note, getnotes, updatenote } = useContext(NoteContext);

  useEffect(() => {
    getnotes();
  }, []);

  const [notes, setNotes] = useState({ id: "", title: "", description: "", tag: "" });
  const ref = useRef(null);


  const openModal = (current) => {
    setNotes({ id: current._id, title: current.title, description: current.description, tag: current.tag });
    const modalInstance = new window.bootstrap.Modal(ref.current);
    modalInstance.show();
  };

  const update = (e) => {
    e.preventDefault();
    
    updatenote(notes.id, notes.title, notes.description, notes.tag);
    const modalInstance = window.bootstrap.Modal.getInstance(ref.current);
    if (modalInstance) {
      modalInstance.hide();
    }
  };


  const onchange = (e) => {
    setNotes({ ...notes, [e.target.name]: e.target.value });
  };

  return (
    <>
      <h1>Your Notes</h1>
      <div className="row my-3">
        {note.map((note) => {
          return (
            <Notesitem
              key={note._id}
              title={note.title}
              tag={note.tag}
              description={note.description}
              note={note}
              openmodal={() => openModal(note)}
            />
          );
        })}
      </div>


      <div className="modal fade" ref={ref} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" onClick={() => window.bootstrap.Modal.getInstance(ref.current)?.hide()}></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={notes.title}
                    onChange={onchange}
                    aria-describedby="title"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    value={notes.description}
                    onChange={onchange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input
                    type="text"
                    className="form-control"
                    id="tag"
                    name="tag"
                    value={notes.tag}
                    onChange={onchange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => window.bootstrap.Modal.getInstance(ref.current)?.hide()}>
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={update}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notes;
