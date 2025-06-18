const express = require('express');
const router = express.Router();
const axios = require('axios');
const { cacheResponse, getCachedResponse } = require('../utils/cache');

router.post('/', async (req, res) => {
    const { description } = req.body;
    const cacheKey = `geocode_${description}`;
    const cached = await getCachedResponse(cacheKey);
    if (cached) return res.json(cached);

    try {
        // Gemini API call to extract location (mock example)
        const locationName = 'Manhattan, NYC'; // Replace with actual Gemini API call

        // Mapbox Geocoding API example
        const mapboxRes = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(locationName)}.json?access_token=${process.env.MAPBOX_API_KEY}`);
        const coords = mapboxRes.data.features[0].center;

        const result = { locationName, latitude: coords[1], longitude: coords[0] };

        await cacheResponse(cacheKey, result);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
