import './globals.css';
import { Inter } from 'next/font/google';
import { AuthProvider } from '../context/AuthContext';
import { SovereignRealtimeProvider } from '../context/RealtimeContext';
import { SovereignErrorBoundary } from '../components/SovereignErrorBoundary';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'PASADIUM Sovereign Workstation',
  description: 'The Unified Shell for BrandOS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#020408] text-white`}>
        <SovereignErrorBoundary>
          <AuthProvider>
            <SovereignRealtimeProvider>
              {children}
            </SovereignRealtimeProvider>
          </AuthProvider>
        </SovereignErrorBoundary>
      </body>
    </html>
  );
}
