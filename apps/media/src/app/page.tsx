"use client";
import React, { useEffect, useState } from 'react';
import { MediaLayout } from "@/components/layout/MediaLayout";
import { ContentCard } from "@/components/media/ContentCard";
import { Container } from "@shared/ui";
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
        console.error("Failed to load feed", e);
      } finally {
        setLoading(false);
      }
    };
    loadFeed();
  }, []);

  return (
    <MediaLayout>
      <Container>
        <div className="media-hero">
          <h1>Intelligence & Media</h1>
          <p>The official publishing gateway for PASADIUM research, news, and digital content.</p>
        </div>

        {loading ? (
          <div className="loading-state">Loading Content Feed...</div>
        ) : (
          <div className="content-grid">
            {feed.map(item => (
              <ContentCard key={item.id} content={item} />
            ))}
          </div>
        )}
      </Container>
    </MediaLayout>
  );
}
