require('dotenv').config();
const express = require('express');
const app = express();
const studentRoutes = require('./routes/studentRoutes');
const { sequelize } = require('./config/database')

const PORT = 3000;

app.use(express.json());

app.use(studentRoutes);

app.get('*', (req, res) => {
  res.status(404).json({ error: 'Page non trouvée' });
});

sequelize
  .authenticate()
  .then(() => console.log("Connexion avec la base de données réussie"))
  .catch((err) => {
    console.log(
      "Erreur lors de la connexion à la base de données",
      err.message
    );
  });

app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});