import React from 'react';
import { ProgressStats, UserProfile, ActiveTab } from '../types';
import {
  TrendingUp,
  Award,
  CheckCircle2,
  BookOpen,
  Flame,
  Download,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ProgressViewProps {
  stats: ProgressStats;
  user: UserProfile;
  setActiveTab: (tab: ActiveTab) => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  stats,
  user,
  setActiveTab,
}) => {
  const handleDownloadReport = () => {
    try {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.8 },
      });
    } catch (e) {}

    const reportContent = `CareerAI - Career & Skill Gap Assessment Report
User: ${user.name} (${user.email})
Target Role: ${user.targetRole || 'Data Scientist'}
Career Readiness: ${stats.readinessScore}%
Skills Mastered: ${stats.skillsMastered}
Courses Completed: ${stats.coursesDone}
Projects Built: ${stats.projectsBuilt}
Current Learning Streak: ${stats.currentStreak} Days
Generated on: ${new Date().toLocaleDateString()}
`;
    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${user.name.replace(/\s+/g, '_')}_CareerAI_Report.txt`;
    link.click();
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAE6DE] border border-[#DCD6C9] text-xs font-semibold text-[#18191C] mb-2">
            <TrendingUp className="w-3.5 h-3.5 text-indigo-600" />
            <span>Quantitative Analytics</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#18191C]">
            Your Progress & Milestones
          </h1>
          <p className="text-xs sm:text-sm text-[#656974] mt-0.5">
            Real-time tracking of skills mastered, completed project submissions, and roadmap pace.
          </p>
        </div>

        <button
          id="progress-download-report-btn"
          onClick={handleDownloadReport}
          className="px-4 py-2 bg-[#18191C] text-white text-xs font-bold rounded-lg hover:bg-black transition-all flex items-center gap-2 shadow-xs self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download Career Report</span>
        </button>
      </div>

      {/* Main Grid: Left Circular Dial & Weekly Chart, Right 4 Stats Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Overall Dial & Target Goal (5 cols) */}
        <div className="lg:col-span-5 bg-[#EFECE5] p-6 rounded-2xl border border-[#E2DDD3] shadow-xs flex flex-col justify-between text-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#6E7179]">
              Overall Career Readiness
            </span>

            {/* Circular Gauge */}
            <div className="relative w-40 h-40 mx-auto my-5 flex items-center justify-center">
              <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="text-[#E0DCD2]"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="text-[#18191C]"
                  strokeWidth="8"
                  strokeDasharray={`${stats.readinessScore * 2.51}, 251.2`}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="font-display text-4xl font-bold text-[#18191C]">
                  {stats.readinessScore}%
                </span>
                <span className="text-[10px] text-[#6E7179] font-medium uppercase mt-0.5">
                  Readiness
                </span>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{stats.targetGoalText}</span>
            </div>

            <p className="text-xs text-[#5D606B] mt-3 max-w-xs mx-auto">
              You are currently <strong>68% ready</strong> for entry to mid-level Data Scientist interviews. Closing your Machine Learning gap will push this past 85%.
            </p>
          </div>

          {/* Weekly Learning Hours Chart */}
          <div className="mt-6 pt-4 border-t border-[#E2DDD3] text-left">
            <span className="text-xs font-bold text-[#18191C] block mb-2">
              Weekly Learning Activity (24.2 hrs total)
            </span>
            <div className="flex items-end justify-between gap-2 h-20 pt-2">
              {stats.weeklyHours.map((wh) => {
                const heightPercent = (wh.hours / 6) * 100;
                return (
                  <div key={wh.day} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full bg-[#E0DCD2] h-14 rounded-t-md relative flex items-end overflow-hidden">
                      <div
                        className="w-full bg-[#18191C] rounded-t-md transition-all duration-300"
                        style={{ height: `${heightPercent}%` }}
                        title={`${wh.hours} hrs`}
                      ></div>
                    </div>
                    <span className="text-[10px] font-mono text-[#6E7179]">{wh.day}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: 4 Detailed Stat Cards (7 cols) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Card 1 */}
          <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#DCD7CB] shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-[#767A85] uppercase tracking-wider">
                Skills Mastered
              </span>
              <div className="font-display text-3xl font-bold text-[#18191C] mt-1">
                {stats.skillsMastered}
              </div>
              <p className="text-xs text-[#636671] mt-2">
                Including Python, SQL, Pandas, NumPy, Data Analysis, and Git.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('skill-gap')}
              className="mt-4 text-xs font-bold text-indigo-700 hover:underline text-left"
            >
              View Skill Matrix →
            </button>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#DCD7CB] shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-[#767A85] uppercase tracking-wider">
                Courses Done
              </span>
              <div className="font-display text-3xl font-bold text-[#18191C] mt-1">
                {stats.coursesDone}
              </div>
              <p className="text-xs text-[#636671] mt-2">
                Completed video lessons, theory papers, and interactive quizzes.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('learning')}
              className="mt-4 text-xs font-bold text-emerald-700 hover:underline text-left"
            >
              Explore Next Lessons →
            </button>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#DCD7CB] shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
                <Award className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-[#767A85] uppercase tracking-wider">
                Projects Built
              </span>
              <div className="font-display text-3xl font-bold text-[#18191C] mt-1">
                {stats.projectsBuilt}
              </div>
              <p className="text-xs text-[#636671] mt-2">
                Verified portfolio repositories with clean commits and documentation.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('learning')}
              className="mt-4 text-xs font-bold text-amber-700 hover:underline text-left"
            >
              Start Regression Project →
            </button>
          </div>

          {/* Card 4 */}
          <div className="p-6 rounded-2xl bg-[#18191C] text-white border border-black shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center mb-4">
                <Flame className="w-5 h-5 text-orange-400 fill-orange-400" />
              </div>
              <span className="text-xs font-bold text-white/70 uppercase tracking-wider">
                Current Streak
              </span>
              <div className="font-display text-3xl font-bold text-white mt-1">
                {stats.currentStreak} Days 🔥
              </div>
              <p className="text-xs text-white/75 mt-2">
                Top 5% consistency across platform learners this quarter.
              </p>
            </div>
            <span className="mt-4 text-xs font-bold text-amber-300">
              Next milestone: 15-day badge
            </span>
          </div>
        </div>
      </div>

      {/* Recent Milestones Timeline */}
      <div className="bg-[#EFECE5] p-6 rounded-2xl border border-[#E2DDD3] shadow-xs">
        <h3 className="font-display text-lg font-bold text-[#18191C] mb-4">
          Recent Milestones & Activity
        </h3>

        <div className="space-y-3">
          {stats.recentMilestones.map((m) => (
            <div
              key={m.id}
              className="p-3.5 bg-[#FAF8F5] rounded-xl border border-[#DCD7CB] flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#EFECE5] text-[#18191C] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-indigo-700" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#18191C] block">{m.title}</span>
                  <span className="text-[10px] text-[#6E7179] uppercase font-mono">{m.type}</span>
                </div>
              </div>

              <span className="text-xs font-mono text-[#6E7179]">{m.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
