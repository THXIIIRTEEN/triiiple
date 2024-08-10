"use client"

//SERVER FUNCTIONS

import { useStore } from "../../../authorization/data-utils/zustand-functions";

//COMPONENTS

import Header from "../../../components/Header/Header";
import NewFriends from "../../../components/new-friends/NewFriends";
import Preloader from "../../../components/Preloader/preloader";
import Chat from "./Chat";

export default function Background() {

    const user = useStore().user;

    if (!user) {
        return (
            <>
                <Preloader></Preloader>
            </>
        )
    }

    if (user) {
        return (
            <>
                <Header></Header>
                <Chat></Chat>
                <NewFriends></NewFriends>
            </>
        )
    }
}