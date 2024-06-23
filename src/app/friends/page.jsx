import Header from "../components/Header/Header";
import NewFriends from "../components/new-friends/NewFriends";
import FriendsList from "./FriendsList";

export default function Background() {
    return (
        <>
            <Header></Header>
            <FriendsList></FriendsList>
            <NewFriends></NewFriends>
        </>
    )
}