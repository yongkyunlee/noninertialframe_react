import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchPosts, selectLanguage } from '../../store/actions/posts';
import Aux from '../../hoc/Aux/Aux';
import Post from '../../components/Post/Post';
import CommentSummary from '../../components/CommentSummary/CommentSummary';
import LanguageSelect from '../../components/LanguageSelect/LanguageSelect';

class AllPosts extends Component {
    componentDidMount() {
        this.props.onLoadPosts();
    }

    languageHandler = (newLanguage) => {
        if (this.props.lanugage !== newLanguage) {
            this.props.onSelectLanguage(newLanguage);
        }
    }

    render() {
        const postContentArr = this.props.postArr.map((post) => {
            let content = post.contentEng;
            let postTitle = post.titleEng;
            if (this.props.language === "kor") {
                content = post.contentKor;
                postTitle = post.titleKor;
            }
            return (
                <div key={post.postIdx}>
                    <Post
                        content={content}
                        title={postTitle}
                        date={post.date}
                        postIdx={post.postIdx}
                        language={this.props.language}
                    />
                    <CommentSummary
                        likes={post.likes}
                        numComments={post.numComments}
                        postIdx={post.postIdx}
                    />
                </div>
            );
        });
        return (
            <Aux>
                <LanguageSelect
                    language={this.props.language}
                    languageHandler={this.languageHandler}
                />
                {postContentArr}
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

export default connect(mapStateToProps, mapDispatchToProps)(AllPosts);