import * as actionTypes from '../actions/actionTypes';

const initialState = {
    isAuthenticated: false,
    error: null,
    authRedirectPath: '/'
};

const authSuccess = (state, action) => {
    return {
        ...state,
        isAuthenticated: true,
        error: null
    }
};

const authFail = (state, action) => {
    return {
        ...state,
        isAuthenticated: false,
        error: action.error
    }
};

const setAuthRedirectPath = (state, action) => {
    return {
        ...state,
        authRedirectPath: action.path
    };
};

const signOut = (state, action) => {
    return {
        ...state,
        error: action.error,
        isAuthenticated: false
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
        case actionTypes.SIGN_OUT: return signOut(state, action);
        default:
            return state;
    }
};

export default reducer;