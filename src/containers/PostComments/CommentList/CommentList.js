import React, { Component } from 'react';
import { connect } from 'react-redux';

import EmailReset from '../../../components/PostComment/EmailReset/EmailReset';
import { fetchComments } from '../../../store/actions/comments';
import { getDateStr } from '../../../shared/utility';
import firebase from '../../../firebase/firebase'
import styles from './CommentList.module.css';

class CommentList extends Component {
    state = {
        editCommentIdx: null,
        deleteCommentIdx: null,
        email: '',
        password: '',
        editContent: '',
        resetPassword: false
    }

    emailInputHandler = (event) => {
        this.setState({email: event.target.value});
    }

    passwordInputHandler = (event) => {
        this.setState({password: event.target.value});
    }

    editContentInputHandler = (event) => {
        this.setState({editContent: event.target.value});
    }

    editClickHandler = (commentIdx) => {
        let editCommentIdx = commentIdx;
        if (this.state.editCommentIdx === commentIdx) {
            editCommentIdx = null;
        }
        this.setState({
            editCommentIdx: editCommentIdx,
            deleteCommentIdx: null,
            editContent: this.props.commentArr[commentIdx].content
        });
    }

    deleteClickHandler = (commentIdx) => {
        let deleteCommentIdx = commentIdx;
        if (this.state.deleteCommentIdx === commentIdx) {
            deleteCommentIdx = null;
        }
        this.setState({
            editCommentIdx: null,
            deleteCommentIdx: deleteCommentIdx
        });
    }

    cancelButtonHandler = (event) => {
        this.setState({
            editCommentIdx: null,
            deleteCommentIdx: null,
            email: '',
            passowrd: '',
            editContent: '',
            resetPassword: false
        })
    }

    passwordResetHandler = () => {
        firebase.auth().sendPasswordResetEmail(this.state.email)
            .then(() => {
                this.setState({resetPassword: false});
                alert("Password Reset Email sent!");
            })
            .catch(error => {
                alert("Error occurred while sending email");
                console.log(error);
            });
    }

    modifyConfirmHandler = (commentIdx) => {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                const commentEndPoint = 'comments/' + this.props.postKey + "/" + this.props.commentArr[commentIdx].key;
                if (this.state.deleteCommentIdx !== null && this.state.editCommentIdx === null) {
                    // delete comment
                    const updates = {};
                    updates[commentEndPoint] = null;
                    updates['posts/' + this.props.postKey + "/numComments"] = Object.keys(this.props.commentArr).length - 1;
                    
                    firebase.database().ref().update(updates)
                        .then(() => {
                            this.setState({
                                editCommentIdx: null, deleteCommentIdx: null, email: '', password: '', resetPassword: false
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
                } else if (this.state.editCommentIdx !== null && this.state.deleteCommentIdx === null) {
                    // edit comment content
                    const editedData = {
                        ...this.props.commentArr[commentIdx],
                        content: this.state.editContent
                    }
                    firebase.database().ref(commentEndPoint).update(editedData)
                        .then(() => {
                            this.setState({
                                editCommentIdx: null, deleteCommentIdx: null, email: '', password: '', resetPassword: false
                            })
                            return this.props.onLoadComments(this.props.postKey);
                        })
                        .then(() => {
                            firebase.auth().signOut();
                        })
                        .catch((error) => {
                            alert("Error occurred while updating comment");
                            console.log(error);
                        });
                } else {
                    console.log(this.state.editCommentIdx);
                    console.log(this.state.deleteCommentIdx);
                    alert("Something is wrong!");
                }
            })
            .catch(error => {
                switch (error.code) {
                    case "auth/user-not-found":
                        alert("Wrong Email Address");
                        console.log(error);
                        return;
                    case "auth/wrong-password":
                        this.setState({resetPassword: true});
                        return;
                    default:
                        console.log(error);
                        return;
                }
            });
    }

    render () {
        const commentList = this.props.commentArr.map((comment, idx) => {
            const commentVerification = (
                <div className={styles.commentVerification}>
                    <div className={styles.commentModifyEmail}>
                        <span className={styles.commentModifyLabel}>Email</span>
                        <input className={styles.commentModifyForm}
                            type='email'
                            onChange={this.emailInputHandler}
                            value={this.state.email}
                        />
                    </div>
                    <div className={styles.commentModifyPassword}>
                        <span className={styles.commentModifyLabel}>Password</span>
                        <input className={styles.commentModifyForm}
                            type='password'
                            onChange={this.passwordInputHandler}
                            value={this.state.password}
                        />
                    </div>
                    <div className={styles.commentChangeBtn}>
                        <button
                            className={styles.commentChangeConfirm}
                            onClick={() => this.modifyConfirmHandler(idx)}
                            >Confirm
                        </button>
                        <button
                            className={styles.commentChangeCancel}
                            onClick={this.cancelButtonHandler}>Cancel
                        </button>
                    </div>
                </div>
            );
            let emailResetDiv = <EmailReset resetPassword={this.state.resetPassword} passwordResetHandler={this.passwordResetHandler}/>;
            let commentDisplay = (
                <div className={styles.commentContent}>
                    {comment.content}
                </div>
            );
            let editControlsStyle = {};
            let deleteControlsStyle = {};
            if (idx === this.state.editCommentIdx) {
                commentDisplay = (
                    <div>
                        <textarea
                            rows='3'
                            className={styles.commentEditForm}
                            onChange={this.editContentInputHandler}
                            value={this.state.editContent}
                        />
                        {commentVerification}
                    </div>
                );
                editControlsStyle = {color: 'black'};
            } else if ( idx === this.state.deleteCommentIdx) {
                commentDisplay = (
                    <div>
                        <div className={styles.commentContent}>
                        {comment.content}
                        </div>
                        <div>
                            {commentVerification}
                        </div>
                    </div>
                );
                deleteControlsStyle = {color: 'black'};
            } else {
                emailResetDiv = (<div></div>);
            }

            return (
                <div key={idx} className={styles.commentItem}>
                    <div className={styles.commentHeader}>
                        <div className={styles.commentInfo}>
                            <span className={styles.commentNickname}>
                                {comment.nickname}
                            </span>
                            <span className={styles.commentDate}>
                                {getDateStr(new Date(comment.date))}
                            </span>
                        </div>
                        <div className={styles.commentControls}>
                            <span
                                className={styles.editControl}
                                style={editControlsStyle}
                                onClick={() => this.editClickHandler(idx)}
                            >Edit</span>
                            <span 
                                className={styles.deleteControl}
                                style={deleteControlsStyle}
                                onClick={() => this.deleteClickHandler(idx)}
                            >Delete</span>
                        </div>
                    </div>
                    {commentDisplay}
                    {emailResetDiv}
                </div>
            );
        });

        return <div>{commentList}</div>;
    }
}

const mapStateToProps = state => {
    return {
        commentArr: state.comments.comments
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLoadComments: (postKey) => dispatch(fetchComments(postKey))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);

