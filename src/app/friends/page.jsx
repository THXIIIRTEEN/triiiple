"use client"

//SERVER FUNCTIONS

import { useStore } from "../authorization/data-utils/zustand-functions";

//COMPONENTS

import Header from "../components/Header/Header";
import NewFriends from "../components/new-friends/NewFriends";
import Preloader from "../components/Preloader/preloader";
import FriendsPage from "./FriendsPage/FriendsPage";

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
                <FriendsPage></FriendsPage>
                <NewFriends></NewFriends>
            </>
        )
    }
}