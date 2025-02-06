import React, { useState } from 'react';
import Style from './Sporty.module.css'

const Navbar = ({ onLoginClick, onSearch }) => {
  const [coachName, setCoachName] = useState('');
  const [city, setCity] = useState('');
  const [maxPrice, setMaxPrice] = useState(''); // Renommé en maxPrice pour refléter l'intention

  const handleSearchClick = () => {
    onSearch({
      coachName,
      city,
      price: maxPrice, // Utilise maxPrice pour le filtre de prix maximum
    });
  };

  return (
    <nav className= " flex justify-between items-center py-4 px-8 h-20 bg-gradient-to-r from-orange to-blueLight hover:from-blueLight hover:to-orange transition-all duration-500 shadow-md">
      <div className="flex items-center space-x-4">
        <img src="../../../public/converted_image-removebg-preview.png" alt="Strong Node Logo" className="w-14 h-14 object-cover rounded-full" />
        <h1 className="text-lg font-sporty font-normal text-white ">
          Libérez votre potentiel avec les meilleurs <span className="text-blue-900 font-bold">coachs sportifs</span>
        </h1>
      </div>
      <div className="flex items-center bg-white bg-opacity-30 rounded-full shadow-md px-3 py-1 space-x-2">
        <input
          type="text"
          placeholder="Coach"
          value={coachName}
          onChange={(e) => setCoachName(e.target.value)}
          className="p-1 w-30 border border-transparent focus:outline-none rounded-md text-gray-200 placeholder-gray-300 text-sm"
        />
        <input
          type="text"
          placeholder="Ville"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-1 w-30 border border-transparent focus:outline-none rounded-md text-gray-200 placeholder-gray-300 text-sm"
        />
        <input
          type="text"
          placeholder="Prix max"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="p-1 w-30 border border-transparent focus:outline-none rounded-md text-gray-200 placeholder-gray-300 text-sm"
        />
     <button
  onClick={handleSearchClick}
  className="bg-orange text-white px-2 py-1 rounded-full hover:bg-orangeHover transition-transform duration-200 transform hover:scale-105"
>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-6"
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
      <button onClick={onLoginClick} className="px-3 py-1 rounded-full border border-white bg-white bg-opacity-20 text-white text-sm hover:bg-orange hover:text-white transition-colors duration-200">
        Connexion
      </button>
    </nav>
  );
};

export default Navbar;
