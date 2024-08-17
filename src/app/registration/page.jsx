"use client"

//COMPONENTS

import FirstPage from "./registration_modules/first-page";
import SecondPage from "./registration_modules/second-page";

//STYLES

import Styles from "./Registration.module.css";

//REACT IMPORTS

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export default function RegistrationForm() {

    const router = useRouter();

    const [secondPage, setSecondPage] = useState(false);
    const [isIdentical, setIdentical] = useState(true);
    const [isUserExist, setIsUserExist] = useState(false);
    const [PasswordLengthError, setPasswordLengthError] = useState(false);
    const [UsernameLengthError, setUsernameLengthError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);

    const userData = useMemo(() => {
        return {
            username: 0, 
            password: 0,
            profile: 0,
            about_user: 0
        };

    }, [router]);

    const options = {
        router: router,
        setSecondPage: setSecondPage,
        setIdentical: setIdentical,
        setIsUserExist: setIsUserExist,
        userData: userData,
        setPasswordLengthError: setPasswordLengthError,
        setUsernameLengthError: setUsernameLengthError,
        setUsernameError: setUsernameError,
    }

    return (      
        <div className={Styles['login_block']}>
            <div className={Styles['greeting_block']}>
                <h1 className={Styles['authorization_h1']}>Регистрация</h1>
                <p className={Styles['authorization_greetings']}>Добро пожаловать!</p> 
            </div>
            
            <form className={Styles['login_form']} encType={"multipart/form-data"}>
                { secondPage == false && (
                    <FirstPage isIdentical = {isIdentical} isUserExist = {isUserExist} PasswordLengthError = {PasswordLengthError} UsernameLengthError = {UsernameLengthError} usernameError = {usernameError} options = {options}/>
                 ) } 
                { secondPage == true && ( 
                    <SecondPage isIdentical = {isIdentical} isUserExist = {isUserExist} options = {options}/>
                 ) }  
            </form>
        </div>
    );
}

