import * as actionTypes from '../actions/actionTypes';

const initialState = {
    postArr: [],
    error: null,
    language: "eng"
};

const loadPosts = (state, action) => {
    return {
        ...state,
        postArr: action.postArr
    };
};

const loadFail = (state, action) => {
    return {
        ...state,
        error: action.error
    };
};

const selectLanguage = (state, action) => {
    return {
        ...state,
        language: action.language
    };
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOAD_POSTS: return loadPosts(state, action);
        case actionTypes.LOAD_POSTS_FAIL: return loadFail(state, action);
        case actionTypes.SELECT_LANGUAGE: return selectLanguage(state, action);
        default:
            return state;
    }
};

export default reducer;