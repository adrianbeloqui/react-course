import * as actionTypes from './actionTypes'

export const increment = () => {
    return (dispatch, getState) => {
        setTimeout(() => {
            // const oldCounter = getState().ctr.counter
            // console.log(oldCounter)
            dispatch({
                type: actionTypes.INCREMENT
            })
        }, 2000)
    }
}

export const decrement = () => {
    return {
        type: actionTypes.DECREMENT
    }
}

export const add = (payload) => {
    return {
        type: actionTypes.ADD,
        ...payload
    }
}

export const substract = (payload) => {
    return {
        type: actionTypes.SUBSTRACT,
        ...payload
    }
}
