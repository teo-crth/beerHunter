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

    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,  // 5 slides visibles sur grands écrans
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
        ]
    };

    const name = 'Guinness';
    const alcoolDegree = '5.5';
    const Type = 'Bière stout';
    const Description = "Guinness est une bière emblématique d'Irlande, célèbre pour sa texture onctueuse et son goût unique qui mélange des notes de malt torréfié et une subtile amertume.";
    const taste = 'Café, chocolat, malt torréfié';

    return (
        <div className="font-sans p-6 m-6 rounded-lg shadow-lg flex flex-col items-center">
            <div className="flex flex-col lg:flex-row lg:items-center mb-16">
                <img
                    src="https://thumbs.dreamstime.com/b/logo-guinness-sur-l-%C3%A9ditorial-d-illustration-de-fond-blanc-le-imprim%C3%A9-vecteur-env-du-livre-est-une-bi%C3%A8re-malt-s%C3%A8che-irlandaise-202270216.jpg"
                    alt="Guinness"
                    className="w-64 h-64 rounded-lg mb-4 lg:mb-0 lg:mr-16"
                />
                <div className="text-center lg:text-left">
                    <h1 className="text-2xl lg:text-3xl text-gray-800 mb-3">{name}</h1>
                    <p className="text-gray-600 mb-2"><strong>Degré d'alcool :</strong> {alcoolDegree}%</p>
                    <p className="text-gray-600 mb-2"><strong>Type :</strong> {Type}</p>
                    <p className="text-gray-600 mb-2">
                        <strong>Description :</strong> {Description}
                    </p>
                    <p className="text-gray-600"><strong>Arômes :</strong> {taste}</p>
                </div>
            </div>

            <h1 className="text-2xl lg:text-3xl text-gray-800 mb-5">Bières similaires</h1>
            <div className="w-full mt-8">
                <Slider {...settings}>
                    {images.map((img, index) => (
                        <div key={index}>
                            <img src={img} alt={`Biere-${index}`} className="w-64 lg:w-80 rounded-lg mx-2" />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default BeerPage;
