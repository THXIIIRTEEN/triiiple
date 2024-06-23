import Styles from "../FriendsList.module.css"

export default function FriendProfile() {
    return (
        <div className={Styles['friend-profile_background']}>
            <img src="/images/friends/avatar.png"/>
            <div className={Styles['friend-profile_text-block']}>
                <h3>DaCoconut</h3>
                <div className={Styles['friend-profile_t-block-buttons']}>
                    <button>
                        <img src="/images/friends/message.svg"/>
                    </button>
                    <button>
                        <img src="/images/friends/copy-link.svg"/>
                    </button>
                    <button>
                        <img src="/images/friends/unfriend.svg"/>
                    </button>
                </div>
            </div>
        </div>
    )
}