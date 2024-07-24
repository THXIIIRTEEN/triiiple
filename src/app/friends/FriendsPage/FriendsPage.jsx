"use client"

import { useState } from "react";
import Styles from "../FriendsList.module.css";
import FriendRequests from "../FriendRequests/FriendRequests";
import FriendsList from "../FriendsList/FriendsList";
import { useStore } from "@/app/authorization/data-utils/zustand-functions";

export default function FriendsPage() {
    
    const user = useStore().user

    const [showFriendReq, setShowFriendReq] = useState(false);
    const [friendsArray, setFriendsArray] = useState(user);

    return (
        <div className={Styles['friends_background']}>
            <div className={Styles['friends_top-bar']}>
                { showFriendReq === false &&
                    <div className={Styles['text']}>
                        <h2>Список друзей { friendsArray.friends.length > 0 && <span>{`${friendsArray.friends.length}`}</span>}</h2>
                        <button className={Styles["friend-req_length"]} onClick={() => {setShowFriendReq(!showFriendReq)}}>Запросы в друзья { friendsArray.friend_requests.length > 0 && <span>{`${friendsArray.friend_requests.length}`}</span>}</button>
                    </div>
                }
                { showFriendReq === true &&
                    <div className={Styles['text']}>
                        <h2>Запросы в друзья { friendsArray.friend_requests.length > 0 && <span>{`${friendsArray.friend_requests.length}`}</span>}</h2>
                        <button onClick={() => {setShowFriendReq(!showFriendReq)}}>Список друзей</button>
                    </div>
                }
                { showFriendReq === false &&
                    <FriendsList {...user}></FriendsList>
                }
                { showFriendReq === true &&
                    <FriendRequests {...user}/>
                }
            </div>
        </div>
    )
}