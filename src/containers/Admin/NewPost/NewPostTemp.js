import React, { Component } from 'react';
import { connect } from 'react-redux';

import firebase from '../../../firebase/firebase';
import { setAuthRedirectPath } from '../../../store/actions/auth';
import Aux from '../../../hoc/Aux/Aux';
import PostEditor from '../PostEditor/PostEditor';
import styles from './NewPost.module.css';
import initialValue from '../initialValue.json';

class NewPost extends Component {
    state = {
        titleEng: '',
        titleKor: '',
        contentEng: null,
        contentKor: null,
        summaryEng: "",
        summaryKor: "",
        date: '',
        comments: [],
        likes: [],
        visitors: [],
        postIdx: null
    }

    componentDidMount() {
        if (!this.props.isAuthenticated) {
            this.props.onSetAuthRedirectPath('/newpost');
            this.props.history.push('/auth');
        }
    }

    titleEngChangeHandler = (event) => {
        this.setState({titleEng: event.target.value});
    }

    titleKorChangeHandler = (event) => {
        this.setState({titleKor: event.target.value});
    }

    summaryEngChangeHandler = (event) => {
        this.setState({summaryEng: event.target.value});
    }
    
    summaryKorChangeHandler = (event) => {
        this.setState({summaryKor: event.target.value});
    }
    
    dateChangeHandler = (event) => {
        this.setState({date: event.target.value});
    }

    uploadHandler = (content) => {
        // load the whole database so inefficient
        const postsRef = firebase.database().ref('posts');
        const usersRef = firebase.database().ref('users/' + firebase.auth().currentUser.uid);
        postsRef.once("value")
            .then((snapshot) => {
                const post = {
                    ...this.state,
                    contentEng: JSON.parse(JSON.stringify(content)),
                    postIdx: snapshot.numChildren(),
                    user_id: firebase.auth().currentUser.uid
                }
                const postNode = postsRef.push();
                postNode.set(post, error => {
                    if (error) {
                        alert("error occurred while setting post node");
                        console.log(error);
                    } else {
                        const userNode = usersRef.push();
                        const userPost = {
                            postKey: postNode.key
                        };
                        userNode.set(userPost, error => {
                            if (error) {
                                alert("error occurred while setting user node");
                                console.log(error);
                            } else {
                                this.setState({
                                    titleEng: 'title', titleKor: '제목', date: '',
                                    contentEng: null, contentKor: null,
                                    comments: [], likes: [], visitors: [],
                                    postIdx: null
                                });
                            }
                        });
                    }
                });
            });
    }

    render() {
        return(
            <Aux>
                <div className={styles.newPostTitle}>New Post Page</div>
                <div className={styles.newPostInfoInput}>
                    <div className={styles.infoItem}>
                        <span>English Title</span>
                        <input className={styles.postInfoForm}
                            type='text'
                            placeholder='title'
                            onChange={this.titleEngChangeHandler}
                            value={this.state.titleEng}
                        />
                    </div>
                    <div className={styles.infoItem}>
                        <span>제목</span>
                        <input className={styles.postInfoForm}
                            type='text'
                            placeholder='제목'
                            onChange={this.titleKorChangeHandler}
                            value={this.state.titleKor}
                        />
                    </div>
                    <div className={styles.infoItem}>
                        <span>Post Date</span>
                        <input className={styles.postInfoForm}
                            type='text'
                            placeholder='MM.DD.YYYY'
                            onChange={this.dateChangeHandler}
                            value={this.state.date}
                        />
                    </div>
                    <div className={styles.infoItem}>
                        <span>English Summary</span>
                        <textarea className={styles.postSummaryForm}
                            rows="3"
                            placeholder="Summary"
                            value={this.state.summaryEng}
                            onChange={this.summaryEngChangeHandler}
                        />
                    </div>
                    <div className={styles.infoItem}>
                        <span>한글 요약</span>
                        <textarea className={styles.postSummaryForm}
                            rows="3"
                            placeholder="요약"
                            value={this.state.summaryKor}
                            onChange={this.summaryKorChangeHandler}
                        />
                    </div>
                </div>
                <div>
                    <PostEditor
                        contentType='contentEng'
                        onUpload={this.uploadHandler}
                        initialValue={initialValue}
                    />
                </div>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSetAuthRedirectPath: (path) => dispatch(setAuthRedirectPath(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);