import React, { useState } from "react";

const ProfileModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    pseudo: localStorage.getItem("userPseudo"),
    firstName: localStorage.getItem("userFirstName"),
    lastName: localStorage.getItem("userLastName"),
    address: localStorage.getItem("userAddress"),
    city: localStorage.getItem("userCity"),
    postalCode: localStorage.getItem("userPostalCode"),
    country: localStorage.getItem("userCountry"),
    avatar: localStorage.getItem("userAvatar"),
  });

  const [isEditing, setIsEditing] = useState(false); // État pour gérer le mode édition

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Enregistre les modifications dans `localStorage`
    Object.entries(formData).forEach(([key, value]) => {
      localStorage.setItem(`user${key.charAt(0).toUpperCase() + key.slice(1)}`, value);
    });

    alert("Profil mis à jour avec succès !");
    setIsEditing(false); // Désactive le mode édition après sauvegarde
  };
  

  return (
    <div className=" fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 w-11/12 max-w-lg p-6 rounded-lg relative ">
        {/* Bouton de fermeture */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white hover:text-orange"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-center mb-4 text-white">Mon Profil</h2>

        {/* Avatar */}
        <div className="flex flex-col items-center mb-4">
          <img
            src={formData.avatar || "/images/default-profile.jpg"}
            alt="Avatar"
            className="w-24 h-24 rounded-full object-cover border"
          />
          {isEditing && (
            <>
              <label
                htmlFor="avatarInput"
                className="mt-2 text-white cursor-pointer"
              >
                Modifier la photo
              </label>
              <input
                id="avatarInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </>
          )}
        </div>

        {/* Formulaire */}
        <form>
          <div className="mb-4">
            <label className="block font-semibold text-white">Pseudo</label>
            <input
              type="text"
              name="pseudo"
              value={formData.pseudo}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              disabled={!isEditing} // Désactivé si non en mode édition
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block font-semibold text-white">Prénom</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="block font-semibold text-white">Nom</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                disabled={!isEditing}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block font-semibold text-white ">Adresse</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              disabled={!isEditing}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block font-semibold text-white">Ville</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="block font-semibold text-white">Code Postal</label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                disabled={!isEditing}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block font-semibold text-white">Pays</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              disabled={!isEditing}
            />
          </div>
        </form>

        {/* Boutons Modifier et Sauvegarder */}
        <div className="flex justify-end space-x-4 mt-6">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="bg-orange text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Sauvegarder
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-orange text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Modifier
            </button>
          )}
        
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
