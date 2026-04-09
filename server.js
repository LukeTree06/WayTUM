const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const MVG_BASE = 'https://www.mvg.de/api/bgw-pt/v3';

app.use(express.static(path.join(__dirname, 'public')));

// 1. Define allowed endpoints to secure your proxy
const ALLOWED_ENDPOINTS = [
  'locations', 
  'departures', 
  'routes', 
  'stations/nearby'
];

// 2. Use a wildcard route to catch all /api/ requests
app.get('/api/*', async (req, res) => {
  // req.params[0] captures whatever matches the '*' in the route path
  const endpoint = req.params[0]; 

  // 3. Block any requests that aren't in your allowlist
  if (!ALLOWED_ENDPOINTS.includes(endpoint)) {
    return res.status(404).json({ error: 'Endpoint not found' });
  }

  try {
    const params = new URLSearchParams(req.query);
    const response = await fetch(`${MVG_BASE}/${endpoint}?${params}`);
    
    // Add a check in case the upstream MVG API goes down or errors out
    if (!response.ok) {
        throw new Error(`Upstream API responded with status: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(`Proxy Error (${endpoint}):`, err.message);
    
    // Format the error message dynamically (e.g., "stations/nearby" -> "stations nearby")
    const formattedEndpoint = endpoint.replace('/', ' ');
    res.status(500).json({ error: `Failed to fetch ${formattedEndpoint}` });
  }
});

app.listen(PORT, () => {
  console.log(`WayTUM running at http://localhost:${PORT}`);
});