import React from 'react';
import {Editor, RawDraftContentState} from 'react-draft-wysiwyg';
import {ContentState, convertFromHTML, EditorState} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import './DraftEditor.scss';

interface IPropsDraftEditor {
    name: string;
    contentEditor?: string;
    setValue: (name: any, value: any) => void;
}

const DraftEditor: React.FC<IPropsDraftEditor> = ({name, contentEditor, setValue}) => {
    // Get HTML of the content input
    const html = contentEditor ? contentEditor: '';
    const blocksFromHTML = convertFromHTML(html)
    const content = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
    );
    const contentHtml = EditorState.createWithContent(content);

    const onInternalChange = (currentContentState: RawDraftContentState) => {
        setValue(name, draftToHtml(currentContentState))
    }

    return (
        <Editor
            defaultEditorState={contentHtml}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onChange={onInternalChange}
        />
    )
}

export default DraftEditor;
