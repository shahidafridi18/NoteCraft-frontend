import React, { useState, useEffect } from 'react';
import wavinghand from './waving hand.png'; // Import the waving hand image
import Notes from './Notes';

const Home = (props) => {
  const [name, setName] = useState("");

  useEffect(() => {
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
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  return (
    <div>
      <div style={{ top: "60px", left: "5px", position: "absolute" }} className='container mt-2'>
        <h5 style={{ display: 'flex', alignItems: 'center' }}>
          Hello {name}
          <img src={wavinghand} alt="Waving Hand" style={{ width: '30px', height: '30px', marginLeft: '5px' }} />

        </h5>
      </div>
      <Notes showAlert={props.showAlert} />
    </div>
  );
};

export default Home;
