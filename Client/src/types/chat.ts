// src/types/chat.ts
export interface SearchInfo {
  stages: string[];
  query: string;
  urls: string[];
  error?: string;
}

export interface Message {
  id: number;
  content: string;
  isUser: boolean;
  type: "message";
  isLoading?: boolean;
  searchInfo?: SearchInfo;
}
