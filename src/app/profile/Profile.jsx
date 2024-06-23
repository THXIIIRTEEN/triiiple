"use client"

import NewsBlock from "../news/news-block/NewsBlock"
import Styles from "./Profile.module.css"

export default function Profile() {
    return (
        <div className={Styles['profile_background']}>
            <div className={Styles['profile_info-block']}>
                <img src="/images/profile/profile_picture.png"/>
                <div className={Styles['profile_info-block_text-section']}>
                    <div className={Styles['username']}>
                        <h2>THXIIIRTEEN</h2>
                        <button>
                            <img src="/images/profile/copy_link.svg"/>
                        </button>
                    </div>
                    <p>Lörem ipsum infral megament gen gångpeng. Nespest antelingar. Rest spenäsamma. Bebelt rening terat askap. Pys nynektig i halalturism ipusm homoss. </p>
                    <div className={Styles['button-section']}>
                        <button className={Styles['add-button']}>Добавить в друзья</button>
                        <button className={Styles['message-button']}>Сообщение</button>
                    </div>
                </div>
            </div>

            <div className={Styles['news-list_block']}>
                    <NewsBlock></NewsBlock>
                    <NewsBlock></NewsBlock>
                    <NewsBlock></NewsBlock>
                    <NewsBlock></NewsBlock>
            </div>
        </div>
    )
}