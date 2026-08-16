import React from 'react';
import { Container } from "@pasadium/ui";

interface MediaLayoutProps {
  children: React.ReactNode;
}

export function MediaLayout({ children }: MediaLayoutProps) {
  return (
    <div className="media-console">
      <header className="media-header">
        <Container>
          <div className="header-brand">PASADIUM MEDIA</div>
          <div className="header-nav">
            <a href="/feed">Feed</a>
            <a href="/publish">Publish</a>
            <a href="/categories">Categories</a>
            <div className="user-account">
              <span className="avatar-small"></span>
              <span>Creator Studio</span>
            </div>
          </div>
        </Container>
      </header>
      <main className="media-main">
        {children}
      </main>
      <footer className="media-footer">
        <Container>
          <p>© {new Date().getFullYear()} PASADIUM MEDIA SERVICES</p>
        </Container>
      </footer>
    </div>
  );
}
