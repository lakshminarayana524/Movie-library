import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import Search from './search';
import { ToastContainer, toast } from 'react-toastify';
import MovieAPI from './movieapi';
import './styles/dash.css'
import { useNavigate } from 'react-router-dom';
import Loader from './loader';

const Dashboard = () => {
  const { username } = useContext(AuthContext);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(false); // Set loading to false once the component has mounted
  }, []);

  const handleCLick = () => {
    navigate('/public_playlist')
  }

  if (loading) {
    return <Loader/>; // Display loading indicator while fetching data
  }

  return (
    <div className='dash-body'>
      <div className='dash-content'>
        <div className='div-container'></div>
      </div>
      <h1>Movie Library</h1>
      {username && <p>Welcome, {username}!</p>}
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
