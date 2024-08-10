"use client"

//STYLES

import Styles from "./authorization.module.css";

//COMPONENTS

import LoginForm from "../../login/page";
import RegistrationForm from "../../registration/page";

//REACT IMPORTS

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