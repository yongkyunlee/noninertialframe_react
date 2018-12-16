import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Post from '../../components/Post/Post';
import PostComments from '../PostComments/PostComments';
import LanguageSelect from '../../components/LanguageSelect/LanguageSelect';
import { fetchPosts, selectLanguage } from '../../store/actions/posts';

class FullPost extends Component {
    languageHandler = (newLanguage) => {
        if (this.props.language !== newLanguage) {
            this.props.onSelectLanguage(newLanguage);
        }
    }

    render() {
        const postIdx = this.props.match.params.idx;
        let postDiv = <div></div>;
        if (this.props.postArr.length > 0) {
            let post = null;
            for (let i = 0; i < this.props.postArr.length; i++) {
                if (this.props.postArr[i].postIdx === Number(postIdx)) {
                    post = this.props.postArr[i];
                    break;
                }
            }
            let content = post.contentEng;
            let postTitle = post.titleEng;
            let comments = [];
            let commentIdList = [];
            if (post.comments) {
                comments = Object.keys(post.comments).map((commentId) => {
                    return post.comments[commentId];
                })
                commentIdList = Object.keys(post.comments);
                // recent comments first
                comments.reverse();
                commentIdList.reverse();
            }
            if (this.props.language === "kor" && post.contentKor) {
                content = post.contentKor;
                postTitle = post.titleKor;
            }

            postDiv = (
                <div>
                    <LanguageSelect
                        language={this.props.language}
                        languageHandler={this.languageHandler}
                    />
                    <Post
                        postIdx={postIdx}
                        title={postTitle}
                        date={post.date}
                        content={content}
                        language={this.props.language}
                        languageHandler={this.languageHandler}
                    />
                    <PostComments
                        postKey={post.key}
                        postIdx={postIdx}
                        comments={comments}
                        commentIds={commentIdList}
                    />
                </div>
            );
        } else {
            this.props.onLoadPosts();
        }
        return(
            <Aux>
                {postDiv}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        postArr: state.posts.postArr,
        language: state.posts.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLoadPosts: () => dispatch(fetchPosts()),
        onSelectLanguage: (language) => dispatch(selectLanguage(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FullPost);
