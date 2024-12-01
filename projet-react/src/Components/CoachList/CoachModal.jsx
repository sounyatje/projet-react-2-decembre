import React from 'react';

const CoachModal = ({ coach, onClose }) => {
  if (!coach) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 w-11/12 max-w-3xl p-6 rounded-lg relative text-white">
        {/* Bouton de fermeture */}
        <button onClick={onClose} className="absolute top-0 right-1.5 text-white text-xl font-bold">
          &times;
        </button>

        <div className="flex gap-4">
          {/* Image du Coach et Nom */}
          <div className="flex flex-col items-center">
            <img
              src={coach.image}
              alt={coach.name}
              className="w-36 h-36 rounded-lg object-cover border-2 border-orange-500"
            />
            <div className="mt-3 flex items-center gap-2">
              <h3 className="text-lg font-semibold">{coach.name}</h3>
            </div>
          </div>

          {/* Informations du coach */}
          <div className="flex-1 bg-[#dfe7f2] text-black p-4 rounded-lg">
            <p className="font-semibold mb-2">Spécialité : {coach.speciality}</p>
            <p className="text-sm mb-2">Âge : {coach.age} ans</p>
            <p className="text-sm mb-4">
              {coach.description}
            </p>
            <p className="text-sm">
              <strong>Horaires :</strong> {coach.schedule}
            </p>
          </div>
        </div>

        {/* Section Avis */}
        <div className="mt-4 grid grid-cols-2 gap-4">
          {/* Avis des élèves */}
          <div className="bg-white p-4 rounded-lg text-black">
            <h4 className="text-lg font-semibold mb-2">Avis des élèves :</h4>
            <ul className="space-y-2">
              {coach.reviews && coach.reviews.length > 0 ? (
                coach.reviews.map((review, index) => (
                  <li key={index} className="text-sm flex flex-col space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">{review.name}</span>
                      <span className="text-yellow-400">{'★'.repeat(review.rating)}</span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </li>
                ))
              ) : (
                <p className="text-sm text-gray-500">Aucun avis disponible</p>
              )}
            </ul>
          </div>

          {/* Carte avec localisation */}
          <div className="bg-white p-4 rounded-lg text-black">
            <h4 className="text-lg font-semibold mb-2">Lieu :</h4>
            <p className="text-sm">{coach.location}</p>
            <div className="w-full h-24 bg-gray-300 mt-2 rounded-lg"></div> {/* Placeholder pour la carte */}
          </div>
        </div>

        {/* Section Prix et Paiement */}
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
