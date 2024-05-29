import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }

    axios.get('http://localhost:3001/verify', { withCredentials: true })
      .then(res => {
        if (res.data.userId) {
          setUserId(res.data.userId);
          localStorage.setItem('userId', res.data.userId);
          axios.get(`http://localhost:3001/user-details/${res.data.userId}`)
            .then(response => {
              setUsername(response.data.username);
            })
            .catch(error => {
              console.error("Error retrieving username:", error);
            });
        } else {
          localStorage.removeItem('userId');
        }
      })
      .catch(err => {
        console.error("Error verifying token:", err);
        localStorage.removeItem('userId');
      });
  }, []);

  return (
    <AuthContext.Provider value={{ userId, setUserId, username }}>
      {children}
    </AuthContext.Provider>
  );
};
