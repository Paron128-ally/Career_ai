import React, { useState } from 'react';
import { UserRole, UserProfile } from '../types';
import { Sparkles, X, Check, ArrowRight, ShieldCheck, Mail, Lock, User } from 'lucide-react';
import { initialProfile } from '../data/mockData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: UserProfile) => void;
  initialMode?: 'signin' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialMode = 'signin',
}) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [role, setRole] = useState<UserRole>('student');
  const [name, setName] = useState('Rahul Sharma');
  const [email, setEmail] = useState('rahul.sharma@example.com');
  const [password, setPassword] = useState('••••••••');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess({
        ...initialProfile,
        name: name || 'Rahul',
        email: email || 'user@example.com',
        role: role,
      });
      onClose();
    }, 400);
  };

  const handleGuestDemo = () => {
    onSuccess(initialProfile);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-[#F7F6F2] rounded-2xl border border-[#DCD7CB] shadow-2xl max-w-3xl w-full overflow-hidden flex flex-col md:flex-row relative">
        {/* Close Button */}
        <button
          id="auth-close-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-1.5 rounded-full text-[#6E7179] hover:bg-[#EAE6DE] hover:text-[#18191C] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side Value Proposition */}
        <div className="bg-[#18191C] text-white p-8 md:w-5/12 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-amber-300" />
              </div>
              <span className="font-display font-bold text-lg text-white">CareerAI</span>
            </div>

            <h3 className="font-display text-2xl font-bold leading-snug">
              Accelerate your career with AI intelligence.
            </h3>
            <p className="text-white/70 text-xs mt-3 leading-relaxed">
              Join thousands of professionals using quantified skill gaps and algorithmic roadmaps to reach top engineering and data roles.
            </p>

            <div className="mt-8 space-y-3">
              {[
                'Personalized Skill Gap Roadmaps',
                'Real-Time Job Demand Benchmarking',
                'Gemini-powered AI Career Strategist',
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs text-white/90">
                  <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-white text-[10px]">
                    ✓
                  </div>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-white/10 text-[11px] text-white/60">
            Backed by modern labor market intelligence & generative AI.
          </div>
        </div>

        {/* Right Side Form */}
        <div className="p-8 md:w-7/12 flex flex-col justify-center">
          {/* Mode Switcher */}
          <div className="flex items-center justify-between mb-6 border-b border-[#E5E2DA] pb-3">
            <div className="flex gap-4">
              <button
                id="tab-signin"
                type="button"
                onClick={() => setMode('signin')}
                className={`text-sm font-display font-bold pb-1 transition-all ${
                  mode === 'signin'
                    ? 'text-[#18191C] border-b-2 border-[#18191C]'
                    : 'text-[#858892] hover:text-[#18191C]'
                }`}
              >
                Sign In
              </button>
              <button
                id="tab-signup"
                type="button"
                onClick={() => setMode('signup')}
                className={`text-sm font-display font-bold pb-1 transition-all ${
                  mode === 'signup'
                    ? 'text-[#18191C] border-b-2 border-[#18191C]'
                    : 'text-[#858892] hover:text-[#18191C]'
                }`}
              >
                Create Account
              </button>
            </div>

            <button
              id="auth-guest-demo-btn"
              type="button"
              onClick={handleGuestDemo}
              className="text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-md transition-colors"
            >
              ⚡ Instant Demo Mode
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <>
                {/* Role Selector */}
                <div>
                  <label className="block text-xs font-semibold text-[#484B54] mb-1.5">
                    What best describes you?
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'student', label: 'Student' },
                      { id: 'fresher', label: 'Fresher' },
                      { id: 'professional', label: 'Professional' },
                    ].map((item) => (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() => setRole(item.id as UserRole)}
                        className={`py-2 px-1 text-xs font-semibold rounded-lg border text-center transition-all ${
                          role === item.id
                            ? 'bg-[#18191C] text-white border-[#18191C]'
                            : 'bg-white text-[#4A4D56] border-[#DCD7CB] hover:bg-[#EAE6DD]'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-[#484B54] mb-1">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-3 text-[#8A8D96]" />
                    <input
                      id="signup-name-input"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      required
                      className="w-full pl-9 pr-3 py-2.5 text-xs bg-white border border-[#D5D0C4] rounded-lg focus:outline-none focus:border-[#18191C]"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-[#484B54] mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-3 text-[#8A8D96]" />
                <input
                  id="auth-email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-white border border-[#D5D0C4] rounded-lg focus:outline-none focus:border-[#18191C]"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-[#484B54] mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-3 text-[#8A8D96]" />
                <input
                  id="auth-password-input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-white border border-[#D5D0C4] rounded-lg focus:outline-none focus:border-[#18191C]"
                />
              </div>
            </div>

            <button
              id="auth-submit-btn"
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-[#18191C] text-white text-xs font-bold rounded-lg hover:bg-black transition-colors flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <span>Verifying...</span>
              ) : (
                <>
                  <span>{mode === 'signin' ? 'Sign In to Dashboard' : 'Create Free Account'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#DCD7CB]"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase text-[#888B94]">
              <span className="bg-[#F7F6F2] px-2 font-semibold">Or continue with</span>
            </div>
          </div>

          {/* Social SSO */}
          <button
            id="google-sso-btn"
            type="button"
            onClick={handleGuestDemo}
            className="w-full py-2 bg-white border border-[#D5D0C4] text-xs font-semibold text-[#333] rounded-lg hover:bg-[#EAE7DF] transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};
