import { validateMessageContent } from "@/app/authorization/data-utils/validateContentFunction";
import { postFunction, postServerFunction } from "../../authorization/data-utils/data-functions";

export const setObjectData = async(event, options) => {

    const { router, setSecondPage, setIdentical, setIsUserExist, userData, setPasswordLengthError, setUsernameLengthError, setUsernameError, usernameError, setValidContent } = options;

    event.preventDefault;
        
        userData.password = document.getElementById('password').value;

        const secondPasswordValue = document.getElementById('second-password').value;
        const regex = /[а-яА-ЯёЁ]/g;

        if (regex.test(document.getElementById('username').value)) {
            document.getElementById('username').classList.add('error-input')
            setUsernameError(true);
        } else {
            setValidContent(validateMessageContent(document.getElementById('username').value));
            if (validateMessageContent(document.getElementById('username').value) === true) {
                userData.username = document.getElementById('username').value;
                setUsernameError(false);

                console.log(userData.username)

                if (secondPasswordValue != userData.password) {     
                    setIdentical(false);
                    document.getElementById('password').classList.add("error-input");
                    document.getElementById('second-password').classList.add("error-input");
        
                } else if (secondPasswordValue === userData.password) {
        
                    let inputArray = document.getElementsByTagName('input');
                    inputArray = Array.from(inputArray);
        
                    const isUserExist = await postServerFunction("/registration", {username: userData.username});
        
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
                            if (!isUserExist) {
                                setSecondPage(true);
                            }
                            setIsUserExist(true)
                        }
                    });       
                }
            }
            
        }

        
}

export const createNewUser = async(event, options) => {
        const { router, setSecondPage, setIdentical, setIsUserExist, userData, setValidContent } = options;

        event.preventDefault;

        setValidContent(validateMessageContent(document.getElementById('textarea').value));
        if (validateMessageContent(document.getElementById('textarea').value) === true) {
            const getFileExtension = (file) => {
                const parts = file.name.split('.');
                return parts[parts.length - 1];
            }
    
            const formData = new FormData();
    
            if (document.getElementById('profile').files.length > 0) {
                const profile_file = document.getElementById('profile').files[0];
    
                const fileExtension = getFileExtension(profile_file);
    
                const profile_file_toSend = new File([profile_file], `${userData.username}.${fileExtension}`, { type: profile_file.type })
    
                formData.append("profile", profile_file_toSend);
            }
    
            userData.profile = "null";
            userData.about_user = document.getElementById('textarea').value;
    
            formData.append("userData", JSON.stringify(userData))
    
            postFunction(formData, "/user");
            router.push("/login")
        }

        
}

