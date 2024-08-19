import { validateMessageContent } from "@/app/authorization/data-utils/validateContentFunction";
import { settingsUtils } from "../settings-functions/settings-functions";

export const showInput = (setShow) => {
    setShow(true)
};

export const closeInput = (setShow) => {
    setShow(false)
};

export const showUsernameInputFunction = (setShowUsernameInput, showUsernameInput) => {
    setShowUsernameInput(!showUsernameInput)
};

export const showAboutUserFunction = (setshowAboutUser, showAboutUser) => {
    setshowAboutUser(!showAboutUser)
};

export const showPasswordFunction = (setShowPassword, showPassword) => {
    setShowPassword(!showPassword)
};

export const changePasswordFunction = async (event, oldPassword, newPassword, newPasswordAgain, user, setIncorrectPassword, setEmptyPassword, setPasswordCompared, setInvalidPasswordLength) => {
    event.preventDefault();
    if (oldPassword.current.value == "" || newPassword.current.value == "" || newPasswordAgain.current.value == "") {
        setEmptyPassword(true)
        oldPassword.current.classList.add('error-input')
        newPassword.current.classList.add('error-input')
        newPasswordAgain.current.classList.add('error-input')
    }
    if (newPassword.current.value != newPasswordAgain.current.value) {
        setPasswordCompared(true)
        newPassword.current.classList.add('error-input')
        newPasswordAgain.current.classList.add('error-input')
    }

    if (newPassword.current.value.length < 6) {
        setInvalidPasswordLength(true)
        newPassword.current.classList.add('error-input')
        newPasswordAgain.current.classList.add('error-input')
    }

    if (oldPassword.current.value != "" && newPassword.current.value != "" && newPasswordAgain.current.value != "" && newPassword.current.value === newPasswordAgain.current.value && newPassword.current.value.length >= 6) {
        const data = {
            id: user._id,
            old_password: oldPassword.current.value,
            password: newPassword.current.value
        }
        const result = await settingsUtils.updatePassword(data)
        if (!result) {
            setIncorrectPassword(true)
            oldPassword.current.classList.add('error-input')
        }

        if (result) {
            location.reload();
        }
    }
}

export const updateProfilePicture = (event, user, setIncorrectFile, imageInputBLock, setImage) => {
    const target = event.target;

    const file = target.files[0];

    if (file.type.indexOf('image/') === -1) {
        setIncorrectFile(true);
        imageInputBLock.current.classList.add("error-profile-block")
        return;
    }

    else if (file.type.indexOf('image/') === 0) {
        const fileReader = new FileReader();

        fileReader.onload = function() {
            setImage(fileReader.result)
        }
        fileReader.readAsDataURL(target.files[0]);

        const postFormData = new FormData();
        const postUserData = {
            id: user._id,
            username: user.username,
        };
        const postFilePicture = target.files[0];
        postFormData.append("userData", JSON.stringify(postUserData));
        postFormData.append("profile", postFilePicture);
        settingsUtils.updateProfile(postFormData);
        location.reload();
    }           
}

export const updateUsername = async (event, user, usernameInput, setInvalidUsernameLength, usernameInputBlock, setUsernameExist, setUsernameError, setValidContent) => {
    event.preventDefault();

    if (usernameInput.current.value.length < 4) {
        setInvalidUsernameLength(true)
        usernameInputBlock.current.classList.add('error-input')
    }

    if (usernameInput.current.value.length >= 4) {
        const regex = /[а-яА-ЯёЁ]/g;

        if (regex.test(usernameInput.current.value)) {
            usernameInputBlock.current.classList.add('error-input')
            setUsernameError(true);
        } else {
            setValidContent(validateMessageContent(usernameInput.current.value));
            if (validateMessageContent(usernameInput.current.value) === true) {
                setUsernameError(false);
                const data = {
                    id: user._id,
                    username: usernameInput.current.value
                }
                const result = await settingsUtils.updateUsername(data);
                if (!result) {
                    setUsernameExist(true)
                    usernameInputBlock.current.classList.add('error-input')
                }
        
                if (result) {
                    location.reload();
                }
            }
        }    
        
    }
}

export const updateAboutMe = async (event, user, AboutMe, setAboutValidContent) => {
    event.preventDefault();

    setAboutValidContent(validateMessageContent(AboutMe.current.value))

    if (validateMessageContent(AboutMe.current.value) === true) {
        const data = {
            id: user._id,
            about_user: AboutMe.current.value
        }
        await settingsUtils.updateAboutMe(data);
        location.reload();
    }

    
}