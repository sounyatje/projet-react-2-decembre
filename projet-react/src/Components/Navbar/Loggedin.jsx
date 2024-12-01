import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import CoachList from './Components/CoachList/CoachList';
import Testimonials from './Components/Testimonials/Testimonials';
import About from './Components/About/About';
import AuthModal from './Components/Navbar/Connexion';
import LoggedInPage from './Components/LoggedInPage'; // Créez ce composant pour la page connectée
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

  // Vérifie si l'utilisateur est connecté
  const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));

  return (
    <Router>
      <div className="page-container">
        <Navbar onLoginClick={openModal} onSearch={handleSearch} />
        <div className="content-wrap">
          <Routes>
            {/* Page d'accueil */}
            <Route path="/" element={
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
                <About />
              </div>
            } />

            {/* Page connectée */}
            <Route
              path="/logged-in"
              element={isLoggedIn ? <LoggedInPage /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
        <Footer />
        {isModalOpen && <AuthModal onClose={closeModal} />}
      </div>
    </Router>
  );
}

export default App;
