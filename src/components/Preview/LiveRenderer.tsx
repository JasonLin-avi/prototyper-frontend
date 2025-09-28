import React from 'react';
import { LiveProvider, LivePreview, LiveError } from 'react-live';

interface LiveRendererProps {
  code: string;
  scope?: { [key: string]: any };
}

const LiveRenderer: React.FC<LiveRendererProps> = ({ code, scope = {} }) => {
  return (
    <LiveProvider code={code} scope={scope}>
      <div className="border rounded-md overflow-hidden">
        <LivePreview className="p-4 bg-white min-h-[200px]" />
        <LiveError className="p-4 bg-red-50 text-red-600 text-sm" />
      </div>
    </LiveProvider>
  );
};

export default LiveRenderer;