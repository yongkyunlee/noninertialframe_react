import * as actionTypes from '../actions/actionTypes';

const initialState = {
    comments: [],
    error: null
};

const loadComments = (state, action) => {
    return {
        ...state,
        comments: action.comments
    };
}

const loadCommentsFail = (state, action) => {
    return {
        ...state,
        error: action.error
    };
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.LOAD_COMMENTS: return loadComments(state, action);
        case actionTypes.LOAD_COMMENTS_FAIL: return loadCommentsFail(state, action);
        default: return state;
    }
}

export default reducer;