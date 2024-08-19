//STYLES

import "../../globals.css";
import Styles from "../Registration.module.css";

//CLIENT FUNCTIONS

import { notEmptyCheck } from "@/app/authorization/correctFormFunctions/correctFormFunctions";
import { setObjectData } from "../registration_functions/registration_functions";


//REACT IMPORTS

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function FirstPage(props) {

    const {isIdentical, isUserExist, PasswordLengthError, UsernameLengthError, usernameError, validContent} = props;
    const usernameInput = useRef(null)

    useEffect(() => {
        if (validContent === false) {
            usernameInput.current.classList.add("error-block")
        }
    }, [validContent])

    return (
        <>
            <div className={Styles['login_form_section']}>
                <label htmlFor="username" className={Styles['form_label']}>Имя пользователя</label>
                <input ref={usernameInput} type="text" minLength={4} maxLength={16} onChange={notEmptyCheck} required autoComplete="off" id="username" className={`${isUserExist === false ? (UsernameLengthError ? Styles['form_input__error'] : Styles['form_input']) : Styles['form_input__error']}`} placeholder="Придумайте имя пользователя"/>

                { isUserExist === true &&
                    (<p className="error-message">Пользователь с таким именем уже существует</p>)
                }

                { UsernameLengthError === true &&
                    (<p className="error-message">Длина имени пользователя должна быть не менее 4 символов</p>)
                }

                { usernameError === true &&
                    (<p className="error-message">В имени пользователя должны быть только латинские символы</p>)
                }

                { validContent === false &&
                    (<p className="error-message">Кажется вы использовали в своём никнейме неприемлимые символы</p>)
                }

                <label htmlFor="password" className={Styles['form_label']}>Пароль</label>
                <input id="password" onChange={notEmptyCheck} maxLength={16} required autoComplete="off" type="password" className={Styles['form_input']} placeholder="Придумайте пароль"/>
                <input id="second-password" onChange={notEmptyCheck} required autoComplete="off" type="password" className={Styles['form_input']} style={{marginTop: '1%', marginBottom: '1%'}} placeholder="Повторите пароль"/>
                { isIdentical === false &&
                    (<p className="error-message">Пароли не совпадают</p>)
                }

                { PasswordLengthError === true &&
                    (<p className="error-message">Длина пароля должна быть не менее 6 символов</p>)
                }
            </div>

            <div className={Styles['login_form_section']}>
                <button type="button" className={Styles['form_button']} onClick={() => {setObjectData(event, props.options)}}>Продолжить</button>
                <Link className={Styles['registration_link']} href="/login">Уже есть аккаунт? Войти</Link>
            </div>
        </>
    )
}