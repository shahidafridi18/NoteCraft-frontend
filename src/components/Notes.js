import React, { useContext, useEffect, useRef, useState } from 'react'
import Notesitem from './Notesitem.js';
import AddNote from './AddNote';
import noteContext from '../context/notes/noteContext.js';
import { useHistory } from 'react-router-dom';

const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    let history = useHistory();

    useEffect(() => {
        const fetchData = async () => {
            if (localStorage.getItem('token')) {
                await getNotes();
            } else {
                history.push("/login");
            }
        };

        fetchData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const ref = useRef(null);
    const refClose = useRef(null);

    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

    const updateNote = (currentnote) => {
        ref.current.click()
        setNote({ id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag })



    }


    const handleclick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click()
        props.showAlert("Updated Succesfully!", "success");



    }

    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })

    }

    return (
        <>
            <AddNote showAlert={props.showAlert} />

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>



            <div class="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onchange} value={note.etitle} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                                    <textarea
                                        className="form-control"
                                        id="edescription"
                                        name="edescription"
                                        onChange={onchange}
                                        value={note.edescription}
                                        minLength={5}
                                        required
                                        placeholder='Enter your description....'
                                        rows={4} // Set the number of visible rows
                                    />                                
                                    </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" onChange={onchange} value={note.etag} />
                                </div>

                            </form>

                        </div>
                        <div class="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" class="btn btn-primary" onClick={handleclick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className=' row my-3'>
                <h2>Your notes</h2>
                <div className='container mx-2'>
                    {notes.length === 0 && 'No notes to display'}

                </div>


                {notes.map((note) => {
                    return <Notesitem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />
                })}


            </div>
        </>
    )
}

export default Notes
