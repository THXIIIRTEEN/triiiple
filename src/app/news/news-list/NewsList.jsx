"use client"

import { newpostFunction } from "../data-functions/new-postFunction";
import NewsBlock from "../news-block/NewsBlock";
import Styles from "./NewsList.module.css"
import { useState } from "react";

export default function NewsList() {

    const [isCorrect, setIsCorrect] = useState(false);
    const [isError, setIsError] = useState(false);

    const publishFunction = (event) => {
        event.preventDefault();

        const textInput = document.getElementById("text").value;

        if (textInput == "") {
            setIsError(true)
        } else if (textInput != "") {
            setIsCorrect(true);
        }
        
        if (isCorrect === true) {
            let postData = {
                text: textInput,
                picture: document.getElementById("file_input").value
            }
            newpostFunction(postData);
        }
    }

    return (
        <div className= {Styles['news-list_block']}>
            <h1>Что у вас нового?</h1>

            <p>
                Поделитесь с окружающими своими мыслями, жизненным
                опытом и впечатлениями.
            </p>

            <form className={isError === true ? `error-input ${Styles['news-list_input']} ${Styles['error-input']}` : Styles['news-list_input']}>
                <input required type="text" id="text" placeholder="Что у вас на уме, Имя пользователя?"/>

                <div className={Styles['news-list_input__buttons']}>
                    <div className={Styles['first-button']}>
                        <input id="file_input" type="file" placeholder="" className={Styles['news-list_file-input']}/>
                    </div>

                    <button id="publish" type="submit" onClick={() => {publishFunction(event)}} className={Styles['second-button']}>Опубликовать</button>
                </div>
            </form>

            <div className={Styles["news-block_list"]}>
                <NewsBlock></NewsBlock>
                <NewsBlock></NewsBlock>
                <NewsBlock></NewsBlock>
            </div>  
        </div>
    )
}