import { messagerUtils } from "@/app/messanger/messagerFunctions/messagerFunction";
import { io } from "socket.io-client";
const socket = io('https://triiiple.vercel.app', {
    transports: ['websocket', 'polling']
});

export const publishMessageFunction = async (event, newPostInput, setIsCorrect, isCorrect, chatId, user, fileInput) => {
    event.preventDefault();

    const textInputValue = newPostInput.current.value;

    if (textInputValue == "") {
        setIsCorrect(false);
    } else if (textInputValue != "") {
        setIsCorrect(true);
    }
    
    if (isCorrect === true) {
        const postFormData = new FormData();
        const postUserData = {
            author: user.username,
            time: new Date(),
            text: textInputValue,
            chatId: chatId
        };
        const postFilePicture = fileInput.current.files[0];
        postFormData.append("userData", JSON.stringify(postUserData));
        if (postFilePicture != "") {
            postFormData.append("postPicture", postFilePicture);
        }
        const result = await messagerUtils.newMessage(postFormData);
        const mes = JSON.parse(result);
        const chatID = location.pathname.split('/').pop();
        socket.emit('send notification', {mes, chatID})
        socket.emit('send message', {});
        newPostInput.current.value = ""
    }
}