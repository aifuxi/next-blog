import { EDITOR_ID } from '@/common/constants/markdown';
import MdEditor, { HeadList } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import React, { useEffect, useState } from 'react';

type MarkdownEditorProps = React.ComponentProps<typeof MdEditor> & {};

MdEditor.config({
  markedRenderer(renderer) {
    renderer.link = (href: string, title: string, text: string) => {
      return `<a href="${href}" title="${
        title || ''
      }" target="_blank">${text}</a>`;
    };

    return renderer;
  },
});

const MarkdownEditor: React.FC<MarkdownEditorProps> = (props) => {
  const [, setList] = useState<HeadList[]>([]);

  return (
    <>
      <MdEditor
        theme={'light'}
        showCodeRowNumber
        codeTheme={'atom'}
        editorId={EDITOR_ID}
        previewTheme={'default'}
        onGetCatalog={setList}
        {...props}
      />
    </>
  );
};

export default MarkdownEditor;
