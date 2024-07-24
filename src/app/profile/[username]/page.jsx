"use client"

import { useEffect, useState } from "react";
import { useStore } from "../../authorization/data-utils/zustand-functions";
import Header from "../../components/Header/Header";
import NewFriends from "../../components/new-friends/NewFriends";
import Profile from "./Profile";
import { usePathname } from "next/navigation";
import { checkUserExist } from "@/app/authorization/data-utils/data-functions"
import Preloader from "@/app/components/Preloader/preloader";

export default function Background() {

    const [data, setData] = useState(null)
    
    const user = useStore().user;
    const pathname = usePathname().split('/').pop();

    useEffect(() => {
        const getData = async (pathname) => {
            const data = await checkUserExist('/getUser', {username: pathname});
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