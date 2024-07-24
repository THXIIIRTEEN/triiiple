import { postFunction, checkUserExist } from "../../authorization/data-utils/data-functions";

export const setObjectData = async(event, options) => {

    const { router, setSecondPage, setIdentical, setIsUserExist, userData, setPasswordLengthError, setUsernameLengthError } = options;

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

            const isUserExist = await checkUserExist("/registration", {username: userData.username});

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

export const createNewUser = async(event, options) => {

    const { router, setSecondPage, setIdentical, setIsUserExist, userData } = options;

    const getFileExtension = (file) => {
        const parts = file.name.split('.');
        return parts[parts.length - 1];
    }

    event.preventDefault;

        const profile_file = document.getElementById('profile').files[0];

        const fileExtension = getFileExtension(profile_file);

        const formData = new FormData();

        const profile_file_toSend = new File([profile_file], `${userData.username}.${fileExtension}`, { type: profile_file.type })

        formData.append("profile", profile_file_toSend);

        userData.profile = "null";
        userData.about_user = document.getElementById('textarea').value;

        formData.append("userData", JSON.stringify(userData))

        postFunction(formData, "/user");
        router.push("/login")

}

