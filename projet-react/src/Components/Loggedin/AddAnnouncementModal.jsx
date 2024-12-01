import React, { useState } from "react";
import axios from "axios";

const AddAnnouncementModal = ({ onClose, onAdd}) => {
  const [formData, setFormData] = useState({
    
    name: "",
    image: null,
    speciality: "",
    age: "",
    description: "",
    schedule: "",
    location: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "price" && value < 0) return; // Empêcher les prix négatifs
    if (name === "age" && value < 0) return; // Empêcher les âges négatifs
    setFormData({ ...formData, [name]: value });
  };

  const handleAddCoach = (newCoach) => {
    // Récupérer les coaches existants dans localStorage ou initialiser avec un tableau vide
    const existingCoaches = JSON.parse(localStorage.getItem("coaches")) || [];
    
    // Ajouter la nouvelle annonce (coach) au tableau existant
    existingCoaches.push(newCoach);
  
    // Sauvegarder à nouveau dans localStorage
    localStorage.setItem("coaches", JSON.stringify(existingCoaches));
  };
  
  
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageData = new FormData();
      imageData.append("image", file); // Le champ `image` doit correspondre à celui attendu par Multer
  
      try {
        const response = await axios.post("http://localhost:5000/upload", imageData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
  
        // Mettre à jour l'état avec le chemin renvoyé par le backend
        setFormData((prevFormData) => ({
          ...prevFormData,
          image: response.data.filePath, // Stocke le chemin de l'image
        }));
      } catch (error) {
        console.error("Erreur lors de l’upload de l’image :", error);
      }
    }
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    
  
    if (
      formData.name &&
      formData.speciality &&
      formData.price &&
      formData.description &&
      formData.age &&
      formData.schedule &&
      formData.location
    ) {
      try {
        // Ajouter userId aux données envoyées
        const dataToSend = { ...formData };
  
        // Envoi des données au backend
        await axios.post("http://localhost:5000/api/coaches", dataToSend);

        // Ajouter la nouvelle annonce dans localStorage
        handleAddCoach(dataToSend);
  
        // Fermer la modal
        onClose();
      } catch (error) {
        console.error("Erreur lors de l'ajout du coach :", error);
        alert("Une erreur s'est produite lors de l'ajout de l'annonce.");
      }
    } else {
      alert("Veuillez remplir tous les champs obligatoires !");
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

        {/* Titre */}
        <h2 className="text-2xl font-bold mb-4 text-center">Ajouter une annonce</h2>

        {/* Formulaire */}
        <form onSubmit={handleSubmit}>
          <div className="flex gap-4">
            {/* Image et Nom */}
            <div className="flex flex-col items-center">
              <label htmlFor="imageUpload" className="cursor-pointer">
              <img
  src={formData.image ? formData.image : "/images/default.jpg"}
  alt="Aperçu"
  className="w-36 h-36 rounded-lg object-cover border-2 border-orange-500"
/>


              </label>
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => document.getElementById("imageUpload").click()} // Ouvre l'input file
                className="mt-2 bg-orange text-white px-3 py-1 rounded-full hover:bg-orange-600"
              >
                Charger une photo
              </button>
            </div>

            {/* Spécialité et Nom */}
            <div className="flex-1 bg-[#dfe7f2] text-black p-4 rounded-lg">
              <div className="mb-4">
                <label className="block mb-1 font-semibold">Nom :</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Nom complet"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border p-2 rounded text-black"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Spécialité :</label>
                <input
                  type="text"
                  name="speciality"
                  placeholder="Spécialité (ex: pilates)"
                  value={formData.speciality}
                  onChange={handleChange}
                  className="w-full border p-2 rounded text-black"
                  required
                />
              </div>
            </div>
          </div>

          {/* Âge */}
          <div className="mt-4">
            <label className="block mb-1 font-semibold">Âge :</label>
            <input
              type="number"
              name="age"
              placeholder="Âge (en années)"
              value={formData.age}
              onChange={handleChange}
              className="w-full border p-2 rounded text-black"
              required
            />
          </div>

          {/* Description */}
          <div className="bg-white p-4 rounded-lg text-black mt-4">
            <label className="block mb-1 font-semibold">Description :</label>
            <textarea
              name="description"
              placeholder="Description du coach"
              value={formData.description}
              onChange={handleChange}
              className="w-full h-24 border p-2 rounded text-black"
              required
            />
          </div>

          {/* Horaires */}
          <div className="mt-4">
            <label className="block mb-1 font-semibold">Horaires :</label>
            <input
              type="text"
              name="schedule"
              placeholder="Ex : Lundi, Mercredi - 18h à 20h"
              value={formData.schedule}
              onChange={handleChange}
              className="w-full border p-2 rounded text-black"
              required
            />
          </div>

          {/* Localisation et Prix */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block mb-1 font-semibold">Localisation :</label>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border p-2 rounded text-black"
                required
              >
                <option value="" disabled>
                  Sélectionnez une localisation
                </option>
                <option value="Bruxelles">Bruxelles</option>
                <option value="Molenbeek">Molenbeek</option>
                <option value="Jette">Jette</option>
                <option value="Evere">Evere</option>
                <option value="Anderlecht">Anderlecht</option>
                <option value="Ixelles">Ixelles</option>
                <option value="Uccle">Uccle</option>
                <option value="Schaerbeek">Schaerbeek</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 font-semibold">Prix (€) :</label>
              <input
                type="number"
                name="price"
                placeholder="Prix"
                value={formData.price}
                onChange={handleChange}
                className="w-full border p-2 rounded text-black"
                required
              />
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-orange text-white px-4 py-2 rounded-full hover:bg-orange-600"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="bg-orange text-white px-4 py-2 rounded-full hover:bg-orange-600"
            >
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAnnouncementModal;
