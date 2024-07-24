"use client"

import { postUtils } from "@/app/news/data-functions/postFunction";
import { useStore } from "../../authorization/data-utils/zustand-functions"
import NewsBlock from "../../news/news-block/NewsBlock"
import Styles from "./Profile.module.css"
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { friendUtils } from "@/app/friends/FriendFunctions/FriendFunctions";

export default function Profile( {props} ) {

    const [isCorrect, setIsCorrect] = useState(true);
    const [postArray, setPostArray] = useState(null);
    const [sortedPosts, setSortedPosts] = useState(postArray);
    const [requestSent, setRequestSent] = useState(false)

    const user = useStore().user;
    const socket = io("http://localhost:3001");

    socket.on('comment updated', (data) => {
        setPostArray(data)
    })

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
    }, [props])

    const newPostInput = useRef(null);
    const fileInput = useRef(null);

    const publishFunction = (event) => {
        event.preventDefault();

        const textInputValue = newPostInput.current.value;

        if (textInputValue == "") {
            setIsCorrect(false);
        } else if (textInputValue != "") {
            setIsCorrect(true);
        }
        
        if (isCorrect === true) {
            const postFormData = new FormData();
            const postUserData = {
                author: user.username,
                time: new Date(),
                text: textInputValue
            };
            const postFilePicture = fileInput.current.files[0];
            postFormData.append("userData", JSON.stringify(postUserData));
            if (postFilePicture != "") {
                postFormData.append("postPicture", postFilePicture);
            }
            postUtils.newPost(postFormData)
            location.reload()
        }
    }

    const copyProfileUrl = (event) => {
        event.preventDefault();
        const url = window.location.href;
        navigator.clipboard.writeText(url)
    }

    const sendFriendReq = async(event) => {
        event.preventDefault();
        setRequestSent(!requestSent)
        const res = await friendUtils.sendFriendReq(user._id, props._id)
    }

    const cancelFriendReq = async(event) => {
        event.preventDefault();
        setRequestSent(!requestSent)
        const res = await friendUtils.cancelFriendReq(user._id, props._id)
    }
    if (props) {
        return (
            <div className={Styles['profile_background']}>
                <div className={Styles['profile_info-block']}>
                    <img className={Styles['profile_picture']} src={props.profile} alt="profile"/>
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
                                {   requestSent === false && user.friend_requests.find((req) => req._id === props._id) === undefined && user.friends.find((friend) => friend._id === props._id) === undefined &&
                                    <button onClick={() => {sendFriendReq(event)}} className={Styles['add-button']}>Добавить в друзья</button>
                                }
                                {   requestSent === true && user.friend_requests.find((req) => req._id === props._id) === undefined && user.friends.find((friend) => friend._id === props._id) === undefined &&
                                    <button onClick={() => {cancelFriendReq(event)}} className={Styles['add-button']}>Отменить запрос</button>
                                }
                                {   user.friend_requests.find((req) => req._id === props._id) != undefined &&
                                    <button onClick={() => {friendUtils.acceptReq(user._id, props._id)}} className={Styles['add-button']}>Принять запрос</button>
                                }
                                {   user.friends.find((friend) => friend._id === props._id) != undefined &&
                                    <button onClick={() => {friendUtils.deleteFriend(user._id, props._id)}} className={Styles['add-button']}>Удалить из друзей</button>
                                }
                                <button className={Styles['message-button']}>Сообщение</button>
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
                                <form className={isCorrect === false ? `error-input ${Styles['news-list_input']} ${Styles['error-input']}` : Styles['news-list_input']}>
                                    <input required type="text" ref={newPostInput} id="text" placeholder={`О чём думаете ${user.username}?`}/>

                                    <div className={Styles['news-list_input__buttons']}>
                                        <div className={Styles['first-button']}>
                                            <input id="file_input" name="postPicture" type="file" ref={fileInput} placeholder="" className={Styles['news-list_file-input']}/>
                                        </div>

                                        <button id="publish" type="submit" onClick={() => {publishFunction(event)}} className={Styles['second-button']}>Опубликовать</button>
                                    </div>
                                </form>
                            </>
                        }
                        { isCorrect === false && 
                        <p className={Styles["error-text"]}>Кажется, вы ничего не написали</p>
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
            </div>
        )
    }

}