export const validateMessageContent = (message) => {
    const validChars = /^[a-zA-Zа-яА-ЯёЁ0-9\s.,?!:;-@"#№$%^&*()_=+'`~<>{}[]|\/]+$/;
    return validChars.test(message);
};