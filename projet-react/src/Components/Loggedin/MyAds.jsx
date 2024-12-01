import React, { useState, useEffect } from "react";


const MyAds = ({ id, isOpen, onClose }) => {
  const [myCoaches, setMyCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyCoaches = () => {
      try {
        setLoading(true);
        // Récupérer les annonces depuis localStorage
        const storedCoaches = JSON.parse(localStorage.getItem("coaches")) || [];
        setMyCoaches(storedCoaches);
      } catch (err) {
        console.error("Erreur lors du chargement des annonces :", err);
        setError("Impossible de récupérer vos annonces.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyCoaches(); // Exécuter au chargement du composant
  }, []);

  const handleDelete = (coachId) => {
    try {
      // Supprimer l'annonce du localStorage
      const updatedCoaches = myCoaches.filter((coach) => coach.id !== coachId);
      localStorage.setItem("coaches", JSON.stringify(updatedCoaches));
      setMyCoaches(updatedCoaches); // Mettre à jour l'état local pour refléter la suppression
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  if (!isOpen) return null; // Si la modal n'est pas ouverte, ne rien afficher

  return (
    <div
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    onClick={onClose}
  >
    <div
      className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 w-10/12 max-w-[50vw] max-h-[80vh] p-6 rounded-lg relative 
      overflow-y-auto scrollbar-thin scrollbar-thumb-orangeHover scrollbar-track-blue-700 shadow-xl"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Bouton Fermer */}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-white text-2xl hover:text-gray-300 transition"
      >
        &times;
      </button>
  
      <h2 className="text-2xl font-bold text-center mb-6 text-white">Mes Annonces</h2>
  
      {/* Gestion des états */}
      {loading ? (
        <p className="text-center text-white font-semibold">Chargement en cours...</p>
      ) : error ? (
        <p className="text-center text-white font-semibold">{error}</p>
      ) : myCoaches.length === 0 ? (
        <p className="text-center text-white font-medium">Vous n'avez aucune annonce.</p>
      ) : (
        <div className="bg-white p-4 rounded-md shadow-xl transition-shadow duration-300">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {myCoaches.map((coach) => (
              <div
                key={coach.id}
                className="ad-card rounded-lg overflow-hidden shadow-md bg-white  hover:shadow-lg transition duration-300"
              >
                <img
                  src={coach.image || "https://via.placeholder.com/150"}
                  alt={coach.name}
                  className="w-full h-[150px] object-cover"
                />
                <div className="p-4">
                  <h3 className="text-sm font-bold text-gray-800 truncate">{coach.name}</h3>
                  <p className="text-xs text-gray-600 truncate">{coach.speciality}</p>
                  <button
                    onClick={() => handleDelete(coach.id)}
                    className="mt-3 bg-orange text-white px-3 py-1 rounded-md hover:bg-blue-500 transition duration-300 text-xs w-full"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
  
  );
};

export default MyAds;
