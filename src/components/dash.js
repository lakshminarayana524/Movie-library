import React, { useContext,useState } from 'react';
import { AuthContext } from './AuthContext';
import Search from './search';
import { ToastContainer,toast } from 'react-toastify';
import MovieAPI from './movieapi';
import './styles/dash.css'

const Dashboard = () => {
  const { username } = useContext(AuthContext);
  const [search,setsearch]=useState('');

  const handleCLick=()=>{
    toast.success("You are logged in");
  }

  return (
    <div className='dash-body'>
      <div className='dash-content'>
        <div className='div-container'></div>
      </div>
      <h1>Dashboard</h1>
      {username ? <p>Welcome, {username}!</p> : <p>Loading....</p> }
      {/* <button onClick={handleCLick}> on click</button> */}
      <div className="dash-search">
        <Search value={search} onChange={(e)=>setsearch(e.target.value)}/>
      </div>
      <div className='Movies'>
        <MovieAPI search={search} />
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Dashboard;
