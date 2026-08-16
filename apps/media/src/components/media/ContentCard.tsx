import React from 'react';
import { Card } from "@pasadium/ui";
import { MediaContent } from "@pasadium/api";

interface ContentCardProps {
  content: MediaContent;
}

export function ContentCard({ content }: ContentCardProps) {
  return (
    <Card className="content-card">
      <div className="content-meta">
        <span className="content-type">{content.type}</span>
        <span className="content-category">{content.category}</span>
      </div>
      <h3 className="content-title">{content.title}</h3>
      <p className="content-author">By {content.author} • {content.publishedAt}</p>
      <div className="content-metrics">
        <span>{content.metrics.views} views</span>
        <span>{content.metrics.shares} shares</span>
      </div>
      <a href={content.url} className="read-more">Read More →</a>
    </Card>
  );
}
