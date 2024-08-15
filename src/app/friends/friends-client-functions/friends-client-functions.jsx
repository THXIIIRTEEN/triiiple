import { messagerUtils } from "@/app/messanger/messagerFunctions/messagerFunction";
import { friendUtils } from "../FriendFunctions/FriendFunctions";

export const findUser = async (event, searchInput, setSearchResult) => {
    event.preventDefault();
    const username = searchInput.current.value;
    const result = await friendUtils.findUserByUsername(username)
    setSearchResult(result)
}

export const closeSearch = (event, setSearchResult) => {
    event.preventDefault();
    setSearchResult(false)
};

export const acceptReq = async (user, friend) => {
    await friendUtils.acceptReq(user._id, friend._id);
};

export const declineReq = async (user, friend) => {
    await friendUtils.declineReq(user._id, friend._id);
};

export const copyProfileLink = (friend) => {
    const url = `http://89.191.225.116/profile/${friend.username}`;
    navigator.clipboard.writeText(url)
};

export const deleteFriend = async (user, friend) => {
    await friendUtils.deleteFriend(user._id, friend._id);
};

export const createChat = async (user, props, router) => {
    const result = await messagerUtils.createChat(user._id, props._id);
    router.push(`/messanger/chat/${result._id}`)
}

export const sendFriendReq = async(event, setRequestSent, user, data) => {
    event.preventDefault();
    setRequestSent(true)
    await friendUtils.sendFriendReq(user._id, data._id);
}

export const cancelFriendReq = async(event, setRequestSent, user, data) => {
    event.preventDefault();
    setRequestSent(false)
    await friendUtils.cancelFriendReq(user._id, data._id)
}


