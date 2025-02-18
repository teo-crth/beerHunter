import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Slider from 'react-slick';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import ReactStars from 'react-stars';
import { translatedOpeningHours } from '../../services/translateOpeningHours';
import { fetchBeersAvailableForOneBar } from '../../api/beer/beersAvailableInBar';
import '../../../node_modules/slick-carousel/slick/slick.css';
import '../../../node_modules/slick-carousel/slick/slick-theme.css';

const BarPage = () => {
    const BASE_URL = import.meta.env.VITE_BACKEND_URL;
    const GOOGLE_KEY = import.meta.env.VITE_GOOGLE_KEY;  
    const { id } = useParams();
    const location = useLocation();
    const barObject = location.state;
    
    const [bar, setBars] = useState(barObject);
    const [beersAvailable, setBeersAvailable] = useState([]);
    const [googleLoaded, setGoogleLoaded] = useState(false);

    useEffect(() => {
        const fetchBeers = async () => {
            await fetchBeersAvailableForOneBar(id)
            .then(beers => setBeersAvailable(beers))
            .catch(error => console.error(error));
        }

        fetchBeers();
    }, []);

    // Callback appelé lorsque le script Google Maps est chargé
    const handleScriptLoad = () => {
        setGoogleLoaded(true);
    };

    const openingHours = translatedOpeningHours(bar.opening_hours);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1
    };

    const lienMapsBar = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886.8726415578477!2d4.828161076524192!3d45.764043679105226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f4ebdd46e4b257%3A0x39c2331b8dcff1d6!2sAyers%20Rock!5e0!3m2!1sfr!2sfr!4v1617063968425!5m2!1sfr!2sfr';

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', margin: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6em' }}>
                <img
                    src={`${BASE_URL}${bar.bar_picture}`}
                    alt={`photo ${bar.name}`}
                    style={{ width: '50em', height: '30em', borderRadius: '1em', marginRight: '4em' }}
                />
                <div>
                    <h1 style={{ margin: '0 0 10px', color: '#333' }}>{bar.name}</h1>
                    <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
                        <span style={{ color: '#333', fontWeight: 'bold', marginRight: '10px' }}>
                            Note : {bar.rate}/5
                        </span>
                        <ReactStars
                            count={5}
                            value={bar.rate}
                            size={24}
                            activeColor="#FEC514"
                            edit={false}
                        />
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', width: '100%', marginTop: '2em' }}>
                <div style={{ width: '40%', textAlign: 'center' }}>
                    <h1 style={{ margin: '0', color: '#333', marginBottom: '1em' }}>Bières disponibles</h1>
                    <div style={{ width: '100%', alignItems: 'center' }}>
                        <Slider {...settings}>
                            {beersAvailable.length > 0 && beersAvailable.map((beer, index) => (
                                <div key={index}>
                                    <img src={`${BASE_URL}${beer.image_link}`} alt={`Biere-${index}`} style={{ width: '10em', borderRadius: '1em', alignItems: 'center' }} />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>

                <div style={{ width: '30%', marginLeft: 'auto' }}>
                    <LoadScript googleMapsApiKey={GOOGLE_KEY} onLoad={handleScriptLoad}>
                        <GoogleMap
                            mapContainerStyle={{width: '100%', height: '300px'}}
                            center={{ lat: bar.latitude, lng: bar.longitude }}
                            zoom={18}
                            onLoad={(map) => {
                                if (googleLoaded) {
                                    const marker = new google.maps.marker.AdvancedMarkerElement({
                                      position: { lat: bar.latitude, lng: bar.longitude },
                                      map: map,
                                    });
                                  }
                            }}
                        >                        
                        </GoogleMap>
                    </LoadScript>
                    <div style={{ marginTop: '1em', color: '#333', textAlign: 'center' }}>
                        <p className='font-text text-sm'><strong>Adresse : </strong>{bar.address}</p>
                        <p className='font-text text-sm'><strong>Téléphone : </strong>{bar.phone_number}</p>
                        <a href={bar.website} target='blank' className='font-text text-sm text-blue-600 underline'>Site internet</a>
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginTop: '2em' }}>
                <div style={{ width: '40%' }}>
                    <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '1em' }}>Horaires d'ouverture</h1>
                    <ul style={{ listStyleType: 'none', padding: 0, textAlign: 'center', color: '#666' }}>
                        {openingHours.map((item, index) => (
                            <li key={index} style={{ marginBottom: '5px' }}>
                                <strong>{item.day} :</strong> {item.hours}
                            </li>
                        ))}
                    </ul>
                </div>

                <div style={{ width: '60%', textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '10px', marginRight: 'auto' }}>
                    <button style={{
                        padding: '10px 20px',
                        backgroundColor: '#FFA500',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '25px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}>
                        Ajoutez Bière
                    </button>
                    <button style={{
                        padding: '10px 20px',
                        backgroundColor: '#FFA500',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '25px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}>
                        Ajoutez Commentaire
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BarPage;
