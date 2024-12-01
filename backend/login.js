const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001; // Port utilisé pour login.js
const SECRET_KEY = 'votre_secret_jwt'; // Changez ceci pour une clé plus sécurisée
const USERS_FILE = path.join(__dirname, 'users.json'); // Fichier pour stocker les utilisateurs


// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route d'inscription
app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Charger les utilisateurs existants
    let users = [];
    if (fs.existsSync(USERS_FILE)) {
      users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
    }

    // Vérifier si l'email est déjà utilisé
    if (users.find(user => user.email === email)) {
      return res.status(400).json({ message: 'Email déjà utilisé' });
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Ajouter le nouvel utilisateur
    const newUser = { id: Date.now(), email, password: hashedPassword };
    users.push(newUser);

    // Sauvegarder les utilisateurs dans le fichier
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
});

// Route de connexion
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Charger les utilisateurs existants
    if (!fs.existsSync(USERS_FILE)) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));

    // Vérifier si l'utilisateur existe
    const user = users.find(user => user.email === email);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Mot de passe incorrect' });
    }

    // Générer un token JWT
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({ message: 'Connexion réussie', token });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
});

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Login service running on http://localhost:${PORT}`);
});
