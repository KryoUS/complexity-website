const initialState = {
    user: {}
}

const SET_USER = 'SET_USER'

function reducer(state = initialState, action){
    console.log('Reducer Fired', action)
    switch (action.type) {
        case SET_USER:
            return Object.assign( {}, state, { user: action.payload } )

        default:
            return state
    }
}

export function setUser( userData ) {
    // console.log('setUser Fired', userData.user)
    const user = userData.user;
    return {user, type: SET_USER }
}

export default reducer;