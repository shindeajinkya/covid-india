export const helplineReducer = (state = null, action) => {
    switch(action.type) {
        case 'SUCCESSHELP':
            const { contact_details, ...data } = action.data
            return state = { numberDetails: contact_details, data }
        default:
            return state
    }
}