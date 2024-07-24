import Styles from "./Messanger.module.css"
import Message from "./message/Message"

export default function Messanger() {

    return (
        <div className={Styles['messanger_background']}>
            <div>
                <h2>Сообщения</h2>
                <div className={Styles['messanger_search-input']}>
                    <input placeholder="Найти беседу"/>
                    <button>
                        <img src="/images/friends/search.svg"/>
                    </button>
                </div>
            </div>

            <div className={Styles['messanger_messages-list']}>
                <Message></Message>
                <Message></Message>
                <Message></Message>
                <Message></Message>
                <Message></Message>
            </div>
        </div>
    )
}