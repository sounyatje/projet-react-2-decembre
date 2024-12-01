import React, { useState, useEffect } from "react";
import axios from "axios";
import CoachModal from "./CoachModalLoggedIn";
import styles from "../CoachList/CoachList.module.css";
import coachesData from "../CoachList/coaches.json"; 
import reviewsData from "../CoachList/reviews.json"; 
import { CalendarDaysIcon, HandRaisedIcon } from '@heroicons/react/24/outline';

const CoachListLoggedIn = ({ searchCriteria }) => {
  const [coaches, setCoaches] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Charger les données des coachs et des avis depuis le backend
  useEffect(() => {
    const fetchCoachesAndReviews = async () => {
      try {
        const coachesResponse = await axios.get("http://localhost:5000/api/coaches");
  
        // Suppression des doublons en s'assurant que chaque ID est unique
        const uniqueCoaches = Array.from(
          new Map(coachesResponse.data.map((coach) => [coach.id, coach])).values()
        );
  
        setCoaches(uniqueCoaches); // Mettre à jour les coachs sans doublons
  
        const reviewsResponse = await axios.get("http://localhost:5000/api/reviews");
        setReviews(reviewsResponse.data);
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
        setCoaches(coachesData); // Fallback sur les données locales en cas d'échec
        setReviews(reviewsData);
      }
    };
  
    fetchCoachesAndReviews();
  }, []); // Ne pas mettre de dépendances pour éviter de recharger inutilement
  

  

  // Associer les avis aux coachs
  const coachesWithReviews = coaches.map((coach) => {
    const coachReviews = reviews.find((review) => review.id === coach.id);
    return {
      ...coach,
      reviews: coachReviews ? coachReviews.reviews : [], // Ajouter les avis ou un tableau vide
    };
  });

  // Filtrage des coachs en fonction des critères
  const filteredCoaches = coachesWithReviews.filter((coach) => {
    const matchesName =
      !searchCriteria.coachName ||
      coach.name.toLowerCase().includes(searchCriteria.coachName.toLowerCase());
    const matchesCity =
      !searchCriteria.city ||
      coach.location.toLowerCase().includes(searchCriteria.city.toLowerCase());
    const matchesMaxPrice =
      !searchCriteria.price || coach.price <= parseFloat(searchCriteria.price);
    const matchesSpeciality =
      !searchCriteria.speciality ||
      searchCriteria.speciality.length === 0 ||
      searchCriteria.speciality.includes(coach.speciality.toLowerCase());

    return matchesName && matchesCity && matchesMaxPrice && matchesSpeciality;
  });

  // Tri des coachs en fonction de l'ordre spécifié
  const sortedCoaches = filteredCoaches.sort((a, b) => {
    if (searchCriteria.sortOrder === "asc") {
      return a.price - b.price; // Ordre croissant par prix
    } else if (searchCriteria.sortOrder === "desc") {
      return b.price - a.price; // Ordre décroissant par prix
    }
    return 0; // Pas de tri si aucun ordre spécifié
  });

  const openModal = (coach) => {
    setSelectedCoach(coach);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCoach(null);
    setIsModalOpen(false);
  };

  return (
    <div className="p-4 bg-lightGray rounded-lg shadow-lg overflow-y-auto scrollbar-thin scrollbar-thumb-orangeHover scrollbar-track-lightGray">
      <div
        className={`${styles.scrollContainer} bg-white border-gray-200 shadow-md p-5 rounded-lg min-h-[900px]`}
      >
        {sortedCoaches.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-6">
            {sortedCoaches.map((coach, index) => (
              <div
                key={index}
                onClick={() => openModal(coach)}
                className="w-36 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 p-4 text-center cursor-pointer"
              >
                <img
                  src={coach.image}
                  alt={coach.name}
                  className="w-full h-24 rounded-md object-cover mb-3"
                />
                <h3 className="text-sm font-semibold text-gray-800">
                  {coach.name}
                </h3>
     
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-red-500">
            Aucun coach ne correspond à vos critères.
          </p>
        )}
        
      </div>

      {/* Section Newsletter */}
      <div className="relative isolate overflow-hidden bg-orange/80 bg-gradient-to-r from-orange to-blueLight hover:from-blueLight hover:to-orange transition-all duration-500 shadow-md py-3 sm:py-6 lg:py-7 mt-4">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 lg:max-w-none lg:grid-cols-2">
            <div className="max-w-xl lg:max-w-lg">
              <h2 className="text-3xl font-semibold tracking-tight text-lightGray">Abonnez-vous à notre newsletter</h2>
              <p className="mt-2 text-base text-gray">
                Restez informé avec nos derniers articles, offres et conseils de nos experts.
              </p>
              <div className="mt-4 flex max-w-md gap-x-4">
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  required
                  placeholder="Entrez votre email"
                  autoComplete="email"
                  className="min-w-0 flex-auto rounded-md border-0 bg-gray-200/10 px-3 py-2 text-lightGray shadow-sm ring-1 ring-inset ring-gray focus:ring-2 focus:ring-inset focus:ring-blueLight sm:text-sm"
                />
                <button
                  type="submit"
                  className="flex-none rounded-md bg-blueLight px-3 py-2 text-sm font-semibold text-lightGray shadow-sm hover:bg-blueDark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blueLight"
                >
                  Abonnez-vous
                </button>
              </div>
            </div>
            <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:pt-2">
              <div className="flex flex-col items-start">
                <div className="rounded-md bg-gray-300/10 p-2 ring-1 ring-gray-300">
                  <CalendarDaysIcon aria-hidden="true" className="h-5 w-5 text-lightGray" />
                </div>
                <dt className="mt-2 text-sm font-semibold text-lightGray">Articles hebdomadaires</dt>
                <dd className="mt-1 text-xs text-gray">
                  Profitez de nos conseils et astuces exclusifs chaque semaine.
                </dd>
              </div>
              <div className="flex flex-col items-start">
                <div className="rounded-md bg-gray-300/10 p-2 ring-1 ring-gray-300">
                  <HandRaisedIcon aria-hidden="true" className="h-5 w-5 text-lightGray" />
                </div>
                <dt className="mt-2 text-sm font-semibold text-lightGray">Pas de spam</dt>
                <dd className="mt-1 text-xs text-gray">
                  Recevez uniquement des informations pertinentes et utiles.
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div aria-hidden="true" className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-4">
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="aspect-[1155/678] w-[60rem] bg-gradient-to-tr from-blueLight to-blueDark opacity-30"
          />
        </div>
      </div>

      {isModalOpen && selectedCoach && (
        <CoachModal
          coach={selectedCoach}
          onClose={closeModal}
          isStudent={true}
          showReviews={true}
        />
      )}
      
    </div>
  );
};

export default CoachListLoggedIn;
