
function CustomerLogin(payload) {
    return {
        type: 'CUSTOMER',
        payload
    }
}

function StaffLogin(payload) {
    return {
        type: 'STAFF',
        payload
    }
}

export { CustomerLogin, StaffLogin }