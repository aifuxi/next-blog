import MdEditor from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import React from 'react';

type MarkdownEditorProps = React.ComponentProps<typeof MdEditor> & {};

const MarkdownEditor: React.FC<MarkdownEditorProps> = (props) => {
  return <MdEditor codeTheme={'atom'} showCodeRowNumber {...props} />;
};

export default MarkdownEditor;
