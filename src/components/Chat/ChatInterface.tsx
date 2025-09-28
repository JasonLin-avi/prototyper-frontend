import React, { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import { useChat } from '../../contexts/ChatContext';
import { useGeneration } from '../../contexts/GenerationContext';
import { Message } from '../../types';

const ChatInterface: React.FC = () => {
  const { state: chatState, dispatch: chatDispatch } = useChat();
  const { dispatch: generationDispatch } = useGeneration();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatState.messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    chatDispatch({ type: 'ADD_MESSAGE', payload: userMessage });
    setInputValue('');

    // 模擬 loading 和 bot 回應 (未來替換為 API 呼叫)
    chatDispatch({ type: 'SET_LOADING', payload: true });

    setTimeout(() => {
      const mockCode = `export default function HelloWorld() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Hello World!
        </h1>
        <p className="text-gray-600">
          這是我的第一個 React 應用程式
        </p>
      </div>
    </div>
  );
}`;

      const botMessage: Message = {
        role: 'bot',
        content: '已根據您的輸入生成 To-Do 輸入畫面程式碼。請查看右側的程式碼與預覽。',
        timestamp: new Date(),
      };
      chatDispatch({ type: 'ADD_MESSAGE', payload: botMessage });
      generationDispatch({ 
        type: 'SET_CODE', 
        payload: { 
          code: mockCode, 
          previewProps: { componentName: 'TodoInput' } 
        } 
      });
      chatDispatch({ type: 'SET_LOADING', payload: false });
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col-reverse">
        <div>
          {chatState.isLoading && (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
            </div>
          )}
          {chatState.messages.map((message, index) => (
            <MessageBubble
              key={index}
              message={message}
              isUser={message.role === 'user'}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="輸入您的訊息..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={chatState.isLoading}
          />
          <button
            type="submit"
            disabled={chatState.isLoading || !inputValue.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            發送
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;