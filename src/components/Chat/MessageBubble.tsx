import React from 'react';
import { Message } from '../../types';

interface MessageBubbleProps {
  message: Message;
  isUser: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isUser }) => {
  const bubbleClass = isUser 
    ? 'bg-blue-500 text-white ml-auto' 
    : 'bg-gray-300 text-black mr-auto';

  return (
    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${bubbleClass} mb-2`}>
      <p className="whitespace-pre-wrap">{message.content}</p>
      <span className={`text-xs ${isUser ? 'text-blue-100' : 'text-gray-500'} block mt-1`}>
        {message.timestamp.toLocaleTimeString()}
      </span>
    </div>
  );
};

export default MessageBubble;