"use client"

import { checkUserExist, deleteFunction, getFunction, postFunction } from "@/app/authorization/data-utils/data-functions"

export const friendUtils = {
    sendFriendReq: async (userId, friendId) => {
        const result = await checkUserExist('/friends/request', {userId: userId, friendId: friendId});
        return result;
    },
    cancelFriendReq: async (userId, friendId) => {
        const result = await deleteFunction('/friends/request', {userId: userId, friendId: friendId});
        return result;
    },
    acceptReq: async (userId, friendId) => {
        const result = await checkUserExist('/friends/accept', {userId: userId, friendId: friendId});
        return result;
    },
    declineReq: async (userId, friendId) => {
        const result = await deleteFunction('/friends/decline', {userId: userId, friendId: friendId});
        return result;
    },
    deleteFriend: async (userId, friendId) => {
        const result = await deleteFunction('/friends/delete', {userId: userId, friendId: friendId});
        return result;
    },
    getRandomUsers: async (userId) => {
        const result = await checkUserExist('/friends/random', {userId: userId});
        return result;
    }
}