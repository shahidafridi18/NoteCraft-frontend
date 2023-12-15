import React, { useEffect } from 'react'
import { Link, useLocation,useHistory } from 'react-router-dom';


const Navbar = (props) => {

    let location = useLocation();
    useEffect(() => {
        console.log(location.pathname)

    }, [location])


    const isLoggedIn = localStorage.getItem('token');
    let history=useHistory();

    const handleclick=()=>{
        localStorage.removeItem('token');
        history.push("/login");
        props.showAlert("Successfully logged out!","danger");
    }


    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">NoteCraft</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} to="/about">About</Link>
                        </li>

                    </ul>
                    {isLoggedIn ? (
                        <button className='btn btn-danger' onClick={handleclick}>Logout</button>
                    ) : (
                        <form className="d-flex">
                            <Link className='btn btn-light' role="button" to='/login'>
                                Login
                            </Link>
                            
                        </form>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
