import { loginFunction } from "../../authorization/data-utils/data-functions";

export const checkUserData = async (event, options) => {

    const { setIsCorrect, setUserDontExist, router, store } = options;

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

    const user = await loginFunction('/login', userData);

    if (user) {    
        await store.login(user);
        await store.auth();
        setUserDontExist(false); 
        router.push(`/profile/${user.username}`); 
    } 

    else if (!user) {
        setUserDontExist(true);     
    }
};