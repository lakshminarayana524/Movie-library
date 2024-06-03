import React, { useState } from 'react';
import './styles/login.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Loader from './loader';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            const res = await axios.post(`https://movie-library-backend-kxe0.onrender.com/login`, { email, password });

            // const res = await axios.post(`http://localhost:5000/login`, { email, password });
                console.log(res.data.msg);
            if (res.data.msg === 'Login Successful') {
                localStorage.setItem('userId', res.data.userId); // Assuming userId is returned in the response
                navigate('/dashboard');
            } else {
                toast.error(res.data.msg);
            }
        } catch (err) {
            console.error("Login failed:", err);
            toast.error('Login failed');
        } finally {
            setLoading(false);
        }
    };
    

    if (loading) {
        return <Loader />;
    }

    return (
        <div className='login-body'>
            <div className='login-container'>
                <div className='login-content'>
                    <div className='login-form'>
                        <div className='login-head'>
                            <h1>Login</h1>
                        </div>
                        <div className="login-input">
                            <input
                                type='email'
                                placeholder='Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="login-input">
                            <input
                                type='password'
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="login-button">
                            <button onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
}

export default Login;
