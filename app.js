require('dotenv').config();
const express = require('express');
const app = express();

const PORT = 3000;

app.use(express.json());

app.get('*', (req, res) => {
  res.status(404).json({ error: 'Page non trouvée' });
});

app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});