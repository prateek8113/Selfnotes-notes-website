import { createContext, useState} from "react";
import React from "react";

const NoteContext = createContext();

const Notefunc = (props) => {
  const notesinitial = [];
  const getnotes = async () => {
    const url = "http://localhost:3000/api/notes/fetch";
    const headers = {
      "Content-Type": "application/json",
      auth: localStorage.getItem('token'), // Replace with your actual API key
    };
    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };
  const [note, setNotes] = useState(notesinitial);
  const addNote = async (title, description, tag) => {
    const url = "http://localhost:3000/api/notes/addnotes";
    const headers = {
      "Content-Type": "application/json",
      auth: localStorage.getItem('token'), // Replace with your actual API key
    };

    const noteData = {
      title: title,
      description: description,
      tag: tag,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(noteData),
    });

    const savedNote = await response.json();

    setNotes((prevNotes) => [...prevNotes, savedNote]);
  };
  const updatenote = async (id, title, description, tag) => {
    const url = `http://localhost:3000/api/notes/modifynotes/${id}`;
    const headers = {
      "Content-Type": "application/json",
      auth: localStorage.getItem('token'),
    };

    const updatedNoteData = {
      title: title,
      description: description,
      tag: tag,
    };

    const response = await fetch(url, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(updatedNoteData),
    });

    const json = await response.json();
    console.log(json);
    console.error();
    let newnotes =JSON.parse(JSON.stringify(note))

    for (let i = 0; i < newnotes.length; i++) {
      const ele = newnotes[i];
      if (ele.id === id) {
        newnotes[i].title = title;
        newnotes[i].description = description;
        newnotes[i].tag = tag;
        break;
      }
      
    }
    setNotes(newnotes);
    getnotes();
  };

  const deleteNote = async (id) => {
    const url = `http://localhost:3000/api/notes/delete/${id}`;
    const headers = {
      "Content-Type": "application/json",
      auth: localStorage.getItem('token'), // Replace with your actual API key
    };
    const response = await fetch(url, {
      method: "DELETE",
      headers: headers,
    });
    const json = await response.json();
    console.log(json);

    console.log("deleting note-id" + id);
    const newnote = note.filter((iterator) => {
      return iterator._id !== id;
    });
    setNotes(newnote);
  };
 


  return (
    <NoteContext.Provider
      value={{ note, setNotes, addNote, deleteNote, getnotes, updatenote}}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export { NoteContext, Notefunc };
