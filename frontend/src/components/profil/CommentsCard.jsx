import React from 'react';

const CommentsCard = ({ user }) => {

    
    return (
        <div className='flex flex-col w-full'>
            <h3 className='font-title font-bold text-light light-mode:text-dark-black text-center lg:text-left'>Vos Commentaires</h3>
            <div className='flex w-full bg-dark-black light-mode:bg-light rounded-md shadow-md gap-2 m-2 overflow-scroll'>
                {user.comments && user.comments.map((comment) => (
                    <div key={comment.id} className='flex flex-col w-full bg-dark-black items-start light-mode:bg-light p-2 rounded-lg'>
                        <p className='text-light light-mode:text-dark-black'>{comment.content}</p>
                        <p className='text-light light-mode:text-dark-black'>{comment.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentsCard;