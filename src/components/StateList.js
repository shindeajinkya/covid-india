import React from 'react';
import { getStateData } from '../utils/api';
import Loading from './Loading';
import Card from './Card';

class StateList extends React.Component{
    state = {
        sortedStates: null,
    }

    uniqByKeepLast = (data, key) => {
        return [
            ...new Map(
                data.map(x => [key(x), x])
            ).values()
        ]
    }

    componentDidMount() {
        getStateData()
        .then(res => res.json())
        .then(res => {
            const resolvedArray = this.uniqByKeepLast(res.state_data, it => it.state)            
            this.setState({ 
                sortedStates: resolvedArray
                    .sort((a, b) => { return b.confirmed - a.confirmed })
            })
        })
    }

    render() {
        let { sortedStates } = this.state
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
}

export default StateList;