import React from 'react';
import type { AdminVerification } from '@pasadium/bridge';

interface SovereignVerificationProps {
  verification: AdminVerification | null;
}

export const SovereignVerification = ({
  verification,
}: SovereignVerificationProps) => {
  if (!verification) {
    return (
      <div className="p-8 text-[9px] font-mono text-white/20 uppercase">
        Awaiting_Verification_Target
      </div>
    );
  }

  return (
    <div className="rounded-[28px] border border-white/5 bg-white/[0.02] p-6">
      <div className="mb-6 flex justify-between">
        <div>
          <span className="text-[9px] font-mono tracking-[0.3em] text-white/20 uppercase">
            Sovereign_Verification
          </span>

          <h3 className="mt-2 text-xl font-bold text-white">
            {verification.reference}
          </h3>
        </div>

        <span className="text-[9px] font-mono text-cyan-400">
          {verification.status}
        </span>
      </div>

      <div className="space-y-4 text-[10px] font-mono">
        <VerificationRow
          label="TYPE"
          value={verification.type}
        />

        <VerificationRow
          label="ASSET"
          value={verification.asset}
        />

        <VerificationRow
          label="TIMESTAMP"
          value={verification.timestamp}
        />
      </div>
    </div>
  );
};

const VerificationRow = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <div className="flex justify-between border-b border-white/5 pb-3">
    <span className="text-white/20">{label}</span>
    <span className="text-white/60">{value}</span>
  </div>
);
