import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { authAtom } from './authAtoms'; // Vérifie le chemin de ce fichier
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthModal = ({ onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false); // Basculer entre inscription et connexion
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [auth, setAuth] = useAtom(authAtom);
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (isSignUp && password !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas.');
      return;
    }

    try {
      const url = isSignUp ? '/register' : '/login';
      const response = await axios.post(`http://localhost:5000${url}`, { email, password });

      setConfirmationMessage(isSignUp ? 'Inscription réussie !' : 'Connexion réussie !');

      setTimeout(() => {
        setConfirmationMessage('');

        if (isSignUp) {
          navigate('/page2'); // Redirige vers la page d'inscription réussie
        } else {
          navigate('/page3'); // Redirige vers la page connectée
        }

        onClose(); // Ferme la modal
      }, 2000); // Délai de 2 secondes avant de rediriger
    } catch (error) {
      alert(error.response?.data?.message || 'Une erreur est survenue');
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 w-full max-w-sm relative"
        onClick={(e) => e.stopPropagation()} // Empêche la fermeture si on clique à l'intérieur
      >
        <h2 className="text-xl font-bold text-center mb-4 text-blue-800">
          {isSignUp ? 'Inscrivez-vous' : 'Connectez-vous'}
        </h2>
        {confirmationMessage && (
          <div className="text-center text-green-500 mb-4">
            {confirmationMessage}
          </div>
        )}
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded text-gray-800"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded text-gray-800"
          />
          {isSignUp && (
            <input
              type="password"
              placeholder="Confirmez le mot de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded text-gray-800"
            />
          )}
          <button
            type="submit"
            className="w-full bg-blue-800 text-white py-2 rounded hover:bg-blue-900 transition"
          >
            {isSignUp ? "S'inscrire" : 'Connexion'}
          </button>
        </form>
        <p className="text-center text-gray-600 my-2">ou</p>
        <button
          className="w-full bg-blue-500 text-white py-2 rounded flex items-center justify-center hover:bg-blue-600 transition"
        >
          <span className="material-icons mr-2">account_circle</span> Connexion avec Google
        </button>
        <p className="text-center mt-4">
          {isSignUp ? (
            <>
              Déjà inscrit ?{' '}
              <span
                onClick={() => setIsSignUp(false)}
                className="text-blue-500 cursor-pointer hover:underline"
              >
                Connectez-vous
              </span>
            </>
          ) : (
            <>
              Pas encore de compte ?{' '}
              <span
                onClick={() => setIsSignUp(true)}
                className="text-blue-500 cursor-pointer hover:underline"
              >
                Inscrivez-vous
              </span>
            </>
          )}
        </p>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default AuthModal;


// app js

// import ProtectedRoute from './Components/ProtectedRoute'; // Assure-toi que le chemin est correct

//  <Route
//   path="/page3"
//   element={
//     <ProtectedRoute>
//       <Page3 />
//     </ProtectedRoute>
//   }
// />

