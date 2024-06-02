import React, { useContext, useState } from 'react';
import { AuthContext } from './AuthContext';
import Search from './search';
import { ToastContainer, toast } from 'react-toastify';
import MovieAPI from './movieapi';
import './styles/dash.css'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { username } = useContext(AuthContext);
  const [search, setsearch] = useState('');
  const navigate = useNavigate();

  const handleCLick = () => {
    navigate('/public_playlist')
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
        <Search value={search} onChange={(e) => setsearch(e.target.value)} />
      </div>
      <div className='Movies'>
        <MovieAPI search={search} />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
