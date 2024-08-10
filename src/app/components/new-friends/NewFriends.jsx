//SERVER FUNCTIONS

import { useStore } from "@/app/authorization/data-utils/zustand-functions";
import { friendUtils } from "@/app/friends/FriendFunctions/FriendFunctions";

//STYLES

import Styles from "./NewFriends.module.css";

//COMPONENTS

import NewFriendsProfile from "./new-friends_profile/NewFriendsProfile";

//REACT IMPORTS

import { useEffect, useState } from "react"

export default function NewFriends() {

    const user = useStore().user;

    const [userArray, setUserArray] = useState(null);

    const getUsers = async () => {
        const usersArray = await friendUtils.getRandomUsers(user._id)
        setUserArray(usersArray)
    }

    useEffect(() => {
        getUsers()
    }, [])

    if (userArray) {
        return (
            <div className={Styles['new-friends_block']}>
                <h2>Новые знакомства</h2>
                <ul>
                {   userArray.map((user) => {
                    return (
                        <NewFriendsProfile {...user} key={user._id}/>
                    )
                })
                }
                </ul>
            </div>
        )
    }
}