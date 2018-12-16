import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import styles from './PostComments.module.css';
import { fetchComments } from '../../store/actions/comments';
import CommentList from './CommentList/CommentList';
import CommentNew from './CommentNew/CommentNew';

class PostComment extends Component {
    componentDidMount() {
        this.props.onLoadComments(this.props.postKey);
    }

    render() {
        const commentNum = Object.keys(this.props.commentArr).length;
        return (
            <Aux>
                <div className={styles.commentSecTitle}>
                    Comments <span className={styles.commentNum}>({commentNum})</span>
                </div>
                <div>
                    <CommentNew
                        postKey={this.props.postKey}
                    />
                </div>
                <div>
                    <CommentList
                        postKey={this.props.postKey}
                    />
                </div>  
            </Aux>
        );
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
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PostComment);