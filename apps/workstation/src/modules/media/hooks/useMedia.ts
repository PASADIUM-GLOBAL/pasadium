import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import type { MediaJob, DistributionNetwork } from '@pasadium/bridge';

export const useMedia = () => {
  const { bridge } = useAuth();
  const [activeJob, setActiveJob] = useState<MediaJob | null>(null);
  const [isDispatching, setIsDispatching] = useState(false);
  const [network, setNetwork] = useState<DistributionNetwork | null>(null);

  const dispatchMedia = async (prompt: string) => {
    setIsDispatching(true);
    try {
      const job = await bridge.media.dispatch(prompt);
      setActiveJob(job);
      return job;
    } catch (err) {
      console.error("DISPATCH_FAILURE:", err);
    } finally {
      setIsDispatching(false);
    }
  };

  const getStatus = async (id: string) => {
    return await bridge.media.getJobStatus(id);
  };

  const fetchNetwork = async () => {
    try {
      const data = await bridge.media.getDistribution();
      setNetwork(data);
    } catch (err) {
      console.error("DISTRIBUTION_SYNC_FAILURE:", err);
    }
  };

  // Polling logic to keep job statuses updated
  useEffect(() => {
    if (!activeJob || activeJob.status === 'COMPLETED' || activeJob.status === 'FAILED') return;

    const poll = async () => {
      try {
        const updatedJob = await bridge.media.getJobStatus(activeJob.id);
        setActiveJob(updatedJob);
      } catch (err) {
        console.error("JOB_POLL_FAILURE:", err);
      }
    };

    const interval = setInterval(poll, 5000);
    return () => clearInterval(interval);
  }, [activeJob, bridge]);

  return { activeJob, isDispatching, dispatchMedia, getStatus, setActiveJob, network, fetchNetwork };
};
