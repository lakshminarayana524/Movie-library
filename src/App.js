import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthToken from './components/Auth';
import Nav from './components/nav';
import Login from './components/login';
import Signup from './components/signup';
import Dashboard from './components/dash';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import AddPlaylist from './components/addplaylist';
import MovieDetail from './components/MovieDetail';
import { AuthProvider } from './components/AuthContext';
import PrivatePlaylist from './components/private_list';
import PublicPlaylist from './components/public_playlist';
import PlaylistInDetail from './components/PlaylistInDetail';
import Privateindetails from './components/privateindetails';
import Loading from './components/loading'
import axios from 'axios'; 
import './App.css';
import Myplaylist from './components/myplaylists';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  axios.defaults.withCredentials = true;

  const handleLogout = async () => {
    try {
      await axios.post('https://movie-library-backend-kxe0.onrender.com/logout');
      setIsLoggedIn(false);
      localStorage.removeItem('userId');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <AuthToken  /> {/* Include AuthToken */}
          <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} handleLogout={handleLogout} />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login  setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard isLoggedIn={isLoggedIn}/>} />
            <Route path="/movie/:title" element={<MovieDetail />} />
            <Route path="/loading" element={<Loading />} />
            <Route path="/public_playlist" element={<Myplaylist setIsLoggedIn={setIsLoggedIn}  />} />
            <Route path="/public_playlist/Allplaylists" element={<PublicPlaylist setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/private_playlist" element={<PrivatePlaylist setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/public_playlist/:playlistname" element={<PlaylistInDetail />} />
            <Route path="/private_playlist/:playlistname" element={<><AuthToken/><Privateindetails /></>} />
            <Route path="/add" element={<AddPlaylist />} />
            <Route path="*" element={<Dashboard/>}/>
          </Routes>
        </AuthProvider>
      </Router>
      <ToastContainer />
    </div>
  );
};

export default App;
