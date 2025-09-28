import React from 'react';
import { LiveProvider, LivePreview, LiveError } from 'react-live';

interface LiveRendererProps {
  code: string;
  scope?: { [key: string]: any };
}

const LiveRenderer: React.FC<LiveRendererProps> = ({ code, scope = {} }) => {
  const transformCode = (code: string) => {
    // 移除 BOM 字元和不必要的空白
    let transformed = code
      .replace(/^\uFEFF/g, '')
      .trim();
    
    // 移除 TypeScript 特定語法
    transformed = transformed
      .replace(/export\s+default\s+/g, '') // 移除 export default
      .replace(/import\s+[\s\S]*?;\s*/g, '') // 移除所有 import 語句
      .replace(/:\s*[\w|<>\[\].]+/g, '') // 移除類型註解
      .replace(/<\s*[\w|<>]+\s*>\s*/g, '') // 移除泛型類型
      .replace(/,\s*}/g, '}') // 移除尾隨逗號
      .replace(/,\s*\)/g, ')') // 移除尾隨逗號
      .replace(/interface\s+\w+\s*{[\s\S]*?}\s*;/g, '') // 移除 interface
      .replace(/type\s+\w+\s*=\s*[\s\S]*?;\s*/g, '') // 移除 type
      .replace(/enum\s+\w+\s*{[\s\S]*?}\s*;/g, '') // 移除 enum
      .replace(/;\s*$/, ''); // 移除結尾分號
    
    // 轉換函數組件語法
    transformed = transformed
      .replace(/const\s+(\w+)\s*:\s*React\.FC<.*?>\s*=\s*\(/g, 'function $1(')
      .replace(/const\s+(\w+)\s*=\s*\(/g, 'function $1(');
    
    // 確保最後有有效的 JSX 元素
    if (!transformed.includes('return')) {
      transformed += '\nreturn <div>{/* 無內容 */}</div>;';
    }
    
    // 確保組件被正確渲染
    if (!transformed.includes('<')) {
      const componentNameMatch = transformed.match(/function\s+(\w+)/);
      if (componentNameMatch) {
        const componentName = componentNameMatch[1];
        transformed += `\n\nexport default ${componentName};`;
      }
    }
    
    return transformed;
  };

  return (
    <LiveProvider code={code} scope={scope} transformCode={transformCode}>
      <div className="border rounded-md overflow-hidden">
        <LivePreview className="p-4 bg-white min-h-[200px]" />
        <LiveError className="p-4 bg-red-50 text-red-600 text-sm" />
      </div>
    </LiveProvider>
  );
};

export default LiveRenderer;