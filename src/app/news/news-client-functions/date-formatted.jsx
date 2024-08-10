export const formateDate = (props, setDateFormatted, setDateToday) => {
    const date_string = props.time;
    const date = new Date(date_string);

    setDateFormatted({
        day: date.getDate() < 10 ? `0${date.getDate()}` : date.getDate(),
        month: date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth(),
        year: date.getFullYear() < 10 ? `0${date.getFullYear()}` : date.getFullYear(),
        hour: date.getHours() < 10 ? `0${date.getHours()}` : date.getHours(),
        minutes: date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes(),
    });
    setDateToday({
        day: new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate(),
        month: new Date().getMonth() < 10 ? `0${new Date().getMonth()}` : new Date().getMonth(),
        year: new Date().getFullYear() < 10 ? `0${new Date().getFullYear()}` : new Date().getFullYear()
    });
}