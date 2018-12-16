import React from 'react';
import { NavLink } from 'react-router-dom';

import Aux from '../../hoc/Aux/Aux';
import { convertDate } from '../../shared/utility';
import { renderSlateDocument } from '../../shared/renderSlateDoc';
import styles from './Post.module.css';


const Post = (props) => {
    let postContent = <div></div>;
    if (props.content) {
        postContent = <div className={styles.postContent}>{renderSlateDocument(props.content, props.postIdx)}</div>;
    }
    return (
        <Aux>
            <div className={styles.post}>
                <div className={styles.postTitle}>
                    <NavLink to={'/post/' + props.postIdx} className={styles.titleLink}>{props.title}</NavLink>
                </div>
                <div className={styles.postDate}>{convertDate(props.date)}</div>
                {postContent}
            </div>
        </Aux>
    )
};

export default Post;