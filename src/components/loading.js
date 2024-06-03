import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import Loader from './loader';

const Loading = () => {
    const navigate = useNavigate();
    const { setUserId, setUsername, setPlaylists } = useContext(AuthContext);

    axios.defaults.withCredentials=true;

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                // const verifyResponse = await axios.get('http://localhost:5000/verify');
                const verifyResponse = await axios.get('https://movie-library-backend-kxe0.onrender.com/verify');

                if (verifyResponse.data.msg !== 'Successfully Verified') {
                    navigate('/login');
                    return;
                }

                const userId = verifyResponse.data.userId;

                const [userDetails, privateLib] = await Promise.all([
                    // axios.get(`http://localhost:5000/user-details/${userId}`),

                    axios.get(`https://movie-library-backend-kxe0.onrender.com/user-details/${userId}`),
                    axios.get(`https://movie-library-backend-kxe0.onrender.com/privatelibget/${userId}`)
                ]);

                setUserId(userId);
                setUsername(userDetails.data.username);
                setPlaylists(privateLib.data.playlists);

                navigate('/dashboard'); // Navigate to dashboard after data is fetched
            } catch (err) {
                console.error("Error fetching data:", err);
                navigate('/login');
            }
        };

        fetchData();
    }, [navigate, setUserId, setUsername, setPlaylists]);

    return <Loader />;
};

export default Loading;
