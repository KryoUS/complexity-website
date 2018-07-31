const initialState = {
    tempState: ''
}

const TYPE_TEMP = 'TYPE_TEMP'

function reducer(state = initialState, action){
    switch (action.type) {
        case TYPE_TEMP:
            return Object.assign( {}, state, { tempState: action.payload } )

        default:
            return state
    }
}

export function updateTemp( temp ) {
    return {
        type: TYPE_TEMP,
        payload: temp
    }
}

export default reducer;