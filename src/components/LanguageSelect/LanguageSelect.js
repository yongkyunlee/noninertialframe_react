import React from 'react';

import styles from './LanguageSelect.module.css';

const LanguageSelect = (props) => {
    return(
        <div className={styles.languageSelect}>
            <span
                className={styles.languageOption + (props.language === "kor" ? " " + styles.languageOn : "")}
                onClick={() => props.languageHandler("kor")}
            > 한국어
            </span>
            <span
                className={styles.languageOption + (props.language === "eng" ? " " + styles.languageOn : "")}
                onClick={() => props.languageHandler("eng")}
            > English
            </span>
        </div>
    )
}

export default LanguageSelect;