"use client"

import { postServerFunction, postFunction, deleteFunction } from "@/app/authorization/data-utils/data-functions";
import { io } from "socket.io-client";
const socket = io("https://api.triiiple.ru");

export const messagerUtils = {
    createChat: async (userId, friendId) => {
        const result = await postServerFunction("/messanger/create", {userId: userId, friendId: friendId});
        return result
    },
    getChats: async (userId) => {
        const result = await postServerFunction("/messanger/getChats", {userId: userId});
        return result
    },
    getChatById: async (chatId) => {
        const result = await postServerFunction("/messanger/getChatsById", {chatId: chatId});
        return result  
    },
    newMessage: async (data) => {
        const result = await postFunction(data, '/messanger/newMessage');
        return result
    },
    deleteMessage: async (id) => {
        const result = await deleteFunction('/messanger', {id: id});
        socket.emit('send message', {});
        return result
    },
    findChat: async (userId, friendName) => {
        const result = await postServerFunction("/messanger/search", {userId: userId, friendName: friendName});
        return result  
    }
}