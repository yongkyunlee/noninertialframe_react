import React from 'react';

// Add mark to the text
const addMark = (text, mark) => {
    switch (mark) {
        case "italic":
            return <i>{text}</i>
        case "bold":
            return <strong>{text}</strong>
        case "underline":
            return <u>{text}</u>
        default:
            return text;
    }
};

const addUrl = (elements, href, keyIdx) => {
    return <a href={href} key={keyIdx}>{elements}</a>
};

const getTextLeaves = (leaves, keyIdx) => {
    const textBlock = [];
    for (let leaf in leaves) {
        keyIdx = keyIdx + "_" + leaf.toString();
        if ('marks' in leaves[leaf]) {
            let text = leaves[leaf].text;
            for (let mark in leaves[leaf]['marks']) {
                text = addMark(text, leaves[leaf]['marks'][mark]['type']);
            }
            textBlock.push(<span key={keyIdx}>{text}</span>);
        } else {
            textBlock.push(leaves[leaf]['text']);
        }
    }
    return textBlock;
};

export const renderSlateDocument = (slateObj, postIdx) => {
    const nodes = slateObj.document.nodes;
    const postContent = [];
    let elemKeyIdx = postIdx.toString;
    for (let node in nodes) {
        let block = []; // for each paragraph or block of content
        elemKeyIdx = elemKeyIdx + "_" + node.toString();
        switch (nodes[node].type) {
            case ("paragraph"):
                const objNode = nodes[node]['nodes'];
                for (let objNodeIdx in objNode) {
                    /* For normal text with marks */
                    elemKeyIdx = elemKeyIdx + "_" + objNodeIdx.toString();
                    if (objNode[objNodeIdx].hasOwnProperty('leaves')) {
                        const leaves = objNode[objNodeIdx]['leaves'];
                        const textBlock = getTextLeaves(leaves, elemKeyIdx);
                        block = block.concat(textBlock);
                    } /* For links */
                    else if (objNode[objNodeIdx].hasOwnProperty('data') && objNode[objNodeIdx].hasOwnProperty('nodes')) {
                        const href = objNode[objNodeIdx].data.href;
                        const textBlock = getTextLeaves(objNode[objNodeIdx].nodes[0].leaves, elemKeyIdx);
                        block.push(addUrl(textBlock, href, elemKeyIdx));
                    };
                }
                break;
            case ("image"):
                // one image per block
                const nodeData = nodes[node].data;
                const imgStyle = {
                    width: `${nodeData.imgSize.width}%`,
                    height: `${nodeData.imgSize.height}%`
                }
                const img = <img src={nodeData.src} alt={nodeData.desc} style={imgStyle} key={elemKeyIdx}/>;
                block.push(img);
                break;
            default:
                break;
        }
        postContent.push(<p key={node}>{block}</p>)
    }
    return postContent;
};
