//SERVER FUNCTIONS

import { useStore } from "@/app/authorization/data-utils/zustand-functions";
import { io } from "socket.io-client";

//STYLES

import Styles from "../FriendsList.module.css";

//COMPONENTS

import FriendRequestProfile from "../FriendRequestProfile/FriendRequestProfile";

//REACT IMPORTS

import { useEffect, useState } from "react";

export default function FriendRequests(props) {

    const user = useStore().user

    const [reqArray, setReqArray] = useState(props.friend_requests);

    const socket = io("http://localhost:3001");

    useEffect(() => {
        setReqArray(props.friend_requests)
    }, [props])

    useEffect(() => {
        socket.on('friens updated', async (data) => {
            const array = data.find((chat) => chat._id === user._id);
            setReqArray(array.friend_requests)
        })

        return () => {
            socket.off('friens updated', {});
        };
    }, [props])

    return (
        <>
            <div className={Styles['friends-list_block']}>
                { reqArray &&
                    reqArray.map((request) => {
                    return (
                        <FriendRequestProfile {...request} key={request._id}></FriendRequestProfile>
                    )
                    })
                }
            </div>
        </>
    )
}