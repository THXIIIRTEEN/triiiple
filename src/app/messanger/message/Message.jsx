//SERVER FUNCTIONS

import { useStore } from "@/app/authorization/data-utils/zustand-functions";
import { io } from "socket.io-client";

//CLIENT FUNCTIONS

import { formateDate } from "@/app/news/news-client-functions/date-formatted";

//STYLES

import Styles from "../Messanger.module.css";

//REACT IMPORTS

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Message(props) {

    const user = useStore().user

    const [message, setMessage] = useState(props);
    const [friend, setFriend] = useState(null);
    const [time, setTime] = useState(null);
    const [read, setRead] = useState(null);
    const [ dateToday, setDateToday ] = useState(new Date());

    const socket = io("http://localhost:3001");

    useEffect(() => {
        if (message) {
            const checkIsRead = (message.messages.filter((message) => message.isRead === false && message.author._id != user._id))
            setRead(checkIsRead)
        }
    }, [props])

    useEffect(() => {
        socket.on('isRead updated', async (data) => {
            const chats = data.find((chat) => chat._id === user._id);;
            setMessage(chats.messages)
        });
        return () => {
            socket.off('isRead updated', {});
        };
    }, [])

    useEffect(() => {
        if (props != null) {
            setMessage(props)
        }
    }, [props])

    useEffect(() => {
        setFriend(message.authors.find((prop) => prop._id != user._id))
        if (message.messages[message.messages.length-1] != undefined) {
            formateDate(message.messages[message.messages.length-1], setTime, setDateToday)
        }
    }, [message])

   if (friend) {
    return (
        <Link className="message" href={`messanger/chat/${message._id}`}>
            <div className={Styles['message']}>
                {   friend.profile === null ?
                    <img className={Styles['user-profile']} src="/images/profile/profile_picture.png" alt="profile"/> :
                    <img className={Styles['user-profile']} src={friend.profile}/>
                }
            
                <div className={Styles['message_text-block']}>
                    <div className={Styles['message_text']}>
                        <h3>{friend.username}</h3>

                        { message.messages[message.messages.length-1] != undefined && message.messages[message.messages.length-1].author.username === user.username && message.messages[message.messages.length-1].text != "" &&
                            <p>{`Вы: ${message.messages[message.messages.length-1].text}`}</p>
                        }

                        { message.messages[message.messages.length-1] != undefined && message.messages[message.messages.length-1].author.username === user.username && message.messages[message.messages.length-1].text == "" &&
                            <p>{`Вы: Изображение`}</p>
                        }

                        { message.messages[message.messages.length-1] != undefined && message.messages[message.messages.length-1].author.username != user.username &&
                            <p>{message.messages[message.messages.length-1].text}</p>
                        }

                        { message.messages[message.messages.length-1] === undefined &&
                            <p>Здесь пока ничего нет</p>
                        }

                    </div>

                    <div className={Styles['message_time']}>
                        { message.messages[message.messages.length-1] != undefined &&
                            <h4>{`${time.hour}:${time.minutes}`}</h4>
                        }
                        
                        { read && read.length > 0 &&
                            <button>{read.length}</button>
                        }
                    </div>
                </div>
            </div>
        </Link>
    )
   }
}