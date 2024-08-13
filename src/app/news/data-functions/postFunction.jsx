"use client"

import { postServerFunction, deleteFunction, postFunction } from "@/app/authorization/data-utils/data-functions"
import { io } from "socket.io-client";
const socket = io('https://triiiple.vercel.app', {
    transports: ['websocket', 'polling']
});

export const postUtils = {
    like: async (id, postID) => {
        const result = await postServerFunction('/post/like', {id: id, postID: postID});
        if (result) {
            deleteFunction('/post/like', {id: id, postID: postID})
            return false
        }

        if (!result) {
            postServerFunction('/post/like/new', {id: id, postID: postID});
            return true
        }
    },
    checkLike: async (id, postID) => {
        const result = await postServerFunction('/post/like', {id: id, postID: postID});
        return result
    },
    postComment: async (postID, data) => {
        const result = await postServerFunction('/post/comment', {postID: postID, data: data});
        socket.emit('update comment', {});
        return result
    },
    deleteComment: async (postID, commentID) => {
        const result = await deleteFunction('/post/comment', {postID: postID, commentID: commentID});
        socket.emit('update comment', {});
        return result
    },
    getPostById: async (postID) => {
        const result = await postServerFunction('/post/getById', {postID: postID});
        return result
    },
    newPost: async (data) => {
        const result = postFunction(data, '/post/newPost');
        return result
    },
    getAllPostsOfUser: async (userID) => {
        const result = postServerFunction('/post/getAllPostsOfUser', {userID: userID});
        return result
    },
    deletePost: async (postID) => {
        const result = deleteFunction('/post', {postID: postID})
        return result
    }
}