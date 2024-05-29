import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { ToastContainer, toast } from 'react-toastify';

const AuthToken = () => {
  const navigate = useNavigate();
  const { setUserId } = useContext(AuthContext);

  useEffect(() => {
    axios.get('http://localhost:3001/verify', { withCredentials: true })
      .then((res) => {
        if (res.data.msg === "No token found" || res.data.msg === "Wrong Token") {
            console.log(res.data.msg);
          toast.error(res.data.msg);
          setTimeout(() => {
            navigate('/');
          }, 3000);
        } else {
            console.log(res.data.msg);
          const userId = res.data.userId;
          setUserId(userId);
          localStorage.setItem('userId', userId);
        }
      })
      .catch(err => console.log(err));
  }, [navigate, setUserId]);

  return (
    <div>
      <ToastContainer />
    </div>
  );
};

export default AuthToken;