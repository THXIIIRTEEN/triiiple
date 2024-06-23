"use client"

import Link from "next/link"
import Styles from "./Header.module.css"
import { usePathname } from "next/navigation";

export default function Header() {

    const pathname = usePathname();

    return (
        <header className={Styles['header']}>
            <ul className={Styles['navbar']}>
                <li className={`${pathname === "/profile" ? Styles["active"] : ""}`}>
                    <Link href="/profile">
                        {pathname === "/profile" ? <img src="./images/header-images/profile-white.svg"/> :
                                                    <img src="./images/header-images/profile.svg"/>
                        }
                    </Link>
                </li>
                <li className={`${pathname === "/news" ? Styles["active"] : ""}`}>
                    <Link href="/news">
                        {pathname === "/news" ? <img src="./images/header-images/news-white.svg"/> :
                                                    <img src="./images/header-images/news.svg"/>
                        }
                    </Link>
                </li>
                <li className={`${pathname === "/messanger" ? Styles["active"] : ""}`}>
                    <Link href="messanger">
                        {pathname === "/messanger" ? <img src="./images/header-images/messanger-white.svg"/> :
                                                    <img src="./images/header-images/messanger.svg"/>
                        }
                    </Link>
                </li>
                <li className={`${pathname === "/friends" ? Styles["active"] : ""}`}>
                    <Link href="friends">
                        {pathname === "/friends" ? <img src="./images/header-images/friends-white.svg"/> :
                                                    <img src="./images/header-images/friends.svg"/>
                        }
                    </Link>
                </li>
            </ul>

            <div className={Styles['settings-block']}>
                <ul>
                    <li>
                        <img src="./images/header-images/settings.svg"/>
                    </li>
                    <li>
                        <img src="./images/header-images/photo.svg"/>
                    </li>
                </ul>
            </div>
        </header>
    )
}