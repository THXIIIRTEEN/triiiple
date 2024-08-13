"use client"

//SERVER FUNCTIONS

import { useStore } from "./authorization/data-utils/zustand-functions";
import { postServerFunction } from "./authorization/data-utils/data-functions";
import { io } from "socket.io-client";

//STYLES

import "./globals.css";

//COMPONENTS

import Notification from "./components/Notification/Notification";

//REACT IMPORTS

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {

  const [notification, setNotification] = useState(null);
  const [chatId, setChatId] = useState(null);

  const audioRef = useRef(null);

  const socket = io('https://triiiple.vercel.app', {
    transports: ['websocket', 'polling']
  });
  const user = useStore().user;
  const pathname = usePathname();
  const store = useStore();

  useEffect(() => {
    socket.on('notification sent', async (data) => {
        const chat = await postServerFunction('/messanger/getChatsById', {chatId: data.chatID})
        if (user && data.mes.author && chat.authors.find((author) => author._id === user._id && author._id != data.mes.author._id)) {
          audioRef.current.play()
          setNotification(data.mes)
          setChatId(data.chatID)
        }
    })

    return () => {
      socket.off('notification sent', {});
    };
  }, [user])
  
  useEffect(() => {
        const connect = async () => {
          await store.auth();
        }
        connect();
  }, [])

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${pathname === "/login" || pathname === "/registration" ? 'background-authorisation' : 'background'}`}>
        {children}
        <audio ref={audioRef} src='/sounds/icq.mp3'></audio>
        {   notification && 
            <Notification data={notification} setNotification={setNotification} chatId={chatId}/>
        }
      </body>
    </html>
  );
}
