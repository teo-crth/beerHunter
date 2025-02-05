import React from 'react';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const CommentsCard = ({ user }) => {
    if (!user?.comments) return null;

    return (
        <div className='flex flex-col w-full justify-center items-center'>
            <h3 className='font-title font-bold text-light light-mode:text-dark-black text-center lg:text-left'>Vos Commentaires</h3>
            <div className='flex w-full bg-dark-black light-mode:bg-light rounded-md shadow-md gap-2 m-2 overflow-scroll font-text'>
                {user.comments && user.comments.map((comment) => (
                    <div key={comment.id} className='flex flex-col w-full bg-dark-black items-start light-mode:bg-light p-2 rounded-lg bg-[url(`${comment.image}`)]'>
                        <header className="infos flex justify-between items-center w-full">
                            <p className='font-bold text-light light-mode:text-dark-black'>Nom du bar</p>
                            <div className="flex items-center gap-2">
                                <p className='text-xs text-light light-mode:text-dark-black'>{user.name}</p>
                                <div className="container-img w-8 rounded-full border border-primary">
                                    <img src={`${BASE_URL}${user?.profil_picture}`} alt="Photo de profil" className='w-full rounded-full' />
                                </div>
                            </div>
                        </header>
                        <p className='text-light light-mode:text-dark-black'>{comment.content}</p>
                        <p className='text-light light-mode:text-dark-black'>{comment.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentsCard;