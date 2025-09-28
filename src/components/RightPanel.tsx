import React, { useState } from 'react';
import CodeEditor from './Code/CodeEditor';
import CodeActions from './Code/CodeActions';
import PreviewPane from './Preview/PreviewPane';
import { useGeneration } from '../contexts/GenerationContext';

const RightPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'code' | 'preview'>('preview');
  const { state } = useGeneration();

  return (
    <div className="w-full flex flex-col h-full">
      {/* Tab Headers */}
      <div className="flex border-b bg-white">
        <button
          onClick={() => setActiveTab('code')}
          className={`flex-1 py-2 px-4 text-center font-medium border-b-2 ${
            activeTab === 'code'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Code
        </button>
        <button
          onClick={() => setActiveTab('preview')}
          className={`flex-1 py-2 px-4 text-center font-medium border-b-2 ${
            activeTab === 'preview'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Preview
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'code' ? (
          <div className="h-full flex flex-col">
            <CodeActions />
            <div className="flex-1 overflow-auto">
              <CodeEditor code={state.generatedCode} language="typescript" />
            </div>
          </div>
        ) : (
          <div className="h-full overflow-auto">
            <PreviewPane />
          </div>
        )}
      </div>
    </div>
  );
};

export default RightPanel;