import React, { createContext, useState, useEffect } from 'react';
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

    axios.defaults.withCredentials = true;

    axios.get('http://localhost:3001/verify')
      .then(res => {
        if (res.data.userId) {
          setUserId(res.data.userId);
          localStorage.setItem('userId', res.data.userId);
        } else {
          localStorage.removeItem('userId');
        }
      })
      .catch(err => {
        console.error("Error verifying token:", err);
        localStorage.removeItem('userId');
      });
  }, []);

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:3001/user-details/${userId}`)
        .then(response => {
          setUsername(response.data.username);
        })
        .catch(error => {
          console.error("Error retrieving username:", error);
        });
    }
  }, [userId]);

  return (
    <AuthContext.Provider value={{ userId, setUserId, username }}>
      {children}
    </AuthContext.Provider>
  );
};
