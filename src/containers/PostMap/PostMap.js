import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import { fetchPosts, selectLanguage } from '../../store/actions/posts';
import PostSummary from '../../components/PostSummary/PostSummary';
import LanguageSelect from '../../components/LanguageSelect/LanguageSelect';

class PostMap extends Component {
    componentDidMount() {
        if (this.props.postArr.length === 0) {
            this.props.onLoadPosts();
        }
    }

    languageHandler = (newLanguage) => {
        if (this.props.lanugage !== newLanguage) {
            this.props.onSelectLanguage(newLanguage);
        }
    }
    
    render() {
        const postMapArr = this.props.postArr.map((post) => {
            let content = post.contentEng;
            let postTitle = post.titleEng;
            let contentSummary = post.summaryEng;
            if (this.props.language === "kor") {
                content = post.contentKor;
                postTitle = post.titleKor;
                contentSummary = post.summaryKor;
            }
            return (
                <div key={post.postIdx}>
                    <PostSummary
                        postTitle={postTitle}
                        postDate={post.date}
                        postContent={content}
                        postIdx={post.postIdx}
                        contentSummary={contentSummary}
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
                {postMapArr}
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

export default connect(mapStateToProps, mapDispatchToProps)(PostMap);