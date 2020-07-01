import React from 'react';
import { getHeadlines } from '../utils/api';
import Loading from './Loading';
import { useSelector, useDispatch } from 'react-redux';
import { headlineListSuccess } from '../actions';

function Headlines() {
    const headlinesList = useSelector(state => state.headlinesList)
    const dispatch = useDispatch()

    React.useEffect(() => {
        if(headlinesList === null){
            getHeadlines()
                .then(res => res.json())
                .then(res => dispatch(headlineListSuccess(res)))
                .catch(error => console.log(error))
        }
    }, [dispatch, headlinesList])

    if(headlinesList !== null){
        return (
            <div>
                <ul className="news-list">
                    {
                        headlinesList.map(({headline, summary, image}) => {
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