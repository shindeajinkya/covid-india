export const statesListSuccess = (data) => {
    return {
        type: 'SUCCESS',
        data,
    }
}

export const headlineListSuccess = (data) => {
    return {
        type: 'SUCCESSNEWS',
        data,
    }
}

export const helpineInfoSuccess = (data) => {
    return {
        type: 'SUCCESSHELP',
        data,
    }
}