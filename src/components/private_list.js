import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/public_playlist.css';

const PrivatePlaylist = () => {
    const [playlists, setPlaylists] = useState([]);
    const navigate = useNavigate();
    

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const res = await axios.get("https://movie-library-backend-kxe0.onrender.com/privatelibgets");
                if (res.data.msg === 'Successfully fetched') {
                    const userId = localStorage.getItem('userId');
                    const filterdata=res.data.playlists.filter(playlist => playlist.uid === userId);
                    setPlaylists(filterdata);
                    console.log("Private playlists fetched");
                }
            } catch (error) {
                console.error('Error fetching playlists:', error);
            }
        };

        fetchPlaylists();
    }, []);

    const handleBack = () => {
        window.history.back();
    };

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
                    )) : <p>No playlists found.</p>}
                </div>
            </div>
        </div>
    );
};

export default PrivatePlaylist;
