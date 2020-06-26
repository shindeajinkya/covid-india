import React from 'react';
import { getHelplineNumbers } from '../utils/api';
import { MdCall } from 'react-icons/md';
import Loading from './Loading';
import ThemeContext from '../contexts/theme';

function helplineReducer(state, action) {
    if(action.type === 'success') {
        const { contact_details, ...data } = action.res

        return {
            ...state,
            numberDetails: contact_details,
            data,
            error: null,
            loading: false
        }
    }
    else if(action.type === 'error') {
        return {
            ...state,
            error: action.error.message
        }
    }
    else {
        throw new Error("Provides action isn't supported.")
    }
}

function Helpline() {
    const [search, setSearch] = React.useState('')
    const [state, dispatch] = React.useReducer(
        helplineReducer,
        {
            numberDetails: [],
            error: null,
            data: null,
            loading: true,
        }
    )
    const theme = React.useContext(ThemeContext)

    React.useEffect(() => {
        getHelplineNumbers()
            .then((data) => data.json())
            .then((res) => dispatch({type: 'success', res}))
            .catch((error) => dispatch({type: 'error', error}))
    }, [])

    const { numberDetails, data, loading } = state

    const filteredStates = numberDetails.filter((stateDetails) => {
        return stateDetails.state_or_UT.toLowerCase().includes(search.toLowerCase())
    })
    
    if(!loading){

        return (
            <div>
                <div className={`countrywide`}>
                    <h3>Indiawide helpline number</h3>
                    <a href={`tel: ${data.helpline_number}`} className={`call-${theme}`}>{data.helpline_number}</a>
                </div>
                <div className="search">
                    <input 
                    type="text" 
                    className={`search-box-${theme}`} 
                    placeholder="Search state"
                    onChange={(e) => setSearch(e.target.value)} />
                </div>
                <ul className="grid space-around">
                    {
                        filteredStates.map((stateNumber) => {
                            return (
                                <li className="card number-card" key={stateNumber.state_or_UT}>
                                    <h4 className="number-head">{stateNumber.state_or_UT}</h4>
                                    <h4>{stateNumber.helpline_number.split(",")[0]}</h4>
                                    <a href={`tel: ${stateNumber.helpline_number.split(",")[0]}`} className={`call-${theme}`}>
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

export default Helpline