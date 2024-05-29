import React,{useState} from 'react'
import './styles/signup.css'
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const [name, setname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    axios.defaults.withCredentials=true;

  const validatePassword = () => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError('Password must contain at least 8 characters, one uppercase letter, one number, and one special character.');
      return false;
    }
    return true;
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    let newError = '';
     if (!password) {
        newError = 'Password is required.';
    } else if (!retypePassword) {
        newError = 'Retype Password is required.';
    } else if (password !== retypePassword) {
        newError = 'Passwords do not match.';
    } else if (!validatePassword()) {
        // validatePassword sets passwordError, so no need to set it here
        return;
    }
    // Check if there's a new error message
    if (newError) {
        setPasswordError(newError);
        return;
    }
    // Submit the form if all conditions are satisfied
    // Add your form submission logic here

    axios.post(`http://localhost:3001/signup`,{name,email,password})
        .then((res)=>{
            if(res.data.msg==='Email already exist'){
                setPasswordError(res.data.msg);
            }
            if(res.data.msg==='Created Successfully'){
                setTimeout(()=>{
                    navigate('/login')
                },"5000")
                toast.success('Successfully stored details')
                setname('') 
                setEmail('')
                setPassword('')
                setRetypePassword('')
            }
        })
};


    const handleLogin = () =>{
        setTimeout(()=>{
            navigate('/login')
        },2000);

    }

    const handleEnter =(e)=>{
        if(e.key==='Enter'){
          handleSubmit(e);
        }
      }

  return (
    <div className='signup-body'>
        <div className='signup-container'>
            <div className='signup-content'>
                <div className='signup-form'>
                    <div className='signup-head'>
                        <h1>Sign Up</h1>
                    </div>
                    <div className="signup-input">
                        <input type='text' name="Name" placeholder='Name' value={name} onChange={(e)=>setname(e.target.value)} />
                    </div>
                    <div className="signup-input">
                        <input type='email' name="Email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}  />
                    </div>
                    <div className="signup-input">
                        <input type='password' name="Password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} />
                    </div>
                    {password && (
                <div className="signup-input">
                    <input type="password" value={retypePassword} placeholder="Retype-Password" onKeyDown={handleEnter} onChange={(e) => setRetypePassword(e.target.value)} />
                    
                </div>
                )}
                    <div className='signup-text'>
                        <p>Already a member ? <span className='signup-text-span' onClick={handleLogin}>Login</span></p>
                    </div>
                    <div className="signup-button">
                        <button onClick={handleSubmit}>Submit</button>
                    </div>  
                    <div className={`signup-error ${passwordError ? 'blink' : ''}`}>
                    {passwordError && <p className="error-message">{passwordError}</p>}
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </div>
    </div>
  )
}

export default Signup
