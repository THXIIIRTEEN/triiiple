"use client"

//SERVER FUNCTIONS

import { useStore } from "@/app/authorization/data-utils/zustand-functions";
import { io } from "socket.io-client";

//CLIENT FUNCTIONS

import { exitFunction } from "../components-client-functions/components-client-functions";

//STYLES

import Styles from "./Header.module.css"

//REACT IMPORTS

import Link from "next/link"
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {

    const user = useStore().user;

    const [chatId, setChatId] = useState("66a363a5d3b7638d639218c2");
    const [read, setRead] = useState(null);
    const [props, setProps] = useState(user);

    const socket = io("https://api.triiiple.ru");

    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        socket.on('friens updated', async (data) => {
            const array = data.find((chat) => chat._id === user._id);
            setProps(array)
        })
        return () => {
            socket.off('friens updated', {});
        };
    }, [])

    useEffect(() => {
        const chatId = location.pathname.split('/').pop();
        setChatId(chatId)
    }, [])

    useEffect(() => {
        socket.on('message sent', async (data) => {
            const chats = data.find((chat) => chat._id === user._id);
            const isRead = chats.chats
            if (isRead) {
                const checkIsRead = (isRead.filter((chat) => chat.messages.find((message) => message.isRead === false && message.author._id != user._id)))
                setRead(checkIsRead)
            }
        })

        return () => {
            socket.off('message sent', {});
        };

    }, []);

    useEffect(() => {
        socket.on('isRead updated', async (data) => {
            const chats = data.find((chat) => chat._id === user._id);
            const isRead = chats.chats
            if (isRead) {
                const checkIsRead = (isRead.filter((chat) => chat.messages.find((message) => message.isRead === false && message.author._id != user._id)))
                setRead(checkIsRead)
            }
        })

        return () => {
            socket.off('isRead updated', {});
        };

    }, [])

    return (
        <header className={Styles['header']}>
            <ul className={Styles['navbar']}>
                <li className={`${pathname === `/profile/${user.username}` ? Styles["active"] : ""}`}>
                    <Link href={`/profile/${user.username}`}>
                        {pathname === `/profile/${user.username}` ? <img src="/images/header-images/profile-white.svg"/> :
                                                    <img src="/images/header-images/profile.svg"/>
                        }
                    </Link>
                </li>
                <li className={`${pathname === "/news" ? Styles["active"] : ""}`}>
                    <Link href="/news">
                        {pathname === "/news" ? <img src="/images/header-images/news-white.svg"/> :
                                                    <img src="/images/header-images/news.svg"/>
                        }
                    </Link>
                </li>
                <li className={`${pathname === "/messanger" || pathname === `/messanger/chat/${chatId}` ? Styles["active"] : ""} ${read && read.length > 0 && Styles["notification"]}`}>
                    <Link href="/messanger">
                        {pathname === "/messanger" || pathname === `/messanger/chat/${chatId}` ? <img src="/images/header-images/messanger-white.svg"/> :
                                                    <img src="/images/header-images/messanger.svg"/>
                        }
                    </Link>
                </li>
                <li className={`${pathname === "/friends" ? Styles["active"] : ""} ${props.friend_requests.length > 0 && Styles["notification"]}`}>
                    <Link href="/friends">
                        {pathname === "/friends" ? <img src="/images/header-images/friends-white.svg"/>
                        : <img src="/images/header-images/friends.svg"/>}
                    </Link>
                </li>
            </ul>

            <div className={Styles['settings-block']}>
                <ul>
                    <li className={`${pathname === "/settings" ? Styles["settings-active"] : ""}`}>
                        <Link href="/settings">
                            {pathname === "/settings" ? <img src="/images/header-images/settings-white.svg"/>
                            : <img src="/images/header-images/settings.svg"/>}
                        </Link>
                    </li>

                    <button onClick={event => {exitFunction(event, router)}}>
                        <img src="/images/header-images/exit.svg"/>
                    </button>
                </ul>
            </div>
        </header>
    )
}