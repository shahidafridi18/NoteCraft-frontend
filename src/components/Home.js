import React, { useState, useEffect } from 'react';
import Notes from './Notes';

const Home = (props) => {
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://notecraft-backend.onrender.com/api/auth/getuser", {
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
      <div style={{ background: "#f8f9fa", padding: "20px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", borderRadius: "8px", margin:"0px auto 20px", maxWidth: "600px" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "10px", color: "black", textAlign: "center" }}>
          Welcome, {name}!
        </h1>
        
      </div>
      <Notes showAlert={props.showAlert} />
    </div>
  );
};

export default Home;
