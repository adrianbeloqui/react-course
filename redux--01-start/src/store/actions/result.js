import * as actionTypes from './actionTypes'

export const storeResult = (payload) => {
    return {
        type: actionTypes.STORE_RESULT,
        ...payload
    }
}

export const deleteResult = (payload) => {
    return {
        type: actionTypes.DELETE_RESULT,
        ...payload
    }
}
