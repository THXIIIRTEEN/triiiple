import { getFunction, loginCheckUser, postFunction } from "../../authorization/data-utils/data-functions";

export const setObjectData = (event, options) => {

    const { router, setSecondPage, setIdentical, setIsUserExist, userData, setPasswordLengthError, setUsernameLengthError } = options

    event.preventDefault;
        userData.username = document.getElementById('username').value;
        userData.password = document.getElementById('password').value;

        const secondPasswordValue = document.getElementById('second-password').value;

        if (secondPasswordValue != userData.password) {     
            setIdentical(false);
            document.getElementById('password').classList.add("error-input");
            document.getElementById('second-password').classList.add("error-input");

        } else if (secondPasswordValue === userData.password) {

            let inputArray = document.getElementsByTagName('input');
            inputArray = Array.from(inputArray);

            inputArray.forEach((inputАField) => {
                if (inputАField.value == "") {
                    inputАField.classList.add("error-input");
                }

                else if (document.getElementById('password').value.length < 6) {
                    document.getElementById('password').classList.add("error-input");
                    document.getElementById('second-password').classList.add("error-input");
                    setPasswordLengthError(true);
                }

                else if (document.getElementById('username').value.length < 4) {
                    document.getElementById('username').classList.add("error-input");
                    setUsernameLengthError(true);
                }

                else {
                    setSecondPage(true);
                }
            });
            
        }
}

export const createNewUser = async(event, options) => {

    const { router, setSecondPage, setIdentical, setIsUserExist, userData } = options

    event.preventDefault;
        userData.profile = document.getElementById('profile').value;
        userData.about_user = document.getElementById('textarea').value;

        const userArray = await getFunction("/user");

        const checkUser = () => {
            for (let i = 0; i < userArray.length; i++) {
                if (userArray[i].username == userData.username) {
                    return true;
                } 
            };
        }

        const checkUserResult = () => {
            const res = checkUser();

            if (res == true) {
                setSecondPage(false);
                setIsUserExist(true)
            }

            else if (res != true) {
                postFunction(userData, "/user")
                router.push("/login")
            };            
        }       

        checkUserResult();
}