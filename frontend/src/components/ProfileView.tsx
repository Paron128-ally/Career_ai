import React, { useState } from 'react';
import { UserProfile, UserRole, EducationLevel, ActiveTab } from '../types';
import {
  User,
  Mail,
  GraduationCap,
  Briefcase,
  Target,
  Sparkles,
  Save,
  CheckCircle2,
  ShieldCheck,
  UploadCloud,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ProfileViewProps {
  user: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  onUpdateProfile,
  setActiveTab,
}) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState<UserRole>(user.role);
  const [education, setEducation] = useState<EducationLevel>(user.education);
  const [degree, setDegree] = useState(user.degree || '');
  const [targetRole, setTargetRole] = useState(user.targetRole || 'Data Scientist');
  const [experienceYears, setExperienceYears] = useState(user.experienceYears || 1);
  const [goals, setGoals] = useState(user.goals || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      ...user,
      name,
      email,
      role,
      education,
      degree,
      targetRole,
      experienceYears,
      goals,
    });
    setSavedSuccess(true);
    try {
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
    } catch (e) {}
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAE6DE] border border-[#DCD6C9] text-xs font-semibold text-[#18191C] mb-2">
            <User className="w-3.5 h-3.5 text-indigo-600" />
            <span>Account & Career Profile</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#18191C]">
            Profile Settings
          </h1>
          <p className="text-xs sm:text-sm text-[#656974] mt-0.5">
            Manage your credentials, academic baseline, and targeted job role.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('assessment')}
          className="px-3.5 py-2 bg-[#EFECE5] hover:bg-[#E5E0D5] border border-[#D5D0C4] text-xs font-semibold text-[#18191C] rounded-lg transition-colors"
        >
          Retake Full Assessment
        </button>
      </div>

      <form onSubmit={handleSave} className="bg-[#FAF8F5] p-6 sm:p-8 rounded-2xl border border-[#DCD7CB] shadow-xs space-y-6">
        {/* Top Avatar Banner */}
        <div className="flex items-center gap-4 pb-6 border-b border-[#E5E2DA]">
          <div className="w-16 h-16 rounded-full bg-[#18191C] text-white flex items-center justify-center text-xl font-bold overflow-hidden ring-4 ring-white">
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            ) : (
              <span>{name.charAt(0)}</span>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display text-lg font-bold text-[#18191C]">{name}</h3>
              {user.isPremium && (
                <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-amber-600" /> Pro Tier
                </span>
              )}
            </div>
            <p className="text-xs text-[#6E7179]">{email}</p>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#3E414A] mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2 bg-white border border-[#D5D0C4] rounded-lg text-xs text-[#18191C] focus:outline-none focus:border-[#18191C]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#3E414A] mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2 bg-white border border-[#D5D0C4] rounded-lg text-xs text-[#18191C] focus:outline-none focus:border-[#18191C]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#3E414A] mb-1">Target Role</label>
            <select
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="w-full px-3.5 py-2 bg-white border border-[#D5D0C4] rounded-lg text-xs font-semibold text-[#18191C] focus:outline-none focus:border-[#18191C]"
            >
              <option value="Data Scientist">Data Scientist</option>
              <option value="Data Analyst">Data Analyst</option>
              <option value="ML Engineer">Machine Learning Engineer</option>
              <option value="AI Product Manager">AI Product Manager</option>
              <option value="Full Stack Developer">Full Stack Developer</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#3E414A] mb-1">Years of Experience ({experienceYears} yrs)</label>
            <input
              type="range"
              min="0"
              max="10"
              step="0.5"
              value={experienceYears}
              onChange={(e) => setExperienceYears(parseFloat(e.target.value))}
              className="w-full mt-2 cursor-pointer accent-[#18191C]"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-[#3E414A] mb-1">Degree & Major</label>
            <input
              type="text"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              className="w-full px-3.5 py-2 bg-white border border-[#D5D0C4] rounded-lg text-xs text-[#18191C] focus:outline-none focus:border-[#18191C]"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-[#3E414A] mb-1">Career Ambitions & Objectives</label>
            <textarea
              rows={3}
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
              className="w-full px-3.5 py-2 bg-white border border-[#D5D0C4] rounded-lg text-xs text-[#18191C] focus:outline-none focus:border-[#18191C]"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#E5E2DA] flex items-center justify-between">
          {savedSuccess && (
            <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Profile updated successfully!</span>
            </div>
          )}
          <button
            type="submit"
            className="ml-auto px-5 py-2.5 bg-[#18191C] text-white text-xs font-bold rounded-lg hover:bg-black transition-all flex items-center gap-1.5 shadow-2xs"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Profile</span>
          </button>
        </div>
      </form>
    </div>
  );
};
