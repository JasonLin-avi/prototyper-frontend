import React from 'react';
import { ChatProvider } from './contexts/ChatContext';
import { GenerationProvider } from './contexts/GenerationContext';
import ChatInterface from './components/Chat/ChatInterface';
import RightPanel from './components/RightPanel';
import './App.css';

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
