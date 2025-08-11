// src/types/chat.ts
// src/types/chat.ts

export interface SearchInfo {
  stages: ('searching' | 'reading' | 'writing' | 'error')[];
  query?: string;
  urls?: string[];
  error?: string;
}

export interface Message {
  id: string;
  isUser: boolean;
  content: string;
  isLoading?: boolean;
  searchInfo?: SearchInfo;
}
