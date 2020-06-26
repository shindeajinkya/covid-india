import React from 'react';
import { getStateData } from '../utils/api';
import Loading from './Loading';
import Card from './Card';

function StateList() {
    const [ sortedStates , setSortedStates ] = React.useState(null)

    const uniqByKeepLast = (data, key) => {
        return [
            ...new Map(
                data.map(x => [key(x), x])
            ).values()
        ]
    }

    React.useEffect(() => {
        getStateData()
        .then(res => res.json())
        .then(res => {
            const resolvedArray = uniqByKeepLast(res.state_data, it => it.state)            
            setSortedStates(resolvedArray.sort((a, b) => { return b.confirmed - a.confirmed }))
        })
    }, [sortedStates])

    if(sortedStates){
        return (
            <ul className="grid space-around">
                {
                    sortedStates.map((stateIndia) => {
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