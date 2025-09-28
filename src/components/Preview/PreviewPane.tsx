import React from 'react';
import { useGeneration } from '../../contexts/GenerationContext';
import LiveRenderer from './LiveRenderer';

interface PreviewPaneProps {
  onError?: (err: string) => void;
}

const PreviewPane: React.FC<PreviewPaneProps> = ({ onError }) => {
  const { state } = useGeneration();

  if (state.isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px] border rounded-md bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (state.error) {
    if (onError) onError(state.error);
    return (
      <div className="border rounded-md p-4 bg-red-50">
        <h4 className="text-sm font-medium text-red-800 mb-2">Preview Error</h4>
        <pre className="text-xs text-red-600 whitespace-pre-wrap">{state.error}</pre>
      </div>
    );
  }

  if (!state.generatedCode) {
    return (
      <div className="flex justify-center items-center min-h-[200px] border rounded-md bg-gray-50">
        <p className="text-gray-500">No preview available. Send a message to generate UI.</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-gray-500">Live Preview</h3>
      </div>
      <LiveRenderer
        code={state.generatedCode}
        scope={{ React }}
      />
    </div>
  );
};

export default PreviewPane;