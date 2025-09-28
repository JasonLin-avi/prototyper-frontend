export interface Message {
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export interface PreviewProps {
  componentName: string;
}

export interface GenerationState {
  generatedCode: string;
  previewProps: PreviewProps;
  error: string | null;
  isLoading: boolean;
}

export interface ApiResponse {
  code: string;
  componentName: string;
  error?: string;
}