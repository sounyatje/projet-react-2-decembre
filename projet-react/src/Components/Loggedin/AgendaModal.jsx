import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AgendaModal = ({ onClose }) => {
  const [courses, setCourses] = useState([]);

  // Charger les cours depuis le backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/courses');
        console.log('Cours chargés depuis le backend :', response.data); // Log des cours
        setCourses(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des cours :', error);
      }
    };
  
    fetchCourses();
  }, []);
  
  

  // Fonction pour annuler un cours
  const cancelCourse = async (courseId) => {
    try {
      await axios.delete(`http://localhost:5000/api/courses/${courseId}`);
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course.id !== courseId)
      );
      alert('Cours annulé avec succès.');
    } catch (error) {
      console.error('Erreur lors de l’annulation du cours :', error.response || error.message);
      alert('Une erreur est survenue lors de l’annulation.');
    }
  };
  

return (
  <div
    className=" fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    onClick={onClose} // Permet de fermer la modal en cliquant sur le fond
  >
    <div
      className=" bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 w-11/12 max-w-3xl p-6 rounded-lg shadow-lg relative "

     
      onClick={(e) => e.stopPropagation()} // Empêche la propagation du clic à la modal elle-même
    >
      {/* Bouton de fermeture */}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-white hover:text-orange font-bold"
      >
        ✕
      </button>

      <h2 className="text-2xl font-semibold mb-4 text-white text-center">Mon Agenda</h2>


      {/* Conteneur défilable */}
      <div className="max-h-[600px] overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-orangeHover scrollbar-track-lightGray">
        <ul className="space-y-4">
          {courses.length > 0 ? (
            courses.map((course) => (
              <li
                key={course.id}
                className="flex justify-between items-center bg-[#E8E8E8] p-4 rounded-lg shadow hover:shadow-lg hover:bg-[#D6D6D6] transition-all"
              >
                <div>
                  <h3 className="font-bold text-lg text-[#0044CC]">{course.course}</h3>
                  <p className="text-sm text-gray-700">
                    {course.day}, {course.date} à {course.time} - {course.location}
                  </p>
                  <p className="text-sm text-gray-500">Animé par {course.person}</p>
                </div>
                <button
  onClick={() => {
    console.log("ID du cours à supprimer :", course.id);
    cancelCourse(course.id);
  }}
  className="bg-[#FF6600] text-white px-4 py-2 rounded-md shadow hover:bg-[#E65500] hover:shadow-lg transition-all"
>
  Annuler
</button>

              </li>
            ))
          ) : (
            <p className="text-gray-500">Aucun cours disponible dans votre agenda.</p>
          )}
        </ul>
      </div>
    </div>
  </div>
);

  
};

export default AgendaModal;
