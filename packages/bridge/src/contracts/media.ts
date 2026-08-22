export interface MediaJob {
  id: string;
  prompt: string;
  status: 'QUEUED' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  progress: number;
  createdAt: Date;
}

export interface DistributionTarget {
  id: string;
  platform: 'YOUTUBE' | 'INSTAGRAM' | 'X' | 'DISCORD';
  label: string;
  status: 'READY' | 'LOCKED' | 'SYNCING' | 'AUTO';
  reachProjection: number;
}

export interface DistributionNetwork {
  targets: DistributionTarget[];
  totalReach: number;
}

export interface MediaProject {
  id: string;
  title: string;
  seed: string;
  status: 'DRAFT' | 'DEVELOPING' | 'PRODUCING' | 'REVIEW' | 'READY' | 'DISTRIBUTING' | 'COMPLETE' | 'FAILED';
}

export interface NarrativeRequest {
  seed: string;
  objective?: string;
  audience?: string;
  tone?: string;
  platforms?: string[];
}

export interface StoryboardScene {
  sequence: number;
  description: string;
  dialogue?: string;
  visualDirection?: string;
  durationSeconds?: number;
}

export interface NarrativeResult {
  projectId: string;
  title: string;
  synopsis: string;
  script: string;
  storyboard: StoryboardScene[];
}

export interface ProductionAsset {
  id: string;
  type: 'SCRIPT' | 'VOICE' | 'VIDEO' | 'IMAGE' | 'MOTION' | 'CAPTION' | 'THUMBNAIL';
  status: 'QUEUED' | 'PROCESSING' | 'COMPLETE' | 'FAILED';
  progress: number;
}

export interface ProductionStatus {
  overallProgress: number;
  stages: {
    label: string;
    status: ProductionAsset['status'];
    progress: number;
  }[];
}

export interface MediaCapability {
  createProject(request: NarrativeRequest): Promise<MediaProject>;

  generateNarrative(
    projectId: string
  ): Promise<NarrativeResult>;
  getProductionStatus(projectId: string): Promise<ProductionStatus>;
   
  getDistributionTargets(): Promise<DistributionTarget[]>;

  getProductionStatus(projectId: string): Promise<{
    overallProgress: number;
    stages: {
      label: string;
      status: ProductionAsset['status'];
      progress: number;
    }[];
  }>;

  getAssets(
    projectId: string
  ): Promise<ProductionAsset[]>;

  configureDistribution(
    projectId: string,
    targets: DistributionTarget[]
  ): Promise<{ success: boolean }>;

  publish(projectId: string): Promise<{
    status: string;
    publishDate: string;
  }>;
}
