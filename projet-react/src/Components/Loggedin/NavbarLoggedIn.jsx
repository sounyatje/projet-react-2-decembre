import { Link } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import AddAnnouncementModal from "./AddAnnouncementModal";
import ProfileModal from "./ProfileModal"; 
import { useNavigate } from "react-router-dom"; // Importer useNavigate
import AgendaModal from './AgendaModal';
import MyAds from "./MyAds";

const NavbarLoggedIn = ({ onLogoutClick, onSearch, searchCriteria, isCoach, userId }) => {

  const navigate = useNavigate(); // Initialiser useNavigate

  const handleLogout = () => {
    // Supprimer les données utilisateur si nécessaire (localStorage, Jotai, etc.)
    localStorage.clear(); // Supprime toutes les données du localStorage
    onLogoutClick(); // Appeler la fonction de déconnexion
    navigate("/"); // Rediriger vers la page d'accueil
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // État pour le modal Ajouter une annonce
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false); // État pour le modal Mon Profil
  const [isAgendaModalOpen, setIsAgendaModalOpen] = useState(false);
  const [isMyAdsModalOpen, setIsMyAdsModalOpen] = useState(false); // État pour le modal Mes Annonces

  const dropdownRef = useRef(null);

  const handleInputChange = (field, value) => {
    onSearch({ [field]: value });
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Fermer le menu lorsqu'on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);
  
  const handleAddAnnouncement = async (newCoach) => {
    try {
      // Envoi uniquement les données de newCoach au backend
      const response = await axios.post(
        "http://localhost:5000/api/coaches",
        newCoach // Retire userId
      );
  
      console.log("Coach ajouté avec succès :", response.data);
  
      setIsAddModalOpen(false); // Fermer le modal après l'ajout
    } catch (error) {
      console.error(
        "Erreur lors de l'ajout de l'annonce :",
        error.response?.data || error.message
      );
      alert("Une erreur est survenue lors de l'ajout.");
    }
  };
  
  

  return (
    <nav className="flex justify-between items-center py-4 px-8 h-20 bg-gradient-to-r from-orange to-blueLight hover:from-blueLight hover:to-orange transition-all duration-500 shadow-md">
      <div className="flex items-center space-x-4">
        <img
          src="../../../public/Capture_d_écran_2024-11-04_142935-removebg-preview.png"
          alt="Strong Node Logo"
          className="w-14 h-14 object-cover rounded-full"
        />
        <h1 className="text-lg font-sporty text-white">
          Libérez votre potentiel avec les meilleurs{" "}
          <span className="text-blue-900 font-bold">coachs sportifs</span>
        </h1>
      </div>

      {/* Barre de recherche */}
      <div className="flex items-center bg-white bg-opacity-30 rounded-full shadow-md px-3 py-1 space-x-2">
        <input
          type="text"
          placeholder="Coach"
          value={searchCriteria.coachName}
          onChange={(e) => handleInputChange("coachName", e.target.value)}
          className="p-1 w-30 border border-transparent focus:outline-none rounded-md text-gray-200 placeholder-gray-300 text-sm"
        />
        <input
          type="text"
          placeholder="Ville"
          value={searchCriteria.city}
          onChange={(e) => handleInputChange("city", e.target.value)}
          className="p-1 w-30 border border-transparent focus:outline-none rounded-md text-gray-200 placeholder-gray-300 text-sm"
        />
        <input
          type="text"
          placeholder="Prix max"
          value={searchCriteria.price}
          onChange={(e) => handleInputChange("price", e.target.value)}
          className="p-1 w-30 border border-transparent focus:outline-none rounded-md text-gray-200 placeholder-gray-300 text-sm"
        />
        <button
          onClick={() => onSearch(searchCriteria)}
          className="bg-orange text-white px-3 py-2 rounded-full hover:bg-orange-600 transition-transform duration-200 flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M12.9 14.32a8 8 0 111.414-1.414l4.243 4.243a1 1 0 01-1.414 1.414l-4.243-4.243zM8 14a6 6 0 100-12 6 6 0 000 12z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div className="flex items-center space-x-4">
        {/* Bouton Dashboard */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="px-3 py-1 rounded-full border border-white bg-white bg-opacity-20 text-white text-sm hover:bg-orange hover:text-white transition-colors duration-200"
          >
            Dashboard
          </button>
          {isDropdownOpen && (
            <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
              <button
                onClick={() => setIsProfileModalOpen(true)} // Ouvre la modal
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white rounded"
              >
                Mon Profil
              </button>
              {isCoach && (
                <button
                  onClick={() => setIsAddModalOpen(true)} // Ouvre la modal
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white rounded"
                >
                  Ajouter une annonce
                </button>
              )}
              <Link
                to="/messages"
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white rounded"
              >
                Mes Messages
              </Link>
              <button
                onClick={() => setIsAgendaModalOpen(true)} // Ouvre la modal
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white rounded"
              >
                Mon Agenda
              </button>
              <button
                onClick={() => setIsMyAdsModalOpen(true)} // Ouvre la modal Mes Annonces
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white rounded"
              >
                Mes Annonces
              </button>
            </div>
          )}
        </div>

        {/* Bouton Déconnexion */}
        <button
          onClick={handleLogout} // Appel à la nouvelle fonction
          className="px-3 py-1 rounded-full border border-white bg-white bg-opacity-20 text-white text-sm hover:bg-orange hover:text-white transition-colors duration-200"
        >
          Déconnexion
        </button>
      </div>

{/* Modal Ajouter une annonce */}
{isAddModalOpen && (
  <AddAnnouncementModal
    onClose={() => setIsAddModalOpen(false)}
    onAdd={(newCoach) => {
      handleAddAnnouncement(newCoach); // Envoi au backend
      if (isMyAdsModalOpen) {
        // Met à jour la liste locale dans MyAds si la modal est ouverte
        setMyCoaches((prevCoaches) => [...prevCoaches, newCoach]);
      }
    }}
  />
)}


      {/* Modal Mon Agenda */}
      {isAgendaModalOpen && (
        <AgendaModal onClose={() => setIsAgendaModalOpen(false)} />
      )}

      {/* Modal Mon Profil */}
      {isProfileModalOpen && (
        <ProfileModal onClose={() => setIsProfileModalOpen(false)} />
      )}

 {/* Modal Mes Annonces */}
 <MyAds
  isOpen={isMyAdsModalOpen} // Contrôle de l'ouverture
  onClose={() => setIsMyAdsModalOpen(false)} // Fermeture
  id={userId} // Transmission de l'identifiant utilisateur sous le nom 'id'
/>

    
    </nav>
  );
};

export default NavbarLoggedIn;
