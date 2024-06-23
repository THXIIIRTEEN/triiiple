import Styles from "../Messanger.module.css"

export default function Message() {
    return (
        <div className={Styles['message']}>
            <img src="/images/friends/avatar.png"/>

            <div className={Styles['message_text-block']}>
                <div className={Styles['message_text']}>
                    <h3>DaCoconut</h3>
                    <p>И как я ещё не застрелился с таким никнеймом</p>
                </div>

                <div className={Styles['message_time']}>
                    <h4>17:09</h4>
                    <button>10</button>
                </div>
            </div>

            <button className={Styles['options-button']}>
                <img src="/images/messanger/three-points.svg"/>
            </button>
        </div>
    )
}