const sharp = require('sharp');
const axios = require('axios');

const GOOGLE_KEY = process.env.GOOGLE_KEY;

const processImage = async (photo_reference) => {
    try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo_reference}&key=${GOOGLE_KEY}`, { responseType: 'arraybuffer' });
        
        const buffer = Buffer.from(response.data, 'binary');
        const resizedBuffer = await sharp(buffer)
            .resize(300) // Redimensionner l'image à 300px de large
            .webp({ quality: 80 }) // Compresser l'image avec une qualité de 80%
            .toBuffer();
        
        return resizedBuffer;
    } catch (error) {
        console.error('Erreur lors du traitement de l\'image:', error);
        throw error;
    }
};

module.exports = { processImage };