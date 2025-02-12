const axios = require('axios');
const { config } = require('dotenv');

config({ path: '.env' });

const GOOGLE_KEY = process.env.GOOGLE_KEY;

const browse = async (req, res) => {
    const { latitude, longitude } = req.query;
   
    try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=bar&key=${GOOGLE_KEY}`);
        res.send(response.data.results);
    } catch (error) {
        console.error('Error fetching data from Google API:', error);
        res.status(500).json({ error: 'Error fetching places' });
    }
};

const readPhoto = async (req, res) => {
    const { photo_reference } = req.query;

    try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo_reference}&key=${GOOGLE_KEY}`);       
        res.send(response.data);
    } catch (error) {
        console.error('Error fetching data from Google API:', error);
        res.status(500).json({ error: 'Error fetching photo' });
    }
}

module.exports = { browse, readPhoto };