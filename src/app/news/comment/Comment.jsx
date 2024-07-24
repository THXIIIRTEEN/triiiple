import Link from "next/link"
import Styles from "./comment.module.css"
import { useStore } from "@/app/authorization/data-utils/zustand-functions";
import { postUtils } from "../data-functions/postFunction";

export default function Comment(props) {
    const date_string = props.time;
    const date = new Date(date_string);
    const dateFormatted = {
        day: date.getDate() < 10 ? `0${date.getDate()}` : date.getDate(),
        month: date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth(),
        year: date.getFullYear() < 10 ? `0${date.getFullYear()}` : date.getFullYear(),
        hour: date.getHours() < 10 ? `0${date.getHours()}` : date.getHours(),
        minutes: date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes(),
    };
    const dateToday = {
        day: new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate(),
        month: new Date().getMonth() < 10 ? `0${new Date().getMonth()}` : new Date().getMonth(),
        year: new Date().getFullYear() < 10 ? `0${new Date().getFullYear()}` : new Date().getFullYear()
    };
    const user = useStore().user;
    const deleteComment = (event) => {
        event.preventDefault();
        postUtils.deleteComment(props.postID, props._id);
    }
    return (
        <div className={Styles["comment-block"]}>
            <Link href={`/profile/${props.author.username}`}>
                <img src={props.author.profile}/>
            </Link>
            <div className={Styles["text"]}>
                <div className={Styles["text-top"]}>
                    <div className={Styles["username-and-date"]}>
                        <h1>{props.author.username}</h1>
                        <p className={Styles["comment-date"]}>
                            { dateFormatted.day != dateToday.day && dateFormatted.day != dateToday.day - 1 &&
                                `${dateFormatted.day}.${dateFormatted.month}.${dateFormatted.year}, ${dateFormatted.hour}:${dateFormatted.minutes}`            
                            }
                            {dateFormatted.day === dateToday.day - 1 && dateFormatted.month === dateToday.month && dateFormatted.year === dateToday.year &&
                                `Вчера, ${dateFormatted.hour}:${dateFormatted.minutes}`
                            }
                            { dateFormatted.day === dateToday.day && dateFormatted.month === dateToday.month && dateFormatted.year === dateToday.year &&
                                `Сегодня, ${dateFormatted.hour}:${dateFormatted.minutes}`
                            }
                        </p>
                    </div>
                    { user.username === props.author.username &&
                        <button className={Styles["delete-button"]} onClick={(event) => {deleteComment(event)}}>
                            <img className={Styles["delete-button_image"]} src={"/images/new-block/trash_can.svg"}/>
                        </button>
                    }
                </div>
                <p className={Styles["comment-text"]}>{props.text}</p>
            </div>
        </div>
    )
}