import AddNote from './AddNote';
import noteContext from '../context/notes/noteContext.js';
import { useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';

const Notes = (props) => {
    let history = useHistory();
    const context = useContext(noteContext);
    const { getNotes } = context;


    if (localStorage.getItem('token')) {
        getNotes();

    } else {
        history.push("/login");
    }






    return (
        <>
            <div className='container'>

                <AddNote showAlert={props.showAlert} />


            </div>

            <div className='container'>
                <Link
                    to='/yournotes'
                    style={{
                        display: 'inline-block',
                        padding: '10px 20px',
                        backgroundColor: '#333',
                        color: '#fff',
                        textDecoration: 'none',
                        borderRadius: '5px',
                        marginTop: '10px',
                        fontSize: '16px',
                        transition: 'background-color 0.3s ease',
                    }}
                >
                    Navigate to your notes &rarr;
                </Link>
            </div>




        </>
    )
}

export default Notes
