"use client"

import { postServerFunction, postFunction, deleteFunction } from "@/app/authorization/data-utils/data-functions";

export const settingsUtils = {
    updateProfile: async (data) => {
        const result = await postFunction(data, "/user/updateProfile");
        return result;
    },
    updateUsername: async (data) => {
        const result = await postServerFunction('/user/updateUsername', data);
        return result;
    },
    updateAboutMe: async (data) => {
        const result = await postServerFunction('/user/updateAboutMe', data);
        return result;
    },
    updatePassword: async (data) => {
        const result = await postServerFunction('/user/updatePassword', data);
        return result;
    }
}