import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchComments } from '../../../store/actions/comments';
import EmailReset from '../../../components/PostComment/EmailReset/EmailReset';
import firebase from '../../../firebase/firebase';
import styles from './CommentNew.module.css';

class CommentNew extends Component {
    state = {
        nickname: '',
        content: '',
        email: '',
        password: '',
        resetPassword: false
    }

    nicknameInputHandler = (event) => {
        this.setState({nickname: event.target.value});
    }

    contentInputHandler = (event) => {
        this.setState({content: event.target.value});
    }

    emailInputHandler = (event) => {
        this.setState({email: event.target.value});
    }

    passwordInputHandler = (event) => {
        this.setState({password: event.target.value});
    }

    /* Handler for clicking "Post" button for uploading new comments
     */
    postButtonHandler = () => {
        if (this.state.nickname.replace(/\s/g,'') === '') {
            alert("Empty nickname not allowed");
        } else if (this.state.content.replace(/\s/g, '') === '') {
            alert("Empty content not allowed");
        } else {
             // create a user if the user does not already exist
            firebase.database().ref('users').orderByChild('email').equalTo(this.state.email).once("value")
                .then(snapshot => {
                    const newComment = {
                        nickname: this.state.nickname,
                        content: this.state.content,
                    };
                    if (!snapshot.exists()) {
                        // user is new
                        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                            .then(response => {
                                const userNode = firebase.database().ref('users/' + response.user.uid);
                                const newUser = {
                                    email: this.state.email,
                                }
                                userNode.set(newUser);
                            })
                            .then(() => {
                                this.uploadComment(newComment);
                            })
                            .catch((error) => {
                                switch(error.code) {
                                    case "auth/weak-password":
                                        alert(error.message);
                                        return;
                                    case "auth/invalid-email":
                                        alert("wrong email format");
                                        return;
                                    default:
                                        console.log(error);
                                }
                            });
                    } else {
                        // user is not new
                        this.uploadComment(newComment);
                    }
                })
                .catch(error => {
                    alert("An error occurred while posting your comment");
                    console.log(error);
                });
        }
    }

    uploadComment = (newComment) => {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                const updates = {};
                const newCommentKey = firebase.database().ref('comments/' + this.props.postKey).push().key;

                newComment = {
                    ...newComment,
                    date: new Date(),
                    userId: firebase.auth().currentUser.uid
                };
                updates['posts/' + this.props.postKey + "/numComments"] = Object.keys(this.props.commentArr).length + 1;
                updates['comments/' + this.props.postKey + "/" + newCommentKey] = newComment;
                
                firebase.database().ref().update(updates)
                    .then(() => {
                        this.setState({
                            nickname: '', content: '', email: '', password: '', resetPassword: false
                        })
                        return this.props.onLoadComments(this.props.postKey);
                    })
                    .then(() => {
                        firebase.auth().signOut();
                    })
                    .catch((error) => {
                        alert("Error occurred while uploading the comment");
                        console.log(error);
                    });
            })
            .catch((error) => {
                // when authentication error occurred
                switch(error.code) {
                    case "auth/wrong-password": // wrong password input
                        this.setState({resetPassword: true});
                        return;
                    default:
                        alert("Error occurred in authentication process");
                        console.log(error);
                        return;
                }
            });
    }

    render () {
        return (
            <div className={styles.commentInputSection}>
                <div className={styles.commentNicknameInput}>
                    <span className={styles.commentInfoLabel}>Nickname</span>
                    <input className={styles.commentInfoForm} 
                        type='text'
                        onChange={this.nicknameInputHandler}
                        value={this.state.nickname}
                    />
                </div>
                <textarea
                    rows='4'
                    className = {styles.contentInputForm}
                    onChange={this.contentInputHandler}
                    value={this.state.content}
                    placeholder="Enter comment"
                />
                <div className={styles.commentInfoInput}>
                    <div className={styles.commentEmailInput}>
                        <span className={styles.commentInfoLabel}>Email</span>
                        <input className={styles.commentInfoForm}
                            type='email'
                            onChange={this.emailInputHandler}
                            value={this.state.email}
                        />
                    </div>
                    <div className={styles.commentPasswordInput}>
                        <span className={styles.commentInfoLabel}>Password</span>
                        <input className={styles.commentInfoForm}
                            type='password'
                            onChange={this.passwordInputHandler}
                            value={this.state.password}
                        />
                    </div>
                    <div className={styles.commentInputSubmit}>
                        <button
                            className={styles.commentSubmitBtn}
                            onClick={this.postButtonHandler}>Post
                        </button>
                    </div>
                </div>
                <div className={styles.emailWarning}>*Email is used for authentication of edit/delete. Not shown to public.</div>
                <EmailReset resetPassword={this.state.resetPassword} passwordResetHandler={this.passwordResetHandler}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        commentArr: state.comments.comments
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadComments: (postKey) => dispatch(fetchComments(postKey))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentNew);