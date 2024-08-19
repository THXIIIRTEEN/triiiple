//STYLES

import "../../globals.css";
import Styles from "../Registration.module.css";

//CLIENT FUNCTIONS

import { notEmptyCheck } from "@/app/authorization/correctFormFunctions/correctFormFunctions";
import { createNewUser } from "../registration_functions/registration_functions";

//REACT IMPORTS

import Link from "next/link";
import { useRef, useEffect, useState } from 'react';

export default function SecondPage(props) {

    const { router, setSecondPage, setIdentical, setIsUserExist, userData } = props.options;
    console.log(props.validContent)

    const fileInputRef = useRef(null);
    const imageBackgroundRef = useRef(null);
    const imageInputBLock = useRef(null);

    const textarea = useRef(null);

    const [incorrectFile, setIncorrectFile] = useState(false);

    useEffect(() => {
        if (props.validContent === false) {
            textarea.current.classList.add("error-block")
        }
    }, [props.validContent])

    const uploadProfile = (event) => {
        var target = event.target;

        var file = target.files[0];

        if (file.type.indexOf('image/') === -1) {
            setIncorrectFile(true);
            imageInputBLock.current.classList.add("error-block")
            return;
        }

        else if (file.type.indexOf('image/') === 0) {
            var fileReader = new FileReader();

            fileReader.onload = function() {
                imageBackgroundRef.current.style.backgroundImage = `url(${fileReader.result})`;
            }

            fileReader.readAsDataURL(target.files[0]);
        }           
    }

    useEffect(() => {
        fileInputRef.current.onchange = uploadProfile;
    }, []);

    return (
        <>
            <div>
                <h2 className={Styles['blue-gradient-text']}>Профиль</h2>
                <p className={Styles['black-supportive-text']}>Давайте настроим для вас профиль</p>
            </div>

            <div className={Styles['profile_main-block']}>
                <div ref={imageInputBLock} className={Styles['profile_input__block']}>
                    <div ref={imageBackgroundRef} className={Styles['profile_input__background']}>
                        <input id="profile" autoComplete="off" ref={fileInputRef} name="profile" onChange={notEmptyCheck} className={Styles['profile_input']} type="file"></input>
                    </div>
                    <div className={Styles['profile_input__right-section']}>
                            <label className={Styles['textarea_label']} htmlFor="textarea">{userData.username}</label>
                            <textarea ref={textarea} className={Styles['textarea']} maxLength={60} id="textarea" placeholder="Расскажите о себе"></textarea>
                    </div>
                </div>
            </div>

            { incorrectFile === true && 
                (<p className="error-message_avatar">Загруженный файл должен быть изображением</p>)
            }

            { props.validContent === false &&
                    (<p className="error-message">Кажется вы использовали в своём описании неприемлимые символы</p>)
            }

            <div className={Styles['login_form_section']}>
                <button type="button" className={Styles['form_button']} onClick={() => createNewUser(event, props.options)}>Создать аккаунт</button>
                <Link className={`${Styles['registration_link']} ${Styles['user-policy']}`} href="#" onClick={() => setForm("Login")}>Нажимая «Создать аккаунт», вы принимаете <br></br> <span>пользовательское соглашение и политику конфиденциальности</span></Link>
            </div>
        </>
    )
}
