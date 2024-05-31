import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { ToastContainer,toast } from 'react-toastify';

const Dashboard = () => {
  const { username } = useContext(AuthContext);

  const handleCLick=()=>{
    toast.success("You are logged in");
  }

  return (
    <div>
      <h1>Dashboard</h1>
      {username ? <p>Welcome, {username}!</p> : <p>Loading....</p> }
      <button onClick={handleCLick}> on click</button>
      <ToastContainer/>
    </div>
  );
};

export default Dashboard;
