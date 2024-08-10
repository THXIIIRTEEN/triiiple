"use client"

//SERVER FUNCTIONS

import { useStore } from "../authorization/data-utils/zustand-functions";

//COMPONENTS

import Header from "../components/Header/Header";
import NewFriends from "../components/new-friends/NewFriends";
import Messanger from "./Messanger";
import Preloader from "../components/Preloader/preloader";

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
                <Messanger></Messanger>
                <NewFriends></NewFriends>
            </>
        )
    }
}