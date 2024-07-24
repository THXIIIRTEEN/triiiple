"use client"

import Link from "next/link"
import Styles from "../FriendsList.module.css"
import { friendUtils } from "../FriendFunctions/FriendFunctions";
import { useStore } from "@/app/authorization/data-utils/zustand-functions";
import { useEffect, useState } from "react";

export default function FriendProfile(props) {

    const [friend, setFriend] = useState(null)

    const user = useStore().user

    const copyProfileLink = () => {
        const url = `http://localhost:3000/profile/${friend.username}`;
        navigator.clipboard.writeText(url)
    }

    const deleteFriend = async () => {
        const result = await friendUtils.deleteFriend(user._id, friend._id);
    }

    useEffect(() => {
        setFriend(props)
    }, [props])

    if (friend) {
        return (
            <div className={Styles['friend-profile_background']}>
                <Link className={Styles['link']} href={`/profile/${friend.username}`}>
                    <img src={friend.profile}/>
                </Link>
                <div className={Styles['friend-profile_text-block']}>
                    <h3>{friend.username}</h3>
                    <div className={Styles['friend-profile_t-block-buttons']}>
                        <button>
                            <img src="/images/friends/message.svg"/>
                        </button>
                        <button onClick={() => {copyProfileLink()}}>
                            <img src="/images/friends/copy-link.svg"/>
                        </button>
                        <button onClick={() => {deleteFriend()}}>
                            <img src="/images/friends/unfriend.svg"/>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}