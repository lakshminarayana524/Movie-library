import logo from './logo.svg';
import './App.css';
import Login from './components/login';
import {BrowserRouter as Router,Route ,Routes} from 'react-router-dom';
import Signup from './components/signup';
import Home from './components/home';
import Dash from './components/dash';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/dashboard" element={<Dash/>}/>
            <Route path="*" element={<Home/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
