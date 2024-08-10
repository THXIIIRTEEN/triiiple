"use client"

//SERVER FUNCTIONS

import { useStore } from "@/app/authorization/data-utils/zustand-functions";

//CLIENT FUNCTIONS

import { copyProfileLink, createChat, deleteFriend } from "../friends-client-functions/friends-client-functions";

//STYLES

import Styles from "../FriendsList.module.css";

//REACT IMPORTS

import Link from "next/link"
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

export default function FriendProfile(props) {

    const user = useStore().user;

    const [friend, setFriend] = useState(null)
    const [username, setUsername] = useState(props.username)

    const router = useRouter();

    useEffect(() => {
        if (props.username.length > 8) {
            const maxLength = 10;
            const str = username;
            setUsername(str.slice(0, maxLength - 3) + '...')
        }
    }, [])

    useEffect(() => {
        setFriend(props)
    }, [props])

    if (friend) {
        return (
            <div className={Styles['friend-profile_background']}>
                <Link className={Styles['link']} href={`/profile/${friend.username}`}>
                    {   friend.profile === null ?
                        <img src="/images/profile/profile_picture.png" alt="profile"/> :
                        <img src={friend.profile}/>
                    }
                </Link>
                <div className={Styles['friend-profile_text-block']}>
                    <h3>{username}</h3>
                    <div className={Styles['friend-profile_t-block-buttons']}>
                        <button onClick={() => {createChat(user, props, router)}}>
                            <img src="/images/friends/message.svg"/>
                        </button>
                        <button onClick={() => {copyProfileLink(friend)}}>
                            <img src="/images/friends/copy-link.svg"/>
                        </button>
                        <button onClick={() => {deleteFriend(user, friend)}}>
                            <img src="/images/friends/unfriend.svg"/>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}