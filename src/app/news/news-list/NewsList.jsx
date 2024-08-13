"use client"

// SERVER FUNCTIONS

import { getFunction } from "@/app/authorization/data-utils/data-functions";
import { io } from "socket.io-client";
import { publishFunction } from "@/app/profile/[username]/profile-client-functions/profile-client-functions";

// STYLES

import Styles from "./NewsList.module.css";

// COMPONENTS

import NewsBlock from "../news-block/NewsBlock";

// REACT IMPORTS

import { useEffect, useRef, useState } from "react";
import { useStore } from "@/app/authorization/data-utils/zustand-functions";

export default function NewsList() {

    const [isCorrect, setIsCorrect] = useState(true);
    const [postArray, setPostArray] = useState(null);
    const [sortedPosts, setSortedPosts] = useState(postArray)

    const user = useStore().user;
    const socket = io('https://triiiple.vercel.app', {
        transports: ['websocket', 'polling']
    });

    useEffect(() => {
        socket.on('comment updated', (data) => {
            setPostArray(data)
        })

        return () => {
            socket.off('comment updated', {});
        };
    }, [])

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

                    <button id="publish" type="submit" onClick={() => {publishFunction(event, newPostInput, fileInput, setIsCorrect, isCorrect, user)}} className={Styles['second-button']}>Опубликовать</button>
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