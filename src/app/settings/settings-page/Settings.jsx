//SERVER FUNCTIONS

import { useStore } from "@/app/authorization/data-utils/zustand-functions";

//CLIENT FUNCTIONS

import { changePasswordFunction, closeInput, showAboutUserFunction, showInput, showPasswordFunction, showUsernameInputFunction, updateAboutMe, updateProfilePicture, updateUsername } from "../settings-client-functions/settings-client-functions";

//STYLES

import Styles from "../Settings.module.css";

//REACT IMPORTS

import { useRef, useState } from "react";

export default function Settings() {

    const user = useStore().user;

    const [show, setShow] = useState(false);
    const [showUsernameInput, setShowUsernameInput] = useState(false);
    const [showAboutUser, setShowAboutUser] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [incorrectFile, setIncorrectFile] = useState(false);
    const [image, setImage] = useState(user.profile);

    const [usernameExist, setUsernameExist] = useState(false);

    const [emptyPassword, setEmptyPassword] = useState(false);
    const [passwordCompared, setPasswordCompared] = useState(false);
    const [incorrectPassword, setIncorrectPassword] = useState(false);
    const [invalidPasswordLength, setInvalidPasswordLength] = useState(false);
    const [invalidUsernameLength, setInvalidUsernameLength] = useState(false);
    const [usernameError, setUsernameError] = useState(false);

    const newPassword = useRef(null);
    const newPasswordAgain = useRef(null);
    const oldPassword = useRef(null);

    const imageInputBLock = useRef(null);

    const usernameInput = useRef(null);
    const usernameInputBlock = useRef(null);

    const AboutMe = useRef(null);

    return (
        <div className={Styles['settings_block']}>
            <h1>Настройки</h1>
            <div className={Styles['settings_block_main-content']}>
                <div className={Styles['settings_profile-picture']}>
                    <h2>Аватар</h2>
                    <div ref={imageInputBLock} onMouseEnter={() => {showInput(setShow)}} onMouseLeave={() => {closeInput(setShow)}} className={Styles['profile-picture_block']}>
                        {   show === true &&
                            <input name="profile" onChange={(event) => {updateProfilePicture(event, user, setIncorrectFile, imageInputBLock, setImage)}} className={Styles['profile-picture_input']} type="file"/>
                        }
                        {   show === true &&
                            <div className={Styles['profile-picture_input__stylized']}>
                                <img src="/images/settings/edit.svg"/>
                            </div>
                        }
                        {   image === null ?
                            <img src="/images/profile/profile_picture.png"/> :
                            <img src={image}/>                        
                        }
                        {   incorrectFile === true &&
                            <p className={Styles['error-message']}>Файл должен быть изображением</p>
                        }
                    </div>
                </div>
                <div>
                    <div className={Styles['settings_block_category-name']}>
                        <h2 onClick={() => {showUsernameInputFunction(setShowUsernameInput, showUsernameInput)}}>Имя пользователя</h2>
                        <button onClick={() => {showUsernameInputFunction(setShowUsernameInput, showUsernameInput)}}>
                            <img src="/images/settings/edit.svg"/>
                        </button>
                    </div>
                    {   showUsernameInput === false &&
                        <p>{user.username}</p>
                    }
                    {   showUsernameInput === true &&
                        <form ref={usernameInputBlock} className={Styles['username_input']}>
                            <input ref={usernameInput} placeholder={user.username}/>

                            <button onClick={(event) => {updateUsername(event, user, usernameInput, setInvalidUsernameLength, usernameInputBlock, setUsernameExist, setUsernameError)}}>
                                <img src="/images/new-block/send_button.svg"/>
                            </button>
                        </form>
                    }
                    {   usernameExist === true &&
                        <p className={Styles['error-message']}>Это имя пользователя уже занято</p>
                    }
                    {   invalidUsernameLength === true &&
                        <p className={Styles['error-message']}>Имя пользователя должно быть больше 3 символов</p>
                    }

                    { usernameError === true &&
                        <p className={Styles['error-message']}>В имени пользователя должны быть только латинские символы</p>
                    }

                    <div className={Styles['settings_block_category-name']}>
                        <h2 onClick={() => {showAboutUserFunction(setShowAboutUser, showAboutUser)}}>Обо мне</h2>
                        <button onClick={() => {showAboutUserFunction(setShowAboutUser, showAboutUser)}}>
                            <img src="/images/settings/edit.svg"/>
                        </button>
                    </div>
                    {   showAboutUser === false &&
                        <p>{user.about_user}</p>
                    }
                    {   showAboutUser === true &&
                        <form className={`${Styles['username_input']} ${Styles['about-user_input']}`}>
                            <textarea ref={AboutMe} rows={4} placeholder={user.about_user} />
                            <button onClick={(event) => {updateAboutMe(event, user, AboutMe)}}>
                                <img src="/images/new-block/send_button.svg"/>
                            </button>
                        </form>
                    }
                    <div className={Styles['settings_block_category-name']}>
                        <h2 onClick={() => {showPasswordFunction(setShowPassword, showPassword)}}>Пароль</h2>
                        <button onClick={() => {showPasswordFunction(setShowPassword, showPassword)}}>
                            <img src="/images/settings/edit.svg"/>
                        </button>
                    </div>
                    {   showPassword === false &&
                        <p>******</p>
                    }
                    {   showPassword === true &&
                        <>
                            <form className={Styles['password_input']}>
                                <label for="old-password">Введите пароль</label>
                                <input ref={oldPassword} type="password" name="old-password" placeholder={'****************'}/>

                                {   incorrectPassword === true &&
                                    <p className={Styles['error-message']}>Неверный пароль</p>
                                }

                                {   emptyPassword === true &&
                                    <p className={Styles['error-message']}>Заполните все поля</p>
                                }

                                <label for="new-password">Введите новый пароль</label>
                                <input ref={newPassword} type="password" name="new-password" placeholder={'****************'}/>

                                <label for="new-password-again">Повторите новый пароль</label>
                                <input ref={newPasswordAgain} type="password" name="new-password-again" placeholder={'****************'}/>

                                {   passwordCompared === true &&
                                    <p className={Styles['error-message']}>Пароли не совпадают</p>
                                }

                                {   invalidPasswordLength === true &&
                                    <p className={Styles['error-message']}>Длина пароля должна быть больше 5 символов</p>
                                }

                                <button onClick={(event) => {changePasswordFunction(event, oldPassword, newPassword, newPasswordAgain, user, setIncorrectPassword, setEmptyPassword, setPasswordCompared, setInvalidPasswordLength)}}>Отправить
                                    <img src="/images/new-block/send_button.svg"/>
                                </button>
                            </form>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}