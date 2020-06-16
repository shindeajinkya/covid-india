const data = {
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "covid-19-india.p.rapidapi.com",
        "x-rapidapi-key": "c63b96f006msh5e9e6857f4a0adfp1c62b8jsne56fdfff4953"
    }
}

export const getStateData = () => {
    return fetch("https://covid-19-india.p.rapidapi.com/state_data", data)
    .then(response => {
        return response
    })
    .catch(err => {
        return err
    });
}

export const getHelplineNumbers = () => {
    return fetch("https://covid-19-india.p.rapidapi.com/helpline_numbers", data)
    .then(response => {
        return response
    })
    .catch(err => {
        return err
    });
}


export const getHeadlines = () => {
    return fetch("https://covid-19-india.p.rapidapi.com/headlines", data)
    .then(response => {
        return response
    })
    .catch(err => {
        return err
    });
}