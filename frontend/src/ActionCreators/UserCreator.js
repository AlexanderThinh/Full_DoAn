
function LoginUser(payload) {
    return {
        type: 'USER_LOGIN',
        payload
    }
}

function LogoutUser(payload=null) {
    return {
        type: 'USER_LOGOUT',
        payload
    }
}

export { LoginUser, LogoutUser } 