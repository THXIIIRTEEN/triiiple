"use client"

import Link from "next/link"
import Styles from "./Header.module.css"
import { usePathname } from "next/navigation";
import { useStore } from "@/app/authorization/data-utils/zustand-functions";
import { removeJWT } from "@/app/authorization/data-utils/jwt-functions";
import { useRouter } from "next/navigation";

export default function Header() {

    const pathname = usePathname();
    const router = useRouter();
    const store = useStore().user;

    const exitFunction = (event) => {
        event.preventDefault;
        removeJWT();
        router.push(`/login`); 
    }

    return (
        <header className={Styles['header']}>
            <ul className={Styles['navbar']}>
                <li className={`${pathname === `/profile/${store.username}` ? Styles["active"] : ""}`}>
                    <Link href={`/profile/${store.username}`}>
                        {pathname === `/profile/${store.username}` ? <img src="/images/header-images/profile-white.svg"/> :
                                                    <img src="/images/header-images/profile.svg"/>
                        }
                    </Link>
                </li>
                <li className={`${pathname === "/news" ? Styles["active"] : ""}`}>
                    <Link href="/news">
                        {pathname === "/news" ? <img src="/images/header-images/news-white.svg"/> :
                                                    <img src="/images/header-images/news.svg"/>
                        }
                    </Link>
                </li>
                <li className={`${pathname === "/messanger" ? Styles["active"] : ""}`}>
                    <Link href="/messanger">
                        {pathname === "/messanger" ? <img src="/images/header-images/messanger-white.svg"/> :
                                                    <img src="/images/header-images/messanger.svg"/>
                        }
                    </Link>
                </li>
                <li className={`${pathname === "/friends" ? Styles["active"] : ""}`}>
                    <Link href="/friends">
                        {pathname === "/friends" ? <img src="/images/header-images/friends-white.svg"/> :
                                                    <img src="/images/header-images/friends.svg"/>
                        }
                    </Link>
                </li>
            </ul>

            <div className={Styles['settings-block']}>
                <ul>
                    <li>
                        <img src="/images/header-images/settings.svg"/>
                    </li>

                    <button onClick={event => {exitFunction(event)}}>
                        <img src="/images/header-images/exit.svg"/>
                    </button>
                </ul>
            </div>
        </header>
    )
}