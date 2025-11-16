import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MenuBar from './components/menubar.js';
import Gemini from './components/Gemini.js';
import Home from './pages/Home.js';
import About from './pages/About.js';
import Features from './pages/Features.js';
import Contact from './pages/Contact.js';
import GetStarted from './pages/GetStarted.js';
import Login from './pages/Login.js';

function App() {
  return (
    <Router>
      <MenuBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/getstarted" element={<GetStarted />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;