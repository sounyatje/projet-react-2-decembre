import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { authAtom } from './Navbar/authAtoms'; // Assure-toi que ce chemin est correct

const ProtectedRoute = ({ children }) => {
  const [auth] = useAtom(authAtom); // Vérifie si l'utilisateur est connecté (authAtom)

  // Si l'utilisateur est connecté, on affiche les "enfants" (les pages protégées)
  if (auth.isLoggedIn) {
    return children;
  }

  // Si l'utilisateur n'est pas connecté, on le redirige vers la page d'accueil
  return <Navigate to="/" />;
};

export default ProtectedRoute;
