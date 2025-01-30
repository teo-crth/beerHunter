import React from 'react';

const CommentsCard = ({ user }) => {
    return (
        <div className='flex flex-col w-full'>
            <h3 className='font-title font-bold text-light light-mode:text-dark-black text-center lg:text-left'>Vos Commentaires</h3>
            <div className='flex flex-col w-full bg-dark-black light-mode:bg-light gap-2'>

            </div>
        </div>
    );
};

export default CommentsCard;