import React from 'react';
import Slider from 'react-slick';
import '../../../node_modules/slick-carousel/slick/slick.css';
import '../../../node_modules/slick-carousel/slick/slick-theme.css';

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
            Monday: 'Lundi',
            Tuesday: 'Mardi',
            Wednesday: 'Mercredi',
            Thursday: 'Jeudi',
            Friday: 'Vendredi',
            Saturday: 'Samedi',
            Sunday: 'Dimanche'
        };

        return hours.map(({ day, hours }) => ({
            day: daysTranslation[day] || day,
            hours: hours === 'Closed' ? 'Fermé' : convertTo24HourFormat(hours)
        }));
    };

    const convertTo24HourFormat = (timeRange) => {
        const convert = (time) => {
            const [hour, modifier] = time.split(/(?<=\d)(AM|PM)/i);
            let [hours, minutes] = hour.split(':').map(Number);

            if (modifier.toUpperCase() === 'PM' && hours < 12) hours += 12;
            if (modifier.toUpperCase() === 'AM' && hours === 12) hours = 0;

            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        };

        const [start, end] = timeRange.split(' - ');
        return `${convert(start)} - ${convert(end)}`;
    };

    const translatedOpeningHours = translateOpeningHours(openingHours);

    const images = [
        "https://thumbs.dreamstime.com/b/logo-guinness-sur-l-%C3%A9ditorial-d-illustration-de-fond-blanc-le-imprim%C3%A9-vecteur-env-du-livre-est-une-bi%C3%A8re-malt-s%C3%A8che-irlandaise-202270216.jpg",
        "https://images.squarespace-cdn.com/content/v1/6409fa08ee63336eeee45782/1678463783648-2EA8HWW6DN3PFBAC3VXZ/carr%C3%A9+blanche.jpg?format=2500w",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-QV1NhER3k-Q61-Xs9oJb7M43tuePteX7rL_e2oAUM2HddEs5Uf4TEpiaSkvyh5r9YaM&usqp=CAU",
        "https://i.pinimg.com/736x/59/32/6f/59326f0a35c1d851e0d56690970fcccc.jpg",
        "https://www.brasserieartisanaleduder.fr/wp-content/uploads/2024/10/bragarde.jpg",
    ];

    const rating = 4;

    const address = "10 Rue des Bons Vivants, 69001 Lyon, France";
    const phoneNumber = "+33 4 78 56 78 90";

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1
    };

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<span key={i} style={{ color: '#FFD700', fontSize: '1.5em' }}>★</span>);
            } else {
                stars.push(<span key={i} style={{ color: '#ddd', fontSize: '1.5em' }}>★</span>);
            }
        }
        return stars;
    };
    const nomBar = 'Ayers Rock';
    const descriptionBar = 'Description : Ayers Rock est un bar emblématique, parfait pour passer une soirée conviviale entre amis. Avec son ambiance chaleureuse, ses bières artisanales et une sélection musicale animée, c’est l’endroit idéal pour se détendre et profiter d’un bon moment.';
    const lienMapsBar = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886.8726415578477!2d4.828161076524192!3d45.764043679105226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f4ebdd46e4b257%3A0x39c2331b8dcff1d6!2sAyers%20Rock!5e0!3m2!1sfr!2sfr!4v1617063968425!5m2!1sfr!2sfr';

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', margin: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6em' }}>
                <img
                    src="https://theseum.fr/wp-content/uploads/2022/09/ayers-rock-bar-lyon-1-1.jpg"
                    alt="Ayers rock"
                    style={{ width: '50em', height: '30em', borderRadius: '1em', marginRight: '4em' }}
                />
                <div>
                    <h1 style={{ margin: '0 0 10px', color: '#333' }}>{nomBar}</h1>
                    <p style={{ margin: '5px 0', color: '#666' }}>
                        {descriptionBar}
                    </p>
                    <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
                        <span style={{ color: '#333', fontWeight: 'bold', marginRight: '10px' }}>
                            Note : {rating}/5
                        </span>
                        {renderStars(rating)}
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', width: '100%', marginTop: '2em' }}>
                <div style={{ width: '40%', textAlign: 'center' }}>
                    <h1 style={{ margin: '0', color: '#333', marginBottom: '1em' }}>Bières disponibles</h1>
                    <div style={{ width: '100%', alignItems: 'center' }}>
                        <Slider {...settings}>
                            {images.map((img, index) => (
                                <div key={index}>
                                    <img src={img} alt={`Biere-${index}`} style={{ width: '10em', borderRadius: '1em', alignItems: 'center' }} />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>

                <div style={{ width: '30%', marginLeft: 'auto' }}>
                    <iframe
                        title="Google Maps"
                        src={lienMapsBar}
                        width="100%"
                        height="300px"
                        style={{ border: '0', borderRadius: '8px' }}
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>
                    <div style={{ marginTop: '1em', color: '#333', textAlign: 'center' }}>
                        <p><strong>Adresse :</strong> {address}</p>
                        <p><strong>Téléphone :</strong> {phoneNumber}</p>
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginTop: '2em' }}>
                <div style={{ width: '40%' }}>
                    <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '1em' }}>Horaires d'ouverture</h1>
                    <ul style={{ listStyleType: 'none', padding: 0, textAlign: 'center', color: '#666' }}>
                        {translatedOpeningHours.map((item, index) => (
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
