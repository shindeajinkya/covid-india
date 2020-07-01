import React from 'react';
import { getStateData } from '../utils/api';
import Loading from './Loading';
import Card from './Card';
import { useSelector, useDispatch } from 'react-redux';
import { statesListSuccess } from '../actions';

function StateList() {
    const statesList = useSelector(state => state.statesList)
    const dispatch = useDispatch()

    const uniqByKeepLast = (data, key) => {
        return [
            ...new Map(
                data.map(x => [key(x), x])
            ).values()
        ]
    }

    React.useEffect(() => {
        if(statesList === null){
            getStateData()
            .then(res => res.json())
            .then(res => {
                const resolvedArray = uniqByKeepLast(res.state_data, it => it.state)  
                dispatch(statesListSuccess(resolvedArray.sort((a, b) => { return b.confirmed - a.confirmed })))
            })
        }
        
    }, [statesList, dispatch])

    if(statesList){
        return (
            <ul className="grid space-around">
                {
                    statesList.map((stateIndia) => {
                        return (
                            <Card
                                key={stateIndia.state} 
                                {...stateIndia}
                            />
                        )
                    })
                }
            </ul>
        )
    }
    return <Loading />

}

export default StateList;