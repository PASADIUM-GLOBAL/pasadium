"use client";
import React, { useEffect, useState } from 'react';
import { AppShell, Metric, Card } from "@pasadium/ui";
import { MediaContent } from "@pasadium/api";
import { mediaApi } from "@/lib/api-client";

export default function MediaPage() {
  const [feed, setFeed] = useState<MediaContent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeed = async () => {
      try {
        const data = await mediaApi.getFeed();
        setFeed(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    loadFeed();
  }, []);

  const navigation = [
    { label: 'Studio', href: '/', active: true },
    { label: 'Ideas', href: '/ideas' },
    { label: 'Projects', href: '/projects' },
    { label: 'Content', href: '/content' },
    { label: 'Calendar', href: '/calendar' },
    { label: 'Channels', href: '/channels' },
    { label: 'Analytics', href: '/analytics' },
    { label: 'Publishing', href: '/publishing' },
  ];

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading Studio...</div>;

  return (
    <AppShell 
      appName="Media Studio" 
      navigation={navigation} 
      user={{ name: 'creator_1', role: 'Producer' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>MEDIA STUDIO</h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>Content pipeline and publishing orchestration.</p>
        </div>

        <section>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '24px', color: 'var(--color-text-secondary)' }}>TODAY'S PIPELINE</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
            <Metric label="Ideas" value="24" trend="up" />
            <Metric label="Drafts" value="8" trend="neutral" />
            <Metric label="Review" value="3" trend="down" />
            <Metric label="Scheduled" value="12" trend="up" />
            <Metric label="Published" value="7" trend="up" />
          </div>
        </section>

        <section>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '24px', color: 'var(--color-text-secondary)' }}>CONTENT PIPELINE</h2>
          <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '20px' }}>
            {['IDEA', 'RESEARCH', 'SCRIPT', 'PRODUCTION', 'REVIEW', 'SCHEDULE', 'PUBLISH', 'ANALYZE'].map(stage => (
              <div key={stage} style={{ 
                minWidth: '150px', 
                padding: '12px', 
                backgroundColor: 'var(--color-bg-surface)', 
                borderRadius: '8px', 
                border: '1px solid var(--color-border)',
                textAlign: 'center',
                fontSize: '0.8rem',
                fontWeight: 'bold',
                color: 'var(--color-text-secondary)'
              }}>
                {stage}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '24px', color: 'var(--color-text-secondary)' }}>RECENT CONTENT</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
            {feed.map(item => (
              <Card key={item.id}>
                <div style={{ height: '160px', backgroundColor: 'var(--color-bg-elevated)', borderRadius: '4px', marginBottom: '16px' }}></div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>{item.title}</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                  <span>{item.type}</span>
                  <span>{item.category}</span>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
