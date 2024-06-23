import { getFunction } from "@/app/authorization/data-utils/data-functions";
import bcrypt from "bcryptjs-react";

export const checkUserData = (event, options) => {

    const { setIsCorrect, setUserDontExist, router } = options;

    event.preventDefault;

    let inputArray = document.getElementsByTagName('input');
    inputArray = Array.from(inputArray);

    inputArray.forEach((inputАField) => {
        if (inputАField.value == "") {
            inputАField.classList.add("error-input");
        }

        else {
            setIsCorrect(true)
        }
    });

    const userData = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    }

        const getUserData = async () => {
            const userArray = await getFunction("/user");

            for (let i = 0; i < userArray.length; i++) {

                if (userArray[i].username === userData.username && bcrypt.compareSync(userData.password, userArray[i].password) === true) {
                    router.push('/profile')
                    setUserDontExist(false); 
                    break                    
                } 

                else {
                    setUserDontExist(true);     
                }

            }

        };

        getUserData()
    };