import "../../globals.css";
import Styles from "../Registration.module.css";
import { notEmptyCheck } from "@/app/authorization/correctFormFunctions/correctFormFunctions";
import Link from "next/link";
import { createNewUser } from "../registration_functions/registration_functions";

export default function SecondPage(props) {

    const { router, setSecondPage, setIdentical, setIsUserExist, userData } = props.options

    return (
        <>
            <div>
                <h2 className={Styles['blue-gradient-text']}>Профиль</h2>
                <p className={Styles['black-supportive-text']}>Давайте настроим для вас профиль</p>
            </div>

            <div className={Styles['profile_main-block']}>
                <div className={Styles['profile_input__block']}>
                    <div className={Styles['profile_input__background']}>
                        <input id="profile" autoComplete="off" onChange={notEmptyCheck} className={Styles['profile_input']} type="file"></input>
                    </div>
                    <div className={Styles['profile_input__right-section']}>
                            <label className={Styles['textarea_label']} htmlFor="textarea">{userData.username}</label>
                            <textarea className={Styles['textarea']} maxLength={60} id="textarea" placeholder="Расскажите о себе"></textarea>
                    </div>
                </div>
            </div>
            <div className={Styles['login_form_section']}>
                <button type="button" className={Styles['form_button']} onClick={() => {createNewUser(event, props.options)}}>Создать аккаунт</button>
                <Link className={`${Styles['registration_link']} ${Styles['user-policy']}`} href="#" onClick={() => setForm("Login")}>Нажимая «Создать аккаунт», вы принимаете <br></br> <span>пользовательское соглашение и политику конфиденциальности</span></Link>
            </div>
        </>
    )
}