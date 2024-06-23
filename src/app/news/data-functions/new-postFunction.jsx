"use server"

const server_url = "#"

export const newpostFunction = (postData) => {
    fetch(server_url, {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        
    })
    .then((response) => response.json)
    .then((data) => console.log(data))
}