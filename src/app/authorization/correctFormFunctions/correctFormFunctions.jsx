export const notEmptyCheck = () => {

    let inputArray = document.getElementsByTagName('input');
    inputArray = Array.from(inputArray);

    inputArray.forEach((inputField) => {
        if (inputField.value != "") {
            inputField.classList.remove('error-input')
        }
    })
}