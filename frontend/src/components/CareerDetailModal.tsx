import React from 'react';
import { CareerRecommendation, UserProfile, ActiveTab } from '../types';
import {
  X,
  Sparkles,
  Compass,
  CheckCircle2,
  AlertCircle,
  Clock,
  DollarSign,
  TrendingUp,
  Map,
  ArrowRight,
  Briefcase,
  Layers,
  Award,
} from 'lucide-react';

interface CareerDetailModalProps {
  career: CareerRecommendation | null;
  onClose: () => void;
  user: UserProfile;
  onSelectAsTarget: (roleTitle: string) => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const CareerDetailModal: React.FC<CareerDetailModalProps> = ({
  career,
  onClose,
  user,
  onSelectAsTarget,
  setActiveTab,
}) => {
  if (!career) return null;

  const isCurrentTarget = user.targetRole === career.title;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-[#F7F6F2] rounded-2xl border border-[#DCD7CB] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative animate-fade-in">
        {/* Close Button */}
        <button
          id="career-modal-close-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-1.5 rounded-full text-[#6E7179] hover:bg-[#EAE6DE] hover:text-[#18191C] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header */}
        <div className="p-6 sm:p-8 bg-[#EFECE5] border-b border-[#E2DDD3]">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-indigo-700 bg-indigo-100 px-2.5 py-0.5 rounded-full">
              {career.category}
            </span>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
              {career.matchPercentage}% Fit Match
            </span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#18191C]">
            {career.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#5D606B] mt-2 leading-relaxed">
            {career.description}
          </p>

          {/* Quick Metrics */}
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-[#E2DDD3]">
            <div className="p-2.5 bg-[#FAF8F5] rounded-xl border border-[#DCD7CB]">
              <span className="text-[10px] uppercase font-bold text-[#868A94] block">Est Duration</span>
              <span className="font-bold text-xs text-[#18191C] mt-0.5 block">{career.estimatedDuration}</span>
            </div>
            <div className="p-2.5 bg-[#FAF8F5] rounded-xl border border-[#DCD7CB]">
              <span className="text-[10px] uppercase font-bold text-[#868A94] block">Salary Benchmark</span>
              <span className="font-bold text-xs text-[#18191C] mt-0.5 block">{career.salaryRange}</span>
            </div>
            <div className="p-2.5 bg-[#FAF8F5] rounded-xl border border-[#DCD7CB] col-span-2 sm:col-span-1">
              <span className="text-[10px] uppercase font-bold text-[#868A94] block">Growth Rate</span>
              <span className="font-bold text-xs text-emerald-700 mt-0.5 block">{career.growthRate}</span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* AI Strategic Assessment */}
          <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#DCD7CB]">
            <div className="flex items-center gap-1.5 mb-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-bold text-[#18191C]">AI Career Strategy Advice</span>
            </div>
            <p className="text-xs text-[#52555F] leading-relaxed">
              {career.aiAdvice}
            </p>
          </div>

          {/* Skill Breakdown */}
          <div>
            <h4 className="font-display font-bold text-sm text-[#18191C] mb-3">
              Required Skills Matrix
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {career.skillsGap.map((item) => (
                <div
                  key={item.name}
                  className="p-3 bg-white rounded-xl border border-[#DCD7CB] flex items-center justify-between"
                >
                  <span className="text-xs font-bold text-[#18191C]">{item.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-[#6E7179]">
                      You: {item.userScore}% / Target: {item.requiredScore}%
                    </span>
                    {item.userScore >= item.requiredScore ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Portfolio Projects */}
          <div>
            <h4 className="font-display font-bold text-sm text-[#18191C] mb-3">
              Recommended Capstone Projects
            </h4>
            <div className="space-y-2">
              {career.recommendedProjects.map((proj, i) => (
                <div
                  key={i}
                  className="p-3 bg-white rounded-xl border border-[#DCD7CB] flex items-center gap-2.5 text-xs text-[#18191C] font-semibold"
                >
                  <Award className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>{proj}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-[#EFECE5] border-t border-[#E2DDD3] flex items-center justify-between gap-3">
          <button
            onClick={() => {
              onSelectAsTarget(career.title);
              onClose();
            }}
            className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-colors ${
              isCurrentTarget
                ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                : 'bg-white text-[#18191C] border-[#D5D0C4] hover:bg-[#F2EFE9]'
            }`}
          >
            {isCurrentTarget ? '✓ Current Target Role' : 'Set as My Target Role'}
          </button>

          <button
            id="modal-view-roadmap-btn"
            onClick={() => {
              onSelectAsTarget(career.title);
              setActiveTab('roadmap');
              onClose();
            }}
            className="px-5 py-2 bg-[#18191C] text-white text-xs font-bold rounded-lg hover:bg-black transition-all flex items-center gap-1.5 shadow-2xs"
          >
            <span>Generate Custom Roadmap</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
