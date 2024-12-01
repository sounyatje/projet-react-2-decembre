import React, { useState, useEffect } from 'react';
import Rating from 'react-rating-stars-component';
import axios from 'axios';

const CoachModal = ({ coach, onClose, isStudent }) => {
  if (!coach) return null;

  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(0);

  const pseudo = localStorage.getItem('userPseudo') || 'Anonyme';

  // Fonction pour récupérer les avis depuis le backend
  const fetchReviews = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/reviews');
      const coachReviews = response.data.filter(review => review.coachId === coach.id); // Filtre les avis pour ce coach
      setReviews(coachReviews);
    } catch (error) {
      console.error('Erreur lors de la récupération des avis :', error);
    }
  };

  // Charger les avis au montage du composant
  useEffect(() => {
    fetchReviews();
  }, []);

  const handleReviewSubmit = async () => {
    if (newReview.trim() && rating > 0) {
      try {
        // Envoi de l'avis au backend
        const response = await axios.post('http://localhost:5000/api/reviews', {
          name: pseudo,
          rating,
          comment: newReview,
          coachId: coach.id, // Si vous avez un ID de coach, ajoutez-le ici
        });

        // Mettre à jour la liste des avis localement après la réponse du backend
        setReviews([...reviews, response.data]);
        setNewReview('');
        setRating(0);

        alert('Votre avis a été soumis avec succès !');
      } catch (error) {
        console.error('Erreur lors de l’envoi de l’avis :', error);
        alert("Une erreur s'est produite lors de l'envoi de votre avis.");
      }
    } else {
      alert("Veuillez écrire un commentaire et donner une note avant de soumettre.");
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 w-11/12 max-w-3xl p-6 rounded-lg relative text-white">
        {/* Bouton de fermeture */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-xl font-bold hover:text-gray-300"
        >
          &times;
        </button>

        {/* Contenu principal */}
        <div className="flex gap-4">
          {/* Image et nom du coach */}
          <div className="flex flex-col items-center">
            <img
              src={coach.image}
              alt={coach.name}
              className="w-36 h-36 rounded-lg object-cover border-2 border-orange-500"
            />
            <h3 className="mt-3 text-lg font-semibold">{coach.name}</h3>
          </div>

          {/* Informations du coach */}
          <div className="flex-1 bg-[#dfe7f2] text-black p-4 rounded-lg">
            <p className="font-semibold mb-2">Spécialité : {coach.speciality}</p>
            <p className="text-sm mb-2">Âge : {coach.age} ans</p>
            <p className="text-sm mb-4">{coach.description}</p>
            <p className="text-sm">
              <strong>Horaires :</strong> {coach.schedule}
            </p>
          </div>
        </div>

        {/* Section des avis */}
        <div className="mt-4 grid grid-cols-2 gap-4">
          {/* Liste des avis */}
          <div className="bg-white p-4 rounded-lg text-black">
            <h4 className="text-lg font-semibold mb-2">Avis des élèves :</h4>
            {reviews.length > 0 ? (
              <ul className="space-y-2">
                {reviews.map((review, index) => (
                  <li key={index} className="text-sm flex flex-col space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">{review.name}</span>
                      <span className="text-yellow-400">{'★'.repeat(review.rating)}</span>
                    </div>
                    <p>{review.comment}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">Aucun avis disponible</p>
            )}
          </div>

          {/* Localisation */}
          <div className="bg-white p-4 rounded-lg text-black">
            <h4 className="text-lg font-semibold mb-2">Lieu :</h4>
            <p>{coach.location}</p>
            <div className="w-full h-24 bg-gray-300 mt-2 rounded-lg"></div>
          </div>
        </div>

        {/* Ajouter un avis */}
        {isStudent && (
          <div className="mt-4 bg-white p-4 rounded-lg text-black">
            <h4 className="text-md font-semibold mb-2">Écrire un avis :</h4>

            {/* Système d'étoiles */}
            <Rating
              count={5}
              value={rating}
              onChange={(value) => setRating(value)}
              size={24}
              activeColor="#FFD700"
            />

            {/* Champ de commentaire */}
            <textarea
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="Écrivez votre avis ici..."
              className="w-full h-20 p-2 border border-gray-300 rounded-md mt-2"
            />

            {/* Bouton de soumission */}
            <button
              onClick={handleReviewSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-blue-600"
            >
              Publier
            </button>
          </div>
        )}

        {/* Section prix et réservation */}
        <div className="mt-4 flex items-center justify-end gap-4">
          <span className="text-lg font-semibold">{coach.price} €</span>
          <button className="bg-orange text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-600 transition-transform transform hover:scale-105">
            Réserver
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoachModal;
