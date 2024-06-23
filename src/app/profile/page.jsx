import Header from "../components/Header/Header";
import NewFriends from "../components/new-friends/NewFriends";
import Profile from "./Profile";

export default function Background() {
    return (
        <>
            <Header></Header>
            <Profile></Profile>
            <NewFriends></NewFriends>
        </>
    )
}