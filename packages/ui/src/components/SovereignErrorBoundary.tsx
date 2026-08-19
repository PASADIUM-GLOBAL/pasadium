import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCcw, Terminal } from 'lucide-react';
import { BRAND_COLORS } from '@pasadium/config';

interface Props { children: ReactNode; }
interface State { hasError: boolean; error: Error | null; }

export class SovereignErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false, error: null };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Sovereign Boundary Catch:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#020408] p-6 text-center">
          <div className="max-w-lg w-full p-12 rounded-[40px] border backdrop-blur-3xl" 
               style={{ backgroundColor: 'rgba(10, 12, 18, 0.8)', borderColor: BRAND_COLORS.border.subtle }}>
            
            <div className="flex justify-center mb-8">
              <div className="p-6 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 animate-pulse">
                <AlertTriangle size={48} />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">
              CONNECTION INTERRUPTED
            </h2>
            
            <p className="text-white/40 font-light leading-relaxed mb-10">
              The workstation could not establish a secure connection to the identity environment. 
              The system has triggered a safety circuit to protect your workspace.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-left">
                <div className="text-[9px] font-mono text-white/20 uppercase mb-1">Identity</div>
                <div className="text-xs font-bold text-red-400 font-mono">OFFLINE</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-left">
                <div className="text-[9px] font-mono text-white/20 uppercase mb-1">Gateway</div>
                <div className="text-xs font-bold text-green-400 font-mono">ONLINE</div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <button 
                onClick={this.handleReset}
                className="w-full py-4 bg-white text-black rounded-2xl font-bold text-sm tracking-widest hover:bg-cyan-400 transition-all flex items-center justify-center gap-3"
              >
                <RefreshCcw size={18} /> RETRY CONNECTION
              </button>
              <button className="w-full py-4 bg-white/5 text-white/60 rounded-2xl font-bold text-sm tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                <Terminal size={18} /> RUN DIAGNOSTICS
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
