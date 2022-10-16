const initState = {
    num: 1
}

const numReducer = (state = initState, action) => {
    switch(action.type) {
        case 'INCREASE':
            return {
                ...state,
                num: action.num + 1
            }
        case 'DECREASE':
            return {
                ...state,
                num: action.num - 1
            }
        default:
            return state
    }
}

export default numReducer