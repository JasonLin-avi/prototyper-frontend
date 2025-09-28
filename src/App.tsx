import React, { useState } from 'react';
import { ChatProvider } from './contexts/ChatContext';
import { GenerationProvider } from './contexts/GenerationContext';
import ChatInterface from './components/Chat/ChatInterface';
import CodeEditor from './components/Code/CodeEditor';
import CodeActions from './components/Code/CodeActions';
import PreviewPane from './components/Preview/PreviewPane';
import { useGeneration } from './contexts/GenerationContext';
import './App.css';

const RightPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'code' | 'preview'>('code');
  const { state } = useGeneration();

  return (
    <div className="w-full h-screen flex flex-col">
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

function App() {
  return (
    <ChatProvider>
      <GenerationProvider>
        <div className="min-h-screen bg-gray-100 flex">
          {/* Left: Chatbot (1/4 width) */}
          <div className="w-1/4 border-r bg-white">
            <div className="p-4">
              <h1 className="text-xl font-bold mb-4 text-center text-gray-800">UI Prototyping Chatbot</h1>
              <ChatInterface />
            </div>
          </div>

          {/* Right: Code & Preview Tabs (3/4 width) */}
          <div className="w-3/4">
            <RightPanel />
          </div>
        </div>
      </GenerationProvider>
    </ChatProvider>
  );
}

export default App;
