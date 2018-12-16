import React from 'react';

import styles from './EmailReset.module.css';

const EmailReset = (props) => {
    let emailResetDiv = (<div></div>);
    if (props.resetPassword) {
        emailResetDiv = (
            <div className={styles.passwordResetDiv}>
                <span className={styles.passwordResetQuestion}> <strong>Wrong Password</strong>. Do you want Password Reset Email? </span>
                <button
                    className={styles.passwordResetBtn}
                    onClick={props.passwordResetHandler}> Yes
                </button>
            </div>
        );
    }
    return emailResetDiv;
}

export default EmailReset;