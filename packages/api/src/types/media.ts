export interface MediaContent {
  id: string;
  title: string;
  type: 'article' | 'video' | 'podcast' | 'report';
  author: string;
  publishedAt: string;
  category: string;
  tags: string[];
  url: string;
  metrics: {
    views: number;
    shares: number;
  };
}

export interface PublishRequest {
  title: string;
  content: string;
  type: 'article' | 'video' | 'podcast' | 'report';
  category: string;
  tags: string[];
}

export interface PublishResponse {
  contentId: string;
  status: 'published' | 'review';
  url: string;
}
