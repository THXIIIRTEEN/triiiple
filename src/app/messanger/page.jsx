import Header from "../components/Header/Header";
import NewFriends from "../components/new-friends/NewFriends";
import Messanger from "./Messanger";

export default function Background() {
    return (
        <>
            <Header></Header>
            <Messanger></Messanger>
            <NewFriends></NewFriends>
        </>
    )
}