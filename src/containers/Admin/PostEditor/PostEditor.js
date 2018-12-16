import React, { Component } from 'react';
import { Editor, getEventTransfer } from 'slate-react';
import { Block, Value } from 'slate'

import Aux from '../../../hoc/Aux/Aux';
import styles from './PostEditor.module.css';
import { Button, Icon, Toolbar } from './components';
import isUrl from 'is-url';
import styled from 'react-emotion';

const MarkHotkey = (options) => {
    const { type, key } = options
    return {
        onKeyDown (event, change,  next) {
            if (!event.ctrlKey || event.key !== key) return next();
            event.preventDefault();
            change.toggleMark(type);
            return true;
        }
    };
};

const plugins = [
    MarkHotkey({ key: 'b', type: 'bold' }),
    MarkHotkey({ key: '`', type: 'code' }),
    MarkHotkey({ key: 'i', type: 'italic' }),
    MarkHotkey({ key: '-', type: 'strikethrough' }),
    MarkHotkey({ key: 'u', type: 'underline' }),
];

const wrapLink = (editor, href) => {
    console.log(href);
    editor.wrapInline({
        type: 'link',
        data: {href}
    })
    editor.moveToEnd();
}

const unwrapLink = (editor) => {
    editor.unwrapInLine('link');
}

const Image = styled('img')`
  display: block;
  max-width: 100%;
  max-height: 20em;
  box-shadow: ${props => (props.selected ? '0 0 0 2px blue;' : 'none')};
`

const insertImage = (editor, src, desc, imgSize, target) => {
    if (target) {
        editor.select(target)
    }
  
    editor.insertBlock({
        type: 'image',
        data: { src, desc, imgSize }
    })
};

const schema = {
    document: {
        last: [{ type: 'paragraph' }, { type: 'image'}],
        normalize: (editor, { code, node, child }) => {
            switch (code) {
                case 'last_child_type_invalid': {
                    const paragraph = Block.create('paragraph')
                    return editor.insertNodeByKey(node.key, node.nodes.size, paragraph)
                }
            }
        },
    },
    blocks: {
        image: {
            isVoid: true,
        },
    },
};

class PostEditor extends Component {
    state = {
        value: Value.fromJSON(this.props.initialValue)
    }

    ref = editor => {
        this.editor = editor;
    }
    
    hasLinks() {
        const {value} = this.state;
        return value.inlines.some(inline => inline.type === 'link');
    }

    onClickLink = event => {
        event.preventDefault();
        const {editor} = this;
        const {value} = editor;
        const hasLinks = this.hasLinks();

        if (hasLinks) {
            editor.command(unwrapLink);
        } else if (value.selection.isExpanded) {
            const href = window.prompt('Enter the url of the link: ');
            if (href === null) {
                return;
            }
            editor.command(wrapLink, href);
        } else {
            const href = window.prompt('Enter the url of the link: ');
            if (href === null) {
                return;
            }
            const text = window.prompt('Enter the text for the link:')
            if (text === null) {
                return;
            }

            editor
                .insertText(text)
                .moveFocusBackward(text.length)
                .command(wrapLink, href);
        }
    }

    onClickImage = event => {
        event.preventDefault();
        const src = window.prompt('Enter url of the image');
        if (!src) return;
        const desc = window.prompt('Enter description of the image');
        const size = window.prompt('Enter size of the image in percentage (width, height)');
        let imgSize = {width: 100, height: 100}
        if (size) {
            const sizeArr = size.split(",").map(item => item.trim());
            imgSize = {width: sizeArr[0], height: sizeArr[1]};
        }
        this.editor.command(insertImage, src, desc, imgSize);
    }

    onPaste = (event, editor, next) => {
        if (editor.value.selection.isCollapsed) return next()
    
        const transfer = getEventTransfer(event)
        const { type, text } = transfer
        if (type !== 'text' && type !== 'html') return next()
        if (!isUrl(text)) return next()
    
        if (this.hasLinks()) {
          editor.command(unwrapLink)
        }
    
        editor.command(wrapLink, text)
      }

    style = {
        lineHeight: 10
    }

    onChange = ({value}) => {
        this.setState({value});
    }

    render() {
        return (
            <Aux>
                <Toolbar>
                    <Button active={this.hasLinks()} onMouseDown={this.onClickLink}>
                        <Icon>Link</Icon>
                    </Button>
                    <Button onMouseDown={this.onClickImage}> 
                        <Icon>Image</Icon>
                    </Button>
                </Toolbar>
                <Editor
                    ref={this.ref}
                    spellCheck={true}
                    plugins={plugins}
                    value={this.state.value}
                    onChange={this.onChange}
                    schema={schema}
                    defaultValue={this.props.initialValue}
                    renderMark={this.renderMark}
                    renderNode={this.renderNode}
                    onPaste={this.onPaste}
                />
                <div className={styles.uploadDiv}>
                    <button className={styles.uploadButton}
                        onClick={() => this.props.onUpload(this.state.value)}
                    >Upload</button>
                </div>
            </Aux>
        )
    }

    renderMark = (props, editor, next) => {
        switch (props.mark.type) {
            case 'bold':
                return <strong>{props.children}</strong>;
            case 'code':
                return <code>{props.children}</code>;
            case 'italic':
                return <em>{props.children}</em>;
            case 'strikethrough':
                return <del>{props.children}</del>;
            case 'underline':
                return <u>{props.children}</u>;
            default:
                return next();
        }
    }

    renderNode = (props, editor, next) => {
        const { attributes, children, node, isFocused } = props;
        switch (node.type) {
            case 'link': {
                const {data} = node;
                const href = data.get('href');
                return (
                    <a {...attributes} href={href}>
                        {children}
                    </a>
                )
            }
            case 'image': {
                const src = node.data.get('src');
                return <Image src={src} selected={isFocused} {...attributes}/>;
            }
            default:
                return next();
        }
    }
}

export default PostEditor;