export const headlineReducer = (state = null, action) => {
    switch(action.type) {
        case 'SUCCESSNEWS':
            const { headlines, headlines_summary, image_link } = action.data

            const newsArray = []
    
            headlines.forEach((head, index) => {
                newsArray[index] = {headline: head}
            })
    
            headlines_summary.forEach((summary, index) => {
                newsArray[index].summary = summary
            })
    
            image_link.forEach((image, index) => {
                newsArray[index].image = image
            })

            return state = newsArray
        default:
            return state
    }
}