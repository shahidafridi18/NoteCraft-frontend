import React, { useEffect, useState } from 'react';
import logo from './notecraft.png';
import { Link, useLocation, useHistory } from 'react-router-dom';

const Navbar = (props) => {
    const [logoutBtn, setLogoutBtn] = useState(false);
    const [name, setName] = useState("");

    let location = useLocation();
    useEffect(() => {
        console.log(location.pathname);
        const fetchData = async () => {
            try {
              const response = await fetch("http://localhost:5000/api/auth/getuser", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "auth-token": localStorage.getItem('token')
                },
              });
      
              if (!response.ok) {
                console.error('Failed to fetch user details:', response.statusText);
                return;
              }
      
              const data = await response.json();
              setName(data.name);

            } catch (error) {
              console.error('Error fetching user details:', error);
            }
          };
      
          fetchData();


    }, [location]);

    const isLoggedIn = localStorage.getItem('token');
    let history = useHistory();

    const handleclick = () => {
        localStorage.removeItem('token');
        history.push("/login");
        props.showAlert("Successfully logged out!", "danger");
        setLogoutBtn(false);

    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/"> <img src={logo} alt="Logo" width="30" height="30" className="d-inline-block align-top" />
                    &nbsp; NoteCraft</Link>
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
                        <div>
                        <div>
                            <button
                                onClick={() => setLogoutBtn(!logoutBtn)}
                                className="btn btn-light px-2 text-lg text-dark-800 bg-light py-2 rounded-lg hover:bg-primary hover:text-dark"
                            >
                                <i className="fa-solid fa-user"></i>&nbsp; {name}
                            </button>
                        </div>
                        {logoutBtn && (
                            <div className="position-absolute">
                                <button
                                    onClick={handleclick}
                                    className="btn btn-danger px-3 py-2 text"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
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

export default Navbar;
