import React, { Component } from 'react';

import axios from '../../../axios-admin';
import Aux from '../../../hoc/Aux/Aux';
import PostEditor from '../PostEditor';

class EditPost extends Component {
    state = {
        titleEng: 'title',
        titleKor: '제목',
        contentEng: '',
        contentKor: '',
        date: '',
        comments: [],
        likes: [],
        visitors: []
    }

    titleChangeHandler = (event) => {
        this.setState({title: event.target.value});
    }
    
    dateChangeHandler = (event) => {
        this.setState({date: event.target.value});
    }

    uploadHandler = (content) => {
        const post = {
            ...this.state,
            contentEng: content
        }
        console.log(post)
        let url = 'https://noninertialframe-dffc3.firebaseio.com/posts.json';
        axios.post(url, post)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });      
    }

    render() {
        return(
            <Aux>
            </Aux>
        );
    }
}

export default EditPost;