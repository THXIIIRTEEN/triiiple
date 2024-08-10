//SERVER FUNCTIONS

import { useStore } from "@/app/authorization/data-utils/zustand-functions";

//CLIENT FUNCTIONS

import { acceptReq, declineReq } from "../friends-client-functions/friends-client-functions";

//STYLES

import Styles from "../FriendsList.module.css";

//REACT IMPORTS

import Link from "next/link";
import { useEffect, useState } from "react";

export default function FriendRequestProfile(props) {

    const user = useStore().user;

    const [friend, setFriend] = useState(null);
    const [username, setUsername] = useState(props.username);

    useEffect(() => {
        setFriend(props)
    }, [props]);

    useEffect(() => {
        if (props.username.length > 8) {
            const maxLength = 10;
            const str = username;
            setUsername(str.slice(0, maxLength - 3) + '...')
        }
    }, []);
    
    if (friend) {
        return (
            <div className={Styles['friend-profile_background']}>
                <Link className={Styles['link']} href={`/profile/${friend.username}`}>
                    {   friend.profile === null ?
                        <img className={Styles['profile-picture']} src="/images/profile/profile_picture.png" alt="profile"/> :
                        <img className={Styles['profile-picture']} src={friend.profile}/>
                    }
                </Link>
                <div className={Styles['friend-profile_text-block']}>
                    <h3>{username}</h3>
                    <div className={`${Styles['friend-profile_t-block-buttons']} ${Styles['friend-profile_t-block-buttons__requests']}`}>
                        <button onClick={() => {acceptReq(user, friend)}}>
                            <img src="/images/friends/check-mark.svg"/>
                        </button>
                        <button onClick={() => {declineReq(user, friend)}}>
                            <img src="/images/friends/cross.svg"/>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}