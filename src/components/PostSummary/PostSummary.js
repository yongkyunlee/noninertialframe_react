import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './postSummary.module.css';
import { convertDate } from '../../shared/utility';

const PostSummary = (props) => {
    return(
        <div className={styles.postSummary}>
            <div className={styles.summaryHead}>
                <div className={styles.postTitle}>
                    <NavLink to={'/post/' + props.postIdx} className={styles.titleLink}>{props.postTitle}</NavLink>
                </div>
                <div className={styles.postDate}>{convertDate(props.postDate)}</div>
            </div>
            <div className={styles.postContentSummary}>{props.contentSummary}</div>
            <div>
                <NavLink to={'/post/' + props.postIdx} className={styles.postLink}>... More</NavLink>
            </div>
        </div>
    );
};

export default PostSummary;