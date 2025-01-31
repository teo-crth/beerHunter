import axios from 'axios';

// Base URL de l'API Google Books
const GOOGLE_KEY = import.meta.env.GOOGLE_KEY;

export const fetchGoogleBars = async (latitude, longitude) => {
   // must be location=43.529742,5.447427  (latitude,longitude)
   
    try {
        // Requête avec axios
        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&type=bar&key=${GOOGLE_KEY}`);
        console.log('Bars trouvés depuis l\'API Google:', response.data);
        
        // Ajouter Fonction pour créer des bars dans notre bdd

        // besoin pour la bdd : name, address, latitude, longitude, rate, opening_hours, city_id
        // noms de ces données dans l'api google : name, formatted_address, geometry.location.lat, geometry.location.lng, rating, opening_hours
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des bars:', error);
        throw error;
    }
}

export const fetchBarMainImage = async (photo_reference) => {
    try {
        // Requête avec axios
        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo_reference}&key=${GOOGLE_KEY}`);
        console.log('Image principale du bar trouvée depuis l\'API Google:', response.data);
        
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'image principale du bar:', error);
        throw error;
    }
}