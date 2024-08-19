import { validateMessageContent } from "@/app/authorization/data-utils/validateContentFunction";
import { useStore } from "@/app/authorization/data-utils/zustand-functions";
import { friendUtils } from "@/app/friends/FriendFunctions/FriendFunctions";
import { messagerUtils } from "@/app/messanger/messagerFunctions/messagerFunction";
import { postUtils } from "@/app/news/data-functions/postFunction";

export const publishFunction = (event, newPostInput, fileInput, setIsCorrect, isCorrect, user, setValidContent) => {
    event.preventDefault();

    const textInputValue = newPostInput.current.value;

    if (textInputValue == "" && fileInput.current.files.length === 0) {
        setIsCorrect(false);
    } else if (textInputValue != "" || fileInput.current.files.length != 0) {
        setIsCorrect(true);
    }

    setValidContent(validateMessageContent(textInputValue));
    
    if (isCorrect === true && (newPostInput.current.value != "" || fileInput.current.files.length != 0) && validateMessageContent(textInputValue) === true) {
        const postFormData = new FormData();
        const postUserData = {
            author: user.username,
            time: new Date(),
            text: textInputValue
        };
        const postFilePicture = fileInput.current.files[0];
        postFormData.append("userData", JSON.stringify(postUserData));
        if (postFilePicture != "") {
            postFormData.append("postPicture", postFilePicture);
        }
        postUtils.newPost(postFormData)
        location.reload()
    }
}

export const copyProfileUrl = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url)
}

export const sendFriendReq = async(setRequestSent, requestSent, user, props) => {
    setRequestSent(!requestSent)
    const res = await friendUtils.sendFriendReq(user._id, props._id)
}

export const cancelFriendReq = async(setRequestSent, requestSent, user, props) => {
    setRequestSent(!requestSent)
    const res = await friendUtils.cancelFriendReq(user._id, props._id)
}

export const createChat = async (router, user, props) => {
    const result = await messagerUtils.createChat(user._id, props._id);
    router.push(`/messanger/chat/${result._id}`)
}

