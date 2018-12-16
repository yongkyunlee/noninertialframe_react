import React, { Component } from 'react';

import Aux from '../Aux/Aux';
import SiteHead from '../../components/SiteHead/SiteHead';
import styles from './Layout.module.css';

class Layout extends Component {
    render() {
        return (
            <Aux>
                <SiteHead />
                <div className={styles.body}>
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}

export default Layout