import React from 'react';

import styles from './CommentInput.module.css';

const CommentInput = (props) => {
    let emailResetDiv = (<div></div>);
    if (props.newComment.resetPassword) {
        emailResetDiv = (
            <div className={styles.passwordResetDiv}>
                <span className={styles.passwordResetQuestion}> <strong>Wrong Password</strong>. Do you want Password Reset Email? </span>
                <button
                    className={styles.passwordResetBtn}
                    onClick={props.passwordResetHandler}> Yes
                </button>
            </div>
        );
    }

    return (
        <div className={styles.commentInputSection}>
            <div className={styles.commentNicknameInput}>
                <span>Nickname</span>
                <input className={styles.commentInfoForm} 
                    type='text'
                    onChange={props.nicknameHandler}
                    value={props.newComment.nickname}
                />
            </div>
            <textarea
                rows='4'
                className = {styles.contentInputForm}
                onChange={props.contentHandler}
                value={props.newComment.content}
            />
            <div className={styles.commentInfoInput}>
                <div className={styles.commentEmailInput}>
                    <span>Email</span>
                    <input className={styles.commentInfoForm}
                        type='email'
                        onChange={props.emailHandler}
                        value={props.newComment.email}
                    />
                </div>
                <div className={styles.commentPasswordInput}>
                    <span>Password</span>
                    <input className={styles.commentInfoForm}
                        type='password'
                        onChange={props.passwordHandler}
                        value={props.newComment.password}
                    />
                </div>
                <div className={styles.commentInputSubmit}>
                    <button
                        className={styles.commentSubmitBtn}
                        onClick={props.postButtonHandler}>Post
                    </button>
                </div>
            </div>
            <div className={styles.emailWarning}>*Email is used for authentication of edit/delete. Not shown to public.</div>
            {emailResetDiv}
        </div>
    )
};

export default CommentInput;