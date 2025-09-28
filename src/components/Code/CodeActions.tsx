import React from 'react';
import { useGeneration } from '../../contexts/GenerationContext';

const CodeActions: React.FC = () => {
  const { state, dispatch } = useGeneration();

  const handleExport = () => {
    const blob = new Blob([state.generatedCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated-component.tsx';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    dispatch({ type: 'RESET' });
  };

  return (
    <div className="flex space-x-2 mb-2">
      <button
        onClick={handleExport}
        disabled={!state.generatedCode}
        className="px-3 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Export
      </button>
      <button
        onClick={handleReset}
        className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
      >
        Reset
      </button>
    </div>
  );
};

export default CodeActions;