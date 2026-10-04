import React from 'react';
import { X, Check, Zap, Sparkles, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface UpgradePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  isCurrentPro: boolean;
  onUpgradeSuccess: () => void;
}

export const UpgradePlanModal: React.FC<UpgradePlanModalProps> = ({
  isOpen,
  onClose,
  isCurrentPro,
  onUpgradeSuccess,
}) => {
  if (!isOpen) return null;

  const handleUpgrade = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch (e) {}
    onUpgradeSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-[#FAF8F5] rounded-2xl border border-[#DCD7CB] shadow-2xl max-w-lg w-full overflow-hidden relative animate-fade-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-1.5 rounded-full text-[#6E7179] hover:bg-[#EAE6DE] hover:text-[#18191C] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header */}
        <div className="p-6 bg-[#18191C] text-white text-center">
          <div className="w-10 h-10 rounded-xl bg-white/10 mx-auto flex items-center justify-center mb-3">
            <Zap className="w-5 h-5 text-amber-300 fill-amber-300" />
          </div>
          <h3 className="font-display text-2xl font-bold text-white">
            CareerAI Pro
          </h3>
          <p className="text-xs text-white/70 mt-1 max-w-xs mx-auto">
            Unlimited AI career intelligence, mock technical interviews, and resume tailoring.
          </p>
        </div>

        {/* Price & Features */}
        <div className="p-6 space-y-5">
          <div className="text-center">
            <span className="font-display text-4xl font-bold text-[#18191C]">$19</span>
            <span className="text-xs text-[#6E7179] font-medium"> / month (or $190/year)</span>
          </div>

          <div className="space-y-3">
            {[
              'Unlimited Gemini 3.7 Flash career strategist conversations',
              'Automated resume-to-job matching & ATS keyword diagnostics',
              'Deep-dive interactive Jupyter code sandboxes and guided labs',
              'Personalized weekly sprint notifications and interview prep',
              'Direct export of verified CareerAI skill certifications',
            ].map((feat, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs text-[#3E414A]">
                <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </div>
                <span>{feat}</span>
              </div>
            ))}
          </div>

          <button
            onClick={handleUpgrade}
            className="w-full py-3 bg-[#18191C] text-white font-bold text-xs rounded-xl hover:bg-black transition-all flex items-center justify-center gap-2 shadow-xs"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{isCurrentPro ? 'Active Pro Tier (Switch to Annual)' : 'Upgrade to Pro Tier'}</span>
          </button>

          <p className="text-[10px] text-[#888B95] text-center">
            Cancel anytime with 1-click. 14-day money-back guarantee.
          </p>
        </div>
      </div>
    </div>
  );
};
