import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import Search from './search';
import { ToastContainer, toast } from 'react-toastify';
import MovieAPI from './movieapi';
import './styles/dash.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from './loader';

const Dashboard = ({isLoggedIn}) => {
  // const { username } = useContext(AuthContext);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [username,setUsername]=useState('');
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    setLoading(false); // Set loading to false once the component has mounted
  }, []);

  const handleCLick = () => {
    navigate('/public_playlist')
  }

  useEffect(() => {
    if (userId) {
      axios.get(`https://movie-library-backend-kxe0.onrender.com/user-details/${userId}`)
      // axios.get(`http://localhost:5000/user-details/${userId}`)
        .then(response => {
          setUsername(response.data.username);
        })
        .catch(error => {
          console.error("Error retrieving username:", error);
        });
    }
  }, [userId]);

  if (loading) {
    return <Loader/>; // Display loading indicator while fetching data
  }

  return (
    <div className='dash-body'>
      <div className='dash-content'>
        <div className='div-container'></div>
      </div>
      <h1>Movie Library</h1>
      {userId ? <p>Welcome, {username ? username : <p>Loading...</p>}!</p> : ''}
      {/* <button onClick={handleCLick}>on click</button> */}
      <div className="dash-search">
        <Search value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <div className='Movies'>
        <MovieAPI search={search} />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
