import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { auth } from '../../store/actions/auth';
import { signOut } from '../../store/actions/auth';
import styles from './Auth.module.css';

class Auth extends Component {
    state = {
        email: "",
        password: ""
    }

    emailInputHandler = (event) => {
        this.setState({
            email: event.target.value
        });
    }

    passwordInputHandler = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    signInHandler = () => {
        this.props.onAuth(this.state.email, this.state.password);
    }

    signOutHandler = () => {
        this.props.onSignOut();
    }

    render() {
        let errorMessage = <p></p>;
        if (this.props.error) {
            errorMessage = <p>{this.props.error.message}</p>;
        }
        let authDiv = (
            <div className={styles.authDiv}>
                <div className={styles.authItem}>
                    <span>ID</span>
                    <input className={styles.authInputForm}
                        type="email"
                        placeholder="email"
                        onChange={this.emailInputHandler}
                        value={this.state.email}
                    />
                </div>
                <div className={styles.authItem}>
                    <span>Password</span>
                    <input className={styles.authInputForm}
                        type="password"
                        placeholder="password"
                        onChange={this.passwordInputHandler}
                        value={this.state.password}
                    />
                </div>
                <button onClick={this.signInHandler}>Sign In</button>
            </div>
        );
        let authRedirect = null;
        if (this.props.isAuthenticated && this.props.authRedirectPath === '/') {
            authDiv = <div><button onClick={this.signOutHandler}>Sign Out</button></div>
        } else if (this.props.isAuthenticated && this.props.authRedirectPath !== '/') {
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }
        
        return (
            <div>
                {authRedirect}
                {authDiv}
                {errorMessage}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        error: state.auth.error,
        isAuthenticated: state.auth.isAuthenticated,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(auth(email, password)),
        onSignOut: () => dispatch(signOut())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);