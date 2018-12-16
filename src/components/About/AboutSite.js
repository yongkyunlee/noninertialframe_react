import React from 'react';

import Aux from '../../hoc/Aux/Aux';
import styles from './About.module.css';

const aboutSite = (props) => {
    return(
        <Aux>
            <div className={styles.section}>
                <div className={styles.subSection}>
                    <div className={styles.subSectionContent}>
                        <p>Noninertial frame, by definition, is <i>a frame of reference that moves with the object, 
                        so that the moving object appears to violate Newton's laws of motion since it accelerates 
                        despite having no horizontal forces on it (Dictionary.com). </i> It is a frame whose velocity 
                        is continuously changing and in which classical laws of mechanics do not work. It is also 
                        the real frame we live or should live in because our world moves every moment.</p>
                        <p><strong>Noninertial Frame</strong> is to keep ourselves staying in a frame 
                        that accelerates every moment. Acceleration does not necessarily refer to increase of speed; 
                        it could be change of direction or even decrease of speed. The important point 
                        is that every moment we move to a different point, eventually towards the dream each one of us has. 
                        The posts in this blog will mainly deal with my projects and display the 
                        trace of the professional side of my life.</p>
                        <p>If anyone has any ideas, quesitons, or thoughts, please feel free to contact me 
                        or leave a comment on any of the posts!</p>
                    </div>
                </div>   
            </div>
            <div className={styles.section}>
                <div className={styles.subSection}>
                    <div className={styles.subSectionTitle}><strong>Site Info - Version 2</strong></div>
                    <table className={styles.infoTable}>
                        <tbody>
                            <tr className={styles.infoTr}>
                                <td className={styles.infoTd}>Stack</td>
                                <td className={styles.infoTd}>ReactJS</td>
                            </tr>
                            <tr className={styles.infoTr}>
                                <td className={styles.infoTd}>DevTools</td>
                                <td className={styles.infoTd}>Visual Studio Code</td>
                            </tr>
                            <tr className={styles.infoTr}>
                                <td className={styles.infoTd}>Platform</td>
                                <td className={styles.infoTd}>Firebase Hosting</td>
                            </tr>
                            <tr className={styles.infoTr}>
                                <td className={styles.infoTd}>Database Service</td>
                                <td className={styles.infoTd}>Firebase Realtime Database</td>
                            </tr>
                            <tr className={styles.infoTr}>
                                <td className={styles.infoTd}>Domain Registration</td>
                                <td className={styles.infoTd}>Namecheap</td>
                            </tr>
                            <tr className={styles.infoTr}>
                                <td className={styles.infoTd}>Launch Date</td>
                                <td className={styles.infoTd}>2018.12.15</td>
                            </tr>
                            <tr className={styles.infoTr}>
                                <td className={styles.infoTd}>Github Repository</td>
                                <td className={styles.infoTd}><a className={styles.link} href="https://github.com/noninertialframe/noninertialframe_react">Link</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className={styles.section}>
                <div className={styles.subSection}>
                    <div className={styles.subSectionTitle}><strong>Site Info - Version 1</strong></div>
                    <table className={styles.infoTable}>
                        <tbody>
                            <tr className={styles.infoTr}>
                                <td className={styles.infoTd}>Stack</td>
                                <td className={styles.infoTd}>MongoDB, Node.js, Express.js</td>
                            </tr>
                            <tr className={styles.infoTr}>
                                <td className={styles.infoTd}>DevTools</td>
                                <td className={styles.infoTd}>Cloud9 IDE</td>
                            </tr>
                            <tr className={styles.infoTr}>
                                <td className={styles.infoTd}>Platform</td>
                                <td className={styles.infoTd}>Heroku</td>
                            </tr>
                            <tr className={styles.infoTr}>
                                <td className={styles.infoTd}>Database Service</td>
                                <td className={styles.infoTd}>MLab</td>
                            </tr>
                            <tr className={styles.infoTr}>
                                <td className={styles.infoTd}>Domain Registration</td>
                                <td className={styles.infoTd}>Namecheap</td>
                            </tr>
                            <tr className={styles.infoTr}>
                                <td className={styles.infoTd}>Launch Date</td>
                                <td className={styles.infoTd}>2017.02.25</td>
                            </tr>
                            <tr className={styles.infoTr}>
                                <td className={styles.infoTd}>Github Repository</td>
                                <td className={styles.infoTd}><a className={styles.link} href="https://github.com/noninertialframe/noninertialframe.github.io">Link</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </Aux>
    );
}

export default aboutSite;