import React, { useState } from 'react';
import { UserProfile, CareerRecommendation, ActiveTab } from '../types';
import {
  GitPullRequestDraft,
  Sparkles,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Target,
  Sliders,
  BookOpen,
} from 'lucide-react';

interface SkillGapViewProps {
  user: UserProfile;
  activeCareer: CareerRecommendation;
  allCareers: CareerRecommendation[];
  onSwitchRole: (roleTitle: string) => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const SkillGapView: React.FC<SkillGapViewProps> = ({
  user,
  activeCareer,
  allCareers,
  onSwitchRole,
  setActiveTab,
}) => {
  const [selectedRole, setSelectedRole] = useState(activeCareer.title || 'Data Scientist');

  const currentCareer =
    allCareers.find((c) => c.title === selectedRole) || activeCareer;

  // Radar polygon math for 5 axes
  // Coordinates for center (100, 100) and radius 75
  const radarAxes = [
    { name: 'Python', user: 80, req: 90, angle: -90 },
    { name: 'SQL', user: 75, req: 85, angle: -18 },
    { name: 'ML', user: 50, req: 85, angle: 54 },
    { name: 'Stats', user: 65, req: 70, angle: 126 },
    { name: 'Deep L.', user: 30, req: 60, angle: 198 },
  ];

  const getCoordinates = (value: number, angleDeg: number, radius = 70) => {
    const angleRad = (angleDeg * Math.PI) / 180;
    const r = (value / 100) * radius;
    const x = 100 + r * Math.cos(angleRad);
    const y = 100 + r * Math.sin(angleRad);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  };

  const reqPolygonPoints = radarAxes
    .map((a) => getCoordinates(a.req, a.angle))
    .join(' ');
  const userPolygonPoints = radarAxes
    .map((a) => getCoordinates(a.user, a.angle))
    .join(' ');

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header with Role Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAE6DE] border border-[#DCD6C9] text-xs font-semibold text-[#18191C] mb-2">
            <GitPullRequestDraft className="w-3.5 h-3.5 text-indigo-600" />
            <span>Market Benchmark Gap</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#18191C]">
            Your Skill Gap: {currentCareer.title}
          </h1>
          <p className="text-xs sm:text-sm text-[#656974] mt-0.5">
            Comparative analysis between your verified capabilities and market hiring baselines.
          </p>
        </div>

        {/* Role Switcher */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-[#666974] whitespace-nowrap">Benchmark against:</label>
          <select
            id="skillgap-role-dropdown"
            value={selectedRole}
            onChange={(e) => {
              setSelectedRole(e.target.value);
              onSwitchRole(e.target.value);
            }}
            className="px-3 py-2 bg-[#EFECE5] border border-[#D5D0C4] rounded-lg text-xs font-bold text-[#18191C] focus:outline-none focus:border-[#18191C]"
          >
            {allCareers.map((c) => (
              <option key={c.id} value={c.title}>
                {c.title} ({c.matchPercentage}% match)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid: Left Competencies Bar Charts, Right Radar & AI Diagnosis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Core Competencies Comparative Double Bars (7 cols) */}
        <div className="lg:col-span-7 bg-[#EFECE5] p-6 rounded-2xl border border-[#E2DDD3] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-display text-lg font-bold text-[#18191C]">Core Competencies</h3>
                <p className="text-xs text-[#636671] mt-0.5">Scored from 0 to 100% industry benchmark.</p>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-3 text-[11px] font-semibold">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-[#18191C]"></span>
                  <span className="text-[#18191C]">You</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-[#D3CDC2] border border-[#B9B3A7]"></span>
                  <span className="text-[#656872]">Required</span>
                </div>
              </div>
            </div>

            {/* Double Bar Lists */}
            <div className="space-y-4 pt-2">
              {currentCareer.skillsGap.map((item) => {
                const gap = item.requiredScore - item.userScore;
                const isNeed = gap > 15;

                return (
                  <div key={item.name} className="p-3.5 bg-[#FAF8F5] rounded-xl border border-[#DCD7CB]">
                    <div className="flex items-center justify-between text-xs font-semibold mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#18191C]">{item.name}</span>
                        {item.category && (
                          <span className="text-[10px] text-[#787B85] bg-[#EAE6DE] px-1.5 py-0.2 rounded font-mono">
                            {item.category}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {isNeed ? (
                          <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded flex items-center gap-1">
                            <AlertTriangle className="w-2.5 h-2.5 text-amber-700" />
                            <span>-{gap}% Gap</span>
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded flex items-center gap-1">
                            <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                            <span>Aligned</span>
                          </span>
                        )}
                        <span className="font-mono text-[#5F626C]">
                          <strong className="text-[#18191C]">{item.userScore}%</strong> / {item.requiredScore}%
                        </span>
                      </div>
                    </div>

                    {/* Stacked Comparative Bars */}
                    <div className="space-y-1.5">
                      {/* Your Score Bar */}
                      <div className="w-full bg-[#E5E0D5] h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-[#18191C] h-full rounded-full transition-all duration-500"
                          style={{ width: `${item.userScore}%` }}
                        ></div>
                      </div>
                      {/* Target Required Bar */}
                      <div className="w-full bg-[#EAE6DE] h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-[#B9B3A7] h-full rounded-full"
                          style={{ width: `${item.requiredScore}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#E2DDD3] flex items-center justify-between text-xs">
            <span className="text-[#656872]">Want to update your skill assessment?</span>
            <button
              id="skillgap-retake-btn"
              onClick={() => setActiveTab('assessment')}
              className="text-xs font-bold text-indigo-700 hover:underline"
            >
              Adjust Self-Rating →
            </button>
          </div>
        </div>

        {/* Right Column: 5-Axis Radar Polygon & Critical Gap Card (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Radar Visualization Card */}
          <div className="bg-[#EFECE5] p-6 rounded-2xl border border-[#E2DDD3] shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-display text-base font-bold text-[#18191C]">5-Axis Skill Profile</h3>
              <span className="text-[10px] bg-[#FAF8F5] border border-[#DDD8CD] px-2 py-0.5 rounded font-mono">
                Multivariate Fit
              </span>
            </div>
            <p className="text-xs text-[#636671] mb-4">
              Polygon overlay comparing your current profile against ideal role candidate requirements.
            </p>

            {/* SVG Radar Chart */}
            <div className="flex items-center justify-center p-2">
              <svg viewBox="0 0 200 200" className="w-48 h-48 sm:w-56 sm:h-56">
                {/* Background concentric circles / webs */}
                {[20, 40, 60, 80, 100].map((level) => {
                  const r = (level / 100) * 70;
                  return (
                    <circle
                      key={level}
                      cx="100"
                      cy="100"
                      r={r}
                      fill="none"
                      stroke="#DDD8CD"
                      strokeDasharray={level < 100 ? '2,2' : undefined}
                      strokeWidth="1"
                    />
                  );
                })}

                {/* Radial Axis Lines */}
                {radarAxes.map((a, i) => {
                  const x2 = 100 + 70 * Math.cos((a.angle * Math.PI) / 180);
                  const y2 = 100 + 70 * Math.sin((a.angle * Math.PI) / 180);
                  return (
                    <line
                      key={i}
                      x1="100"
                      y1="100"
                      x2={x2}
                      y2={y2}
                      stroke="#DDD8CD"
                      strokeWidth="1"
                    />
                  );
                })}

                {/* Required Target Polygon */}
                <polygon
                  points={reqPolygonPoints}
                  fill="rgba(185, 179, 167, 0.25)"
                  stroke="#9E988D"
                  strokeWidth="1.5"
                  strokeDasharray="3,3"
                />

                {/* User Capability Polygon */}
                <polygon
                  points={userPolygonPoints}
                  fill="rgba(24, 25, 28, 0.35)"
                  stroke="#18191C"
                  strokeWidth="2"
                />

                {/* Axis Labels */}
                {radarAxes.map((a, i) => {
                  const labelRadius = 84;
                  const x = 100 + labelRadius * Math.cos((a.angle * Math.PI) / 180);
                  const y = 100 + labelRadius * Math.sin((a.angle * Math.PI) / 180);
                  return (
                    <text
                      key={i}
                      x={x}
                      y={y + 3}
                      textAnchor="middle"
                      className="text-[9px] font-bold fill-[#18191C]"
                    >
                      {a.name}
                    </text>
                  );
                })}
              </svg>
            </div>

            <div className="mt-2 flex items-center justify-center gap-4 text-[11px] font-medium text-[#656872]">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#18191C]"></span> Your Profile
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#9E988D]"></span> Required Baseline
              </span>
            </div>
          </div>

          {/* AI Critical Gap Card */}
          <div className="bg-[#18191C] text-white p-6 rounded-2xl border border-black shadow-xs">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                Critical Gap Identified
              </span>
            </div>

            <h4 className="font-display text-lg font-bold text-white">
              Machine Learning & Algorithms
            </h4>
            <p className="text-xs text-white/75 mt-2 leading-relaxed">
              Your largest gap for a <strong>{currentCareer.title}</strong> role is in Machine Learning (50% vs required 85%). We recommend focusing your next 3 weeks on supervised learning algorithms and model evaluation techniques.
            </p>

            <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
              <button
                id="skillgap-view-learning-btn"
                onClick={() => setActiveTab('learning')}
                className="text-xs font-bold text-amber-300 hover:text-amber-200 flex items-center gap-1.5 group"
              >
                <span>View Learning Path</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="skillgap-view-roadmap-btn"
                onClick={() => setActiveTab('roadmap')}
                className="px-3.5 py-1.5 bg-white text-[#18191C] text-xs font-bold rounded-lg hover:bg-[#F2EFE9] transition-colors"
              >
                Open Roadmap
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
