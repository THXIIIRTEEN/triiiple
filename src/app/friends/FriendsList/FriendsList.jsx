//SERVER FUNCTIONS

import { useStore } from "@/app/authorization/data-utils/zustand-functions";
import { postServerFunction } from "@/app/authorization/data-utils/data-functions";
import { io } from "socket.io-client";

//CLIENT FUNCTIONS

import { closeSearch, findUser } from "../friends-client-functions/friends-client-functions";

//STYLES

import Styles from "../FriendsList.module.css";

//COMPONENTS

import FriendProfile from "../FriendProfile/FriendProfile";
import FriendFound from "../FriendFound/FriendFound";

//REACT IMPORTS

import { useEffect, useRef, useState } from "react";

export default function FriendsList(props) {
    const user = useStore().user;

    const [friendsArray, setFriendsArray] = useState(props.friends);
    const [searchResult, setSearchResult] = useState(false)

    const searchInput = useRef(null);
    const socket = io("https://triiiple-server.vercel.app");

    useEffect(() => {
        setFriendsArray(props.friends)
    }, [props]);

    useEffect(() => {
        socket.on('friens updated', async (data) => {
            const array = data.find((chat) => chat._id === user._id);
            setFriendsArray(array.friends)
        })    
        return () => {
            socket.off('friens updated', {});
        };
    });

    useEffect(() => {
        const getUser = async () => {
            if (searchResult) {
                const result = await postServerFunction('/userByID', {id: searchResult._id});
                setSearchResult(result)
            }
        }
        getUser();
    }, [props]);

    return (
        <>
            <form className={Styles['friends_search-input']}>
                <input ref={searchInput} placeholder="Похоже ваш друг потерялся. Давайте вместе его найдём!"></input>
                { searchResult === false &&
                    <button onClick={(event) => (findUser(event, searchInput, setSearchResult))}>
                        <img src="/images/friends/search.svg"/>
                    </button>
                }
                {   searchResult != false &&
                    <button onClick={(event) => (closeSearch(event, setSearchResult))}>
                        <img className={Styles["cross_button"]} src="/images/friends/white-cross.svg"/>
                    </button>
                }
            </form>
            {   searchResult === false &&
                <div className={Styles['friends-list_block']}>
                {   friendsArray.map((friend) => {
                    return (<FriendProfile {...friend} key={friend._id}/>)
                })
                }
                </div>
            }
            {   searchResult === null &&
                <p className={Styles["not-found_message"]}>Пользователь с таким именем не найден</p>
            }
            {   searchResult != false && searchResult != null &&
                <div className={Styles['friends-list_block']}>
                    <FriendFound {...searchResult}/>
                </div>
            }
        </>
    )
}