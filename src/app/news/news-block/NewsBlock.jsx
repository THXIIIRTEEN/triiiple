"use client"

import { useStore } from "@/app/authorization/data-utils/zustand-functions"
import Styles from "./NewsBlock.module.css"
import { useEffect, useRef, useState } from "react";
import Comment from "../comment/Comment";
import { postUtils } from "../data-functions/postFunction";
import { io } from "socket.io-client";
import Link from "next/link"

export default function NewsBlock(props) {
    const date_string = props.time;
    const date = new Date(date_string);
    const dateFormatted = {
        day: date.getDate() < 10 ? `0${date.getDate()}` : date.getDate(),
        month: date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth(),
        year: date.getFullYear() < 10 ? `0${date.getFullYear()}` : date.getFullYear(),
        hour: date.getHours() < 10 ? `0${date.getHours()}` : date.getHours(),
        minutes: date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes(),
    };
    const dateToday = {
        day: new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate(),
        month: new Date().getMonth() < 10 ? `0${new Date().getMonth()}` : new Date().getMonth(),
        year: new Date().getFullYear() < 10 ? `0${new Date().getFullYear()}` : new Date().getFullYear()
    };
    const [ show, setShow ] = useState(false);
    const [ active, setActive ] = useState(false);
    const [ likes, setLikes ] = useState(props.likes);
    const [ commentError, setCommentError ] = useState(false);
    const [ post, setPost ] = useState(props);

    useEffect(() => {
        if (props != null) {
            setPost(props)
        }
    }, [props])

    const user = useStore().user;

    const commentInput = useRef(null);

    const id = user._id;
    const postID = props._id;

    const showComment = () => {
        setShow(!show)
    }

    const postNewComment = async(event) => {
        event.preventDefault();
        if (commentInput.current.value === "") {
            setCommentError(!commentError)
        }
        if (commentInput.current.value != "") {
            const data = {
                author: id,
                time: new Date(),
                text: commentInput.current.value
            }
            postUtils.postComment(postID, data);
            commentInput.current.value = ""
        }
    }

    useEffect(() => {
        const getResult = async () => {
            const result = await postUtils.checkLike(id, postID);
            if (!result) {
                setActive(false)
            }

            if (result) {
                setActive(true)
            }
        }
        getResult(id)
    }, []);
    
    const likeFunction = async () => {
        const result = await postUtils.like(id, postID);
        setActive(result)
        if (result) {
            setLikes([...likes, user]); 
        } else {
            setLikes(likes.filter(like => like._id !== user._id)); 
        }
    };

    const deletePost = async (event) => {
        event.preventDefault();
        await postUtils.deletePost(postID);
        location.reload();
    }

    if (user) {
        return (
            <div className={Styles["news-block_background"]}>
                <div className={Styles["news-block_top"]}>
                    <div className={Styles["news-block_user"]}>
                        <div className={Styles['news-block_profile__background']}>                
                            <Link href={`/profile/${props.author.username}`}>
                                <img src={post.author.profile}/>
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
                        <button className={Styles["delete-button"]} onClick={(event) => {deletePost(event)}}>
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
                    <button onClick={likeFunction}>
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
                    <button onClick={showComment}>
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
                                <Comment {...comment} postID={postID} key={comment._id}/>
                            )
                        })
                        }
                    </div>
                }
    
                <div className={Styles["news-block_bottom"]}>
                    <img src={user.profile}/>
    
                    <form className={`${Styles['comment-block']} ${commentError === true && Styles['comment-block_error']}`}>
                        <input ref={commentInput} placeholder="Написать комментарий"/>
                        <button type="submit" onClick={(event) => postNewComment(event)}>
                            <img src="/images/new-block/send_button.svg"/>
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}