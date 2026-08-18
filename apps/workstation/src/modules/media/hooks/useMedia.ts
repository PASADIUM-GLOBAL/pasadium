import { useState, useEffect } from 'react';
import { BrandOS } from '@pasadium/bridge';
import { MediaProject, NarrativeRequest, NarrativeResult, ProductionAsset } from '@pasadium/bridge/src/contracts/media';

export function useMedia() {
  const [project, setProject] = useState<MediaProject | null>(null);
  const [narrative, setNarrative] = useState<NarrativeResult | null>(null);
  const [productionStatus, setProductionStatus] = useState<any>(null);
  const [assets, setAssets] = useState<ProductionAsset[]>([]);
  const [loading, setLoading] = useState(false);

  async function createProject(request: NarrativeRequest) {
    setLoading(true);
    try {
      const res = await BrandOS.media.createProject(request);
      setProject(res);
      return res;
    } finally {
      setLoading(false);
    }
  }

  async function generateNarrative(projectId: string) {
    setLoading(true);
    try {
      const res = await BrandOS.media.generateNarrative(projectId);
      setNarrative(res);
      return res;
    } finally {
      setLoading(false);
    }
  }

  async function syncProductionStatus(projectId: string) {
    try {
      const res = await BrandOS.media.getProductionStatus(projectId);
      setProductionStatus(res);
    } catch (e) {
      console.error("Production status sync failed", e);
    }
  }

  async function syncAssets(projectId: string) {
    try {
      const res = await BrandOS.media.getAssets(projectId);
      setAssets(res);
    } catch (e) {
      console.error("Assets sync failed", e);
    }
  }

  return {
    project,
    setProject,
    narrative,
    setNarrative,
    productionStatus,
    assets,
    loading,
    createProject,
    generateNarrative,
    syncProductionStatus,
    syncAssets
  };
}
