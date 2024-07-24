import Link from "next/link"
import Styles from "../FriendsList.module.css"
import { useStore } from "@/app/authorization/data-utils/zustand-functions"
import { friendUtils } from "../FriendFunctions/FriendFunctions"
import { useEffect, useState } from "react";

export default function FriendRequestProfile(props) {

    const [friend, setFriend] = useState(null);

    useEffect(() => {
        setFriend(props)
    }, [props])

    const user = useStore().user
    
    const acceptReq = async () => {
        const result = await friendUtils.acceptReq(user._id, friend._id);
    }

    const declineReq = async () => {
        const result = await friendUtils.declineReq(user._id, friend._id);
    }

    if (friend) {
        return (
            <div className={Styles['friend-profile_background']}>
                <Link className={Styles['link']} href={`/profile/${friend.username}`}>
                    <img className={Styles['profile-picture']} src={friend.profile}/>
                </Link>
                <div className={Styles['friend-profile_text-block']}>
                    <h3>{friend.username}</h3>
                    <div className={`${Styles['friend-profile_t-block-buttons']} ${Styles['friend-profile_t-block-buttons__requests']}`}>
                        <button onClick={() => {acceptReq()}}>
                            <img src="/images/friends/check-mark.svg"/>
                        </button>
                        <button onClick={() => {declineReq()}}>
                            <img src="/images/friends/cross.svg"/>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}