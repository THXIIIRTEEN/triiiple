import Styles from "./NewFriends.module.css"
import NewFriendsProfile from "./new-friends_profile/NewFriendsProfile"

export default function NewFriends() {
    return (
        <div className={Styles['new-friends_block']}>
            <h2>Новые знакомства</h2>
                <ul>
                    <NewFriendsProfile></NewFriendsProfile>
                    <NewFriendsProfile></NewFriendsProfile>
                    <NewFriendsProfile></NewFriendsProfile>
                    <NewFriendsProfile></NewFriendsProfile>
                    <NewFriendsProfile></NewFriendsProfile>
                </ul>
        </div>
    )
}