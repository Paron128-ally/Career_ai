import React, { useState } from 'react';
import { RoadmapStep, UserProfile, ActiveTab } from '../types';
import {
  Map,
  CheckCircle2,
  Lock,
  Sparkles,
  ArrowRight,
  Clock,
  BookOpen,
  CheckSquare,
  Square,
  PlayCircle,
  FileText,
  Code,
  Flame,
  Award,
  Zap,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface RoadmapViewProps {
  roadmap: RoadmapStep[];
  user: UserProfile;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenAiDrawer: () => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  roadmap,
  user,
  setActiveTab,
  onOpenAiDrawer,
}) => {
  const [steps, setSteps] = useState<RoadmapStep[]>(roadmap);
  const [activeStepId, setActiveStepId] = useState<string>('step_4');

  const activeStep =
    steps.find((s) => s.id === activeStepId) ||
    steps.find((s) => s.status === 'current_focus') ||
    steps[0];

  const handleToggleResource = (resId: string) => {
    setSteps((prev) =>
      prev.map((st) => {
        if (st.id !== activeStep.id || !st.resources) return st;
        const updatedResources = st.resources.map((r) =>
          r.id === resId ? { ...r, completed: !r.completed } : r
        );
        const completedCount = updatedResources.filter((r) => r.completed).length;
        const newProgress = Math.round(
          (completedCount / updatedResources.length) * 100
        );

        if (newProgress === 100) {
          try {
            confetti({
              particleCount: 70,
              spread: 60,
              origin: { y: 0.7 },
            });
          } catch (e) {
            // ignore
          }
        }

        return {
          ...st,
          resources: updatedResources,
          progress: newProgress,
        };
      })
    );
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAE6DE] border border-[#DCD6C9] text-xs font-semibold text-[#18191C] mb-2">
            <Map className="w-3.5 h-3.5 text-indigo-600" />
            <span>AI Milestone Sequence</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#18191C]">
            Your path to {user.targetRole || 'Data Scientist'}
          </h1>
          <p className="text-xs sm:text-sm text-[#656974] mt-0.5">
            Personalized phase-by-phase curriculum optimized for your current background and interview timeline.
          </p>
        </div>

        {/* Global Progress Pill */}
        <div className="flex items-center gap-3 bg-[#EFECE5] p-3 rounded-xl border border-[#E2DDD3]">
          <div className="text-right">
            <span className="block text-[10px] uppercase font-bold text-[#7E828D]">Overall Progress</span>
            <span className="font-display font-bold text-lg text-[#18191C]">54% Completed</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#18191C] text-white flex items-center justify-center font-bold text-xs">
            54%
          </div>
        </div>
      </div>

      {/* Main Grid: Left Roadmap Timeline Nodes, Right Active Focus Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Timeline Tree (7 cols) */}
        <div className="lg:col-span-7 bg-[#EFECE5] p-6 rounded-2xl border border-[#E2DDD3] shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display text-lg font-bold text-[#18191C]">Learning Phases</h3>
            <span className="text-xs text-[#636671] font-semibold">4-6 Months Estimated</span>
          </div>

          {/* Timeline Nodes */}
          <div className="space-y-4 relative">
            {/* Continuous Vertical Line */}
            <div className="absolute left-[19px] top-6 bottom-6 w-0.5 bg-[#DDD8CD] -z-0"></div>

            {steps.map((stepItem, idx) => {
              const isSelected = activeStep.id === stepItem.id;
              const isCompleted = stepItem.status === 'completed';
              const isCurrent = stepItem.status === 'current_focus';
              const isInProgress = stepItem.status === 'in_progress';
              const isLocked = stepItem.status === 'locked';

              return (
                <div
                  key={stepItem.id}
                  onClick={() => !isLocked && setActiveStepId(stepItem.id)}
                  className={`relative z-10 p-4 rounded-xl border transition-all flex items-start gap-4 ${
                    isLocked
                      ? 'bg-[#EAE6DD]/60 border-[#DDD8CD] opacity-75 cursor-not-allowed'
                      : isSelected
                      ? 'bg-[#FAF8F5] border-[#18191C] ring-2 ring-[#18191C]/15 cursor-pointer shadow-xs'
                      : 'bg-[#FAF8F5] border-[#DCD7CB] hover:border-[#BBB5A5] cursor-pointer'
                  }`}
                >
                  {/* Status Indicator Icon Node */}
                  <div className="shrink-0 mt-0.5">
                    {isCompleted ? (
                      <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                    ) : isCurrent ? (
                      <div className="w-8 h-8 rounded-full bg-[#18191C] text-white flex items-center justify-center font-bold text-xs ring-4 ring-[#18191C]/20 animate-pulse">
                        <Sparkles className="w-4 h-4 text-amber-300" />
                      </div>
                    ) : isInProgress ? (
                      <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                        35%
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-[#D5D0C4] text-[#636671] flex items-center justify-center">
                        <Lock className="w-4 h-4" />
                      </div>
                    )}
                  </div>

                  {/* Text Information */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-display font-bold text-sm text-[#18191C]">
                          {stepItem.title}
                        </span>
                        {isCurrent && (
                          <span className="text-[10px] bg-[#18191C] text-white font-bold px-2 py-0.5 rounded-full">
                            Current Focus
                          </span>
                        )}
                        {isCompleted && (
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">
                            Mastered
                          </span>
                        )}
                      </div>

                      <div className="text-[11px] font-mono text-[#6E7179]">
                        {stepItem.timeLeft || stepItem.estimatedDuration}
                      </div>
                    </div>

                    <p className="text-xs text-[#5D606B] mt-1 leading-relaxed">
                      {stepItem.description}
                    </p>

                    {/* Progress Bar if active/in_progress */}
                    {(isCurrent || isInProgress) && (
                      <div className="mt-3 w-full bg-[#E5E0D5] h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            isCurrent ? 'bg-[#18191C]' : 'bg-indigo-600'
                          }`}
                          style={{ width: `${stepItem.progress || 50}%` }}
                        ></div>
                      </div>
                    )}

                    {/* Sub-topics list */}
                    {stepItem.topics && (
                      <div className="mt-2.5 flex flex-wrap gap-1">
                        {stepItem.topics.map((topic) => (
                          <span
                            key={topic}
                            className="text-[10px] bg-[#EAE6DE] text-[#4F525B] px-2 py-0.5 rounded font-medium"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Sticky Active Focus Module & AI Coach Tip (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Current Focus Card */}
          <div className="bg-[#EFECE5] p-6 rounded-2xl border border-[#E2DDD3] shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">
                Active Module
              </span>
              <span className="text-xs text-[#636671] font-mono">{activeStep.timeLeft || '3 weeks left'}</span>
            </div>

            <h3 className="font-display text-xl font-bold text-[#18191C] mt-1">
              {activeStep.title}
            </h3>
            <p className="text-xs text-[#5D606B] mt-1.5">
              {activeStep.description}
            </p>

            {/* Time & Module Progress */}
            <div className="mt-4 p-3.5 bg-[#FAF8F5] rounded-xl border border-[#DCD7CB] space-y-2 text-xs">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-[#484B54]">Module Progress</span>
                <span className="font-mono font-bold text-[#18191C]">{activeStep.progress || 50}%</span>
              </div>
              <div className="w-full bg-[#E5E0D5] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#18191C] h-full rounded-full transition-all duration-300"
                  style={{ width: `${activeStep.progress || 50}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-[11px] text-[#6E7179] pt-1">
                <span>Time Invested: 24h / 48h</span>
                <span>2 of 3 items complete</span>
              </div>
            </div>

            {/* Resource Checklist */}
            <div className="mt-5 space-y-2">
              <span className="block text-[11px] font-bold uppercase text-[#767A85] tracking-wider mb-1">
                Curated Practice Drills
              </span>

              {activeStep.resources && activeStep.resources.length > 0 ? (
                activeStep.resources.map((res) => (
                  <div
                    key={res.id}
                    onClick={() => handleToggleResource(res.id)}
                    className="p-3 bg-[#FAF8F5] hover:bg-white rounded-xl border border-[#DCD7CB] flex items-center justify-between cursor-pointer transition-all shadow-2xs group"
                  >
                    <div className="flex items-center gap-2.5">
                      {res.completed ? (
                        <CheckSquare className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Square className="w-4 h-4 text-[#8C8F99] group-hover:text-black" />
                      )}
                      <div className="text-left">
                        <span
                          className={`text-xs font-semibold block ${
                            res.completed ? 'line-through text-[#868A94]' : 'text-[#18191C]'
                          }`}
                        >
                          {res.title}
                        </span>
                        <span className="text-[10px] text-[#6E7179]">
                          {res.type.toUpperCase()} • {res.duration}
                        </span>
                      </div>
                    </div>

                    <ArrowRight className="w-3.5 h-3.5 text-[#8C8F99] group-hover:text-black group-hover:translate-x-0.5 transition-all" />
                  </div>
                ))
              ) : (
                <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#DCD7CB] text-xs text-[#636671]">
                  Self-paced core curriculum and review questions.
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex items-center gap-2">
              <button
                id="roadmap-continue-learning-btn"
                onClick={() => setActiveTab('learning')}
                className="flex-1 py-2.5 bg-[#18191C] text-white text-xs font-bold rounded-lg hover:bg-black transition-all flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Continue Learning</span>
              </button>
            </div>
          </div>

          {/* AI Coach Recommendation Box */}
          <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#DCD7CB] shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-bold text-[#18191C]">AI Coach Tip</span>
              </div>
              <button
                id="roadmap-ask-ai-btn"
                onClick={onOpenAiDrawer}
                className="text-[11px] font-semibold text-indigo-700 hover:underline"
              >
                Ask Coach →
              </button>
            </div>

            <p className="text-xs text-[#52555F] leading-relaxed">
              {activeStep.aiTip ||
                "You're excelling at classification algorithms! Based on recent quiz performance, spend an extra 2 hours reviewing Random Forests before moving on to unsupervised learning."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
