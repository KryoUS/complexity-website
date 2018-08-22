const initialState = {
    user: {}
}

const SET_USER = 'SET_USER';
const SET_MAIN = 'SET_MAIN';

function reducer(state = initialState, action){
    switch (action.type) {
        case SET_USER:
            return Object.assign( {}, state, { user: action.user } )

        case SET_MAIN:
            return Object.assign({}, state, { user: {...state.user, ...action.payload} })
            // return Object.assign( {}, state, { 
            //     [state.user.main]: action.main, 
            //     [state.user.mainAvatarSmall]: action.mainAvatarSmall, 
            //     [state.user.mainAvatarMed]: action.mainAvatarMed, 
            //     [state.user.mainAvatarLarge]: action.mainAvatarLarge
            // } )

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

export default reducer;