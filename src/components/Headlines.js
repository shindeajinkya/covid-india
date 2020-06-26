import React from 'react';
import { getHeadlines } from '../utils/api';
import Loading from './Loading';

function headlineReducer(state, action) {
    if(action.type === 'success') {
        const { headlines, headlines_summary, image_link } = action.res

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

        return {
            newsArray,
            loading: false,
            error: null
        }
    }
    else if(action.type === 'error') {
        return {
            ...state,
            error: action.error.message,
            loading: true
        }
    }
    else {
        throw new Error("Action provided isn't supported.")
    }
}

function Headlines() {
    const [state, dispatch] = React.useReducer(
        headlineReducer,
        {
            newsArray: [],
            loading: true,
            error: null,
        }
    )

    React.useEffect(() => {
        getHeadlines()
            .then(res => res.json())
            .then(res => dispatch({type: 'success', res}))
            .catch(error => dispatch({type: 'error', error}))
    }, [])

    const { newsArray, loading } = state

    if(!loading){
        return (
            <div>
                <ul className="news-list">
                    {
                        newsArray.map(({headline, summary, image}) => {
                            return (
                                <li className="news-card">
                                    <img src={`${image}`} alt="News" />
                                    <h4>{headline}</h4>
                                    <p>{summary}</p>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
    return (
        <Loading />
    )      
}

export default Headlines;