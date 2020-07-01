import { statesReducer } from "./states"
import { combineReducers } from 'redux'
import { headlineReducer } from "./headline"
import { helplineReducer } from "./helpline"

const rootReducers = combineReducers({
    statesList: statesReducer,
    headlinesList: headlineReducer,
    helplineInfo: helplineReducer,
})

export default rootReducers