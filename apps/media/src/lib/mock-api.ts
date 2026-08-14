import { MediaContent, PublishResponse } from "@pasadium/api";

class MockMediaApi {
  private contents: MediaContent[] = [
    { 
      id: 'm1', 
      title: 'The Future of Decentralized Finance', 
      type: 'article', 
      author: 'Sovereign Analyst', 
      publishedAt: '2026-08-10', 
      category: 'Intelligence', 
      tags: ['DeFi', 'Future'], 
      url: '/media/article/1', 
      metrics: { views: 12500, shares: 450 } 
    },
    { 
      id: 'm2', 
      title: 'Securing Digital Sovereignty', 
      type: 'video', 
      author: 'Chief Security Officer', 
      publishedAt: '2026-08-12', 
      category: 'Security', 
      tags: ['Privacy', 'Security'], 
      url: '/media/video/2', 
      metrics: { views: 8900, shares: 1200 } 
    },
    { 
      id: 'm3', 
      title: 'Market Trends: Q3 2026 Report', 
      type: 'report', 
      author: 'TradeVerse Research', 
      publishedAt: '2026-08-14', 
      category: 'Intelligence', 
      tags: ['Reports', 'Analysis'], 
      url: '/media/report/3', 
      metrics: { views: 5600, shares: 800 } 
    },
  ];

  async getFeed(): Promise<MediaContent[]> {
    await new Promise(resolve => setTimeout(resolve, 800));
    return this.contents;
  }

  async publish(req: any): Promise<PublishResponse> {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return {
      contentId: `med_${Math.random().toString(36).substr(2, 9)}`,
      status: 'published',
      url: `/media/content/${Math.random().toString(36).substr(2, 5)}`,
    };
  }
}

export const mockMediaApi = new MockMediaApi();
