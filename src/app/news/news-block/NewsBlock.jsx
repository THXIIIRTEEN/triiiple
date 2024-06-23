import Styles from "./NewsBlock.module.css"

export default function NewsBlock() {
    return (
        <div className={Styles["news-block_background"]}>
            <div className={Styles["news-block_top"]}>
                <div className={Styles['news-block_profile__background']}>                
                    <img src="/images/new-block/pfp.jpg"/>
                </div>

                <div className={Styles["new-block_top__user"]}>
                    <h6>THXIIIRTEEN</h6>
                    <p>19.03.2024</p>
                </div>
            </div>

            <img src="/images/new-block/banner.png" className={Styles["news-block_banner"]}/>

            <p className={Styles["new-block_text"]}>
                Установил вот новую винду, эмоции меня просто переполняют, обои точно такие же как
                в Triiiple. Собираются ли они судится? 
            </p>

            <div className={Styles["new-block_buttons"]}>
                <button>
                    <img src="/images/new-block/like_button.svg"/>
                </button>
                <button>
                    <img src="/images/new-block/message_button.svg"/>
                </button>
            </div>

            <div className={Styles["news-block_bottom"]}>
                <img src="/images/new-block/pfp.jpg"/>

                <form className={Styles['comment-block']}>
                    <input placeholder="Написать комментарий"/>
                    <button>
                        <img src="/images/new-block/send_button.svg"/>
                    </button>
                </form>
            </div>
        </div>
    )
}