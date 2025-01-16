import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import CoachList from './Components/CoachList/CoachList';
import Testimonials from './Components/Testimonials/Testimonials';
import About from './Components/About/About';
import AuthModal from './Components/Navbar/Connexion';
import Page2 from './Components/Loggedin/Page2';
import Page3 from "./Components/Loggedin/page3";
//try to fix typo issue
import './App.css';
import './index.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState({
    coachName: '',
    city: '',
    price: ''
  });

  const handleSearch = (criteria) => {
    setSearchCriteria(criteria);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
// Page3
  return (
    <Router>
      <Routes>
        {/* Route pour la page d'accueil */}
        <Route
          path="/"
          element={
            <div className="page-container">
              <Navbar onLoginClick={openModal} onSearch={handleSearch} />
              <div className="content-wrap">
                <div className="main-content">
                  <section className="testimonials-section">
                    <Testimonials />
                  </section>
                  <section className="coach-section">
                    <h2 className="text-2xl font-bold text-[#004e98] mb-6">
                      Notre sélection de coachs particuliers en Belgique
                    </h2>
                    <CoachList searchCriteria={searchCriteria} />
                  </section>
                </div>
              </div>
              <About />
              <Footer />
              {isModalOpen && <AuthModal onClose={closeModal} />}
            </div>
          }
        />

        {/* Route pour la page d'inscription */}
        <Route path="/page2" element={<Page2 />} />

        {/* Route pour la page d'accueil après connexion */}
        <Route path="/page3" element={<Page3 />} />
      </Routes>
    </Router>
  );
}

export default App;
