"use client"

//SERVER FUNCTIONS

import { postServerFunction } from "@/app/authorization/data-utils/data-functions";
import { useStore } from "../../authorization/data-utils/zustand-functions";

//COMPONENTS

import Preloader from "@/app/components/Preloader/preloader";
import Header from "../../components/Header/Header";
import NewFriends from "../../components/new-friends/NewFriends";
import Profile from "./Profile";

//REACT IMPORTS

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Background() {

    const [data, setData] = useState(null)

    const user = useStore().user;
    const pathname = usePathname().split('/').pop();

    useEffect(() => {
        const getData = async (pathname) => {
            const data = await postServerFunction('/getUser', {username: pathname});
            setData(data)
        };
        getData(pathname)
    }, [])

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
                <Profile props={data}></Profile>
                <NewFriends></NewFriends>
            </>
        )
    }
}