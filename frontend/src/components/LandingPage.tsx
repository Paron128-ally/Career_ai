import React from 'react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  GitPullRequestDraft,
  Compass,
  Map,
  BookOpen,
  Award,
  Zap,
  TrendingUp,
  BrainCircuit,
  Shield,
  Layers,
} from 'lucide-react';

interface LandingPageProps {
  onStartAssessment: () => void;
  onOpenLogin: () => void;
  onExploreCareers: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartAssessment,
  onOpenLogin,
  onExploreCareers,
}) => {
  return (
    <div className="min-h-screen bg-[#F7F6F2] text-[#18191C] selection:bg-[#E1E0FF]">
      {/* Top Navbar */}
      <header className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-9 h-9 rounded-xl bg-[#18191C] text-white flex items-center justify-center shadow-xs">
            <Sparkles className="w-5 h-5 text-[#F7F6F2]" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-[#18191C]">
            CareerAI
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#585B64]">
          <a href="#features" className="hover:text-[#18191C] transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-[#18191C] transition-colors">How it works</a>
          <a href="#career-tracks" className="hover:text-[#18191C] transition-colors">Career Tracks</a>
          <a href="#pricing" className="hover:text-[#18191C] transition-colors">Pricing</a>
        </nav>

        <div className="flex items-center gap-3">
          <button
            id="landing-signin-btn"
            onClick={onOpenLogin}
            className="px-4 py-2 text-sm font-semibold text-[#18191C] hover:bg-[#EAE7DF] rounded-lg transition-colors"
          >
            Sign In
          </button>
          <button
            id="landing-getstarted-btn"
            onClick={onStartAssessment}
            className="px-5 py-2.5 text-sm font-semibold bg-[#18191C] text-white rounded-lg hover:bg-black transition-all shadow-xs flex items-center gap-1.5"
          >
            <span>Start Free</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 pt-12 pb-20 text-center">
        {/* AI Powered Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAE6DD] border border-[#DDD8CD] text-xs font-semibold text-[#3D4048] mb-6 animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>Next-Gen Career Intelligence Platform</span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#18191C] max-w-3xl mx-auto leading-[1.12]">
          Find the right career path with AI.
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-[#5E626D] max-w-2xl mx-auto leading-relaxed">
          Discover personalized career paths, identify skill gaps, and get tailored roadmaps engineered to transition you into high-growth roles.
        </p>

        {/* Hero CTAs */}
        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <button
            id="hero-start-assessment-btn"
            onClick={onStartAssessment}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#18191C] text-white font-semibold text-base hover:bg-black transition-all shadow-sm flex items-center justify-center gap-2 group"
          >
            <span>Start Free Assessment</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            id="hero-explore-careers-btn"
            onClick={onExploreCareers}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#EBE7DF] border border-[#DDD8CD] text-[#18191C] font-semibold text-base hover:bg-[#E2DDD3] transition-colors"
          >
            Explore Career Tracks
          </button>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-[#6C707B] font-medium">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 100% Free initial diagnosis
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Powered by Gemini AI
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Real-time market skill benchmarks
          </span>
        </div>

        {/* Visual Pipeline Showcase: 3 Floating interactive nodes */}
        <div className="mt-16 p-6 sm:p-8 rounded-2xl bg-[#EFECE5] border border-[#E0DCD2] shadow-xs max-w-4xl mx-auto relative overflow-hidden">
          <div className="text-left mb-6 flex items-center justify-between border-b border-[#E0DCD2] pb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-amber-400"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
              <span className="ml-2 text-xs font-semibold text-[#5D6068]">CareerAI Intelligence Engine</span>
            </div>
            <span className="text-xs bg-[#18191C] text-white px-2.5 py-1 rounded-full font-mono">Live Demo</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            {/* Step 1 Card */}
            <div className="bg-[#F7F6F2] p-5 rounded-xl border border-[#E2DDD3] shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs mb-3">
                01
              </div>
              <h4 className="font-display font-bold text-base text-[#18191C]">Profile & Assessment</h4>
              <p className="text-xs text-[#636671] mt-1">Input skills in Python, SQL, and analytical goals.</p>
              <div className="mt-3.5 pt-3 border-t border-[#ECE8DF] flex flex-wrap gap-1.5">
                <span className="text-[10px] bg-[#E8E4DA] px-2 py-0.5 rounded font-mono font-medium">Python (Int)</span>
                <span className="text-[10px] bg-[#E8E4DA] px-2 py-0.5 rounded font-mono font-medium">SQL (Adv)</span>
              </div>
            </div>

            {/* Step 2 Card */}
            <div className="bg-[#18191C] text-white p-5 rounded-xl border border-black shadow-sm relative">
              <div className="w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center font-bold text-xs mb-3">
                02
              </div>
              <div className="flex items-center justify-between">
                <h4 className="font-display font-bold text-base text-white">AI Skill Gap Analysis</h4>
                <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
              </div>
              <p className="text-xs text-white/70 mt-1">Calculates 82% Data Scientist match and flags Machine Learning gap.</p>
              <div className="mt-3.5 pt-3 border-t border-white/10 space-y-1.5 text-[11px]">
                <div className="flex justify-between text-white/80">
                  <span>ML Algorithms</span>
                  <span className="text-amber-300 font-bold">50% / 85% req</span>
                </div>
                <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-amber-400 h-full w-[58%]"></div>
                </div>
              </div>
            </div>

            {/* Step 3 Card */}
            <div className="bg-[#F7F6F2] p-5 rounded-xl border border-[#E2DDD3] shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs mb-3">
                03
              </div>
              <h4 className="font-display font-bold text-base text-[#18191C]">Tailored Roadmap</h4>
              <p className="text-xs text-[#636671] mt-1">Step-by-step milestones, verified courses, and Kaggle drills.</p>
              <div className="mt-3.5 pt-3 border-t border-[#ECE8DF] text-[11px] font-medium text-emerald-800 space-y-1">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Phase 1: Python Core (Done)</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#18191C] font-semibold">
                  <div className="w-3.5 h-3.5 rounded-full bg-indigo-600 flex items-center justify-center text-white text-[8px]">▶</div>
                  <span>Phase 4: ML Foundations</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Bento Grid */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-16 border-t border-[#EAE7DF]">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-display text-3xl font-bold text-[#18191C]">
            Engineered for high-conviction career moves
          </h2>
          <p className="text-[#5F636E] mt-3 text-sm">
            Stop guessing what skills recruiters are searching for. CareerAI benchmarks your actual abilities against thousands of modern job specs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#EFECE5] p-7 rounded-2xl border border-[#E1DDD3]">
            <div className="w-10 h-10 rounded-xl bg-[#18191C] text-white flex items-center justify-center mb-4">
              <Compass className="w-5 h-5 text-amber-300" />
            </div>
            <h3 className="font-display font-bold text-lg text-[#18191C]">AI Role Matching</h3>
            <p className="text-sm text-[#5F636E] mt-2">
              Receive quantified role fit scores (e.g. 91% Data Analyst, 82% Data Scientist) based on your verified tech stack.
            </p>
          </div>

          <div className="bg-[#EFECE5] p-7 rounded-2xl border border-[#E1DDD3]">
            <div className="w-10 h-10 rounded-xl bg-[#18191C] text-white flex items-center justify-center mb-4">
              <GitPullRequestDraft className="w-5 h-5 text-indigo-400" />
            </div>
            <h3 className="font-display font-bold text-lg text-[#18191C]">Radar Skill Gap Analysis</h3>
            <p className="text-sm text-[#5F636E] mt-2">
              Compare your current capability against market targets across multiple dimensions with comparative double bars and radar charts.
            </p>
          </div>

          <div className="bg-[#EFECE5] p-7 rounded-2xl border border-[#E1DDD3]">
            <div className="w-10 h-10 rounded-xl bg-[#18191C] text-white flex items-center justify-center mb-4">
              <Map className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="font-display font-bold text-lg text-[#18191C]">Phase-by-Phase Roadmap</h3>
            <p className="text-sm text-[#5F636E] mt-2">
              Follow tailored learning tracks with curated tutorials, guided machine learning projects, and code drills.
            </p>
          </div>
        </div>
      </section>

      {/* 5-Step Process Section */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-6 py-16 border-t border-[#EAE7DF]">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-display text-3xl font-bold text-[#18191C]">How CareerAI Works</h2>
          <p className="text-[#5F636E] mt-2 text-sm">From diagnosis to job-readiness in 5 structured steps.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { step: '01', title: 'Take Assessment', desc: 'Detail your education, current skills, and ambitions.' },
            { step: '02', title: 'AI Diagnosis', desc: 'Gemini evaluates market fit and identifies your exact skill gaps.' },
            { step: '03', title: 'Select Target Role', desc: 'Choose from top-aligned career tracks with salary benchmarks.' },
            { step: '04', title: 'Execute Roadmap', desc: 'Learn with interactive drills, projects, and AI coaching.' },
            { step: '05', title: 'Job Ready', desc: 'Track readiness percentage and prepare for technical interviews.' },
          ].map((item, idx) => (
            <div key={idx} className="p-5 rounded-xl bg-[#EFECE5] border border-[#E2DDD3] flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">
                  {item.step}
                </span>
                <h4 className="font-display font-bold text-base text-[#18191C] mt-3">{item.title}</h4>
                <p className="text-xs text-[#636671] mt-1.5 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-5xl mx-auto px-6 py-16 text-center">
        <div className="bg-[#18191C] text-white p-10 sm:p-14 rounded-3xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Ready to find your ideal career trajectory?
            </h2>
            <p className="mt-4 text-white/70 text-sm sm:text-base">
              Join thousands of students and professionals using CareerAI to master high-value skills and land target roles.
            </p>
            <button
              id="cta-bottom-assessment-btn"
              onClick={onStartAssessment}
              className="mt-8 px-8 py-3.5 rounded-xl bg-white text-[#18191C] font-bold text-base hover:bg-[#F2EFE9] transition-all shadow-md inline-flex items-center gap-2"
            >
              <span>Begin Free Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-8 border-t border-[#EAE7DF] flex flex-col sm:flex-row items-center justify-between text-xs text-[#7A7E89] gap-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#18191C]" />
          <span className="font-display font-bold text-[#18191C]">CareerAI</span>
          <span>© 2026 CareerAI Platform Inc.</span>
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-[#18191C]">Privacy Policy</a>
          <a href="#" className="hover:text-[#18191C]">Terms of Service</a>
          <a href="#" className="hover:text-[#18191C]">Security</a>
          <a href="#" className="hover:text-[#18191C]">Contact Support</a>
        </div>
      </footer>
    </div>
  );
};
