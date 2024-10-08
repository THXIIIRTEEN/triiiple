"use client"

import { useStore } from "../authorization/data-utils/zustand-functions";
import Header from "../components/Header/Header";
import NewFriends from "../components/new-friends/NewFriends";
import Preloader from "../components/Preloader/preloader";
import Settings from "./settings-page/Settings";

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
            <Settings></Settings>
            <NewFriends></NewFriends>
            </>
        )
    }
}