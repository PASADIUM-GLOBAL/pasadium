import React, { useEffect, useState } from 'react';
import {
  Play,
  Camera,
  Users,
  MessageSquare,
  Globe,
} from 'lucide-react';
import { BrandOS } from '@pasadium/bridge';
import { DistributionTarget } from '@pasadium/bridge/src/contracts/media';

export function SocialLinks() {
  const links = [
    {
      name: "YouTube",
      href: "#",
      icon: Play,
    },
    {
      name: "Instagram",
      href: "#",
      icon: Camera,
    },
    {
      name: "Facebook",
      href: "#",
      icon: Users,
    },
  ];

  return (
    <div className="flex items-center gap-4">
      {links.map(({ name, href, icon: Icon }) => (
        <a
          key={name}
          href={href}
          aria-label={name}
          className="transition-opacity hover:opacity-70"
        >
          <Icon size={22} strokeWidth={1.8} />
        </a>
      ))}
    </div>
  );
}

export const OmnichannelMatrix = () => {
  const [targets, setTargets] = useState<DistributionTarget[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await BrandOS.media.getDistributionTargets() as DistributionTarget[];
        setTargets(res);
      } catch (e) {
        const fallback: DistributionTarget[] = [
          { platform: 'YouTube_Shorts', status: 'READY' },
          { platform: 'Instagram_Reels', status: 'READY' },
          { platform: 'Meta_Stories', status: 'READY' },
          { platform: 'Discord_Oracle', status: 'AUTO_DISPATCH' },
        ];
        setTargets(fallback);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <div className="p-4 text-white/20 font-mono text-[10px]">SYNCING_MATRIX...</div>;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-6">
        <Globe className="text-blue-400" size={18} />
        <h3 className="text-sm font-bold tracking-tight uppercase">Omnichannel_Matrix</h3>
      </div>

      <div className="space-y-3">
        {targets.map((target, i) => (
          <PlatformCard 
            key={i} 
            icon={getIcon(target.platform)} 
            name={target.platform} 
            status={target.status} 
            color={getColor(target.platform)} 
          />
        ))}
      </div>

      <div className="mt-auto pt-6 border-t border-white/5">
        <div className="flex justify-between items-center mb-4">
          <span className="text-[10px] font-mono text-white/30 uppercase">Global_Reach_Projection</span>
          <span className="text-xs font-bold text-green-400">140k+</span>
        </div>
        <button className="w-full py-3 bg-white/5 border border-white/10 text-white/50 rounded-lg text-[10px] font-mono tracking-widest hover:bg-white/10 hover:text-white transition-all uppercase">
          Configure_Distribution
        </button>
      </div>
    </div>
  );
};

const getIcon = (platform: string) => {
  if (platform.includes('YouTube')) return <Play size={16} />;
  if (platform.includes('Instagram')) return <Camera size={16} />;
  if (platform.includes('Meta')) return <Users size={16} />;
  return <MessageSquare size={16} />;
};

const getColor = (platform: string) => {
  if (platform.includes('YouTube')) return 'text-red-500';
  if (platform.includes('Instagram')) return 'text-pink-500';
  if (platform.includes('Meta')) return 'text-blue-500';
  return 'text-indigo-400';
};

const PlatformCard = ({ icon, name, status, color }: any) => (
  <div className="p-3 bg-white/5 border border-white/5 rounded-lg flex items-center justify-between group hover:border-white/20 transition-all cursor-pointer">
    <div className="flex items-center gap-3">
      <div className={`${color} opacity-70 group-hover:opacity-100 transition-opacity`}>{icon}</div>
      <span className="text-[11px] font-medium text-white/70">{name}</span>
    </div>
    <span className="text-[8px] font-mono text-white/20 uppercase tracking-tighter group-hover:text-cyan-400 transition-colors">
      {status}
    </span>
  </div>
);
