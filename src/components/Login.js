import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

const Login = (props) => {
  const [Credentials, setCredentials] = useState({ email: '', password: '' });
  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const response = await fetch('https://notecraft-backend.onrender.com/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: Credentials.email, password: Credentials.password }),
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      localStorage.setItem('token', json.authtoken);
      props.showAlert('Successfully logged in', 'success');
      history.push('/');
    } else {
      props.showAlert('Invalid credentials', 'danger');
    }
  };

  const onchange = (e) => {
    setCredentials({ ...Credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
    <h2 className="text-center mb-4">Welcome to  <strong> NoteCraft</strong></h2>

 
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-sm-12">


          <form onSubmit={handleSubmit} className="mt-3">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={Credentials.email}
                onChange={onchange}
                aria-describedby="emailHelp"
                required
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={Credentials.password}
                onChange={onchange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary mb-3">
              Submit
            </button>
          </form>
          <Link className="text-decoration-none" to="/signup">
            Didn't have an account? Signup
          </Link>
        </div>
      </div>
    </div>

    </>
  );
};

export default Login;
