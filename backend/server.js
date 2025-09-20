// backend/server.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

// fake data until Mongo is added
const data = [
  { title: "Belagavi Fort", description: "Historic fort in the city center." },
  { title: "Gokak Falls", description: "Niagara of Karnataka, stunning waterfall." },
  { title: "Belagavi Kunda", description: "Iconic sweet dish of Belagavi." }
];

// search route
app.get('/api/search', (req, res) => {
  const q = (req.query.q || "").toLowerCase();
  const results = data.filter(item =>
    item.title.toLowerCase().includes(q) ||
    item.description.toLowerCase().includes(q)
  );
  res.json(results);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));