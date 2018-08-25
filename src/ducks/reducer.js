const initialState = {
    user: {}
}

const SET_USER = 'SET_USER';
const SET_MAIN = 'SET_MAIN';
const USER_LOGOUT = 'USER_LOGOUT';

function reducer(state = initialState, action){
    switch (action.type) {
        case SET_USER:
            return Object.assign( {}, state, { user: action.user } )

        case SET_MAIN:
            return Object.assign({}, state, { user: {...state.user, ...action.payload} })

        case USER_LOGOUT:
            return initialState;

        default:
            return state
    }
}

export function setUser( userData ) {
    return {
        user: userData.user, 
        type: SET_USER 
    }
}

export function setMain( main, mainAvatarSmall, mainAvatarMed, mainAvatarLarge ) {
    return {
        payload: {
            main: main,
            mainAvatarSmall: mainAvatarSmall,
            mainAvatarMed: mainAvatarMed,
            mainAvatarLarge: mainAvatarLarge,
        },
        type: SET_MAIN
    }
}

export function userLogout() {
    return {
        type: USER_LOGOUT
    }
}

export default reducer;