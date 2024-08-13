//SERVER FUNCTIONS

import { useStore } from "@/app/authorization/data-utils/zustand-functions";
import { messagerUtils } from "@/app/messanger/messagerFunctions/messagerFunction";
import { io } from "socket.io-client";

//CLIENT FUNCTIONS

import { formateDate } from "@/app/news/news-client-functions/date-formatted";

//STYLES

import Styles from "../../../Messanger.module.css"

//REACT IMPORTS

import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from "react";

const socket = io('https://triiiple.vercel.app', {
    transports: ['websocket', 'polling']
});

export default function Message(props) {
    
    const user = useStore().user;

    const [ dateFormatted, setDateFormatted ] = useState(new Date());
    const [ dateToday, setDateToday ] = useState(new Date());

    const [ref, inView] = useInView({
        triggerOnce: true,
    });
    
    useEffect(() => {
        if (inView && props.isRead != true && props.author._id != user._id) {
            socket.emit('message isRead', props._id)
        }
        return () => {
            socket.off('message isRead', props._id);
        };
    }, [inView]);

    useEffect(() => {
        formateDate(props, setDateFormatted, setDateToday)
    }, []);

    return (
        <div ref={ref} className={Styles["message-block"]}>
            {   props.author.profile === null ?
                <img className={Styles['profile']} src="/images/profile/profile_picture.png" alt="profile"/> :
                <img className={Styles['profile']} src={props.author.profile}/>
            }
            <div className={Styles["message-data"]}>
                <div className={Styles["user"]}>
                    <div className={Styles["left"]}>
                        <h2>{props.author.username}</h2>
                        <p className={Styles['time']}>
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
                    {   props.author.username === user.username &&
                        <button onClick={() => {messagerUtils.deleteMessage(props._id)}}>
                            <img src="/images/messanger/white-trash-can.svg"/>
                        </button>
                    }
                </div>
                {   props.picture && 
                    <img className={Styles['message-picture']} src={props.picture}/>
                }
                <p>{props.text}</p>
            </div>
        </div>
    )
}