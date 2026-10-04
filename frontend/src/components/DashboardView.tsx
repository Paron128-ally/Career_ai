import React from 'react';
import { UserProfile, CareerRecommendation, ProgressStats, ActiveTab } from '../types';
import {
  TrendingUp,
  Award,
  CheckCircle2,
  Flame,
  ArrowRight,
  Sparkles,
  Compass,
  Map,
  Layers,
  ChevronRight,
  BookOpen,
  Target,
  Clock,
  Zap,
} from 'lucide-react';

interface DashboardViewProps {
  user: UserProfile;
  stats: ProgressStats;
  primaryCareer: CareerRecommendation;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenCareerDetail: (career: CareerRecommendation) => void;
  onOpenAiDrawer: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  stats,
  primaryCareer,
  setActiveTab,
  onOpenCareerDetail,
  onOpenAiDrawer,
}) => {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#18191C] flex items-center gap-2">
            <span>Hi, {user.name || 'Rahul'} 👋</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#656974] mt-0.5">
            Here is your AI-analyzed career readiness and skill gap overview for <strong>{user.targetRole || primaryCareer.title}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            id="dash-skillgap-shortcut-btn"
            onClick={() => setActiveTab('skill-gap')}
            className="px-3.5 py-2 bg-[#EFECE5] hover:bg-[#E5E0D5] border border-[#DDD8CD] text-xs font-semibold text-[#18191C] rounded-lg transition-colors flex items-center gap-1.5"
          >
            <TrendingUp className="w-3.5 h-3.5 text-indigo-600" />
            <span>View Skill Gap</span>
          </button>
          <button
            id="dash-roadmap-shortcut-btn"
            onClick={() => setActiveTab('roadmap')}
            className="px-3.5 py-2 bg-[#18191C] text-white hover:bg-black text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <Map className="w-3.5 h-3.5 text-amber-300" />
            <span>Continue Roadmap</span>
          </button>
        </div>
      </div>

      {/* Top 4 Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Career Readiness */}
        <div
          id="metric-card-readiness"
          onClick={() => setActiveTab('progress')}
          className="bg-[#EFECE5] p-5 rounded-2xl border border-[#E2DDD3] shadow-xs cursor-pointer hover:border-[#CCC6B8] transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#666974] uppercase tracking-wider">Career Readiness</span>
            <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2.5 flex items-baseline gap-2">
            <span className="font-display text-3xl font-bold text-[#18191C]">{stats.readinessScore}%</span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">+4% this wk</span>
          </div>
          <div className="mt-3 w-full bg-[#DFD9CE] h-2 rounded-full overflow-hidden">
            <div className="bg-[#18191C] h-full rounded-full" style={{ width: `${stats.readinessScore}%` }}></div>
          </div>
        </div>

        {/* Metric 2: Skills Mastered */}
        <div
          id="metric-card-skills"
          onClick={() => setActiveTab('skills')}
          className="bg-[#EFECE5] p-5 rounded-2xl border border-[#E2DDD3] shadow-xs cursor-pointer hover:border-[#CCC6B8] transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#666974] uppercase tracking-wider">Skills Mastered</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2.5 flex items-baseline gap-2">
            <span className="font-display text-3xl font-bold text-[#18191C]">{stats.skillsMastered}</span>
            <span className="text-xs text-[#6E7179] font-medium">/ 18 Target</span>
          </div>
          <div className="mt-3 text-xs text-[#636671]">
            <span className="font-semibold text-emerald-700">Python & SQL</span> fully verified
          </div>
        </div>

        {/* Metric 3: Projects Completed */}
        <div
          id="metric-card-projects"
          onClick={() => setActiveTab('learning')}
          className="bg-[#EFECE5] p-5 rounded-2xl border border-[#E2DDD3] shadow-xs cursor-pointer hover:border-[#CCC6B8] transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#666974] uppercase tracking-wider">Projects Built</span>
            <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2.5 flex items-baseline gap-2">
            <span className="font-display text-3xl font-bold text-[#18191C]">{stats.projectsBuilt}</span>
            <span className="text-xs text-[#6E7179] font-medium">Real-world Repos</span>
          </div>
          <div className="mt-3 text-xs text-[#636671]">
            Next: House Price Regression
          </div>
        </div>

        {/* Metric 4: Learning Streak */}
        <div
          id="metric-card-streak"
          onClick={() => setActiveTab('progress')}
          className="bg-[#EFECE5] p-5 rounded-2xl border border-[#E2DDD3] shadow-xs cursor-pointer hover:border-[#CCC6B8] transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#666974] uppercase tracking-wider">Learning Streak</span>
            <div className="w-7 h-7 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center">
              <Flame className="w-4 h-4 text-orange-600 fill-orange-500" />
            </div>
          </div>
          <div className="mt-2.5 flex items-baseline gap-2">
            <span className="font-display text-3xl font-bold text-[#18191C]">{stats.currentStreak}</span>
            <span className="text-xs font-bold text-orange-700 bg-orange-100 px-1.5 py-0.2 rounded">Days Active 🔥</span>
          </div>
          <div className="mt-3 text-xs text-[#636671]">
            Keep it up to unlock Pro badges
          </div>
        </div>
      </div>

      {/* Middle Section: AI Recommended Trajectory & Next Best Action */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: AI Recommended Role (7 cols) */}
        <div className="lg:col-span-7 bg-[#EFECE5] p-6 rounded-2xl border border-[#E2DDD3] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-indigo-700 bg-indigo-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>AI Primary Recommendation</span>
                </span>
                <span className="text-xs font-semibold text-[#636671]">{primaryCareer.category}</span>
              </div>
              <button
                id="dash-why-role-btn"
                onClick={() => onOpenCareerDetail(primaryCareer)}
                className="text-xs font-semibold text-[#18191C] hover:underline flex items-center gap-1"
              >
                <span>Why this role?</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
              <div>
                <h2 className="font-display text-2xl font-bold text-[#18191C]">
                  {primaryCareer.title}
                </h2>
                <div className="flex items-center gap-3 mt-1.5 text-xs text-[#61646E]">
                  <span>{primaryCareer.salaryRange || '$120,000 - $165,000 / yr'}</span>
                  <span>•</span>
                  <span>{primaryCareer.estimatedDuration}</span>
                </div>
              </div>

              {/* Match Score Donut Display */}
              <div className="flex items-center gap-3 bg-[#FAF8F5] px-4 py-2.5 rounded-xl border border-[#DDD8CD]">
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-[#E5E0D5]"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-[#18191C]"
                      strokeDasharray={`${primaryCareer.matchPercentage}, 100`}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <span className="absolute text-xs font-bold text-[#18191C]">
                    {primaryCareer.matchPercentage}%
                  </span>
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[11px] font-bold text-[#18191C]">Fit Match</span>
                  <span className="text-[10px] text-[#636671]">{primaryCareer.skillGapLevel}</span>
                </div>
              </div>
            </div>

            <p className="mt-4 text-xs sm:text-sm text-[#555862] leading-relaxed">
              {primaryCareer.description}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-[#E2DDD3] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#6E7179] font-medium">Critical focus:</span>
              <span className="bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded text-[11px]">
                Machine Learning Algorithms
              </span>
            </div>
            <button
              id="dash-view-roadmap-btn"
              onClick={() => setActiveTab('roadmap')}
              className="px-4 py-2 bg-[#18191C] text-white text-xs font-bold rounded-lg hover:bg-black transition-all flex items-center gap-1.5 shadow-2xs"
            >
              <span>View Full Roadmap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right: Next Best Action Card (5 cols) */}
        <div className="lg:col-span-5 bg-[#18191C] text-white p-6 rounded-2xl border border-black shadow-xs flex flex-col justify-between relative overflow-hidden">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] uppercase font-bold text-amber-300 tracking-wider flex items-center gap-1">
                <Zap className="w-3.5 h-3.5" />
                <span>Next Best Action</span>
              </span>
              <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full font-semibold">
                Phase 4
              </span>
            </div>

            <h3 className="font-display text-lg sm:text-xl font-bold text-white leading-snug">
              Focus on Machine Learning next
            </h3>
            <p className="text-xs text-white/70 mt-2 leading-relaxed">
              Complete the Scikit-learn estimator drill and Decision Tree math reading to increase your readiness score by +12%.
            </p>

            <div className="mt-4 p-3 bg-white/10 rounded-xl space-y-2 text-xs">
              <div className="flex items-center justify-between text-white/90">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-300" />
                  <span>Time required: ~3 hours</span>
                </span>
                <span className="font-mono text-amber-300">50% completed</span>
              </div>
              <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                <div className="bg-amber-400 h-full w-1/2"></div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button
              id="dash-start-course-btn"
              onClick={() => setActiveTab('learning')}
              className="w-full py-2.5 bg-white text-[#18191C] font-bold text-xs rounded-lg hover:bg-[#F2EFE9] transition-all flex items-center justify-center gap-1.5 shadow-xs"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Start Learning Now</span>
            </button>
            <button
              id="dash-ask-coach-btn"
              onClick={onOpenAiDrawer}
              title="Ask AI Career Coach"
              className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center justify-center"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section: Your Skills & Skills to Improve */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Your Verified Skills */}
        <div className="bg-[#EFECE5] p-6 rounded-2xl border border-[#E2DDD3] shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display text-lg font-bold text-[#18191C]">Your Verified Skills</h3>
              <p className="text-xs text-[#656974] mt-0.5">Assessed from your technical diagnosis and portfolio.</p>
            </div>
            <button
              id="dash-add-skill-btn"
              onClick={() => setActiveTab('assessment')}
              className="text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-lg transition-colors"
            >
              + Add / Edit Skills
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {user.skills && user.skills.length > 0 ? (
              user.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="px-3 py-2 bg-[#FAF8F5] border border-[#DCD7CB] rounded-xl flex items-center gap-2 shadow-2xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="text-xs font-bold text-[#18191C]">{skill.name}</span>
                  <span className="text-[10px] text-[#696C77] bg-[#EAE6DE] px-1.5 py-0.2 rounded capitalize">
                    {skill.proficiency}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-[#7A7E89]">No skills listed yet. Take the assessment to add skills.</p>
            )}
          </div>
        </div>

        {/* Skills to Improve (Gap) */}
        <div className="bg-[#EFECE5] p-6 rounded-2xl border border-[#E2DDD3] shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display text-lg font-bold text-[#18191C]">Skills to Improve</h3>
              <p className="text-xs text-[#656974] mt-0.5">Benchmark against top Data Scientist job postings.</p>
            </div>
            <button
              id="dash-deep-gap-btn"
              onClick={() => setActiveTab('skill-gap')}
              className="text-xs font-semibold text-[#18191C] hover:underline flex items-center gap-1"
            >
              <span>Full Gap Analysis</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3.5">
            {[
              { name: 'Machine Learning Algorithms', current: 50, required: 85, badge: 'High Priority' },
              { name: 'Statistics & Probability', current: 65, required: 70, badge: 'Low Priority' },
              { name: 'Deep Learning (PyTorch)', current: 30, required: 60, badge: 'Medium Priority' },
            ].map((item) => (
              <div key={item.name} className="p-3 bg-[#FAF8F5] rounded-xl border border-[#DCD7CB]">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-bold text-[#18191C]">{item.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded">
                      {item.badge}
                    </span>
                    <span className="font-mono text-[#585B65]">
                      {item.current}% / <strong className="text-[#18191C]">{item.required}%</strong>
                    </span>
                  </div>
                </div>
                <div className="w-full bg-[#E5E0D5] h-2 rounded-full overflow-hidden relative">
                  {/* Required Target Marker */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-black z-10"
                    style={{ left: `${item.required}%` }}
                    title={`Required: ${item.required}%`}
                  ></div>
                  <div
                    className="bg-[#18191C] h-full rounded-full"
                    style={{ width: `${item.current}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
