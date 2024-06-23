"use client"

import Styles from "./authorization.module.css";
import LoginForm from "../../login/page";
import RegistrationForm from "../../registration/page";
import { useState } from "react";

export default function Authorization() {

    const [form, setForm] = useState("Login")

    return (
        <main className={Styles['authorization_block']}>
            {form == "Login" ? 
                (<LoginForm setForm={setForm}></LoginForm>) :
                (<RegistrationForm setForm={setForm}></RegistrationForm>)
            }
        </main>
    )
}