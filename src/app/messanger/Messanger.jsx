//SERVER FUNCTIONS

import { messagerUtils } from "./messagerFunctions/messagerFunction";
import { useStore } from "../authorization/data-utils/zustand-functions";
import { io } from "socket.io-client";

//CLIENT FUNCTIONS

import { closeSearch, searchFunction } from "./messanger-client-functions/messanger-client-functions";

//STYLES

import Styles from "./Messanger.module.css";

//COMPONENTS

import Message from "./message/Message";

//REACT IMPORTS

import { useEffect, useRef, useState } from "react";

export default function Messanger() {

    const user = useStore().user;
    const searchInput = useRef(null);

    const [find, setFind] = useState(false);
    const [searchResult, setSearchResult] = useState(false);
    const [messageArray, setMessageArray] = useState(null);

    const socket = io('https://triiiple.vercel.app', {
        transports: ['websocket', 'polling']
    });

    useEffect(() => {
        socket.on('message sent', (data) => {
            const chats = data.find((chat) => chat._id === user._id)
            setMessageArray(chats.chats)
        })

        return () => {
            socket.off('message sent', {});
        };
    })

    useEffect(() => {
        const getChats = async() => {
            const result = await messagerUtils.getChats(user._id)
            setMessageArray(result.chats)
        }
        getChats()
    }, [])

    if (messageArray) {
        messageArray.sort((a, b) => {
            const lastMessageA = a.messages[a.messages.length - 1];
            const lastMessageB = b.messages[b.messages.length - 1];
          
            if (lastMessageA && lastMessageB) {
              return new Date(lastMessageB.time) - new Date(lastMessageA.time);
            } else if (lastMessageA) {
              return -1;
            } else if (lastMessageB) {
              return 1;
            } else {
              return 0;
            }
          });
    }

    if (messageArray) {
        return (
            <>
            <div className={Styles['messanger_background']}>
                <div>
                    <h2>Сообщения</h2>
                    <div className={Styles['messanger_search-input']}>
                        <input ref={searchInput} placeholder="Найти беседу"/>
                        {   find === false &&
                            <button onClick={() => (searchFunction(searchInput, user, setFind, find, setSearchResult))}>
                                <img src="/images/friends/search.svg"/>
                            </button>
                        }
                        {   find === true &&
                            <button onClick={() => (closeSearch(setFind, find, setSearchResult))} className={Styles['cross']}>
                                <img src="/images/friends/white-cross.svg"/>
                            </button>
                        }
                    </div>
                </div>
    
                <div className={Styles['messanger_messages-list']}>
                    {   find === false && 
                        messageArray.map((chat) => {
                        return (
                            <Message {...chat} key={chat._id}></Message>
                        )
                        }) 
                    }

                    {   find === true && searchResult[0] != null &&
                        searchResult.map((chat) => {
                        return (
                            <Message {...chat} key={chat._id}></Message>
                        )
                        }) 
                    }

                    {   searchResult[0] === null &&
                        <p>Такой беседы не сущеcтвует</p>
                    }
                </div>

                
            </div>
            </>
        )
    }
}