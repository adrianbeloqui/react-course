import * as actionTypes from '../actions'

const initialState = {
    persons: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE_PERSON:
            return {
                ...state,
                persons: state.persons.concat({
                    ...action.newPerson
                })
            }
        case actionTypes.DELETE_PERSON:
            return {
                ...state,
                persons: state.persons.filter((value) => value.id !== action.id)
            }
        default:
            return state
    }
}

export default reducer
