import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"

  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  //Get all notes
  const getNotes = async () => {
    //todo api call

    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
      });

      const json = await response.json();
      console.log(json);
      setNotes(json);

    } catch (error) {
      console.error("Error fetching notes:", error);
    }

  }

  //Add a note
  const addNote = async (title, description, tag) => {
    //Todo api call

    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const json =await response.json();
    const note = json;
    setNotes(notes.concat(note));

   
    console.log(json);


  }

  //Delete a note
  const deleteNote =async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });

    const json = response.json();
    console.log(json);


    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)

  }

  //Edit a note

  const editNote = async (id, title, description, tag) => {
    //api call


    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const json = response.json();
    console.log(json);




    //logic to edit a note
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        notes[index].title = title;
        notes[index].description = description;
        notes[index].tag = tag;
        break;

      }
     

    }
    setNotes(notes);

  }

  return (
    // eslint-disable-next-line react/jsx-pascal-case, no-sequences
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }} >
      {props.children}
    </NoteContext.Provider>
  )


}

export default NoteState;