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
  }, []);

  return (
    <div>
      <div style={{ background: "#f8f9fa", padding: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", borderRadius: "8px", margin: "0 auto 20px", maxWidth: "300px" }}>
        <h6 style={{ fontSize: "1.5rem", marginBottom: "5px", color: "black", textAlign: "center" }}>
          Welcome, {name}!
        </h6>
      </div>

      <Notes showAlert={props.showAlert} />
    </div>
  );
};

export default Home;
