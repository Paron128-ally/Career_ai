import React from 'react';
import { UserProfile, ActiveTab } from '../types';
import {
  Menu,
  Search,
  Sparkles,
  Bell,
  Target,
  ArrowRight,
} from 'lucide-react';

interface TopBarProps {
  user: UserProfile | null;
  onOpenMobileMenu: () => void;
  onOpenAiDrawer: () => void;
  setActiveTab: (tab: ActiveTab) => void;
  activeTab: ActiveTab;
}

export const TopBar: React.FC<TopBarProps> = ({
  user,
  onOpenMobileMenu,
  onOpenAiDrawer,
  setActiveTab,
  activeTab,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#F7F6F2]/90 backdrop-blur-md border-b border-[#E7E5E0] h-16 px-4 md:px-8 flex items-center justify-between">
      {/* Left side: Mobile Toggle & Breadcrumb / Search */}
      <div className="flex items-center gap-3 md:gap-4 flex-1">
        <button
          id="mobile-menu-toggle"
          onClick={onOpenMobileMenu}
          className="p-2 rounded-lg text-[#5D6068] hover:bg-[#EAE7DF] md:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs text-[#6E7179] font-medium bg-[#EFECE5] px-3 py-1.5 rounded-lg border border-[#E2DDD3] max-w-sm w-full">
          <Search className="w-3.5 h-3.5 text-[#8E9199]" />
          <input
            id="global-search-input"
            type="text"
            placeholder="Search skills, roadmaps, job tracks..."
            className="bg-transparent border-none outline-none text-xs text-[#18191C] placeholder:text-[#8E9199] w-full"
          />
        </div>

        {/* Current Active Goal Banner */}
        {user?.targetRole && (
          <div
            id="top-target-role-badge"
            onClick={() => setActiveTab('skill-gap')}
            className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5E2DA] border border-[#D5D1C7] text-xs font-semibold text-[#18191C] cursor-pointer hover:bg-[#DDD8CD] transition-colors"
          >
            <Target className="w-3.5 h-3.5 text-indigo-600" />
            <span>Target Role: <strong className="text-black font-bold">{user.targetRole}</strong></span>
            <ArrowRight className="w-3 h-3 text-[#6E7179]" />
          </div>
        )}
      </div>

      {/* Right side: AI Strategist Trigger, Notifications & Retake Assessment */}
      <div className="flex items-center gap-2 md:gap-3">
        <button
          id="top-assessment-btn"
          onClick={() => setActiveTab('assessment')}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#D5D1C7] text-xs font-medium text-[#303237] hover:bg-[#EAE6DE] transition-colors"
        >
          <span>Retake Assessment</span>
        </button>

        <button
          id="top-ai-copilot-btn"
          onClick={onOpenAiDrawer}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#18191C] text-white text-xs font-semibold hover:bg-black shadow-xs transition-all transform active:scale-95"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Ask Career AI</span>
        </button>
      </div>
    </header>
  );
};
