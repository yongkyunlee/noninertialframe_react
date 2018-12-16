import React, { Component } from 'react';
import { connect } from 'react-redux';

import firebase from '../../../firebase/firebase';
import Aux from '../../../hoc/Aux/Aux';
import { fetchPosts } from '../../../store/actions/posts';
import { setAuthRedirectPath } from '../../../store/actions/auth';
import PostEditor from '../PostEditor/PostEditor';
import initialValue from '../initialValue.json';
import styles from './ManagePosts.module.css';

class ManagePosts extends Component {
    state = {
        postIdx: null,
        contentLanguage: null,
        titleEng: '',
        titleKor: '',
        // contentEng: null,
        // contentKor: null,
        summaryEng: "",
        summaryKor: "",
        date: '',
    }

    componentDidMount() {
        if (!this.props.isAuthenticated) {
            this.props.onSetAuthRedirectPath('/manageposts');
            this.props.history.push('/auth');
        } else {
            if (this.props.postArr.length === 0) {
                this.props.onLoadPosts();
            }
        }
    }

    titleEngChangeHandler = (event) => {
        this.setState({titleEng: event.target.value});
    }

    titleKorChangeHandler = (event) => {
        this.setState({titleKor: event.target.value});
    }

    summaryEngChangeHandler = (event) => {
        this.setState({summaryEng: event.target.value});
    }
    
    summaryKorChangeHandler = (event) => {
        this.setState({summaryKor: event.target.value});
    }
    
    dateChangeHandler = (event) => {
        this.setState({date: event.target.value});
    }

    editPostSelectHandler(selectedIdx) {
        if (this.state.postIdx !== null && this.state.postIdx === selectedIdx) {
            this.setState({
                postIdx: null,
                contentLanguage: null
            });
        } else {
            const post = this.props.postArr[selectedIdx];
            this.setState({
                postIdx: selectedIdx,
                contentLanguage: null,
                titleEng: post.titleEng,
                titleKor: post.titleKor,
                date: post.date,
                summaryKor: post.summaryKor,
                summaryEng: post.summaryEng
            });
        }
    }

    editLanguageSelectHandler(selectedLanguage) {
        if (this.state.postIdx !== null && this.state.contentLanguage === selectedLanguage) {
            this.setState({
                contentLanguage: null
            });
        } else {
            this.setState({
                contentLanguage: selectedLanguage
            });
        }
    }

    editPostHandler = (content) => {
        const postKey = this.props.postArr[this.state.postIdx].key;
        const postRef = firebase.database().ref("posts/" + postKey);
        const post = this.props.postArr[this.state.postIdx];
        const updateObj = {};
        if (content && this.state.contentLanguage === "eng") {
            updateObj["contentEng"] = JSON.parse(JSON.stringify(content));
        } else if (content && this.state.contentLanguage === "kor") {
            updateObj["contentKor"] = JSON.parse(JSON.stringify(content));
        }
        if (this.state.titleEng !== post.titleEng) {
            updateObj["titleEng"] = this.state.titleEng;
        }
        if (this.state.titleKor !== post.titleKor) {
            updateObj["titleKor"] = this.state.titleKor;
        }
        if (this.state.summaryEng !== post.summaryEng) {
            updateObj["summaryEng"] = this.state.summaryEng;
        }
        if (this.state.summaryKor !== post.summaryKor) {
            updateObj["summaryKor"] = this.state.summaryKor;
        }
        if (this.state.date !== post.date) {
            updateObj["date"] = this.state.date;
        }
        if (Object.keys(updateObj).length > 0) {
            postRef.update(updateObj, error => {
                if (error) {
                    alert("Error occured while updating post information");
                    console.log(error);
                } else {
                    alert("Post Updated");
                }
            })
        }
    }

    render() {
        let postEditor = (<div></div>);
        let postEditDiv = (<div></div>);
        let uploadButton = (<div></div>);
        let postContent = "";
        const postMapArr = this.props.postArr.map((post, idx) => {
            if (idx === this.state.postIdx) {
                if (this.state.contentLanguage === "eng") {
                    if (post.contentEng) {
                        postContent = post.contentEng;
                    } else {
                        postContent = initialValue;
                    }
                } else if (this.state.contentLanguage === "kor") {
                    if (post.contentKor) {
                        postContent = post.contentKor;
                    } else {
                        postContent = initialValue;
                    }
                }

                if (this.state.contentLanguage) {
                    postEditor = <PostEditor
                                    initialValue={JSON.parse(JSON.stringify(postContent))}
                                    onUpload={this.editPostHandler}
                                />;
                } else {
                    uploadButton = (
                        <div className={styles.uploadDiv}>
                            <button className={styles.uploadButton}
                                onClick={() => this.editPostHandler(null)}
                            >Upload</button>
                        </div>
                    );
                }

                postEditDiv = (
                    <div className={styles.postEditSection}>
                        <div className={styles.infoItem}>
                            <span>title</span>
                            <input className={styles.postInfoForm}
                                value={this.state.titleEng}
                                onChange={this.titleEngChangeHandler}
                            />
                        </div>
                        <div className={styles.infoItem}>
                            <span>제목</span>
                            <input className={styles.postInfoForm}
                                value={this.state.titleKor}
                                onChange={this.titleKorChangeHandler}
                            />
                        </div>
                        <div className={styles.infoItem}>
                            <span>Date</span>
                            <input className={styles.postInfoForm}
                                value={this.state.date}
                                onChange={this.dateChangeHandler}
                                placeholder="MM.DD.YYYY"
                            />
                        </div>
                        <div className={styles.infoItem}>
                            <span>English Summary</span>
                            <textarea className={styles.postSummaryForm}
                                rows="3"
                                value={this.state.summaryEng}
                                onChange={this.summaryEngChangeHandler}
                            />
                        </div>
                        <div className={styles.infoItem}>
                            <span>한글 요약</span>
                            <textarea className={styles.postSummaryForm}
                                rows="3"
                                value={this.state.summaryKor}
                                onChange={this.summaryKorChangeHandler}
                            />
                        </div>
                        <div>
                            <span>Contents</span>
                            <span className={styles.contentLanguage + (this.state.contentLanguage === "kor" ? " " + styles.languageOn : "")}
                                onClick={() => this.editLanguageSelectHandler("kor")}
                                >한국어 내용
                            </span>
                            <span className={styles.contentLanguage + (this.state.contentLanguage === "eng" ? " " + styles.languageOn : "")}
                                onClick={() => this.editLanguageSelectHandler("eng")}
                                >English Content
                            </span>
                        </div>
                        {postEditor}
                        {uploadButton}
                    </div>
                );
            } else {
                postEditDiv = (<div></div>);
            }

            return (
                <div className={styles.postSection} key={idx}>
                    <span className={styles.postTitle}
                        onClick={() => this.editPostSelectHandler(idx)}
                    > {post.titleEng}
                    </span>
                    {postEditDiv}

                </div>
            );
        });
        return (
            <Aux>
                {postMapArr}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        postArr: state.posts.postArr,
        isAuthenticated: state.auth.isAuthenticated
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLoadPosts: () => dispatch(fetchPosts()),
        onSetAuthRedirectPath: (path) => dispatch(setAuthRedirectPath(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePosts);