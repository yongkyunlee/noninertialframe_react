import * as actionTypes from './actionTypes';
import firebase from '../../firebase/firebase';

const loadComments = (comments) => {
    return {
        type: actionTypes.LOAD_COMMENTS,
        comments: comments
    };
};

const loadFail = (error) => {
    return {
        type: actionTypes.LOAD_COMMENTS_FAIL,
        error: error
    };
};

export const fetchComments = (postKey) => {
    return dispatch => {
        const commentRef = firebase.database().ref('comments/' + postKey);
        commentRef.once('value')
            .then(snapshot => {
                const fetchedComments = [];
                snapshot.forEach(childSnapshot => {
                    fetchedComments.unshift({
                        ...childSnapshot.val(),
                        key: childSnapshot.key
                    });
                })
                dispatch(loadComments(fetchedComments));
            })
            .catch(error => {
                dispatch(loadFail(error));
            });
    };
};