import { useStore } from "@/app/authorization/data-utils/zustand-functions"
import Styles from "./NewFriends.module.css"
import NewFriendsProfile from "./new-friends_profile/NewFriendsProfile"
import { friendUtils } from "@/app/friends/FriendFunctions/FriendFunctions"
import { useEffect, useState } from "react"

export default function NewFriends() {

    const [userArray, setUserArray] = useState(null)

    const user = useStore().user
    
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