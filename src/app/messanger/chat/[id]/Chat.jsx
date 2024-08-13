//SERVER FUNCTIONS

import { messagerUtils } from "../../messagerFunctions/messagerFunction";
import { useStore } from "@/app/authorization/data-utils/zustand-functions";
import { io } from "socket.io-client";

//CLIENT FUNCTIONS

import { publishMessageFunction } from "./chat-client-functions/chat-client-functions";

//STYLES

import Styles from "../../Messanger.module.css";

//COMPONENTS

import Message from "./Message/Message"

//REACT IMPORTS

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation";

export default function Chat() {

    const user = useStore().user;

    const [friend, setFriend] = useState(null);
    const [isCorrect, setIsCorrect] = useState(true);
    const [messageArray, setMessageArray] = useState(true);
    const [currentChat, setCurrentChat] = useState(null);
    const [hasScrolled, setHasScrolled] = useState(false);
    const [isIntersecting, setIsIntersecting] = useState(false);

    const chatId = location.pathname.split('/').pop();

    const socket = io('https://triiiple.vercel.app', {
        transports: ['websocket', 'polling']
    });

    const router = useRouter();

    const messageList = useRef(null);
    const fileInput = useRef(null);
    const newPostInput = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
          (entries) => {
            const entry = entries[0];
            setIsIntersecting(entry.isIntersecting);
          },
          {
            root: null,
            rootMargin: '0px',
            threshold: 0.1,
          }
        );
    
        if (messageList.current && messageArray.length > 0) {
          const targetElement = messageList.current.children[messageArray.length - 2];
          if (targetElement) {
            observer.observe(targetElement);
          }
        };
    
        return () => {
          if (messageList.current && messageArray.length > 0) {
            const targetElement = messageList.current.children[messageArray.length - 2];
            if (targetElement) {
              observer.unobserve(targetElement);
            }
          }
        };
    }, [messageArray]);

    useEffect(() => {
        if (messageArray.length > 0) {
            if (messageList.current && messageArray[messageArray.length - 1].author._id === user._id) {
                messageList.current.lastElementChild.scrollIntoView({ behavior: 'instant', block: 'end' });
            }
        }
    }, [messageArray]);

    useEffect(() => {
        if (messageArray.length > 0) {
            if (messageList.current && isIntersecting === true) {
                messageList.current.lastElementChild.scrollIntoView({ behavior: 'instant', block: 'end' });
            }
        }
    }, [messageArray]);

    useEffect(() => {
        if (messageArray.length > 0) {
            if (messageList.current && hasScrolled != true) {
                messageList.current.lastElementChild.scrollIntoView({ behavior: 'instant', block: 'end' });
                setHasScrolled(true)
            }
        }
    }, [messageArray, hasScrolled]);

    useEffect(() => {
        const getChatById = async () => {
            const chatId = location.pathname.split('/').pop();
            const result = await messagerUtils.getChatById(chatId)
            setFriend(result.authors.find((prop) => prop._id != user._id))
            setMessageArray(result.messages)
            setCurrentChat(result)
            return result.authors.find((prop) => prop._id != user._id)
        }
        getChatById()
    }, []);

    useEffect(() => {
        if (currentChat) {
            const result = currentChat.authors.find((author) => author._id === user._id);
            if (result === undefined) {
                router.push("/messanger")
            }
        };
    }, [currentChat]);

    useEffect(() => {
        socket.on('message sent', async (data) => {
            const id = location.pathname.split('/').pop();
            const chats = data.find((chat) => chat._id === user._id);
            const setChats = chats.chats.find((chat) => chat._id === id);
            if (setChats != undefined) {
                setMessageArray(setChats.messages)
            }
        })

        return () => {
            socket.off('message sent', {});
        };
    }, []);
    
    if (friend) {
        return (
            <div className={Styles['chat_background']}>
                <div className={Styles['header']}>
                    <button>
                        <Link href={"/messanger"}>
                            <img src="/images/messanger/back-button.svg"/>
                        </Link>
                    </button>
                    <Link href={`/profile/${friend.username}`}>                
                        {   friend.profile === null ?
                            <img className={Styles['profile-picture']} src="/images/profile/profile_picture.png" alt="profile"/> :
                            <img className={Styles['profile-picture']} src={friend.profile}/>
                        }
                    </Link>
                    <div>
                        <h1>{friend.username}</h1>
                    </div>
                </div>
    
                <div ref={messageList} className={Styles["messages-list"]}>
                    { messageArray.map((message, index) => {
                        return ( 
                            <Message {...message} key={message._id}/>
                        )
                    })}
                </div>
    
                <form className={Styles["message-input"]}>
                        <input ref={newPostInput} placeholder="Отправить сообщение"/>
                        <div className={Styles["buttons"]}>
                            <div className={Styles['first-button']}>
                                <input ref={fileInput} type="file" placeholder="" className={Styles['news-list_file-input']}/>
                            </div>
                            <button onClick={(event) => {publishMessageFunction(event, newPostInput, setIsCorrect, isCorrect, chatId, user, fileInput)}} className={Styles["blue-button"]}>
                                <img src="/images/new-block/send_button.svg"/>
                            </button>
                        </div>
                </form>
            </div>
        )
    }
}