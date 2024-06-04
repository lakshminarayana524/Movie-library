import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/public_playlist.css';
import Loader from './loader';

const PrivatePlaylist = () => {
    const [playlists, setPlaylists] = useState([]);
    const[load,setload]=useState(false);
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    const userId=localStorage.getItem('userId')
    

    useEffect(() => {
        const fetchPlaylists = async () => {
            setload(true)
            try {
                // const res = await axios.get("http://localhost:5000/privatelibgets");
                const res = await axios.get("https://movie-library-backend-kxe0.onrender.com/privatelibgets");

                if (res.data.msg === 'Successfully fetched') {
                    const userId = localStorage.getItem('userId');
                    const filterdata=res.data.playlists.filter(playlist => playlist.uid === userId);
                    setPlaylists(filterdata);
                    console.log("Private playlists fetched");
                    setload(false);
                }
            } catch (error) {
                console.error('Error fetching playlists:', error);
                setload(false);
            }
        };

        fetchPlaylists();
    }, []);

    const handleBack = () => {
        window.history.back();
    };

    if(load){
        return <Loader />
    }

    return (
        <div className='publicplaylist-body'>
            <button className='back-button' onClick={handleBack}>
                <span className="back-arrow">&#8249;</span> Back
            </button>
            <div className='publicplaylist-content'>
                <h3>Private Playlists</h3>
                <div className='publicplaylist-container'>
                    {playlists.length > 0 ? playlists.map((playlist, index) => (
                        <div key={index} className='publicplaylist-card' onClick={() => navigate(`/private_playlist/${playlist.playlistname}`)}>
                            <div className='publicplaylist-title'>
                                <strong>{playlist.playlistname}</strong>
                            </div>
                        </div>
                    )) :(userId ? <p>No playlists found.</p> : <p>Please Login to see playlists</p>
                )}
                </div>
            </div>
        </div>
    );
};

export default PrivatePlaylist;
