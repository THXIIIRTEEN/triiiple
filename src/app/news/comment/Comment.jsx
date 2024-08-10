//SERVER FUNCTIONS

import { useStore } from "@/app/authorization/data-utils/zustand-functions";

//CLIENT FUNCTIONS

import { formateDate } from "../news-client-functions/date-formatted";
import { deleteComment } from "../news-client-functions/news-client-functions";

//STYLES

import Styles from "./comment.module.css";

//REACT IMPORTS

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Comment(props) {

    const user = useStore().user;
    
    const [ dateFormatted, setDateFormatted ] = useState(new Date());
    const [ dateToday, setDateToday ] = useState(new Date());

    useEffect(() => {
        formateDate(props, setDateFormatted, setDateToday)
    }, [])

    return (
        <div className={Styles["comment-block"]}>
            <Link href={`/profile/${props.author.username}`}>
                {   props.author.profile === null ?
                    <img src="/images/profile/profile_picture.png" alt="profile"/> :
                    <img src={props.author.profile}/>
                }
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
                        <button className={Styles["delete-button"]} onClick={(event) => {deleteComment(event, props)}}>
                            <img className={Styles["delete-button_image"]} src={"/images/new-block/trash_can.svg"}/>
                        </button>
                    }
                </div>
                <p className={Styles["comment-text"]}>{props.text}</p>
            </div>
        </div>
    )
}