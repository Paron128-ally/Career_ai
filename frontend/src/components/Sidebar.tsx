import React from 'react';
import { ActiveTab, UserProfile } from '../types';
import {
  LayoutDashboard,
  Compass,
  GitPullRequestDraft,
  Map,
  BookOpen,
  TrendingUp,
  Sparkles,
  User,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  user: UserProfile | null;
  onLogout: () => void;
  onOpenUpgrade: () => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  user,
  onLogout,
  onOpenUpgrade,
  isOpenMobile,
  onCloseMobile,
}) => {
  const navItems: { id: ActiveTab; label: string; icon: any; badge?: string }[] = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'careers', label: 'Career Match', icon: Compass },
    { id: 'skill-gap', label: 'Skill Gap', icon: GitPullRequestDraft },
    { id: 'roadmap', label: 'Learning Roadmap', icon: Map },
    { id: 'learning', label: 'Resources & Drills', icon: BookOpen },
    { id: 'progress', label: 'My Progress', icon: TrendingUp },
  ];

  const handleNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-40 w-64 bg-[#F2EFE9] border-r border-[#E5E2DA] flex flex-col justify-between transition-transform duration-300 md:translate-x-0 ${
        isOpenMobile ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Top Header & Logo */}
      <div>
        <div className="h-16 px-6 flex items-center justify-between border-b border-[#E5E2DA]">
          <div
            id="brand-logo"
            onClick={() => handleNavClick('dashboard')}
            className="flex items-center gap-2.5 cursor-pointer select-none group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#18191C] text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4 text-[#F7F6F2]" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg tracking-tight text-[#18191C] leading-none">
                CareerAI
              </span>
              <span className="text-[10px] text-[#6E7179] font-medium tracking-wide uppercase mt-0.5">
                AI Career Strategist
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="px-3 py-5">
          <div className="text-[11px] font-semibold text-[#8B8E96] tracking-wider uppercase px-3 mb-2">
            Main Menu
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#18191C] text-white shadow-xs'
                      : 'text-[#46484F] hover:bg-[#EAE6DE] hover:text-[#18191C]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 transition-colors ${
                        isActive ? 'text-white' : 'text-[#6E7179]'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-[#E1E0FF] text-[#3033A0]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Bottom Section: Premium Tier & User Profile */}
      <div className="p-4 space-y-3 border-t border-[#E5E2DA]">
        {/* Premium Banner */}
        <div
          id="premium-upgrade-card"
          onClick={onOpenUpgrade}
          className="p-3.5 rounded-xl bg-gradient-to-br from-[#EAE7DF] to-[#E2DDD3] border border-[#DCD6C9] cursor-pointer hover:border-[#BFB7A5] transition-all group"
        >
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#18191C]">
              <Zap className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
              <span>{user?.isPremium ? 'Pro Active' : 'Upgrade to Pro'}</span>
            </div>
            <span className="text-[10px] bg-[#18191C] text-white px-2 py-0.5 rounded-full font-semibold">
              AI Coach
            </span>
          </div>
          <p className="text-[11px] text-[#5D6068] leading-tight">
            {user?.isPremium
              ? 'Full unlimited access to Gemini AI career assessments & mocks.'
              : 'Unlock automated resume tailoring, 1-on-1 interview mock, and deep roadmaps.'}
          </p>
          <div className="mt-2.5 flex items-center justify-between text-xs font-semibold text-[#18191C] group-hover:text-amber-700">
            <span>{user?.isPremium ? 'Manage Subscription' : 'Upgrade Plan'}</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        {/* User Card */}
        {user ? (
          <div className="pt-2 flex items-center justify-between">
            <div
              id="user-profile-btn"
              onClick={() => handleNavClick('profile')}
              className="flex items-center gap-2.5 cursor-pointer hover:opacity-85 transition-opacity"
            >
              <div className="w-9 h-9 rounded-full bg-[#18191C] text-white overflow-hidden flex items-center justify-center font-bold text-sm ring-2 ring-white/60">
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span>{user.name.charAt(0)}</span>
                )}
              </div>
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-semibold text-[#18191C] truncate max-w-[100px]">
                    {user.name}
                  </span>
                  {user.isPremium && (
                    <ShieldCheck className="w-3 h-3 text-indigo-600" />
                  )}
                </div>
                <span className="text-[10px] text-[#6E7179] truncate max-w-[100px]">
                  {user.targetRole || 'Data Scientist'}
                </span>
              </div>
            </div>

            <button
              id="logout-btn"
              onClick={onLogout}
              title="Log out"
              className="p-1.5 rounded-lg text-[#6E7179] hover:text-[#18191C] hover:bg-[#EAE6DE] transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            id="signin-sidebar-btn"
            onClick={() => handleNavClick('landing')}
            className="w-full py-2 bg-[#18191C] text-white text-xs font-semibold rounded-lg hover:bg-black transition-colors"
          >
            Sign In / Get Started
          </button>
        )}
      </div>
    </aside>
  );
};
