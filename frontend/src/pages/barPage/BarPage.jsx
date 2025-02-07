import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const BarPage = () => {
    const openingHours = [
        { day: 'Monday', hours: 'Closed' },
        { day: 'Tuesday', hours: '4:00PM - 00:00AM' },
        { day: 'Wednesday', hours: '4:00PM - 00:00AM' },
        { day: 'Thursday', hours: '4:00PM - 1:00AM' },
        { day: 'Friday', hours: '4:00PM - 2:00AM' },
        { day: 'Saturday', hours: '2:00PM - 2:00AM' },
        { day: 'Sunday', hours: '2:00PM - 11:00PM' },
    ];

    const translateOpeningHours = (hours) => {
        const daysTranslation = {
            Monday: 'Lundi', Tuesday: 'Mardi', Wednesday: 'Mercredi',
            Thursday: 'Jeudi', Friday: 'Vendredi', Saturday: 'Samedi', Sunday: 'Dimanche'
        };
        return hours.map(({ day, hours }) => ({
            day: daysTranslation[day] || day,
            hours: hours === 'Closed' ? 'Fermé' : hours
        }));
    };

    const translatedOpeningHours = translateOpeningHours(openingHours);

    const images = [
        "https://thumbs.dreamstime.com/b/logo-guinness-sur-l-%C3%A9ditorial-d-illustration-de-fond-blanc-le-imprim%C3%A9-vecteur-env-du-livre-est-une-bi%C3%A8re-malt-s%C3%A8che-irlandaise-202270216.jpg",
        "https://images.squarespace-cdn.com/content/v1/6409fa08ee63336eeee45782/1678463783648-2EA8HWW6DN3PFBAC3VXZ/carr%C3%A9+blanche.jpg?format=2500w",
        "https://thumbs.dreamstime.com/b/logo-guinness-sur-l-%C3%A9ditorial-d-illustration-de-fond-blanc-le-imprim%C3%A9-vecteur-env-du-livre-est-une-bi%C3%A8re-malt-s%C3%A8che-irlandaise-202270216.jpg",
        "https://images.squarespace-cdn.com/content/v1/6409fa08ee63336eeee45782/1678463783648-2EA8HWW6DN3PFBAC3VXZ/carr%C3%A9+blanche.jpg?format=2500w",
        "https://thumbs.dreamstime.com/b/logo-guinness-sur-l-%C3%A9ditorial-d-illustration-de-fond-blanc-le-imprim%C3%A9-vecteur-env-du-livre-est-une-bi%C3%A8re-malt-s%C3%A8che-irlandaise-202270216.jpg",
        "https://images.squarespace-cdn.com/content/v1/6409fa08ee63336eeee45782/1678463783648-2EA8HWW6DN3PFBAC3VXZ/carr%C3%A9+blanche.jpg?format=2500w",
        "https://thumbs.dreamstime.com/b/logo-guinness-sur-l-%C3%A9ditorial-d-illustration-de-fond-blanc-le-imprim%C3%A9-vecteur-env-du-livre-est-une-bi%C3%A8re-malt-s%C3%A8che-irlandaise-202270216.jpg",
    ];

    const rating = 4;
    const address = "10 Rue des Bons Vivants, 69001 Lyon, France";
    const phoneNumber = "+33 4 78 56 78 90";

    const settings = {
        dots: true, infinite: true, speed: 500, slidesToShow: 5, slidesToScroll: 1, responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
        ]
    };

    const renderStars = (rating) => (
        [...Array(5)].map((_, i) => (
            <span key={i} className={`text-2xl ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
        ))
    );
    const imageBar = 'https://theseum.fr/wp-content/uploads/2022/09/ayers-rock-bar-lyon-1-1.jpg';
    const nomBar = 'Ayers Rock';
    const description = 'Ambiance chaleureuse, bières artisanales et musique animée.';

    return (
        <div className='font-sans m-6 p-6 rounded-lg shadow-lg flex flex-col items-center bg-white'>
            <div className='flex flex-col md:flex-row gap-6 items-center'>
                <img src={imageBar} alt={nomBar} className='w-full md:w-1/3 rounded-lg' />
                <div>
                    <h1 className='text-3xl font-bold'>{nomBar}</h1>
                    <p className='mt-2 text-gray-700'>{description}</p>
                    <div className='mt-2 flex items-center'>
                        <span className='font-bold mr-2'>Note : {rating}/5</span>
                        {renderStars(rating)}
                    </div>
                </div>
            </div>

            <div className='w-full mt-6 flex flex-col md:flex-row gap-6'>
                <div className='w-full md:w-1/3'>
                    <h2 className='text-xl font-bold text-center'>Bières disponibles</h2>
                    <Slider {...settings} className='mt-4'>
                        {images.map((img, index) => (
                            <div key={index} className='flex justify-center'>
                                <img src={img} alt={`Bière-${index}`} className='w-32 h-32 object-cover rounded-lg' />
                            </div>
                        ))}
                    </Slider>
                    <div className='mt-6 text-center'>
                        <h2 className='text-xl font-bold'>Horaires d'ouverture</h2>
                        <ul className='mt-2 text-gray-700'>
                            {translatedOpeningHours.map((item, index) => (
                                <li key={index} className='mt-1'><strong>{item.day} :</strong> {item.hours}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className='w-full md:w-2/3 text-center'>
                    <iframe title='Google Maps' src='https://www.google.com/maps/embed?...' className='w-full h-60 rounded-lg' allowFullScreen loading='lazy'></iframe>
                    <p className='mt-2 text-gray-700'><strong>Adresse :</strong> {address}</p>
                    <p className='text-gray-700'><strong>Téléphone :</strong> {phoneNumber}</p>
                </div>
            </div>

            <div className='flex justify-center gap-4 mt-6'>
                <button className='px-4 py-2 bg-orange-500 text-white rounded-full font-bold hover:bg-orange-600'>Ajoutez Bière</button>
                <button className='px-4 py-2 bg-orange-500 text-white rounded-full font-bold hover:bg-orange-600'>Ajoutez Commentaire</button>
            </div>
        </div>
    );
};

export default BarPage;
