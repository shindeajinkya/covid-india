import React from 'react';
import { getHelplineNumbers } from '../utils/api';
import { MdCall } from 'react-icons/md';
import Loading from './Loading';
import ThemeContext from '../contexts/theme';
import { useSelector, useDispatch } from 'react-redux';
import { helpineInfoSuccess } from '../actions';

function Helpline() {
    const [search, setSearch] = React.useState('')
    const theme = React.useContext(ThemeContext)
    const helplineInfo = useSelector(state => state.helplineInfo)
    const dispatch = useDispatch()

    React.useEffect(() => {
        getHelplineNumbers()
            .then((data) => data.json())
            .then((res) => dispatch(helpineInfoSuccess(res)))
            .catch((error) => console.log(error))
    }, [dispatch])

    
    if(helplineInfo !== null){
        const { numberDetails, data } = helplineInfo
    
        const filteredStates = numberDetails.filter((stateDetails) => {
            return stateDetails.state_or_UT.toLowerCase().includes(search.toLowerCase())
        })

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
    return <Loading />
}

export default Helpline