import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { GenerationProvider } from './contexts/GenerationContext';
import { ChatProvider } from './contexts/ChatContext';

test('renders live preview', () => {
  render(
    <GenerationProvider>
      <ChatProvider>
        <App />
      </ChatProvider>
    </GenerationProvider>
  );
  
  // Test basic rendering
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
  
  // Test preview pane exists
  const preview = screen.getByTestId('preview-pane');
  expect(preview).toBeInTheDocument();
});
