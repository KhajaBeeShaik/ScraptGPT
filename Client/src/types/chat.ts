// src/types/chat.ts

export interface SearchInfo {
  stages: ('searching' | 'reading' | 'writing' | 'error')[];
  query?: string;
  // Server sometimes sends strings or objects; keep it flexible:
  urls?: unknown[];
  error?: string;
}

export type Role = 'user' | 'assistant' | 'system';
export type MessageKind = 'message' | 'notice' | 'error';

export interface Message {
  id: string;
  role: Role;                // use this instead of isUser
  type: MessageKind;         // you’re already setting "message"
  content: string;
  isLoading?: boolean;
  searchInfo?: SearchInfo;
}

