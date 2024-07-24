"use client"

import { getFunction, postFunction } from "@/app/authorization/data-utils/data-functions";
import NewsBlock from "../news-block/NewsBlock";
import Styles from "./NewsList.module.css"
import { useEffect, useRef, useState } from "react";
import { useStore } from "@/app/authorization/data-utils/zustand-functions";
import { io } from "socket.io-client";
import { postUtils } from "../data-functions/postFunction";

export default function NewsList() {

    const [isCorrect, setIsCorrect] = useState(true);
    const [postArray, setPostArray] = useState(null);
    const [sortedPosts, setSortedPosts] = useState(postArray)

    const user = useStore().user;
    const socket = io("http://localhost:3001");

    useEffect(() => {
        socket.on('comment updated', (data) => {
            setPostArray(data)
        })
    })

    useEffect(() => {
        if (postArray) {
            const sort = [...postArray].reverse();
            setSortedPosts(sort);
        }
    }, [postArray])

    useEffect(() => {
        const getPost = async () => {
            const posts = await getFunction("/post");
            setPostArray(posts)
        }
        getPost()
    }, [])

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

    return (
        <div className= {Styles['news-list_block']}>
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
    )
}