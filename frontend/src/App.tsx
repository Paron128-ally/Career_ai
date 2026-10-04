import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import {
  ActiveTab,
  UserProfile,
  CareerRecommendation,
  RoadmapStep,
  LearningResource,
  ProgressStats,
} from './types';
import {
  initialProfile,
  sampleCareers,
  sampleRoadmapSteps,
  sampleLearningResources,
  initialProgressStats,
} from './data/mockData';

// Components
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { LandingPage } from './components/LandingPage';
import { AuthModal } from './components/AuthModal';
import { AssessmentView } from './components/AssessmentView';
import { DashboardView } from './components/DashboardView';
import { CareerRecommendationsView } from './components/CareerRecommendationsView';
import { SkillGapView } from './components/SkillGapView';
import { RoadmapView } from './components/RoadmapView';
import { LearningView } from './components/LearningView';
import { ProgressView } from './components/ProgressView';
import { ProfileView } from './components/ProfileView';
import { CareerDetailModal } from './components/CareerDetailModal';
import { UpgradePlanModal } from './components/UpgradePlanModal';
import { AiAssistantDrawer } from './components/AiAssistantDrawer';

// Floating Trigger
import { Sparkles } from 'lucide-react';

export default function App() {
  // State initialization with localStorage backup
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('careerai_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return initialProfile;
  });

  const navigate = useNavigate();
  const location = useLocation();
  const activeTab = (location.pathname === '/' ? 'landing' : location.pathname.substring(1)) as ActiveTab;

  const setActiveTab = (tab: ActiveTab | string) => {
    if (tab === 'landing') navigate('/');
    else navigate('/' + tab);
  };
  const [careers, setCareers] = useState<CareerRecommendation[]>(sampleCareers);
  const [roadmap, setRoadmap] = useState<RoadmapStep[]>(sampleRoadmapSteps);
  const [resources, setResources] = useState<LearningResource[]>(sampleLearningResources);
  const [stats, setStats] = useState<ProgressStats>(initialProgressStats);

  // Modals & Drawers
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState<'signin' | 'signup'>('signin');
  const [selectedCareerDetail, setSelectedCareerDetail] = useState<CareerRecommendation | null>(null);
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Save user changes to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('careerai_user', JSON.stringify(user));
    }
  }, [user]);

  // Handler for completing the Assessment
  const handleAssessmentComplete = (
    updatedProfile: UserProfile,
    aiAnalysis: any
  ) => {
    setUser(updatedProfile);

    // If AI recommended roles returned, update match scores
    if (aiAnalysis?.suggestedCareers?.length) {
      const updatedCareers = careers.map((c) => {
        const matchFound = aiAnalysis.suggestedCareers.find(
          (sc: any) => sc.title.toLowerCase() === c.title.toLowerCase()
        );
        if (matchFound) {
          return {
            ...c,
            matchPercentage: matchFound.match,
            aiAdvice: matchFound.reason || c.aiAdvice,
          };
        }
        return c;
      });
      setCareers(updatedCareers);
    }

    // Redirect straight to Dashboard
    setActiveTab('dashboard');
  };

  const handleSelectTargetRole = (roleTitle: string) => {
    if (user) {
      setUser({ ...user, targetRole: roleTitle });
    }
  };

  const primaryCareer =
    careers.find((c) => c.title === user?.targetRole) ||
    careers.find((c) => c.id === 'data-scientist') ||
    careers[0];

  // Landing Page Mode
  if (activeTab === 'landing' || !user) {
    return (
      <div className="min-h-screen bg-[#F7F6F2] text-[#18191C]">
        <LandingPage
          onStartAssessment={() => {
            setActiveTab('assessment');
          }}
          onOpenLogin={() => {
            setAuthInitialMode('signin');
            setIsAuthOpen(true);
          }}
          onExploreCareers={() => {
            setUser(initialProfile);
            setActiveTab('careers');
          }}
        />

        <AuthModal
          isOpen={isAuthOpen}
          initialMode={authInitialMode}
          onClose={() => setIsAuthOpen(false)}
          onSuccess={(u) => {
            setUser(u);
            setActiveTab('dashboard');
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F6F2] text-[#18191C] flex">
      {/* Left Navigation Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        onLogout={() => {
          setUser(null);
          setActiveTab('landing');
        }}
        onOpenUpgrade={() => setIsUpgradeOpen(true)}
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Backdrop for mobile drawer */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 md:hidden backdrop-blur-2xs"
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 md:pl-64 flex flex-col min-h-screen">
        <TopBar
          user={user}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          onOpenAiDrawer={() => setIsAiDrawerOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={
              <DashboardView
                user={user}
                stats={stats}
                primaryCareer={primaryCareer}
                setActiveTab={setActiveTab}
                onOpenCareerDetail={(c) => setSelectedCareerDetail(c)}
                onOpenAiDrawer={() => setIsAiDrawerOpen(true)}
              />
            } />
            <Route path="/careers" element={
              <CareerRecommendationsView
                careers={careers}
                user={user}
                onSelectTargetRole={handleSelectTargetRole}
                onOpenCareerDetail={(c) => setSelectedCareerDetail(c)}
                setActiveTab={setActiveTab}
              />
            } />
            <Route path="/career-paths" element={<Navigate to="/careers" replace />} />
            <Route path="/skill-gap" element={
              <SkillGapView
                user={user}
                activeCareer={primaryCareer}
                allCareers={careers}
                onSwitchRole={handleSelectTargetRole}
                setActiveTab={setActiveTab}
              />
            } />
            <Route path="/skills" element={<Navigate to="/skill-gap" replace />} />
            <Route path="/roadmap" element={
              <RoadmapView
                roadmap={roadmap}
                user={user}
                setActiveTab={setActiveTab}
                onOpenAiDrawer={() => setIsAiDrawerOpen(true)}
              />
            } />
            <Route path="/learning" element={
              <LearningView
                resources={resources}
                user={user}
                onOpenAiDrawer={() => setIsAiDrawerOpen(true)}
                setActiveTab={setActiveTab}
              />
            } />
            <Route path="/progress" element={
              <ProgressView
                stats={stats}
                user={user}
                setActiveTab={setActiveTab}
              />
            } />
            <Route path="/profile" element={
              <ProfileView
                user={user}
                onUpdateProfile={(updated) => setUser(updated)}
                setActiveTab={setActiveTab}
              />
            } />
            <Route path="/assessment" element={
              <AssessmentView
                initialData={user}
                onComplete={handleAssessmentComplete}
                onCancel={() => setActiveTab('dashboard')}
              />
            } />
            
            {/* Additional routes requested by the project structure */}
            <Route path="/settings" element={<div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100">Settings - Coming Soon</div>} />
            <Route path="/help" element={<div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100">Help Center - Coming Soon</div>} />
            <Route path="/assistant" element={<div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100">Full AI Assistant View - Coming Soon</div>} />
            <Route path="/resume" element={<div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100">Resume Upload & Analysis - Coming Soon</div>} />
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="/register" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>

      {/* Floating AI Strategist Button in Bottom Right */}
      <button
        id="floating-ai-btn"
        onClick={() => setIsAiDrawerOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-3.5 bg-[#18191C] hover:bg-black text-white rounded-full shadow-2xl flex items-center gap-2 group hover:scale-105 transition-all"
        title="Open Career AI Strategist"
      >
        <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
        <span className="text-xs font-bold hidden sm:inline-block pr-1">
          Ask Career AI
        </span>
      </button>

      {/* Modals & Drawers */}
      <CareerDetailModal
        career={selectedCareerDetail}
        user={user}
        onClose={() => setSelectedCareerDetail(null)}
        onSelectAsTarget={handleSelectTargetRole}
        setActiveTab={setActiveTab}
      />

      <UpgradePlanModal
        isOpen={isUpgradeOpen}
        isCurrentPro={user?.isPremium ?? false}
        onClose={() => setIsUpgradeOpen(false)}
        onUpgradeSuccess={() => {
          if (user) setUser({ ...user, isPremium: true });
        }}
      />

      <AiAssistantDrawer
        isOpen={isAiDrawerOpen}
        onClose={() => setIsAiDrawerOpen(false)}
        user={user}
      />

      <AuthModal
        isOpen={isAuthOpen}
        initialMode={authInitialMode}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={(u) => {
          setUser(u);
          setActiveTab('dashboard');
        }}
      />
    </div>
  );
}
