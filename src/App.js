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
import TermsOfUse from './pages/TermsOfUse.js';
import LearningPage from './pages/LearningPage.js';
import Learn from './pages/Learn.js';
import Timed from './pages/Timed.js';
import { FileProvider } from './context/FileContext.js';
import { AuthProvider } from './context/AuthContext.js';

function App() {
  return (
    <AuthProvider>
      <FileProvider>
        <Router>
          <MenuBar />
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/getstarted" element={<GetStarted />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/learningpage" element={<LearningPage />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/timed" element={<Timed />} />
        </Routes>
      </Router>
    </FileProvider>
  </AuthProvider>
  );
}

export default App;