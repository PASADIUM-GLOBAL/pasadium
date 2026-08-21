import type { ReactNode } from "react";
import { PasadiumLogo } from '../brand/PasadiumLogo';


export interface NavigationItem<T extends string = string> {
  id: T;
  label: string;
  icon?: ReactNode;
}

export interface AppShellUser {
  name: string;
  role: string;
}

export interface AppShellProps <T extends string = string> {
  children: ReactNode;
  appName?: string;
  navigation: NavigationItem<T>[];
  user?: AppShellUser;
  activeModule?: T;
  onModuleChange?: (id: T) => void;
}


export function AppShell<T extends string = string>({
  children,
  activeModule,
  onModuleChange,
  appName = "PASADIUM",
  navigation,
  user,
}: AppShellProps<T>) {
  return (
    <div style={{ 
      display: 'flex', 
      minHeight: '100vh', 
      backgroundColor: 'var(--color-bg-main)', 
      color: 'var(--color-text-primary)',
      fontFamily: 'var(--font-sans)'
    }}>
      {/* Sidebar */}
      <aside style={{ 
        width: '260px', 
        backgroundColor: 'var(--color-bg-surface)', 
        borderRight: '1px solid var(--color-border)',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        height: '100vh'
      }}>
        <div style={{ padding: '24px', borderBottom: '1px solid var(--color-border)' }}>
          <PasadiumLogo size="small" />
        </div>
        
        <nav style={{ padding: "20px 0", flex: 1 }}>
          {navigation.map((item) => {
            const active = item.id === activeModule;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onModuleChange?.(item.id)}
                aria-current={active ? "page" : undefined}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "12px 24px",
                  textAlign: "left",
                  color: active
                    ? "var(--color-accent-blue)"
                    : "var(--color-text-secondary)",
                  backgroundColor: active
                    ? "var(--color-bg-elevated)"
                    : "transparent",
                  fontWeight: active ? "bold" : "normal",
                  fontSize: "0.9rem",
                  border: "none",
                  borderLeft: active
                    ? "4px solid var(--color-accent-blue)"
                    : "4px solid transparent",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {item.icon && (
                  <span style={{ marginRight: "10px" }}>{item.icon}</span>
                )}
                {item.label}
              </button>
             );
          })}
        </nav>
        
        {user && (
          <div
            style={{
              padding: "20px",
              borderTop: "1px solid var(--color-border)",
              fontSize: "0.8rem",
            }}
          >
            <div style={{ fontWeight: "bold" }}>{user.name}</div>

            {user.role && (
              <div style={{ color: "var(--color-text-secondary)" }}>
                {user.role}
              </div>
            )}
          </div>
        )}
      </aside>

      {/* Main Content Area */}
      <div style={{ marginLeft: '260px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header style={{ 
          height: '64px', 
          backgroundColor: 'var(--color-bg-surface)', 
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px'
        }}>
          <span style={{ fontWeight: 'bold', letterSpacing: '1px', color: 'var(--color-text-secondary)' }}>
            {appName.toUpperCase()}
          </span>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>System Status: Operational</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)' }}></div>
          </div>
        </header>
        
        <main style={{ padding: '32px', flex: 1 }}>
          {children}
        </main>
      </div>
    </div>
  );
}
