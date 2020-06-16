import React from 'react';
import { getHelplineNumbers } from '../utils/api';
import { MdCall } from 'react-icons/md';
import Loading from './Loading';

class Helpline extends React.Component {
    state = {
        numberDetails: [],
        error: null,
        data: null,
        search: "",
    }

    componentDidMount () {
        getHelplineNumbers()
        .then((data) => data.json())
        .then((res) => {
            const { contact_details, ...data } = res
            
            this.setState({
                numberDetails: contact_details,
                data,
            })
        })
        .catch((err) => {
            console.warn('error fetching data', err);
            
            this.setState({
                error: 'There was an error fetching the number data.'
            })
        })
    }

    render() {
        const { numberDetails, data, error, search } = this.state

        const filteredStates = numberDetails.filter((stateDetails) => {
            return stateDetails.state_or_UT.toLowerCase().includes(search.toLowerCase())
        })

        
        if(numberDetails && data){
            console.log(filteredStates)
            return (
                <div>
                    <div className="countrywide">
                        <h3>Indiawide helpline number</h3>
                        <h4>
                            <a href={`tel: ${data.helpline_number}`} className="call-button">{data.helpline_number}</a>
                        </h4>
                    </div>
                    <div className="search">
                        <input 
                        type="text" 
                        className="search-box" 
                        placeholder="Search state"
                        onChange={(e) => this.setState({search: e.target.value})} />
                    </div>
                    <ul className="grid space-around">
                        {
                            filteredStates.map((stateNumber) => {
                                return (
                                    <li className="card number-card" key={stateNumber.state_or_UT}>
                                        <h4 className="number-head">{stateNumber.state_or_UT}</h4>
                                        <h4>{stateNumber.helpline_number.split(",")[0]}</h4>
                                        <a href={`tel: ${stateNumber.helpline_number.split(",")[0]}`} className="call-button">
                                            <MdCall size={20} className="call-icon" />
                                            Call
                                        </a>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            )
        }
        else{
            return <Loading />
        }
    }
}

export default Helpline