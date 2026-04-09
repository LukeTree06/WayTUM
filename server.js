const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const MVG_BASE = 'https://www.mvg.de/api/bgw-pt/v3';

app.use(express.static(path.join(__dirname, 'public')));

// Proxy MVG API to avoid CORS issues
app.get('/api/locations', async (req, res) => {
  try {
    const params = new URLSearchParams(req.query);
    const response = await fetch(`${MVG_BASE}/locations?${params}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch locations' });
  }
});

app.get('/api/departures', async (req, res) => {
  try {
    const params = new URLSearchParams(req.query);
    const response = await fetch(`${MVG_BASE}/departures?${params}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch departures' });
  }
});

app.get('/api/routes', async (req, res) => {
  try {
    const params = new URLSearchParams(req.query);
    const response = await fetch(`${MVG_BASE}/routes?${params}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch routes' });
  }
});

app.get('/api/stations/nearby', async (req, res) => {
  try {
    const params = new URLSearchParams(req.query);
    const response = await fetch(`${MVG_BASE}/stations/nearby?${params}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch nearby stations' });
  }
});

app.listen(PORT, () => {
  console.log(`WayTUM running at http://localhost:${PORT}`);
});
