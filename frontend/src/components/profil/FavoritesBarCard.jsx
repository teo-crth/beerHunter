import React from 'react';
import Bar from '../bar/Bar';

const FavoritesBarCard = ({ user }) => {   
    if (!user?.favoritesBars || user?.favoritesBars.length === 0) return null;

    return (
        <div className='container-favoriteBar flex flex-col w-full justify-center items-center'>
            <h3 className='font-title font-bold text-light light-mode:text-dark-black text-center text-2xl lg:text-left'>Vos bars favoris</h3>
            <div className={ user?.favoritesBars.length === 1 ? 'favoriteBar-card flex flex-nowrap justify-center items-center gap-2 p-2 w-full overflow-x-scroll' : 'favoriteBar-card flex flex-nowrap justify-start items-center gap-2 p-2 w-full overflow-x-scroll'}>
                {user.favoritesBars.map(bar => (
                    <Bar key={bar.id} bar={bar} />
                ))}
            </div>
        </div>
    );
};

export default FavoritesBarCard;