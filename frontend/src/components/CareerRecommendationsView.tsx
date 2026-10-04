import React, { useState } from 'react';
import { CareerRecommendation, UserProfile, ActiveTab } from '../types';
import {
  Compass,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Clock,
  DollarSign,
  TrendingUp,
  SlidersHorizontal,
  Bookmark,
  Target,
} from 'lucide-react';

interface CareerRecommendationsViewProps {
  careers: CareerRecommendation[];
  user: UserProfile;
  onSelectTargetRole: (roleTitle: string) => void;
  onOpenCareerDetail: (career: CareerRecommendation) => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const CareerRecommendationsView: React.FC<CareerRecommendationsViewProps> = ({
  careers,
  user,
  onSelectTargetRole,
  onOpenCareerDetail,
  setActiveTab,
}) => {
  const [filter, setFilter] = useState<'all' | 'best' | 'lowest-gap' | 'fastest'>('all');

  const filteredCareers = careers.filter((c) => {
    if (filter === 'best') return c.matchPercentage >= 80;
    if (filter === 'lowest-gap') return c.skillGapLevel === 'Low Skill Gap';
    if (filter === 'fastest') return c.estimatedDuration.includes('3') || c.estimatedDuration.includes('4');
    return true;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAE6DE] border border-[#DCD6C9] text-xs font-semibold text-[#18191C] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>AI Match Engine</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#18191C]">
            Careers that fit you
          </h1>
          <p className="text-xs sm:text-sm text-[#656974] mt-0.5">
            Ranked by technology stack alignment, current market demand, and realistic upskilling timelines.
          </p>
        </div>

        <button
          id="retake-assessment-career-btn"
          onClick={() => setActiveTab('assessment')}
          className="px-3.5 py-2 rounded-lg border border-[#D5D0C4] text-xs font-semibold text-[#18191C] hover:bg-[#EAE6DE] transition-colors self-start sm:self-auto"
        >
          Retake Assessment
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {[
          { id: 'all', label: `All Careers (${careers.length})` },
          { id: 'best', label: 'Best Match (80%+)' },
          { id: 'lowest-gap', label: 'Lowest Skill Gap' },
          { id: 'fastest', label: 'Fastest Path (< 6 mos)' },
        ].map((tab) => (
          <button
            key={tab.id}
            id={`filter-${tab.id}`}
            onClick={() => setFilter(tab.id as any)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              filter === tab.id
                ? 'bg-[#18191C] text-white shadow-xs'
                : 'bg-[#EFECE5] text-[#585B65] border border-[#E2DDD3] hover:bg-[#E5E0D5]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Careers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCareers.map((career) => {
          const isCurrentTarget = user.targetRole === career.title;

          return (
            <div
              key={career.id}
              className={`p-6 rounded-2xl bg-[#EFECE5] border transition-all flex flex-col justify-between shadow-xs ${
                isCurrentTarget
                  ? 'border-[#18191C] ring-2 ring-[#18191C]/10 bg-[#EDEAE3]'
                  : 'border-[#E2DDD3] hover:border-[#CCC6B8]'
              }`}
            >
              <div>
                {/* Top Row: Category & Match Pill */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-semibold text-[#6E7179] uppercase tracking-wider">
                    {career.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {isCurrentTarget && (
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Target className="w-3 h-3" /> Target
                      </span>
                    )}
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                        career.matchPercentage >= 85
                          ? 'bg-emerald-100 text-emerald-800'
                          : career.matchPercentage >= 75
                          ? 'bg-indigo-100 text-indigo-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {career.matchPercentage}% Match
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-display text-xl font-bold text-[#18191C] leading-snug">
                  {career.title}
                </h3>
                <p className="text-xs text-[#5E626D] mt-2 line-clamp-3 leading-relaxed">
                  {career.description}
                </p>

                {/* Key Metrics Pill Row */}
                <div className="mt-4 pt-3 border-t border-[#E2DDD3] grid grid-cols-2 gap-2 text-[11px] text-[#636671]">
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-[#868A94]">Duration</span>
                    <span className="font-semibold text-[#18191C]">{career.estimatedDuration}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-[#868A94]">Salary Range</span>
                    <span className="font-semibold text-[#18191C] truncate block">
                      {career.salaryRange?.split(' - ')[0]}...
                    </span>
                  </div>
                </div>

                {/* Required Skills Badges */}
                <div className="mt-4 pt-3 border-t border-[#E2DDD3]">
                  <span className="block text-[10px] font-bold text-[#868A94] uppercase mb-2">
                    Key Skill Alignment
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {career.requiredSkills.map((skill) => (
                      <span
                        key={skill.name}
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1 ${
                          skill.status === 'Have'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'bg-amber-50 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {skill.status === 'Have' ? (
                          <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                        ) : (
                          <AlertCircle className="w-2.5 h-2.5 text-amber-600" />
                        )}
                        <span>{skill.name}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="mt-6 pt-4 border-t border-[#E2DDD3] flex items-center gap-2">
                <button
                  id={`career-roadmap-btn-${career.id}`}
                  onClick={() => {
                    onSelectTargetRole(career.title);
                    setActiveTab('roadmap');
                  }}
                  className="flex-1 py-2 bg-[#18191C] text-white text-xs font-bold rounded-lg hover:bg-black transition-all flex items-center justify-center gap-1 shadow-2xs"
                >
                  <span>View Roadmap</span>
                  <ArrowRight className="w-3 h-3" />
                </button>

                <button
                  id={`career-details-btn-${career.id}`}
                  onClick={() => onOpenCareerDetail(career)}
                  className="px-3 py-2 bg-[#FAF8F5] hover:bg-white text-xs font-semibold text-[#18191C] rounded-lg border border-[#D5D0C4] transition-colors"
                >
                  Details
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
