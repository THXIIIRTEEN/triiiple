"use client"

//SERVER FUNCTIONS

import { useStore } from "@/app/authorization/data-utils/zustand-functions";
import { io } from "socket.io-client";

//STYLES

import Styles from "../FriendsList.module.css";

//COMPONENTS

import FriendRequests from "../FriendRequests/FriendRequests";
import FriendsList from "../FriendsList/FriendsList";

//REACT IMPORTS

import { useEffect, useState } from "react";

export default function FriendsPage() {
    
    const user = useStore().user;

    const [showFriendReq, setShowFriendReq] = useState(false);
    const [props, setProps] = useState(user);

    const socket = io("https://triiiple-server.vercel.app");

    useEffect(() => {
        socket.on('friens updated', async (data) => {
            const array = data.find((chat) => chat._id === user._id);
            setProps(array)
        })    
        return () => {
            socket.off('friens updated', {});
        };
    });

    return (
        <div className={Styles['friends_background']}>
            <div className={Styles['friends_top-bar']}>
                { showFriendReq === false &&
                    <div className={Styles['text']}>
                        <h2>Список друзей { props.friends.length > 0 && <span>{`${props.friends.length}`}</span>}</h2>
                        <button className={Styles["friend-req_length"]} onClick={() => {setShowFriendReq(!showFriendReq)}}>Запросы в друзья { props.friend_requests.length > 0 && <span>{`${props.friend_requests.length}`}</span>}</button>
                    </div>
                }
                { showFriendReq === true &&
                    <div className={Styles['text']}>
                        <h2>Запросы в друзья { props.friend_requests.length > 0 && <span>{`${props.friend_requests.length}`}</span>}</h2>
                        <button onClick={() => {setShowFriendReq(!showFriendReq)}}>Список друзей</button>
                    </div>
                }
                { showFriendReq === false &&
                    <FriendsList {...props}></FriendsList>
                }
                { showFriendReq === true &&
                    <FriendRequests {...props}/>
                }
            </div>
        </div>
    )
}