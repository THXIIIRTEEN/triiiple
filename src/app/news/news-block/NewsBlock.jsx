"use client"

//SERVER FUNCTIONS

import { useStore } from "@/app/authorization/data-utils/zustand-functions";
import { postUtils } from "../data-functions/postFunction";

//CLIENT FUNCTIONS

import { deletePost, likeFunction, postNewComment, showComment } from "../news-client-functions/news-client-functions";
import { formateDate } from "../news-client-functions/date-formatted";

//STYLES

import Styles from "./NewsBlock.module.css";

//COMPONENTS

import Comment from "../comment/Comment";

//REACT IMPORTS

import { useEffect, useRef, useState } from "react";
import Link from "next/link"

export default function NewsBlock(props) {

    const [ dateFormatted, setDateFormatted ] = useState(new Date());
    const [ dateToday, setDateToday ] = useState(new Date());
    const [ show, setShow ] = useState(false);
    const [ active, setActive ] = useState(false);
    const [ likes, setLikes ] = useState(props.likes);
    const [ commentError, setCommentError ] = useState(false);
    const [ post, setPost ] = useState(props);
    const [ validContent, setValidContent ] = useState(true)

    const user = useStore().user;
    const commentInput = useRef(null);
    const commentForm = useRef(null);

    useEffect(() => {
        formateDate(props, setDateFormatted, setDateToday)
    }, [])

    useEffect(() => {
        if (props != null) {
            setPost(props)
        }
    }, [props])

    useEffect(() => {
        const getResult = async () => {
            const result = await postUtils.checkLike(user._id, props._id);
            if (!result) {
                setActive(false)
            }

            if (result) {
                setActive(true)
            }
        }
        getResult(user._id)
    }, []);

    useEffect(() => {
        if (validContent === false) {
            commentForm.current.classList.add('error-block')
        }
    }, [validContent])
    
    if (user) {
        return (
            <div className={Styles["news-block_background"]}>
                <div className={Styles["news-block_top"]}>
                    <div className={Styles["news-block_user"]}>
                        <div className={Styles['news-block_profile__background']}>                
                            <Link href={`/profile/${props.author.username}`}>
                                {   post.author.profile === null ?
                                    <img src="/images/profile/profile_picture.png" alt="profile"/> :
                                    <img src={post.author.profile}/>
                                }
                            </Link>
                        </div>
        
                        <div className={Styles["new-block_top__user"]}>
                            <h6>{post.author.username}</h6>
                            { dateFormatted.day != dateToday.day && dateFormatted.day != dateToday.day - 1 &&
                                `${dateFormatted.day}.${dateFormatted.month}.${dateFormatted.year}, ${dateFormatted.hour}:${dateFormatted.minutes}`            
                            }
                            {dateFormatted.day === dateToday.day - 1 && dateFormatted.month === dateToday.month && dateFormatted.year === dateToday.year &&
                                `Вчера, ${dateFormatted.hour}:${dateFormatted.minutes}`
                            }
                            { dateFormatted.day === dateToday.day && dateFormatted.month === dateToday.month && dateFormatted.year === dateToday.year &&
                                `Сегодня, ${dateFormatted.hour}:${dateFormatted.minutes}`
                            }
                        </div>
                    </div>
                    { user.username === props.author.username &&
                        <button className={Styles["delete-button"]} onClick={(event) => {deletePost(event, props)}}>
                            <img className={Styles["delete-button_image"]} src={"/images/new-block/trash_can.svg"}/>
                        </button>
                    }
                </div>

                {   post.picture != null &&
                    <img src={post.picture} className={Styles["news-block_banner"]}/>
                }

                {   post.picture != null &&
                    <p className={Styles["new-block_text"]}>
                        {post.text}
                    </p>
                }

                {   post.picture === null &&
                    <p className={Styles["new-block_text__large"]}>
                        {post.text}
                    </p>
                }
    
                <div className={Styles["new-block_buttons"]}>
                    <button onClick={() => {likeFunction(user, props, setActive, setLikes, likes)}}>
                        { active === false && 
                            <img src="/images/new-block/like_button.svg"/>
                        }
                        { active === true &&
                            <img src="/images/new-block/like_button_active.svg"/>
                        }
                    </button>
                        {   likes.length > 0 &&
                            <p className={Styles["comments_count"]}>{likes.length}</p>
                        }
                    <button onClick={() => {showComment(setShow, show)}}>
                        <img src="/images/new-block/message_button.svg"/>
                    </button>
                        {
                            post.comments.length > 0 &&
                            <p className={Styles["comments_count"]}>{post.comments.length}</p>
                        }
                </div>
                    { show === true && 
                        <div className={Styles["comment"]}>
                            {post.comments.map((comment) => {
                                return (
                                    <Comment {...comment} postID={props._id} key={comment._id}/>
                                )
                            })
                            }
                        </div>
                    }
                <div className={Styles["news-block_bottom"]}>
                    {   user.profile === null ?
                        <img src="/images/profile/profile_picture.png" alt="profile"/> :
                        <img src={user.profile}/>
                    }
                    <form ref={commentForm} className={`${Styles['comment-block']} ${commentError === true && Styles['comment-block_error']}`}>
                        <input ref={commentInput} maxLength={200} placeholder="Написать комментарий"/>
                        <button type="submit" onClick={(event) => postNewComment(event, setCommentError, commentError, commentInput, user, props, setValidContent, validContent, commentForm)}>
                            <img src="/images/new-block/send_button.svg"/>
                        </button>
                    </form>

                    
                </div>
                { validContent === false && 
                    <p className={Styles['error-message']}>Кажется вы использовали в своём комментарии неприемлимые символы</p>
                }
            </div>
        )
    }
}