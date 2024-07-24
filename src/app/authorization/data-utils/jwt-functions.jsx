export const getJWT = () => {
    return localStorage.getItem('jwt');
}

export const setJWT = (token) => {
    localStorage.setItem('jwt', token)
}

export const removeJWT = () => {
    localStorage.removeItem('jwt')
}