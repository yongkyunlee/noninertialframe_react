import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faHeart } from '@fortawesome/free-regular-svg-icons';


import styles from './CommentSummary.module.css';

const CommentSummary = (props) => {
    let likeNum = 0;
    if (props.likes) {
        likeNum = props.likes.length();
    }

    return (
        <div className={styles.summary}>
            {/* <span className={styles.item}>
                <FontAwesomeIcon icon={faHeart}/> {likeNum}
            </span> */}
            <span className={styles.item}>
                <NavLink to={'/post/' + props.postIdx} className={styles.itemLink}>
                    <FontAwesomeIcon icon={faCommentDots}/> {props.numComments}
                </NavLink>
            </span>
        </div>
    );
}

export default CommentSummary;