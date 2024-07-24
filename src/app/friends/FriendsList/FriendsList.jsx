import { useEffect, useState } from "react"
import FriendProfile from "../FriendProfile/FriendProfile"
import Styles from "../FriendsList.module.css"
import { useStore } from "@/app/authorization/data-utils/zustand-functions"

export default function FriendsList() {
    const user = useStore().user;

    const [friendsArray, setFriendsArray] = useState(user.friends);

    return (
        <>
            <div className={Styles['friends_search-input']}>
                <input placeholder="Похоже ваш друг потерялся. Давайте вместе его найдём!"></input>
                <button>
                    <img src="/images/friends/search.svg"/>
                </button>
            </div>
            <div className={Styles['friends-list_block']}>
                {   friendsArray.map((friend) => {
                    return (<FriendProfile {...friend} key={friend._id}/>)
                })
                }
            </div>
        </>
    )
}