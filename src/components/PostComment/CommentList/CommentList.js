import React from 'react';
import styles from './CommentList.module.css';

const CommentList = (props) => {
    const commentList = props.comments.map((comment, idx) => {
        const commentVerification = (
            <div className={styles.commentVerification}>
                <div className={styles.commentModifyEmail}>
                    <span>Email</span>
                    <input className={styles.commentModifyForm}
                        type='email'
                        onChange={props.modifyEmailHandler}
                        value={props.modifyCommentEmail}
                    />
                </div>
                <div className={styles.commentModifyPassword}>
                    <span>Password</span>
                    <input className={styles.commentModifyForm}
                        type='password'
                        onChange={props.modifyPasswordHandler}
                        value={props.modifyCommentPassword}
                    />
                </div>
                <div className={styles.commentChangeBtn}>
                    <button
                        className={styles.commentChangeConfirm}
                        onClick={() => props.modifyConfirmHandler(idx)}
                        >Confirm
                    </button>
                    <button
                        className={styles.commentChangeCancel}
                        onClick={props.cancelModifyHandler}>Cancel
                    </button>
                </div>
            </div>
        );
        let commentDisplay = (
            <div className={styles.commentContent}>
                {comment.content}
            </div>
        );
        let editControlsStyle = {};
        let deleteControlsStyle = {};
        if (idx === props.editCommentIdx) {
            commentDisplay = (
                <div>
                    <textarea
                        rows='3'
                        className={styles.commentEditForm}
                        onChange={props.editContentHandler}
                        value={props.editCommentContent}
                    />
                    {commentVerification}
                </div>
            );
            editControlsStyle = {color: 'black'};
        } else if ( idx === props.deleteCommentIdx) {
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
        }
        return (
            <div key={idx} className={styles.commentItem}>
                <div className={styles.commentHeader}>
                    <div className={styles.commentInfo}>
                        <span className={styles.commentNickname}>
                            {comment.nickname}
                        </span>
                        <span className={styles.commentDate}>
                            {comment.date}
                        </span>
                    </div>
                    <div className={styles.commentControls}>
                        <span
                            className={styles.editControl}
                            style={editControlsStyle}
                            onClick={() => props.editClickHandler(idx)}
                        >Edit</span>
                        <span 
                            className={styles.deleteControl}
                            style={deleteControlsStyle}
                            onClick={() => props.deleteClickHandler(idx)}
                        >Delete</span>
                    </div>
                </div>
                {commentDisplay}
            </div>
        );
    });

    return <div>{commentList}</div>
};

export default CommentList;

