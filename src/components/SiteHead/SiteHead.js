import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './SiteHead.module.css';

const head = (props) => {
    return (
        <div className={styles.header}>
            <div className={styles.pageTitle}>
                <NavLink
                    to="/" exact
                    className={styles.headLink}
                >NonInertial Frame</NavLink>
            </div>
            <div className={styles.routes}>
                <span className={styles.routePage}>
                    <NavLink
                        to="/aboutme" exact
                        className={styles.link}
                        activeClassName={styles.linkActive}
                    >About Me</NavLink>                
                </span>
                <span className={styles.routePage}>
                    <NavLink to="/postmap" exact
                        className={styles.link}
                        activeClassName={styles.linkActive}
                    >Posts</NavLink>
                </span>
                <span className={styles.routePage}>
                    <NavLink to="/aboutsite" exact
                        className={styles.link}
                        activeClassName={styles.linkActive}
                    >About Site</NavLink>
                </span>
            </div>
            <hr className={styles.headerLine}></hr>
        </div>
    );
}

export default head;