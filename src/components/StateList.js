import React from 'react';
import { getStateData } from '../utils/api';
import Loading from './Loading';
import Card from './Card';

class StateList extends React.Component{
    state = {
        sortedStates: null,
    }

    componentDidMount() {
        getStateData()
        .then(res => res.json())
        .then(res => {
            this.setState({ sortedStates: res.state_data.sort((a, b) => { return b.confirmed - a.confirmed }) })
            console.log(this.state.sortedStates)
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