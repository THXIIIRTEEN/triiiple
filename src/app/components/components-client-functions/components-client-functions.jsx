import { removeJWT } from "@/app/authorization/data-utils/jwt-functions";

export const exitFunction = (event, router) => {
    event.preventDefault;
    removeJWT();
    router.push(`/login`); 
}