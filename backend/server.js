const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const app = express();
const PORT = 5000; // Port sur lequel le serveur écoute

// ========================
// Middleware
// ========================
app.use(cors()); // Active les CORS pour permettre les requêtes d'autres origines
app.use(express.json()); // Analyse le body des requêtes POST/PUT au format JSON

// ========================
// Configurer Multer pour sauvegarder les images
// ========================
const upload = multer({
  storage: multer.diskStorage({
    destination: 'uploads/', // Dossier de destination
    filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`; // Nom unique
      cb(null, uniqueName);
    },
  }),
});

// ========================
// Routes pour uploader une image
// ========================
app.post('/upload', upload.single('image'), (req, res) => {
  try {
    const filePath = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    console.log('Fichier uploadé avec succès :', filePath); // Affiche l'URL complète
    res.status(200).json({ filePath }); // Retourne l'URL complète
  } catch (error) {
    console.error('Erreur lors de l’upload de l’image :', error);
    res.status(500).send('Erreur lors de l’upload de l’image.');
  }
});


// ========================
// Servir les fichiers statiques (images uploadées)
// ========================
app.use('/uploads', express.static('uploads'));


// ========================
// Chemins des fichiers JSON
// ========================
const dataDir = path.join(__dirname, 'data'); // Dossier contenant les fichiers JSON
const coachesFilePath = path.join(dataDir, 'coaches.json'); // Fichier pour les coachs
const reviewsFilePath = path.join(dataDir, 'reviews.json'); // Fichier pour les reviews
const coursesFilePath = path.join(dataDir, 'courses.json'); // Fichier pour les cours

// ========================
// Fonctions utilitaires
// ========================

// Fonction pour lire un fichier JSON de manière sécurisée
const readJSONFile = (filePath) => {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify([])); // Crée un fichier JSON vide si inexistant
    }
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch (error) {
    console.error(`Erreur lors de la lecture du fichier ${filePath}:`, error);
    return [];
  }
};

// Fonction pour écrire des données dans un fichier JSON
const writeJSONFile = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2)); // Format JSON bien lisible
  } catch (error) {
    console.error(`Erreur lors de l'écriture dans le fichier ${filePath}:`, error);
  }
};

// ========================
// Routes pour les coachs
// ========================

// Récupérer tous les coachs
app.get('/api/coaches', (req, res) => {   try {
   const coaches = readJSONFile(coachesFilePath); // Lecture des coachs depuis le fichier
    res.json(coaches); // Envoi des données au frontend
  } catch (error) {
   console.error('Erreur lors de la récupération des coachs:', error);
   res.status(500).send('Erreur serveur lors de la récupération des coachs.');
   }
});

// Ajouter un nouveau coach
// Dans la route POST /api/coaches
app.post('/api/coaches', (req, res) => {
  try {
    const coaches = readJSONFile(coachesFilePath);
    const newCoach = {
      id: Date.now(), // Génère un ID unique basé sur le timestamp
      ...req.body,
    };
    coaches.push(newCoach);
    writeJSONFile(coachesFilePath, coaches);
    res.status(201).json(newCoach); // Retourne l'annonce ajoutée
  } catch (error) {
    console.error('Erreur lors de l’ajout d’une annonce :', error);
    res.status(500).send('Erreur serveur.');
  }
});


// Recuperer une annonce

app.get('/api/my-coaches/:id', (req, res) => {
  const { id } = req.params;
  try {
    const coaches = readJSONFile(coachesFilePath);
    // Filtrer les coachs par ID utilisateur
    const filteredCoaches = coaches.filter(coach => coach.id == id);
    res.status(200).json(filteredCoaches);
  } catch (error) {
    console.error('Erreur lors de la récupération des annonces:', error);
    res.status(500).send('Erreur serveur lors de la récupération des annonces.');
  }
});

//supprimer une annonce

app.delete("/api/coaches/:coachId", async (req, res) => {
  const { coachId } = req.params;
  try {
    await Coach.findByIdAndDelete(coachId);
    res.status(200).send("Annonce supprimée avec succès.");
  } catch (error) {
    console.error("Erreur :", error);
    res.status(500).send("Erreur lors de la suppression.");
  }
});



// ========================
// Routes pour les reviews
// ========================

// Récupérer toutes les reviews
app.get('/api/reviews', (req, res) => {
  try {
    const reviews = readJSONFile(reviewsFilePath); // Lecture des reviews
    res.json(reviews); // Envoi des données au frontend
  } catch (error) {
    console.error('Erreur lors de la récupération des reviews:', error);
    res.status(500).send('Erreur serveur lors de la récupération des reviews.');
  }
});

// Ajouter une nouvelle review
app.post('/api/reviews', (req, res) => {
  try {
    const reviews = readJSONFile(reviewsFilePath); // Lecture des reviews existantes
    const newReview = {
      id: Date.now(),
      date: new Date().toISOString(),
      ...req.body,
    }; // Création de la review avec un ID unique et la date
    reviews.push(newReview); // Ajout de la review à la liste
    writeJSONFile(reviewsFilePath, reviews); // Sauvegarde dans le fichier JSON
    res.status(201).json(newReview); // Retour de la nouvelle review
  } catch (error) {
    console.error('Erreur lors de l’ajout de la review:', error);
    res.status(500).send('Erreur serveur lors de l’ajout de la review.');
  }
});

// ========================
// Routes pour les cours
// ========================

// Récupérer tous les cours
app.get('/api/courses', (req, res) => {
  try {
    const courses = readJSONFile(coursesFilePath); // Lecture des cours
    if (!courses || !Array.isArray(courses)) {
      throw new Error('Le fichier courses.json est corrompu ou mal formaté.');
    }
    res.json(courses); // Envoi des données au frontend
  } catch (error) {
    console.error('Erreur lors de la récupération des cours:', error.message);
    res.status(500).send('Erreur serveur lors de la récupération des cours.');
  }
});

// Ajouter un cours
app.post('/api/courses', (req, res) => {
  try {
    const courses = readJSONFile(coursesFilePath); // Lecture des cours existants
    const newCourse = { id: Date.now(), ...req.body }; // Création d’un nouveau cours
    courses.push(newCourse); // Ajout à la liste des cours
    writeJSONFile(coursesFilePath, courses); // Sauvegarde dans le fichier JSON
    res.status(201).json(newCourse); // Retour du cours ajouté
  } catch (error) {
    console.error('Erreur lors de l’ajout du cours:', error);
    res.status(500).send('Erreur serveur lors de l’ajout du cours.');
  }
});

// Supprimer un cours par ID
app.delete('/api/courses/:id', (req, res) => {
  const { id } = req.params;

  try {
    const courses = readJSONFile(coursesFilePath); // Lecture des cours existants
    const updatedCourses = courses.filter(course => course.id !== parseInt(id)); // Filtrer les cours en excluant celui à supprimer

    if (courses.length === updatedCourses.length) {
      return res.status(404).send('Cours non trouvé.');
    }

    writeJSONFile(coursesFilePath, updatedCourses); // Sauvegarde des cours mis à jour
    res.status(200).send('Cours supprimé avec succès.');
  } catch (error) {
    console.error('Erreur lors de la suppression du cours:', error);
    res.status(500).send('Erreur serveur lors de la suppression du cours.');
  }
});



// ========================
// Route de test
// ========================
app.get('/', (req, res) => {
  res.send('Serveur backend Node.js en cours d’exécution.');
});

// ========================
// Lancer le serveur
// ========================
app.listen(PORT, () => {
  console.log(`Serveur backend démarré sur http://localhost:${PORT}`);
});
