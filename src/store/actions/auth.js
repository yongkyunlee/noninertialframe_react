import firebase from '../../firebase/firebase';
import * as actionTypes from './actionTypes';

export const authSuccess = () => {
    return {
        type: actionTypes.AUTH_SUCCESS,
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const logout = (error) => {
    return {
        type: actionTypes.SIGN_OUT,
        error: error
    }
}

export const auth = (email, password) => {
    return dispatch => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                dispatch(authSuccess());
            })
            .catch(error => {
                dispatch(authFail(error));
            })
    };
};

export const signOut = () => {
    return dispatch => {
        firebase.auth().signOut()
            .then(() => {
                
            })
            .catch(error => {
                dispatch(authFail(error));
            })
    }
};