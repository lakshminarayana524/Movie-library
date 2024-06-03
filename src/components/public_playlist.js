import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/public_playlist.css';

const PublicPlaylist = () => {
    const [playlists, setPlaylists] = useState([]);
    const navigate = useNavigate();
    

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                // const res = await axios.get("http://localhost:5000/publiclibget");

                const res = await axios.get("https://movie-library-backend-kxe0.onrender.com/publiclibget");
                if (res.data.msg === 'Successfully fetched') {
                    const userId = localStorage.getItem('userId');
                    const filteredPlaylists = res.data.playlists.filter(playlist => playlist.uid === userId);
                    setPlaylists(res.data.playlists);
                    console.log("Data fetched and filtered");
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
                <h3>Public Playlists</h3>
                <div className='publicplaylist-container'>
                    {playlists.length > 0 ? playlists.map((playlist, index) => (
                        <div key={index} className='publicplaylist-card' onClick={() => navigate(`/public_playlist/${playlist.playlistname}`)}>
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

export default PublicPlaylist;
