import FriendProfile from "./FriendProfile/FriendProfile"
import Styles from "./FriendsList.module.css"

export default function FriendsList() {
    return (
        <div className={Styles['friends_background']}>
            <div className={Styles['friends_top-bar']}>
                <div className={Styles['text']}>
                    <h2>Список друзей</h2>
                    <button>Запросы в друзья</button>
                </div>

                <div className={Styles['friends_search-input']}>
                    <input placeholder="Похоже ваш друг потерялся. Давайте вместе его найдём!"></input>
                    <button>
                        <img src="/images/friends/search.svg"/>
                    </button>
                </div>
            </div>
            <div className={Styles['friends-list_block']}>
                <FriendProfile></FriendProfile>
                <FriendProfile></FriendProfile>
                <FriendProfile></FriendProfile>
                <FriendProfile></FriendProfile>
                <FriendProfile></FriendProfile>
                <FriendProfile></FriendProfile>
                <FriendProfile></FriendProfile>
                <FriendProfile></FriendProfile>
                <FriendProfile></FriendProfile>
                <FriendProfile></FriendProfile>
            </div>
        </div>
    )
}