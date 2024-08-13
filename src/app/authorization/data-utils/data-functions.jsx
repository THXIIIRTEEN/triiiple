"use server"

const serverUrl = "https://triiiple-server.vercel.app/";

export const postFunction = async (userData, endpoint) => {
    return await fetch(serverUrl + endpoint, {
        method: 'POST',
        body: userData,
    })
    .then((response) => response.text())
    .then((data) => {return data})
};

export const loginFunction = async (endpoint, userData) => {
    return await fetch(serverUrl + endpoint, {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: { 'Content-type': 'application/json; charset=UTF-8', },
    })
    .then((response) => response.json())
    .then((data) => {return data})
};

export const getFunction = async (endpoint) => {
  let result = [];
  await fetch(serverUrl + endpoint, {
      method: 'GET',
  })
  .then((response) => response.json())
  .then((data) => {result = data})
  return result
}

export const postServerFunction = async (endpoint, username) => {
  return await fetch(serverUrl + endpoint, {
    method: 'POST',
    body: JSON.stringify(username),
    headers: { 'Content-type': 'application/json; charset=UTF-8', },
  })
  .then((response) => response.json())
  .then((data) => {return data})
}

export const verifyJWT = async (endpoint, token) => {
  return await fetch(serverUrl + endpoint, {
    method: 'POST',
    body: JSON.stringify(token),
    headers: { 'Content-type': 'application/json; charset=UTF-8', },
  })
  .then((response) => response.json())
  .then((data) => {return data})
}

export const deleteFunction = async (endpoint, data) => {
  return await fetch(serverUrl + endpoint, {
    method: 'DELETE',
    body: JSON.stringify(data),
    headers: { 'Content-type': 'application/json; charset=UTF-8', },
  })
  .then((response) => response.json())
  .then((data) => {return data})
}
