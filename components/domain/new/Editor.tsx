import React, { useCallback, useEffect } from 'react';
import { EditorState } from '@codemirror/state';
import useCodeMirror from 'hooks/codemirror/useCodemirror';

interface Props {
  initDoc: string;
  onChange: (doc: string) => void;
}

const Editor = (props: Props) => {
  const { initDoc, onChange } = props;
  const handleChange = useCallback(
    (state: EditorState) => {
      onChange(state.doc.toString());
    },
    [onChange]
  );

  const [refContainer, editorView] = useCodeMirror<HTMLDivElement>({
    initDoc,
    onChange: handleChange,
  });

  useEffect(() => {
    if (editorView) {
      // Do nothing for now
    }
  }, [editorView]);

  return (
    <div ref={refContainer} className="editor-wrapper h-full">
      Editor
    </div>
  );
};

export default Editor;
