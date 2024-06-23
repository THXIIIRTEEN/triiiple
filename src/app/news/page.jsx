import Header from "../components/Header/Header";
import NewFriends from "../components/new-friends/NewFriends";
import NewsList from "./news-list/NewsList";

export default function Background() {
    return (
        <>
            <Header></Header>
            <NewsList></NewsList>
            <NewFriends></NewFriends>
        </>
    )
}