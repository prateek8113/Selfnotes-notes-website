import "./App.css";
import Navbar from "./components/Navbar";
import { Notefunc } from "./components/context/NoteState";

import About from "./components/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Notes from "./components/Notes";
import Login from './components/Login'
import Signup from './components/Signup'


function App() {
  return (
    
    <Notefunc>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/Notes" element={<Notes />} />
            <Route path="/" element={<Login />} />
            <Route path="/Login" element={<Login/>} />
            <Route path="/Signup" element={<Signup />} />
          </Routes>
          </div>
        </div>
      </Router>
    </Notefunc>

  );
}

export default App;
