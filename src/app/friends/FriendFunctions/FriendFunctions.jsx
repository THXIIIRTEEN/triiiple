"use client"

import { postServerFunction, deleteFunction, getFunction, postFunction } from "@/app/authorization/data-utils/data-functions"
import { io } from "socket.io-client";
const socket = io("http://89.191.225.116");

export const friendUtils = {
    sendFriendReq: async (userId, friendId) => {
        const result = await postServerFunction('/friends/request', {userId: userId, friendId: friendId});
        socket.emit('update friends', {});
        return result;
    },
    cancelFriendReq: async (userId, friendId) => {
        const result = await deleteFunction('/friends/request', {userId: userId, friendId: friendId});
        socket.emit('update friends', {});
        return result;
    },
    acceptReq: async (userId, friendId) => {
        const result = await postServerFunction('/friends/accept', {userId: userId, friendId: friendId});
        socket.emit('update friends', {});
        return result;
    },
    declineReq: async (userId, friendId) => {
        const result = await deleteFunction('/friends/decline', {userId: userId, friendId: friendId});
        socket.emit('update friends', {});
        return result;
    },
    deleteFriend: async (userId, friendId) => {
        const result = await deleteFunction('/friends/delete', {userId: userId, friendId: friendId});
        socket.emit('update friends', {});
        location.reload();
        return result;
    },
    getRandomUsers: async (userId) => {
        const result = await postServerFunction('/friends/random', {userId: userId});
        return result;
    },
    findUserByUsername: async (username) => {
        const result = await postServerFunction('/friends/find', {username: username});
        return result
    }
}