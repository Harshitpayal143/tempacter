// Simple Node.js server for demonstration
// Run with: node server.js
// Then open index.html in your browser

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Mock data storage
let mockData = {
    temperature: 22.5,
    latitude: 40.7128,
    longitude: -74.0060,
    lastUpdate: new Date().toISOString()
};

// Routes
app.get('/api/temperature', (req, res) => {
    // Simulate temperature fluctuation
    mockData.temperature += (Math.random() - 0.5) * 2;
    mockData.temperature = Math.max(15, Math.min(35, mockData.temperature));
    mockData.lastUpdate = new Date().toISOString();
    
    res.json({
        temperature: mockData.temperature.toFixed(1),
        unit: '°C',
        timestamp: mockData.lastUpdate
    });
});

app.get('/api/position', (req, res) => {
    // Simulate small position changes
    mockData.latitude += (Math.random() - 0.5) * 0.001;
    mockData.longitude += (Math.random() - 0.5) * 0.001;
    mockData.lastUpdate = new Date().toISOString();
    
    res.json({
        latitude: mockData.latitude.toFixed(6),
        longitude: mockData.longitude.toFixed(6),
        timestamp: mockData.lastUpdate
    });
});

app.get('/api/all', (req, res) => {
    res.json({
        temperature: mockData.temperature.toFixed(1),
        latitude: mockData.latitude.toFixed(6),
        longitude: mockData.longitude.toFixed(6),
        timestamp: mockData.lastUpdate
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log('Available endpoints:');
    console.log('  GET /api/temperature - Get current temperature');
    console.log('  GET /api/position - Get current position');
    console.log('  GET /api/all - Get all data');
    console.log('  GET / - Serve the HTML file');
});
