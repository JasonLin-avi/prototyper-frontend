import React from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';

interface CodeEditorProps {
  code: string;
  language?: string;
  readOnly?: boolean;
  onCopy?: () => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ 
  code, 
  language = 'javascript', 
  readOnly = true, 
  onCopy 
}) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      if (onCopy) onCopy();
    });
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-gray-500">Generated Code</h3>
        <button
          onClick={handleCopy}
          className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          Copy
        </button>
      </div>
      <CodeMirror
        value={code}
        options={{
          mode: language,
          theme: 'default',
          lineNumbers: true,
          readOnly: readOnly ? 'nocursor' : false,
          lineWrapping: true,
        }}
        className="border rounded-md"
      />
    </div>
  );
};

export default CodeEditor;