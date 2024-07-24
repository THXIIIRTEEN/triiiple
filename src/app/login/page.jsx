"use client"

import Link from "next/link";
import Styles from "./LoginForm.module.css";
import { useState } from "react";

import { notEmptyCheck } from "../authorization/correctFormFunctions/correctFormFunctions";
import { checkUserData } from "./login_functions/login_functions";

import { useRouter } from "next/navigation";
import { useStore } from "../authorization/data-utils/zustand-functions";

export default function LoginForm () {

    const [isCorrect, setIsCorrect] = useState(false);
    const [isUserDontExist, setUserDontExist] = useState(false);

    const router = useRouter();

    const options = {
        setIsCorrect: setIsCorrect,
        setUserDontExist: setUserDontExist,
        router: router,
        store: useStore()
    }

    return (
        <div className={Styles['login_block']}>
            <div className={Styles['greeting_block']}>
                <h1 className={Styles['authorization_h1']}>Вход</h1>
                <p className={Styles['authorization_greetings']}>С Возвращением!</p>
            </div>
            
            <form className={Styles['login_form']}>
                <div className={Styles['login_form_section']}>
                    <label htmlFor="username" className={Styles['form_label']}>Имя пользователя</label>
                    <input type="text" onChange={notEmptyCheck} required autoComplete="off" id="username" className={`${isUserDontExist === false ? Styles['form_input'] : Styles['form_input__error']}`} placeholder="Введите имя пользователя"/>

                    <label htmlFor="password" className={Styles['form_label']}>Пароль</label>
                    <input type="password" onChange={notEmptyCheck} required autoComplete="off" id="password" className={`${isUserDontExist === false ? Styles['form_input'] : Styles['form_input__error']}`} placeholder="Введите пароль"/>

                    { isUserDontExist === true &&
                        (<p className={Styles["error-message"]}>Неправильное имя пользователя или пароль</p>)
                    }

                    <Link className={Styles['form_link']} href="#">Забыли пароль?</Link>
                </div>

                <div className={Styles['login_form_section']}>
                    <button type="button" className={Styles['form_button']} onClick={() => {checkUserData(event, options)}}>Войти</button>
                    <Link className={Styles['registration_link']} href="/registration">Нет аккаунта в Triiiple? Создать аккаунт </Link>
                </div>
            </form>
        </div>
    );
}