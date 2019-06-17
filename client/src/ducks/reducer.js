const initialState = {
    user: {},
    modalOpen: false,
    modalTitle: '',
    modalMessage: '',
    modalButton: ''
}

const SET_USER = 'SET_USER';
const SET_MAIN = 'SET_MAIN';
const USER_LOGOUT = 'USER_LOGOUT';
const INFO_MODAL = 'INFO_MODAL';

function reducer(state = initialState, action){
    switch (action.type) {
        case SET_USER:
            return Object.assign( {}, state, { user: action.user } )

        case SET_MAIN:
            return Object.assign({}, state, { user: {...state.user, ...action.payload} })

        case USER_LOGOUT:
            return initialState

        case INFO_MODAL:
            return Object.assign({}, state, { modalOpen: action.modalOpen, modalTitle: action.modalTitle, modalMessage: action.modalMessage, modalButton: action.modalButton })

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

export function infoModal( modalOpen, modalTitle, modalMessage, modalButton ) {
    return {
        modalOpen: modalOpen,
        modalTitle: modalTitle,
        modalMessage: modalMessage,
        modalButton: modalButton,
        type: INFO_MODAL
    }
}

export function userLogout() {
    return {
        type: USER_LOGOUT
    }
}

export default reducer;