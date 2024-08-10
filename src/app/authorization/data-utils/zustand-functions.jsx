import { create } from "zustand";
import { postServerFunction, loginFunction, verifyJWT } from "./data-functions";
import { getJWT, setJWT } from "./jwt-functions";

export const useStore = create((set) => ({
    token: null,
    user: null,
    isAuth: false,
    login: (user) => {
        set({ isAuth: true, user, token: user.jwt });
        setJWT(user.jwt);
    },
    auth: async () => {
        const token = getJWT()
        if (token) {
            const verifiedToken = await verifyJWT('/verification', {token: token});
            const userID = verifiedToken._id;
            const user = await postServerFunction('/userByID', {id: userID})
            set({ isAuth: true, user: user })
            return {
                token: token,
                user: user,
                isAuth: true
            }
        }
    }
  }))