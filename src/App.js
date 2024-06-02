import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthToken from './components/Auth';
import Nav from './components/nav';
import Login from './components/login';
import Signup from './components/signup';
import Dashboard from './components/dash';
import MovieDetail from './components/MovieDetail';
import PublicPlaylist from './components/public_playlist';
import PlaylistInDetail from './components/PlaylistInDetail';
import AddPlaylist from './components/addplaylist';
import Privateindetails from './components/privateindetails';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { ToastContainer } from 'react-toastify';
import axios from 'axios'; // Import Axios
import PrivatePlaylist from './components/private_list';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = async () => {
    try {
      // Send a POST request to the /logout endpoint
      await axios.post('http://localhost:3001/logout');
      setIsLoggedIn(false);
      localStorage.removeItem('userId');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  useEffect(() => {
    // Check localStorage for userId to set initial login state
    const userId = localStorage.getItem('userId');
    if (userId) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div>
      <Router>
        <AuthToken setIsLoggedIn={setIsLoggedIn} /> {/* Include AuthToken */}
        <Nav isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/movie/:title" element={<MovieDetail />} />
          <Route path="/private_playlist" element={<PrivatePlaylist/>}/>
          <Route path="/private_playlist/:playlistname" element={<><AuthToken/><Privateindetails /></>} />
          <Route path="/public_playlist" element={<PublicPlaylist />} />
          <Route path="/public_playlist/:playlistname" element={<PlaylistInDetail />} />
          <Route path="/add" element={<AddPlaylist />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
};

export default App;
