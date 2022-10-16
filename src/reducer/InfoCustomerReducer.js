const initState = {
    infoCustomer: {}
}

const infoCustomerReducer = (state = initState, action) => {
    switch(action.type) {
        case 'INFO_CUSTOMER':
            return {
                ...state,
                infoCustomer: action.payload
            }
        default:
            return state
    }
}

export default infoCustomerReducer