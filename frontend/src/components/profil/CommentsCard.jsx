import React from 'react';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const CommentsCard = ({ user }) => {
    if (!user?.comments) return null;

    return (
        <div className='flex flex-col w-full justify-center items-center'>
            <h3 className='font-title font-bold text-light light-mode:text-dark-black text-center lg:text-left'>Vos Commentaires</h3>
            <div className='container-comments flex w-full rounded-md shadow-md gap-2 m-2 overflow-hidden font-text'>
                {user.comments && user.comments.map((comment) => (
                    <div key={comment.id} className='container-comment-Card flex flex-wrap w-full bg-dark-black items-start light-mode:bg-primary rounded-lg'>
                        { comment.commentImage ? 
                            <div className="container-img w-full md:w-1/3 lg:w-1/3 rounded-l-lg">
                                <img src={`${BASE_URL}${comment.commentImage[0].image_link}`} alt="Photo de commentaire" className='w-full h-40' />
                            </div>
                            : null
                        }
                        <div className={ comment.commentImage ? "container-info flex flex-col w-full md:w-2/3 lg:w-2/3" : "container-info flex flex-col w-full"}>
                            <header className="infos flex justify-between items-center w-full p-1">
                                <p className='font-bold text-light light-mode:text-dark-black'>Nom du bar</p>
                                <div className="flex items-center gap-2">
                                    <p className='text-xs text-light light-mode:text-dark-black'>{user.name}</p>
                                    <div className="container-img w-8 rounded-full border border-primary">
                                        <img src={`${BASE_URL}${user?.profil_picture}`} alt="Photo de profil" className='w-full rounded-full' />
                                    </div>
                                </div>
                            </header>       
                            <main className='w-full flex justify-center items-center h-full p-1'>
                                <p className='text-light light-mode:text-dark-black p-2 text-justify m-2 text-sm w-full h-20 overflow-x-scroll'>{comment.text}</p>
                            </main>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentsCard;