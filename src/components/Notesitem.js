import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext.js';
import '../App.css'


const Notesitem = (props) => {
    const { note, updateNote } = props;
    const context = useContext(noteContext);
    const { deleteNote } = context;
    return (


        <div className='col-md-3 my-2'>
            <div className="card my-3 h-100 custom-card">
                <div className="card-body">
                    <div className='d-flex align-items-center'>

                        <h5 className="card-title">{note.title}</h5>
                        <i className="fa-solid fa-trash mx-2" onClick={() => { deleteNote(note._id); props.showAlert("Deleted Successfully", "success"); }}></i>
                        <i className="fa-regular fa-pen-to-square mx-2" onClick={() => { updateNote(note) }}></i>

                    </div>

                    <p className="card-text">{note.description}</p>


                </div>
                <div className='card-footer'>
                    <p className=' text-muted'>{note.tag}</p>

                </div>
            </div>

        </div>


    )
}

export default Notesitem
