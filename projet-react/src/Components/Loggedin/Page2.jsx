import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const Page2 = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('eleve');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Bruxelles');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('Belgique');
  const [specialty, setSpecialty] = useState('');
  const [diploma, setDiploma] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [pseudo, setPseudo] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [age, setAge] = useState(null);

  useEffect(() => {
    if (birthDate) {
      const today = new Date();
      const birth = new Date(birthDate);
      let calculatedAge = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        calculatedAge--;
      }
      setAge(calculatedAge);
    }
  }, [birthDate]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Stocker les données dans LocalStorage
    localStorage.setItem("userPseudo", pseudo);
    localStorage.setItem("userFirstName", firstName);
    localStorage.setItem("userLastName", lastName);
    localStorage.setItem("userAddress", address);
    localStorage.setItem("userCity", city);
    localStorage.setItem("userPostalCode", postalCode);
    localStorage.setItem("userCountry", country);
    localStorage.setItem("userAvatar", avatar); // Stocker l'image encodée en Base64
    localStorage.setItem("userRole", role);
    localStorage.setItem("userBirthDate", birthDate);
  
    // Calculer l'âge et stocker
    localStorage.setItem("userAge", age);
  
    if (role === "coach") {
      localStorage.setItem("userSpecialty", specialty);
      if (diploma) {
        const reader = new FileReader();
        reader.onload = () => {
          localStorage.setItem("userDiploma", reader.result); // Stocker l'attestation encodée
        };
        reader.readAsDataURL(diploma);
      }
    }
  
    // Naviguer vers la page 3
    navigate("/page3");
  };
  

  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      image: '../../public/photo1.jpeg',
      name: 'Jonh Bennett',
      title: 'En troisième place',
      description: '"Nous progressons 10 fois plus vite que nos pairs et restons cohérents."',
    },
    {
      image: '../../public/photo2.webp',
      name: 'Crista Martin',
      title: 'En deuxième place',
      description: '"Ce coach a fait preuve d’un excellent suivi et d’une grande efficacité."',
    },
    {
      image: '../../public/photo3.webp',
      name: 'Thibaut Lamiert',
      title: 'En première place',
      description: '"Reconnu pour sa passion et son dévouement envers ses élèves."',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handlePrev = () => {
    setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentSlide((currentSlide + 1) % slides.length);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-lightGray to-gray-100">
      <Navbar />

      <div className="flex-grow flex items-center justify-center p-5 mt-8">
        <div className="bg-white shadow-lg rounded-lg flex w-full max-w-6xl mx-auto overflow-hidden">
          {/* Section Formulaire à gauche */}
          <div className="w-1/2 p-10 space-y-6">
            <h1 className="text-3xl font-bold text-orange flex justify-center">Inscription</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Avatar and Pseudo */}
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700"></label>
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                    {avatar ? (
                      <img src={avatar} alt="Avatar Preview" className="w-full h-full object-cover" />
                    ) : (
                      <img src="../../public/images/avatar.jpg" alt="Default Avatar Icon" className="w-30 h-30" />
                    )}
                  </div>
                  <input
                    type="file"
                    onChange={handleAvatarChange}
                    className="absolute inset-0 opacity-0 cursor-pointer rounded-full"
                    accept="image/*"
                  />
                </div>
                <button
                  type="button"
                  className="w-20 bg-blue-500 text-white font-semibold py-1 rounded-md hover:bg-orange transition duration-200 shadow-lg hover:shadow-xl"
                  onClick={() => document.querySelector('input[type="file"]').click()}
                >
                  Ajouter
                </button>
              </div>

              {/* Pseudo */}
              <input
                type="text"
                placeholder="Pseudo"
                value={pseudo}
                onChange={(e) => setPseudo(e.target.value)}
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
                required
              />

              {/* Sélection du Rôle */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Vous êtes :</label>
                <div className="mt-2 flex space-x-6">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="eleve"
                      checked={role === 'eleve'}
                      onChange={(e) => setRole(e.target.value)}
                      className="mr-2 text-orange-500 focus:ring-orange-500"
                    />
                    Élève
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="coach"
                      checked={role === 'coach'}
                      onChange={(e) => setRole(e.target.value)}
                      className="mr-2 text-orange-500 focus:ring-orange-500"
                    />
                    Coach
                  </label>
                </div>
              </div>

              {/* Nom et Prénom */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nom</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Prénom</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    required
                  />
                </div>
              </div>

              {/* Date de naissance */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Date de naissance</label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  required
                />
              </div>

              {/* Âge (automatique) */}
              {age !== null && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Âge</label>
                  <input
                    type="text"
                    value={`${age} ans`}
                    readOnly
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100"
                  />
                </div>
              )}

              {/* Adresse et Ville */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Adresse</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Ville</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    required
                  />
                </div>
              </div>

              {/* Code Postal et Pays */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Code Postal</label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Pays</label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  >
                    <option>Belgique</option>
                  </select>
                </div>
              </div>

              {/* Spécialité et Diplôme (Seulement pour Coach) */}
              {role === 'coach' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Spécialité</label>
                    <input
                      type="text"
                      value={specialty}
                      onChange={(e) => setSpecialty(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Téléchargez votre attestation ou diplôme</label>
                    <input
                      type="file"
                      onChange={(e) => setDiploma(e.target.files[0])}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                  </div>
                </>
              )}

              {/* Bouton S'inscrire */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-full sm:w-1/2 bg-blue-500 mt-5 text-white font-semibold py-2 rounded-md hover:bg-orange transition duration-200 shadow-lg"
                >
                  Inscription
                </button>
              </div>
            </form>
          </div>

        {/* Section Carrousel à droite */}
<div
  className="w-1/2 relative flex items-center justify-center bg-cover bg-center rounded-r-lg"
  style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
>
  <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end items-start p-8 text-shadow-lg h-full">
    {/* Titre du carrousel centré en haut */}
    <h2 className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white font-sporty text-2xl text-nowrap">
      Top 3 des coachs du mois
    </h2>
    <h3 className="text-white text-2xl font-bold mb-2">{slides[currentSlide].title}</h3>
    <p className="text-white text-lg font-semibold">{slides[currentSlide].name}</p>
    <p className="text-white mt-2 text-sm" style={{ maxWidth: '70%' }}>
      {slides[currentSlide].description}
    </p>
    <div className="mt-4 text-white flex space-x-1">
      {[...Array(5)].map((_, i) => (
        <span key={i} className="text-lg">&#9733;</span>
      ))}
    </div>
  </div>
  <div className="absolute bottom-4 right-4 flex space-x-4">
    <button
      onClick={handlePrev}
      className="w-10 h-10 rounded-full border border-white flex items-center justify-center text-white hover:bg-blue-500"
    >
      <span className="font-bold">&#10094;</span>
    </button>
    <button
      onClick={handleNext}
      className="w-10 h-10 rounded-full border border-white flex items-center justify-center text-white hover:bg-blue-500"
    >
      <span className="font-bold">&#10095;</span>
    </button>
  </div>
</div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Page2;
