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
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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
      const mockCode = `const TodoInput = () => {
  const [task, setTask] = React.useState('');
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">To-Do Input</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        console.log('Added task:', task);
        setTask('');
      }} className="mb-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="輸入任務..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            添加
          </button>
        </div>
      </form>
    </div>
  );
};
<TodoInput />`;

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
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatState.messages.map((message, index) => (
          <MessageBubble
            key={index}
            message={message}
            isUser={message.role === 'user'}
          />
        ))}
        {chatState.isLoading && (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          </div>
        )}
        <div ref={messagesEndRef} />
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