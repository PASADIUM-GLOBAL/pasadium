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

const shellStyles = {
  root: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: 'var(--color-bg-main)',
    color: 'var(--color-text-primary)',
    fontFamily: 'var(--font-sans)'
  } as const,
  sidebar: {
    width: '260px',
    backgroundColor: 'var(--color-bg-surface)',
    borderRight: '1px solid var(--color-border)',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    height: '100vh'
  } as const,
  main: {
    marginLeft: '260px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  } as const,
  header: {
    height: '64px',
    backgroundColor: 'var(--color-bg-surface)',
    borderBottom: '1px solid var(--color-border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px'
  } as const,
};

const navButtonStyles = (active: boolean) => ({
  display: "block" as const,
  width: "100%",
  padding: "12px 24px",
  textAlign: "left" as const,
  color: active ? "var(--color-accent-blue)" : "var(--color-text-secondary)",
  backgroundColor: active ? "var(--color-bg-elevated)" : "transparent",
  fontWeight: active ? "bold" : "normal",
  fontSize: "0.9rem",
  border: "none",
  borderLeft: active ? "4px solid var(--color-accent-blue)" : "4px solid transparent",
  cursor: "pointer",
  transition: "all 0.2s"
});

const userInfoStyles = {
  container: {
    padding: "20px",
    borderTop: "1px solid var(--color-border)",
    fontSize: "0.8rem",
  },
  name: { fontWeight: "bold" as const },
  role: { color: "var(--color-text-secondary)" }
};

const NavigationButton = <T extends string>({ item, activeModule, onModuleChange }: { item: NavigationItem<T>, activeModule?: T, onModuleChange?: (id: T) => void }) => {
  const active = item.id === activeModule;
  return (
    <button
      key={item.id}
      type="button"
      onClick={() => onModuleChange?.(item.id)}
      aria-current={active ? "page" : undefined}
      style={navButtonStyles(active)}
    >
      {item.icon && (
        <span style={{ marginRight: "10px" }}>{item.icon}</span>
      )}
      {item.label}
    </button>
  );
};

const SidebarUserInfo = ({ user }: { user: AppShellUser }) => (
  <div style={userInfoStyles.container}>
    <div style={userInfoStyles.name}>{user.name}</div>
    {user.role && (
      <div style={userInfoStyles.role}>{user.role}</div>
    )}
  </div>
);

export function AppShell<T extends string = string>({
  children,
  activeModule,
  onModuleChange,
  appName = "PASADIUM",
  navigation,
  user,
}: AppShellProps<T>) {
  return (
    <div style={shellStyles.root}>
      <aside style={shellStyles.sidebar}>
        <div style={{ padding: '24px', borderBottom: '1px solid var(--color-border)' }}>
          <PasadiumLogo size="small" />
        </div>

        <nav style={{ padding: "20px 0", flex: 1 }}>
          {navigation.map((item) => (
            <NavigationButton
              key={item.id}
              item={item}
              activeModule={activeModule}
              onModuleChange={onModuleChange}
            />
          ))}
        </nav>

        {user && <SidebarUserInfo user={user} />}
      </aside>

      <div style={shellStyles.main}>
        <header style={shellStyles.header}>
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
