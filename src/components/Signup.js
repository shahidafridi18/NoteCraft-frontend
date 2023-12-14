import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
const Signup = (props) => {
  const [Credentials, setCredentials] = useState({ name: "", email: "", password: "" })
  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { name, email, password } = Credentials;
  
    try {
      const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
  
      const json = await response.json();
      console.log(json);
  
      if (json.success) {
        localStorage.setItem('token', json.authtoken);
        history.push("/");
        props.showAlert('Account created successfully!', 'success');
      } else {
        props.showAlert(json.msg || 'Invalid credentials', 'danger');
      }
    } catch (error) {
      console.error('Error creating account:', error);
      props.showAlert('Error creating account. Please try again.', 'danger');
    }
  };
  




  const onchange = (e) => {
    setCredentials({ ...Credentials, [e.target.name]: e.target.value })

  }
  return (

    <>
    <h2 className='text-center'>Create your account!</h2>
    <div className='container mt-5'>
      <div className='row justify-content-center'>

        <div className='col-md-6 col-sm-12'>

          <form onSubmit={handleSubmit} className='mt-3'>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
              <input type="text" className="form-control" id="name" name="name" onChange={onchange} />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input  type="email" className="form-control" id="email" name="email" onChange={onchange} aria-describedby="emailHelp" required />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" name="password" onChange={onchange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="cpassword" className="form-label">Confirm Password</label>
              <input type="password" className="form-control" onChange={onchange} id="cpassword" name="cpassword" required />
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
          </form>

        </div>

      </div>



    </div>

    </>
  )
}

export default Signup
