import firebase from '../../firebase/firebase';

import * as actionTypes from './actionTypes';

export const loadPosts = (postData) => {
    return {
        type: actionTypes.LOAD_POSTS,
        postArr: postData
    };
};

export const loadFail = (error) => {
    return {
        type: actionTypes.LOAD_POSTS_FAIL,
        error: error
    };
};

export const fetchPosts = () => {
    return dispatch => {
        const postsRef = firebase.database().ref('posts').orderByChild('postIdx');
        postsRef.once("value")
            .then((snapshot) => {
                const fetchedPosts = [];
                snapshot.forEach(childSnapshot => {
                    fetchedPosts.unshift({
                        ...childSnapshot.val(),
                        key: childSnapshot.key
                    })
                });
                dispatch(loadPosts(fetchedPosts));
            })
            .catch(error => {
                dispatch(loadFail(error));
            });
    };
};

export const selectLanguage = (selectedLanguage) => {
    return {
        type: actionTypes.SELECT_LANGUAGE,
        language: selectedLanguage
    }
}

/* fetchPosts using axios / firebase REST API call
export const fetchPosts = () => {
    return dispatch => {
        let url = "https://noninertialframe-dffc3.firebaseio.com/posts.json";
        axios.get(url)
            .then(response => {
                const fetchedPosts = []
                for (let key in response.data) {
                    fetchedPosts.push({
                        ...response.data[key],
                        postKey: key
                    });
                }
                dispatch(loadPosts(fetchedPosts));
            })
            .catch(error => {
                dispatch(loadFail(error));
            })
    };
};
*/