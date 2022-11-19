import { EDITOR_ID } from '@/common/constants/markdown';
import MdEditor, { HeadList } from 'md-editor-rt';
import React, { useState } from 'react';

type MarkdownEditorProps = React.ComponentProps<typeof MdEditor> & {};

MdEditor.config({
  markedRenderer(renderer) {
    // 修改markdown里的link默认行为，修改成在新窗口打开链接
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
