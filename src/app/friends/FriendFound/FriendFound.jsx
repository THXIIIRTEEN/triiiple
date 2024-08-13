//SERVER FUNCTIONS

import { useStore } from "@/app/authorization/data-utils/zustand-functions";
import { io } from "socket.io-client";

//CLIENT FUNCTIONS

import { cancelFriendReq, copyProfileLink, createChat, deleteFriend, sendFriendReq } from "../friends-client-functions/friends-client-functions";

//STYLES

import Styles from "../FriendsList.module.css";

//REACT IMPORTS

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function FriendFound(props) {

    const user = useStore().user;

    const [requestSent, setRequestSent] = useState(false);
    const [data, setData] = useState(props);
    const [username, setUsername] = useState(data.username);

    const router = useRouter();
    const socket = io('https://triiiple.vercel.app', {
        transports: ['websocket', 'polling']
    });
    useEffect(() => {
        if (data.username.length > 8) {
            const maxLength = 10;
            const str = username;
            setUsername(str.slice(0, maxLength - 3) + '...')
        }
    }, []);

    useEffect(() => {
        socket.on('friens updated', async (data) => {
            const array = data.find((chat) => chat._id === user._id);
            setData(array)
        })    
        
        return () => {
            socket.off('friens updated', {});
        };
    });

    useEffect(() => {
        setData(props)
    }, [props]);
    
    useEffect(() => {
            if (data.friend_requests.find((req) => req === user._id) === undefined) {
                setRequestSent(false)
            }
            if (data.friend_requests.find((req) => req === user._id)) {
                setRequestSent(true)
            }
    }, [])

    return (
        <div className={Styles['friend-profile_background']}>
                <Link className={Styles['link']} href={`/profile/${data.username}`}>
                    {   data.profile === null ?
                        <img className={Styles['profile-picture']} src="/images/profile/profile_picture.png" alt="profile"/> :
                        <img className={Styles['profile-picture']} src={data.profile}/>
                    }
                </Link>
                <div className={Styles['friend-profile_text-block']}>
                    <h3>{username}</h3>
                    <div className={`${Styles['friend-profile_t-block-buttons']} ${Styles['friend-profile_t-block-buttons__requests']}`}>
                        <button onClick={() => {createChat(user, props, router)}}>
                            <img src="/images/friends/message.svg"/>
                        </button>
                        <button onClick={() => {copyProfileLink(data)}}>
                            <img src="/images/friends/copy-link.svg"/>
                        </button>
                        {    requestSent === false && user.friends.find((req) => req._id === data._id) === undefined &&
                            <button onClick={(event) => {sendFriendReq(event, setRequestSent, user, data)}}>
                                <img src="/images/friends/add-friend.svg"/>
                            </button>
                        }
                        {   requestSent === true && user.friends.find((req) => req._id === data._id) === undefined &&
                            <button onClick={(event) => {cancelFriendReq(event, setRequestSent, user, data)}}>
                                <img src="/images/friends/hourglass.svg"/>
                            </button>
                        }
                        {   user.friends.find((req) => req._id === data._id) &&
                            <button onClick={() => {deleteFriend(user, friend)}}>
                                <img src="/images/friends/unfriend.svg"/>
                            </button>
                        }
                    </div>
                </div>
        </div>
    )
}