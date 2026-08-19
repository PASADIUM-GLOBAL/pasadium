import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { RealtimeState, ConnectionStatus } from '@pasadium/config';
import { useAuth } from './AuthContext';

interface RealtimeContextType {
  status: ConnectionStatus;
  latency: number;
  lastSync: string;
  subscribe: <T>(event: string, callback: (payload: T) => void) => () => void;
  emit: (event: string, payload: any) => void;
}

const RealtimeContext = createContext<RealtimeContextType | null>(null);

export const SovereignRealtimeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token } = useAuth();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [state, setState] = useState<RealtimeState>({
    status: 'offline',
    latency: 0,
    lastSync: new Date().toISOString(),
  });

  useEffect(() => {
    if (!token) return;

    // AUTHENTICATED HANDSHAKE: Protocol 4 Hardening
    const s = io('http://localhost:4000', {
      auth: { token },
      transports: ['websocket'],
    });

    s.on('connect', () => {
      setState(prev => ({ ...prev, status: 'connected', lastSync: new Date().toISOString() }));
    });

    s.on('disconnect', () => {
      setState(prev => ({ ...prev, status: 'offline' }));
    });

    s.on('connect_error', () => {
      setState(prev => ({ ...prev, status: 'reconnecting' }));
    });

    // Latency Tracking
    const pingInterval = setInterval(() => {
      const start = Date.now();
      s.emit('ping', () => {
        setState(prev => ({ ...prev, latency: Date.now() - start }));
      });
    }, 10000);

    setSocket(s);

    return () => {
      s.disconnect();
      clearInterval(pingInterval);
    };
  }, [token]);

  const subscribe = useCallback(<T,>(event: string, callback: (payload: T) => void) => {
    if (!socket) return () => {};
    socket.on(event, callback);
    return () => { socket.off(event, callback); };
  }, [socket]);

  const emit = useCallback((event: string, payload: any) => {
    if (!socket) {
      console.error('SovereignRealtime: Socket not connected');
      return;
    }
    socket.emit(event, payload);
  }, [socket]);

  return (
    <RealtimeContext.Provider value={{ 
      status: state.status, 
      latency: state.latency, 
      lastSync: state.lastSync,
      subscribe, 
      emit 
    }}>
      {children}
    </RealtimeContext.Provider>
  );
};

export const useRealtime = () => {
  const context = useContext(RealtimeContext);
  if (!context) throw new Error('useRealtime must be used within SovereignRealtimeProvider');
  return context;
};
