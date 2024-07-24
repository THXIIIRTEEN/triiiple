import Styles from "../FriendsList.module.css"
import FriendRequestProfile from "../FriendRequestProfile/FriendRequestProfile";
import { useEffect, useState } from "react";
import { useStore } from "@/app/authorization/data-utils/zustand-functions";

export default function FriendRequests() {

    const user = useStore().user

    const [reqArray, setReqArray] = useState(user.friend_requests)

    return (
        <>
            <div className={Styles['friends-list_block']}>
                { reqArray &&
                    reqArray.map((request) => {
                    return (
                        <FriendRequestProfile {...request} key={request._id}></FriendRequestProfile>
                    )
                    })
                }
            </div>
        </>
    )
}