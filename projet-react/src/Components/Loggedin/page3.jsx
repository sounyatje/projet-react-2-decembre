
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import NavbarLoggedIn from './NavbarLoggedIn';
import Footer from '../Footer/Footer';
import CoachListLoggedIn from './CoachListLoggedIn';
import CoachModal from '../CoachList/CoachModal';
import coaches from '../CoachList/coaches.json';

import About from '../About/About'

const Page3 = () => {
  const [courses, setCourses] = useState([]);
  const [pseudo, setPseudo] = useState('');
  const [searchCriteria, setSearchCriteria] = useState({
    coachName: '',
    city: '',
    price: '',
    speciality: [],
    sortOrder: 'asc',
  });

  const [searchQuery, setSearchQuery] = useState(''); // Recherche dans l'agenda
  const [filteredCourses, setFilteredCourses] = useState(courses); // Liste des cours filtrés
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [weather, setWeather] = useState({ temp: null, icon: null, description: '' }); // Météo
  const dropdownRef = useRef(null);

  // Fetch courses from the API when the component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/api/courses');
        setCourses(response.data);
        setFilteredCourses(response.data); // Initially, display all courses
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);

  // Récupérer le pseudo depuis le localStorage
  useEffect(() => {
    const storedPseudo = localStorage.getItem('userPseudo');
    if (storedPseudo) {
      setPseudo(storedPseudo);
    }

    

    // Appel API pour la météo de Bruxelles
    const apiKey = '6d5f8ee8295e2fe4f14d52f2263c1587';
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=Brussels&appid=${apiKey}&units=metric`)
      .then((response) => {
        const temp = Math.round(response.data.main.temp); // Arrondir la température
        const { icon, description } = response.data.weather[0];
        setWeather({ temp, icon, description });
      })
      .catch((error) => console.error('Erreur lors de la récupération des données météo:', error));
  }, []);

  const currentDate = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const formattedDate =
    currentDate.charAt(0).toUpperCase() + currentDate.slice(1);  

  // Trouver le premier cours correspondant à la date d'aujourd'hui
const today = new Date().toLocaleDateString('fr-FR');
const todayCourse = courses.find((course) => course.date === today);


  // Fonction pour filtrer les cours en fonction de la recherche
  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = courses.filter(
      (course) =>
        course.date.toLowerCase().includes(lowerCaseQuery) ||
        course.time.toLowerCase().includes(lowerCaseQuery) ||
        course.course.toLowerCase().includes(lowerCaseQuery) ||
        course.person.toLowerCase().includes(lowerCaseQuery) ||
        course.location.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredCourses(filtered);
  }, [searchQuery]);

  // Gestion des critères avancés pour CoachList
  const handleSearchCriteriaChange = (newCriteria) => {
    setSearchCriteria((prevCriteria) => ({
      ...prevCriteria,
      ...newCriteria,
    }));
  };

  const toggleSpeciality = (speciality) => {
    setSearchCriteria((prevCriteria) => {
      const normalizedSpeciality = speciality.toLowerCase();
      const isSelected = prevCriteria.speciality.includes(normalizedSpeciality);
      const newSpeciality = isSelected
        ? prevCriteria.speciality.filter((s) => s !== normalizedSpeciality)
        : [...prevCriteria.speciality, normalizedSpeciality];
      return { ...prevCriteria, speciality: newSpeciality };
    });
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSortOptionClick = (sortOrder) => {
    handleSearchCriteriaChange({ sortOrder });
    setIsDropdownOpen(false);
  };

  // Ouvrir le modal avec les détails d'un coach
  const openModal = (coach) => {
    setSelectedCoach(coach);
  };

  // Fermer le modal
  const closeModal = () => {
    setSelectedCoach(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavbarLoggedIn
        onLogoutClick={() => console.log('Déconnexion effectuée')}
        onSearch={handleSearchCriteriaChange}
        searchCriteria={searchCriteria}
        isCoach={true}
      />

      <div className="flex-grow p-8 flex space-x-8 bg-gray-100">
        <div className="w-2/3">
          <div className="mb-4">
            <button
              onClick={toggleFilter}
              className="text-sm font-semibold text-white bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              {isFilterOpen ? 'Masquer les filtres' : 'Filtres avancés'}
            </button>

            <div className={`mt-4 ${isFilterOpen ? 'flex flex-wrap gap-2' : 'hidden'}`}>
              {['bodypump', 'cardio boxing', 'pilates', 'circuit training', 'abdos fessiers'].map((sport) => (
                <span
                  key={sport}
                  onClick={() => toggleSpeciality(sport)}
                  className={`px-3 py-2 rounded-full cursor-pointer text-sm ${
                    searchCriteria.speciality.includes(sport.toLowerCase()) ? 'bg-blue-500 text-white' : 'bg-orange text-white'
                  } hover:bg-blue-500 transition-colors duration-200`}
                >
                  {sport.charAt(0).toUpperCase() + sport.slice(1)}
                </span>
              ))}

              <div className="relative ml-auto mr-5" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="text-sm font-semibold text-white bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
                >
                  Trier
                </button>
                {isDropdownOpen && (
                  <div className="absolute transform -translate-x-1/2 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                    <button
                      onClick={() => handleSortOptionClick('asc')}
                      className="block w-full px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white rounded text-left"
                    >
                      Prix Croissant
                    </button>
                    <button
                      onClick={() => handleSortOptionClick('desc')}
                      className="block w-full px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white rounded text-left"
                    >
                      Prix Décroissant
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white p-4 ">
            <CoachListLoggedIn
              coaches={coaches}
              searchCriteria={searchCriteria}
              onCoachClick={openModal}
            />
          </div>
        </div>

        
    {/* Div météo */}
<div className="mt-20 w-1/3 space-y-6">
  <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white rounded-lg shadow-2xl p-6 transition-all hover:shadow-2xl hover:scale-105">
    <div className="flex justify-between items-center">
      {/* Bloc "Bonjour" et date */}
      <div className="flex flex-col justify-center">
        <h2 className="text-4xl font-bold tracking-tight drop-shadow-lg">
          Bonjour, {pseudo}
        </h2>
        <p className="text-lg capitalize font-medium mt-1 text-blue-100">
          {currentDate}
        </p>
      </div>

      {/* Bloc température et icône */}
      <div className="flex flex-col items-center">
        <span className="text-6xl font-bold drop-shadow-md">
          {weather.temp !== null ? `${weather.temp}°C` : '...'}
        </span>
        {weather.icon && (
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`}
            alt={weather.description}
            className="w-24 h-24 mt-2 animate-pulse"
          />
        )}
      </div>
    </div>
    <p className="text-lg mt-4 italic text-blue-200">
      {weather.description || 'Chargement...'}
    </p>
    <p className="text-sm text-blue-300 mt-1">Bruxelles</p>
    <div className="bg-white bg-opacity-20 rounded-md p-4 mt-4">
      <p className="text-lg font-medium text-orange-200">
        Aujourd'hui :{' '}
        {todayCourse ? (
          <>
            <span className="font-semibold">{todayCourse.course}</span> à{' '}
            {todayCourse.time}
          </>
        ) : (
          <span className="font-light">Aucun cours aujourd'hui</span>
        )}
      </p>
    </div>
  </div>


{/* Div agenda */}
<div
  className="bg-lightGray rounded-lg shadow-lg p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-orangeHover scrollbar-track-lightGray"
  style={{ height: "755px" }} // Réduction de la hauteur totale de la div
>
  {/* Titre centré */}
  <h3 className="text-2xl font-bold text-blue-600 mb-4 text-center">
    Mes prochains cours
  </h3>

  {/* Barre de recherche avec styles et effets */}
  <div className="flex items-center bg-white rounded-full shadow-md px-3 py-1 space-x-2 transition-all hover:shadow-lg">
    <input
      type="text"
      placeholder="Chercher un cours, une personne ou un lieu"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="p-1 flex-grow border border-transparent focus:outline-none focus:ring-0 focus:border-transparent rounded-md text-gray-700 placeholder-gray-400 text-sm"
    />
    <button
      onClick={() => console.log("Recherche effectuée")}
      className="bg-orange text-white px-2 py-1 rounded-full hover:bg-orangeHover transition-transform duration-200 transform hover:scale-105"
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

  {/* Liste des cours */}
  <ul className="mt-4 space-y-4">
    {filteredCourses.length > 0 ? (
      filteredCourses.map((course, index) => (
        <li
          key={index}
          className="p-3 bg-white rounded-lg shadow-md transition-transform duration-200 hover:shadow-lg hover:scale-105 flex justify-between items-center"
        >
          <div>
            <span className="block font-bold text-blue-600 text-base">
              {course.day}, {course.date} à {course.time}
            </span>
            <span className="block text-gray-600 text-sm">
              {course.course} - <span className="italic">{course.person}</span>
            </span>
            <span className="block text-gray-500 text-xs">
              Lieu : {course.location}
            </span>
          </div>
        </li>
      ))
    ) : (
      <li className="text-gray-500 text-center text-sm">
        Aucun cours trouvé pour votre recherche.
      </li>
    )}
  </ul>
</div>



        </div>
      </div>

      {selectedCoach && (
  <CoachModal
    coach={selectedCoach}
    onClose={closeModal}
    isStudent={true}
    onCancelCourse={cancelCourse} // Passer la fonction d'annulation
  />
)}

<About />
      <Footer />
    </div>
  );
};

export default Page3;
