// src/types/chat.ts
// src/types/chat.ts

export interface SearchInfo {
  stages: ('searching' | 'reading' | 'writing' | 'error')[];
  query?: string;
  urls?: string[];
  error?: string;
}

// src/types/chat.ts
export interface Message {
  id: string; // decide on string everywhere
  role: 'user' | 'assistant' | 'system';
  content: string;
  // ...whatever else you have
}

