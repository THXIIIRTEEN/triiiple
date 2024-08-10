//REACT IMPORTS

import Link from "next/link"
import { useEffect, useState } from "react"

export default function NewFriendsProfile(props) {

    const [username, setUsername] = useState(props.username)

    useEffect(() => {
        if (props.username.length > 10) {
            const maxLength = 10;
            const str = username;
            setUsername(str.slice(0, maxLength - 3) + '...')
        }
    })

    return (
        <li>
            <Link href={`http://localhost:3000/profile/${props.username}`}>
                {   props.profile === null ?
                    <img src="/images/profile/profile_picture.png" alt="profile"/> :
                    <img src={props.profile}/>
                }
                <h3>{username}</h3>
                <button>+</button>
            </Link>
        </li>
    )
}