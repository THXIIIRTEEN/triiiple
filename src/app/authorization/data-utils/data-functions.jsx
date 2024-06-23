"use server"

const serverUrl = "http://localhost:3001"

export const postFunction = async (userData, endpoint) => {
    await fetch(serverUrl + endpoint, {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then((response) => response.text())
    .then((data) => {console.log(data)})
}

export const getFunction = async (endpoint) => {

    let result = [];

    await fetch(serverUrl + endpoint, {
        method: 'GET',
    })
    .then((response) => response.json())
    .then((data) => {result = data})

    return result
}