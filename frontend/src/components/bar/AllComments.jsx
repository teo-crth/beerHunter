import React, { useEffect, useState } from 'react';
import ReactStars from 'react-stars';
import dayjs from 'dayjs';
import { fetchCommentsOfOneBar } from '../../api/user_comments/commentsCrud';
import { fetchOneUser } from '../../api/user/oneUserCrud';
import { fetchOneBar } from '../../api/bar/barsCrud';
import { fetchImagesOfOneComment } from '../../api/user_comments/imagesCommentCrud';
const BASE_URL = import.meta.env.VITE_BACKEND_URL;


const AllComments = ({ barId }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const commentsData = await fetchCommentsOfOneBar(barId);
                
                await Promise.all(commentsData.map(async (comment) => {
                    if (!comment.bar) {
                        const bar = await fetchOneBar(comment.bar_id);
                        comment.bar = bar;
                    }
                    
                    if (comment.comment_image_id) {
                        const commentImage = await fetchImagesOfOneComment(comment.id);
                        comment.commentImage = commentImage;
                    } else {
                        comment.commentImage = null;
                    }

                    const userData = await fetchOneUser(comment.user_id);
                    comment.user_name = userData.username;
                    comment.user_profil_picture = userData.profil_picture;
                }));

                setComments(commentsData);
            } catch (error) {
                console.error('Erreur lors de la récupération des commentaires:', error);
            }
        }

        if (barId) {
            fetchComments();
        }

    }, [barId]);

    if (!comments || comments.length === 0) return null;

    console.log('comments', comments);
    
    return (
        <div className='flex flex-col w-full justify-center items-center'>
            <h3 className='font-title font-bold text-light light-mode:text-dark-black text-center text-2xl lg:text-left'>Les Avis ({comments.length})</h3>
            <div className={ comments?.length === 1 ? 'container-comments flex items-center justify-center w-full gap-2 m-2 font-text p-2 flex-nowrap overflow-x-scroll' : 'container-comments flex items-center justify-start w-full gap-2 m-2 font-text p-2 flex-nowrap overflow-x-scroll'}>
                {comments && comments.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((comment) => (
                    <div key={comment.id} className='container-comment-Card flex flex-wrap w-[95%] md:w-[30%] lg:w-[30%] xl:w-[30%]  items-start rounded-lg border-2 border-primary shadow-md flex-shrink-0'>
                        { comment?.commentImage ? 
                            <div className="container-img w-full md:w-1/3 lg:w-1/3 rounded-l-lg">
                                <img src={`${BASE_URL}${comment?.commentImage[0].image_link}`} alt="Photo de commentaire" className='w-full h-40' />
                            </div>
                            : null
                        }
                        <div className={ comment?.commentImage ? "container-info rounded-md flex flex-col w-full md:w-2/3 lg:w-2/3 bg-dark-black light-mode:bg-light" : "container-info flex flex-col w-full rounded-md bg-dark-black light-mode:bg-light"}>
                            <header className="infos flex justify-between items-center w-full p-1">
                                <p className='font-bold text-light light-mode:text-dark-black'>{comment.bar?.name}</p>
                                <div className="flex items-center gap-2">
                                    <p className='text-xs text-light light-mode:text-dark-black'>{comment?.user_name}</p>
                                    <div className="container-img w-8 rounded-full border border-primary">
                                        <img src={`${BASE_URL}${comment?.user_profil_picture}`} alt="Photo de profil" className='w-full rounded-full' />
                                    </div>
                                </div>
                            </header>       
                            <div className='w-full flex flex-col justify-center items-center h-full p-1 bg-secondary'>
                                <p className='text-light light-mode:text-dark-black p-2 font-title text-justify m-2 text-md w-[95%] h-20 overflow-x-scroll border-1 border-light rounded-2xl'>{comment?.text}</p>
                                <p className='text-light light-mode:text-dark-black text-sm'>{dayjs(comment?.created_at).format("DD-MM-YYYY")}</p>
                                <div className='container-rating flex items-center justify-center gap-2'>
                                    <span className='font-bold font-text text-md text-light light-mode:text-dark-black'>
                                        Note : {comment?.rate}/5
                                    </span>
                                    <ReactStars
                                        count={5}
                                        value={comment?.rate}
                                        size={24}
                                        activeColor="#FEC514"
                                        edit={false}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllComments;