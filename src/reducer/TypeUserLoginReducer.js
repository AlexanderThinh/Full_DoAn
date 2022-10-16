
const initState = {
    type: 0
}

const typeUserLoginReducer = (state=initState, action) => {
    switch(action.type) {
        case 'CUSTOMER':
            return {
                ...state,
                type: action.payload
            } 
        case 'STAFF':
            return {
                ...state,
                type: action.payload
            } 
        default:
            return state
    }
}

export default typeUserLoginReducer