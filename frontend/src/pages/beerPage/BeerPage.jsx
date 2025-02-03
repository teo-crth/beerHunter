import React from 'react';
import Slider from 'react-slick';
import '../../../node_modules/slick-carousel/slick/slick.css';
import '../../../node_modules/slick-carousel/slick/slick-theme.css';


const BeerPage = () => {
    const images = [
        "https://thumbs.dreamstime.com/b/logo-guinness-sur-l-%C3%A9ditorial-d-illustration-de-fond-blanc-le-imprim%C3%A9-vecteur-env-du-livre-est-une-bi%C3%A8re-malt-s%C3%A8che-irlandaise-202270216.jpg",
        "https://images.squarespace-cdn.com/content/v1/6409fa08ee63336eeee45782/1678463783648-2EA8HWW6DN3PFBAC3VXZ/carr%C3%A9+blanche.jpg?format=2500w",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-QV1NhER3k-Q61-Xs9oJb7M43tuePteX7rL_e2oAUM2HddEs5Uf4TEpiaSkvyh5r9YaM&usqp=CAU",
        "https://i.pinimg.com/736x/59/32/6f/59326f0a35c1d851e0d56690970fcccc.jpg",
        "https://www.brasserieartisanaleduder.fr/wp-content/uploads/2024/10/bragarde.jpg",
        "https://thumbs.dreamstime.com/b/logo-guinness-sur-l-%C3%A9ditorial-d-illustration-de-fond-blanc-le-imprim%C3%A9-vecteur-env-du-livre-est-une-bi%C3%A8re-malt-s%C3%A8che-irlandaise-202270216.jpg",
        "https://images.squarespace-cdn.com/content/v1/6409fa08ee63336eeee45782/1678463783648-2EA8HWW6DN3PFBAC3VXZ/carr%C3%A9+blanche.jpg?format=2500w",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-QV1NhER3k-Q61-Xs9oJb7M43tuePteX7rL_e2oAUM2HddEs5Uf4TEpiaSkvyh5r9YaM&usqp=CAU",
        "https://i.pinimg.com/736x/59/32/6f/59326f0a35c1d851e0d56690970fcccc.jpg",
        "https://www.brasserieartisanaleduder.fr/wp-content/uploads/2024/10/bragarde.jpg"
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1
    };
    const name = 'Guinness';
    const alcoolDegree = '5.5';
    const Type = 'Bière stout';
    const Description = "Guinness est une bière emblématique d'Irlande, célèbre pour sa texture onctueuse et son goût unique qui mélange des notes de malt torréfié et une subtile amertume.";
    const taste = 'Café, chocolat, malt torréfié';


    return (
        <div style={{ fontFamily: 'Arial, sans-serif', margin: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6em' }}>
                <img
                    src="https://thumbs.dreamstime.com/b/logo-guinness-sur-l-%C3%A9ditorial-d-illustration-de-fond-blanc-le-imprim%C3%A9-vecteur-env-du-livre-est-une-bi%C3%A8re-malt-s%C3%A8che-irlandaise-202270216.jpg"
                    alt="Guinness"
                    style={{ width: '30em', height: '30em', borderRadius: '1em', marginRight: '4em' }}
                />
                <div>
                    <h1 style={{ margin: '0 0 10px', color: '#333' }}>{name}</h1>
                    <p style={{ margin: '10px 0', color: '#666' }}><strong>Degré d'alcool :</strong> {alcoolDegree}%</p>
                    <p style={{ margin: '5px 0', color: '#666' }}><strong>Type :</strong> {Type}</p>
                    <p style={{ margin: '5px 0', color: '#666' }}>
                        Description : {Description}
                    </p>
                    <p style={{ margin: '5px 0', color: '#666' }}><strong>Arômes :</strong> {taste}</p>
                </div>
            </div>
            <h1 style={{ margin: '0 0 10px', color: '#333' }}>Bières similaires</h1>
            <div style={{ width: '100%', marginTop: '2em' }}>
                <Slider {...settings}>
                    {images.map((img, index) => (
                        <div key={index}>
                            <img src={img} alt={`Biere-${index}`} style={{ width: '20em', borderRadius: '1em', margin: '0 1em' }} />

                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default BeerPage;
