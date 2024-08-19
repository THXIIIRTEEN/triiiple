"use client"

// SERVER FUNCTIONS

import { postUtils } from "@/app/news/data-functions/postFunction";
import { useStore } from "../../authorization/data-utils/zustand-functions";
import { io } from "socket.io-client";
import { friendUtils } from "@/app/friends/FriendFunctions/FriendFunctions";

//CLIENT FUNCTIONS

import { cancelFriendReq, copyProfileUrl, createChat, publishFunction, sendFriendReq } from "./profile-client-functions/profile-client-functions";

// COMPONENTS

import NewsBlock from "../../news/news-block/NewsBlock"

// STYLES
import Styles from "./Profile.module.css"

//REACT IMPORTS

import { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/navigation';

export default function Profile( {props} ) {

    const [isCorrect, setIsCorrect] = useState(true);
    const [postArray, setPostArray] = useState(null);
    const [sortedPosts, setSortedPosts] = useState(postArray);
    const [requestSent, setRequestSent] = useState(false);
    const [validContent, setValidContent] = useState(true)

    const user = useStore().user;
    const socket = io("https://api.triiiple.ru");

    const newPostInput = useRef(null);
    const fileInput = useRef(null);
    const postForm = useRef(null);

    const router = useRouter();

    useEffect(() => {
        socket.on('comment updated', (data) => {
            const newPostArray = data.filter((post) => post.author._id === props._id);
            setPostArray(newPostArray)
        })

        return () => {
            socket.off('comment updated', {});
        };
    }, []);

    useEffect(() => {
        socket.on('friens updated', async (data) => {
            location.reload();
        })    
        return () => {
            socket.off('friens updated', {});
        };
    });

    useEffect(() => {
        if (postArray) {
            const sort = [...postArray].reverse();
            setSortedPosts(sort);
        }
    }, [postArray])
    
    useEffect(() => {
        const getPosts = async () => {
            if (props) {
                const result = await postUtils.getAllPostsOfUser(props._id)
                setPostArray(result)
            }
        }
        getPosts();
    }, [props]);

    useEffect(() => {
        if (validContent === false) {
            postForm.current.classList.add('error-block')
        }
    }, [validContent])

    if (props) {
        return (
            <div className={Styles['profile_background']}>
                <div className={Styles['profile_info-block']}>

                    {   props.profile === null ?
                        <img className={Styles['profile_picture']} src="/images/profile/profile_picture.png" alt="profile"/> :
                        <img className={Styles['profile_picture']} src={props.profile} alt="profile"/>
                    }

                    <div className={Styles['profile_info-block_text-section']}>
                        <div className={Styles['username']}>
                            <h2>{props.username}</h2>
                            <button onClick={() => copyProfileUrl(event)}>
                                <img src="/images/profile/copy_link.svg"/>
                            </button>
                        </div>
                        <p>{props.about_user}</p>
                        {   props.username != user.username &&
                            <div className={Styles['button-section']}>
                                {   props.friend_requests.find((req) => req === user._id) === undefined && user.friend_requests.find((req) => req._id === props._id) === undefined && user.friends.find((friend) => friend._id === props._id) === undefined &&
                                    <button onClick={() => {sendFriendReq(setRequestSent, requestSent, user, props)}} className={Styles['add-button']}>Добавить в друзья</button>
                                }
                                {   props.friend_requests.find((req) => req === user._id) && user.friends.find((friend) => friend._id === props._id) === undefined &&
                                    <button onClick={() => {cancelFriendReq(setRequestSent, requestSent, user, props)}} className={Styles['add-button']}>Отменить запрос</button>
                                }
                                {   user.friend_requests.find((req) => req._id === props._id) != undefined &&
                                    <button onClick={() => {friendUtils.acceptReq(user._id, props._id)}} className={Styles['add-button']}>Принять запрос</button>
                                }
                                {   user.friends.find((friend) => friend._id === props._id) != undefined &&
                                    <button onClick={() => {friendUtils.deleteFriend(user._id, props._id)}} className={Styles['add-button']}>Удалить из друзей</button>
                                }
                                <button onClick={() => {createChat(router, user, props)}} className={Styles['message-button']}>Сообщение</button>
                            </div>
                        }
                    </div> 
                </div>
                {   postArray &&
                    postArray.length > 0 &&
                        <div className = {Styles['news-list_block']}>
                        { props.username != user.username &&
                            <h1>Посты {props.username}</h1>
                        }
                        { props.username === user.username &&
                            <>
                                <h1>Что у вас нового?</h1>
                                <p>
                                    Поделитесь с окружающими своими мыслями, жизненным
                                    опытом и впечатлениями.
                                </p>
                                <form ref={postForm} className={isCorrect === false ? `error-input ${Styles['news-list_input']} ${Styles['error-input']}` : Styles['news-list_input']}>
                                    <input required type="text" ref={newPostInput} id="text" placeholder={`О чём думаете ${user.username}?`}/>

                                    <div className={Styles['news-list_input__buttons']}>
                                        <div className={Styles['first-button']}>
                                            <input id="file_input" name="postPicture" type="file" ref={fileInput} placeholder="" className={Styles['news-list_file-input']}/>
                                        </div>

                                        <button id="publish" type="submit" onClick={(event) => {publishFunction(event, newPostInput, fileInput, setIsCorrect, isCorrect, user, setValidContent)}} className={Styles['second-button']}>Опубликовать</button>
                                    </div>
                                </form>
                            </>
                        }
                        { isCorrect === false && 
                        <p className={Styles["error-text"]}>Кажется, вы ничего не написали</p>
                        }
                        { validContent === false && 
                        <p className={Styles["error-text"]}>Кажется вы использовали в своём посте неприемлимые символы</p>
                        }
                        {  sortedPosts && 
                            <div className={Styles["news-block_list"]}>
                                {sortedPosts.map((post) => {
                                    return (
                                        <NewsBlock {...post} key={post._id}/>
                                    )
                                })}
                            </div> 
                        }
                    </div>      
                }
                {   postArray &&
                    postArray.length === 0 &&
                        <div className = {Styles['news-list_block']}>
                        { props.username != user.username &&
                            <h1>Посты {props.username}</h1>
                        }
                        { props.username === user.username &&
                            <>
                                <h1>Что у вас нового?</h1>
                                <p>
                                    Поделитесь с окружающими своими мыслями, жизненным
                                    опытом и впечатлениями.
                                </p>
                                <form ref={postForm} className={isCorrect === false ? `error-input ${Styles['news-list_input']} ${Styles['error-input']}` : Styles['news-list_input']}>
                                    <input required type="text" ref={newPostInput} id="text" placeholder={`О чём думаете ${user.username}?`}/>

                                    <div className={Styles['news-list_input__buttons']}>
                                        <div className={Styles['first-button']}>
                                            <input id="file_input" name="postPicture" type="file" ref={fileInput} placeholder="" className={Styles['news-list_file-input']}/>
                                        </div>

                                        <button id="publish" type="submit" onClick={(event) => {publishFunction(event, newPostInput, fileInput, setIsCorrect, isCorrect, user, setValidContent)}} className={Styles['second-button']}>Опубликовать</button>
                                    </div>
                                </form>
                            </>
                        }
                        { isCorrect === false && 
                        <p className={Styles["error-text"]}>Кажется, вы ничего не написали</p>
                        }
                        { validContent === false && 
                        <p className={Styles["error-text"]}>Кажется вы использовали в своём посте неприемлимые символы</p>
                        }
                    </div>      
                }
            </div>
        )
    }
}