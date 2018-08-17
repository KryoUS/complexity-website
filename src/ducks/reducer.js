const initialState = {
    user: {}
}

const SET_USER = 'SET_USER';
const SET_MAIN = 'SET_MAIN';

function reducer(state = initialState, action){
    switch (action.type) {
        case SET_USER:
            return Object.assign( {}, state, { user: action.payload } )

        case SET_MAIN:
            return Object.assign( {}, state, { 
                [state.user.main]: action.main, 
                [state.user.mainAvatarLarge]: action.mainAvatarLarge, 
                [state.user.mainAvatarMed]: action.mainAvatarMed, 
                [state.user.mainAvatarSmall]: action.mainAvatarSmall 
            } )

        default:
            return state
    }
}

export function setUser( userData ) {
    const user = userData.user;
    return {user, type: SET_USER }
}

export function setMain( main, mainAvatarLarge, mainAvatarMed, mainAvatarSmall ) {
    return {
        main: main,
        mainAvatarLarge: mainAvatarLarge,
        mainAvatarMed: mainAvatarMed,
        mainAvatarSmall: mainAvatarSmall,
        type: SET_MAIN
    }
}

export default reducer;