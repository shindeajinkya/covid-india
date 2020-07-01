export const statesReducer = (state = null, action) => {
    switch(action.type){
        case 'SUCCESS':
            return state = action.data
        default:
            return state
    }
}

