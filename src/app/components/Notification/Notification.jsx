//STYLES

import "../../globals.css";

//REACT IMPORTS

import Link from "next/link";
import { useEffect } from "react";

export default function Notification({data, chatId, setNotification}) {

    const closeFunction = () => {
        setNotification(null)
    }

    const redirectFunction = () => {
        setNotification(null)
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setNotification(null);
        }, 10000); 
        return () => clearTimeout(timer);
    }, [])

    return (
        <div onClick={() => redirectFunction()} className='new-message'>
            <Link href={`/messanger/chat/${chatId}`}>
                <div>
                    <img className="new-message_marker" src="/images/messanger/new.svg"/>
                    {   data.author.profile === null ?
                        <img className='new-message_profile' src="/images/profile/profile_picture.png" alt="profile"/> :
                        <img className='new-message_profile' src={data.author.profile} alt="profile"/>
                    }
                </div>
                <div className="new-message_text">
                    <h2>{data.author.username}</h2>
                    <p>{data.text}</p>
                </div>
            </Link>
            <button onClick={() => (closeFunction())} className="new-message_close-button">
                <img src="/images/messanger/close.svg"/>
            </button>
        </div>
    )
}