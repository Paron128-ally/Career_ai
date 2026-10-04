import React, { useState } from 'react';
import { LearningResource, UserProfile, ActiveTab } from '../types';
import {
  BookOpen,
  Sparkles,
  PlayCircle,
  FileCode,
  FileText,
  Clock,
  CheckCircle2,
  ExternalLink,
  Search,
  Filter,
  Layers,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface LearningViewProps {
  resources: LearningResource[];
  user: UserProfile;
  onOpenAiDrawer: () => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const LearningView: React.FC<LearningViewProps> = ({
  resources: initialResources,
  user,
  onOpenAiDrawer,
  setActiveTab,
}) => {
  const [resources, setResources] = useState<LearningResource[]>(initialResources);
  const [selectedSkillFilter, setSelectedSkillFilter] = useState('All');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const handleToggleComplete = (id: string) => {
    setResources((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const next = !item.completed;
          if (next) {
            try {
              confetti({
                particleCount: 50,
                spread: 60,
                origin: { y: 0.6 },
              });
            } catch (e) {}
          }
          return { ...item, completed: next };
        }
        return item;
      })
    );
  };

  const filteredResources = resources.filter((item) => {
    const matchesSkill =
      selectedSkillFilter === 'All' || item.skill === selectedSkillFilter;
    const matchesType =
      selectedTypeFilter === 'All' || item.type === selectedTypeFilter;
    const matchesSearch =
      !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSkill && matchesType && matchesSearch;
  });

  const featuredResource =
    resources.find((r) => r.id === 'rec_1') || resources[0];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAE6DE] border border-[#DCD6C9] text-xs font-semibold text-[#18191C] mb-2">
            <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
            <span>AI Curated Curriculum</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#18191C]">
            Recommended for you
          </h1>
          <p className="text-xs sm:text-sm text-[#656974] mt-0.5">
            Curated learning paths, real-world guided projects, and targeted drills to bridge your Machine Learning gap.
          </p>
        </div>

        <button
          id="learning-ask-ai-btn"
          onClick={onOpenAiDrawer}
          className="px-4 py-2 bg-[#18191C] text-white text-xs font-bold rounded-lg hover:bg-black transition-all flex items-center gap-2 shadow-xs self-start sm:self-auto"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Ask AI about this skill</span>
        </button>
      </div>

      {/* AI Recommendation Banner */}
      <div className="p-4 bg-gradient-to-r from-[#EFECE5] to-[#E9E4DB] rounded-2xl border border-[#E0DCD2] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#18191C] text-white flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <h4 className="font-display font-bold text-sm text-[#18191C]">
              AI Accelerated Sprint: Machine Learning
            </h4>
            <p className="text-xs text-[#5D606B] mt-0.5">
              Completing these 4 resources closes 80% of your gap to the Data Scientist baseline.
            </p>
          </div>
        </div>

        <button
          id="learning-view-gap-btn"
          onClick={() => setActiveTab('skill-gap')}
          className="text-xs font-bold text-[#18191C] hover:underline flex items-center gap-1 shrink-0"
        >
          <span>View Skill Gap</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {['All', 'Machine Learning', 'Data Analysis', 'Math & Stats', 'Statistics', 'Deep Learning'].map((sk) => (
            <button
              key={sk}
              onClick={() => setSelectedSkillFilter(sk)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedSkillFilter === sk
                  ? 'bg-[#18191C] text-white shadow-xs'
                  : 'bg-[#EFECE5] text-[#585B65] border border-[#E2DDD3] hover:bg-[#E5E0D5]'
              }`}
            >
              {sk}
            </button>
          ))}
        </div>

        <div className="relative max-w-xs w-full">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#888B95]" />
          <input
            type="text"
            placeholder="Search lessons & drills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-[#EFECE5] border border-[#DDD8CD] rounded-lg text-xs text-[#18191C] focus:outline-none focus:border-[#18191C]"
          />
        </div>
      </div>

      {/* Bento Grid: Featured Large Card + Sub Cards */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Featured Video Course (Span 7 cols) */}
        {featuredResource && (
          <div className="md:col-span-7 bg-[#EFECE5] rounded-2xl border border-[#E2DDD3] shadow-xs overflow-hidden flex flex-col justify-between group">
            {/* Neural Graphic Banner Header */}
            <div className="relative h-48 bg-[#18191C] overflow-hidden p-6 flex flex-col justify-between">
              <img
                src={featuredResource.image || 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=80'}
                alt="Machine learning neural visualization"
                className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-[10px] bg-white/20 backdrop-blur-md text-white font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Featured Course
                </span>
                <span className="text-[10px] bg-amber-400 text-black font-bold px-2 py-0.5 rounded">
                  High Impact
                </span>
              </div>

              <div className="relative z-10">
                <span className="text-xs text-white/80 font-mono">12h 30m • Intermediate</span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white mt-1">
                  {featuredResource.title}
                </h3>
              </div>
            </div>

            {/* Body Description & CTA */}
            <div className="p-6 flex flex-col justify-between flex-1">
              <p className="text-xs sm:text-sm text-[#5D606C] leading-relaxed">
                {featuredResource.description}
              </p>

              <div className="mt-6 pt-4 border-t border-[#E2DDD3] flex items-center justify-between">
                <button
                  onClick={() => handleToggleComplete(featuredResource.id)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors flex items-center gap-1.5 ${
                    featuredResource.completed
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                      : 'bg-white text-[#4A4D56] border-[#DCD7CB] hover:bg-[#F2EFE9]'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{featuredResource.completed ? 'Completed' : 'Mark Complete'}</span>
                </button>

                <a
                  href={featuredResource.url || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-[#18191C] text-white text-xs font-bold rounded-lg hover:bg-black transition-all flex items-center gap-1.5 shadow-2xs"
                >
                  <PlayCircle className="w-3.5 h-3.5" />
                  <span>Start Course</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Guided Project Card (Span 5 cols) */}
        {resources.find((r) => r.id === 'rec_2') && (
          <div className="md:col-span-5 bg-[#FAF8F5] p-6 rounded-2xl border border-[#DCD7CB] shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] bg-indigo-100 text-indigo-800 font-bold px-2 py-0.5 rounded uppercase">
                  Guided Project
                </span>
                <span className="text-xs font-mono text-[#6E7179]">4h 00m</span>
              </div>

              <h3 className="font-display text-lg font-bold text-[#18191C]">
                House Price Prediction Model
              </h3>
              <p className="text-xs text-[#5E626E] mt-2 leading-relaxed">
                Apply your knowledge to build a robust regression pipeline using real-world real estate datasets with feature engineering and ensemble methods.
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                <span className="text-[10px] bg-[#EAE6DE] px-2 py-0.5 rounded font-mono">XGBoost</span>
                <span className="text-[10px] bg-[#EAE6DE] px-2 py-0.5 rounded font-mono">Scikit-learn</span>
                <span className="text-[10px] bg-[#EAE6DE] px-2 py-0.5 rounded font-mono">Pandas</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E5E0D5] flex items-center justify-between">
              <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Advanced Difficulty
              </span>
              <a
                href="https://kaggle.com"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-[#18191C] text-white text-xs font-bold rounded-lg hover:bg-black transition-all flex items-center gap-1.5 shadow-2xs"
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>Start Project</span>
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Grid of Other Learning Resources (Reading, Practice, Video) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {filteredResources
          .filter((r) => r.id !== 'rec_1' && r.id !== 'rec_2')
          .map((res) => {
            return (
              <div
                key={res.id}
                className="p-5 rounded-2xl bg-[#EFECE5] border border-[#E2DDD3] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[10px] uppercase font-bold text-[#6E7179] bg-[#E5E0D5] px-2 py-0.5 rounded">
                      {res.type}
                    </span>
                    <span className="text-xs font-mono text-[#6E7179]">{res.duration}</span>
                  </div>

                  <h4 className="font-display font-bold text-base text-[#18191C]">
                    {res.title}
                  </h4>
                  <p className="text-xs text-[#5D606B] mt-1.5 line-clamp-3 leading-relaxed">
                    {res.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#E2DDD3] flex items-center justify-between">
                  <button
                    onClick={() => handleToggleComplete(res.id)}
                    className={`text-xs font-semibold p-1.5 rounded-lg border transition-colors ${
                      res.completed
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        : 'bg-white text-[#6E7179] border-[#DCD7CB] hover:text-black'
                    }`}
                    title={res.completed ? 'Completed' : 'Mark as complete'}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>

                  <a
                    href={res.url || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 bg-[#18191C] text-white text-xs font-semibold rounded-lg hover:bg-black transition-all flex items-center gap-1"
                  >
                    <span>Launch</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
