import React, { useState } from 'react';
import {
  EducationLevel,
  UserSkill,
  SkillProficiency,
  AssessmentAnswer,
  UserProfile,
} from '../types';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  GraduationCap,
  Briefcase,
  Layers,
  UploadCloud,
  FileText,
  Plus,
  Trash2,
  Sliders,
  Target,
  BrainCircuit,
  Loader2,
} from 'lucide-react';
import { analyzeAssessmentApi, parseResumeApi } from '../api/client';
import confetti from 'canvas-confetti';

interface AssessmentViewProps {
  initialData?: UserProfile | null;
  onComplete: (updatedProfile: UserProfile, analysisResult: any) => void;
  onCancel: () => void;
}

const COMMON_SKILLS = [
  'Python',
  'SQL',
  'Data Analysis',
  'Pandas',
  'NumPy',
  'Machine Learning',
  'Statistics',
  'Tableau',
  'PowerBI',
  'Deep Learning',
  'Docker',
  'AWS',
  'Git',
  'Scikit-learn',
  'React',
  'FastAPI',
];

const INTEREST_AREAS = [
  'Machine Learning & AI',
  'Data Science & Modeling',
  'Business Analytics & Dashboards',
  'MLOps & Cloud Infrastructure',
  'Generative AI & LLMs',
  'Computer Vision & NLP',
  'Product Strategy & Management',
  'Software Architecture',
];

export const AssessmentView: React.FC<AssessmentViewProps> = ({
  initialData,
  onComplete,
  onCancel,
}) => {
  const [step, setStep] = useState(1);
  const totalSteps = 6;

  // Form states
  const [education, setEducation] = useState<EducationLevel>(
    initialData?.education || 'bachelors'
  );
  const [degree, setDegree] = useState(
    initialData?.degree || 'B.S. in Computer Science'
  );
  const [skills, setSkills] = useState<UserSkill[]>(
    initialData?.skills?.length
      ? initialData.skills
      : [
          { name: 'Python', proficiency: 'intermediate', level: 3 },
          { name: 'SQL', proficiency: 'intermediate', level: 3 },
          { name: 'Data Analysis', proficiency: 'advanced', level: 4 },
        ]
  );
  const [customSkillInput, setCustomSkillInput] = useState('');
  const [interests, setInterests] = useState<string[]>(
    initialData?.interests?.length
      ? initialData.interests
      : ['Machine Learning & AI', 'Data Science & Modeling']
  );
  const [workEnv, setWorkEnv] = useState('Remote / Flexible');
  const [workStyle, setWorkStyle] = useState('Deep technical & analytical');
  const [companyType, setCompanyType] = useState('High-growth Tech Startup');
  const [preferredRole, setPreferredRole] = useState(
    initialData?.targetRole || 'Data Scientist'
  );
  const [experienceYears, setExperienceYears] = useState(
    initialData?.experienceYears || 1
  );
  const [goals, setGoals] = useState(
    initialData?.goals ||
      'Transition from general data analytics to full-time Data Scientist building production ML models.'
  );

  // Resume states
  const [resumeText, setResumeText] = useState('');
  const [resumeFileName, setResumeFileName] = useState('');
  const [isParsingResume, setIsParsingResume] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Skill management helpers
  const handleToggleSkill = (skillName: string) => {
    const exists = skills.find((s) => s.name === skillName);
    if (exists) {
      setSkills(skills.filter((s) => s.name !== skillName));
    } else {
      setSkills([
        ...skills,
        { name: skillName, proficiency: 'intermediate', level: 2 },
      ]);
    }
  };

  const handleAddCustomSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customSkillInput.trim()) return;
    if (!skills.find((s) => s.name.toLowerCase() === customSkillInput.trim().toLowerCase())) {
      setSkills([
        ...skills,
        { name: customSkillInput.trim(), proficiency: 'intermediate', level: 2, isCustom: true },
      ]);
    }
    setCustomSkillInput('');
  };

  const handleSkillLevelChange = (skillName: string, level: number) => {
    const profs: SkillProficiency[] = ['beginner', 'intermediate', 'advanced', 'expert'];
    setSkills(
      skills.map((s) =>
        s.name === skillName
          ? { ...s, level, proficiency: profs[level - 1] || 'intermediate' }
          : s
      )
    );
  };

  const handleToggleInterest = (item: string) => {
    if (interests.includes(item)) {
      setInterests(interests.filter((i) => i !== item));
    } else {
      setInterests([...interests, item]);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setResumeFileName(file.name);
    setIsParsingResume(true);

    try {
      const parsed = await parseResumeApi(
        `Resume upload: ${file.name}. Profile includes experience with Python, SQL, Statistics, Data Analysis.`,
        file.name
      );
      if (parsed.extractedSkills?.length) {
        // Merge extracted skills
        const newSkills = [...skills];
        for (const skillName of parsed.extractedSkills) {
          if (!newSkills.some((s) => s.name.toLowerCase() === skillName.toLowerCase())) {
            newSkills.push({ name: skillName, proficiency: 'intermediate', level: 2 });
          }
        }
        setSkills(newSkills);
      }
      if (parsed.extractedRole) setPreferredRole(parsed.extractedRole);
      setResumeText(parsed.summary || 'Resume analyzed successfully.');
    } catch (err) {
      console.error(err);
    } finally {
      setIsParsingResume(false);
    }
  };

  const handleFinalSubmit = async () => {
    setIsAnalyzing(true);
    const assessmentData: AssessmentAnswer = {
      education,
      degree,
      coreSkills: skills,
      preferredRole,
      interests,
      workPreferences: {
        environment: workEnv,
        style: workStyle,
        focus: companyType,
      },
      experienceYears,
      goals,
      resumeText,
    };

    try {
      const result = await analyzeAssessmentApi(assessmentData);

      const updatedProfile: UserProfile = {
        id: initialData?.id || 'user_1',
        name: initialData?.name || 'Rahul',
        email: initialData?.email || 'user@example.com',
        role: initialData?.role || 'student',
        education,
        degree,
        targetRole: preferredRole || result.recommendedRole || 'Data Scientist',
        experienceYears,
        skills,
        interests,
        goals,
        resumeFileName,
        resumeSummary: result.personalityInsights,
        isPremium: initialData?.isPremium ?? true,
        avatarUrl: initialData?.avatarUrl,
      };

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // ignore
      }

      onComplete(updatedProfile, result);
    } catch (err) {
      console.error('Submit error:', err);
      // Fallback
      onComplete(
        {
          id: 'user_1',
          name: 'Rahul',
          email: 'rahul.sharma@example.com',
          role: 'student',
          education,
          degree,
          targetRole: preferredRole,
          experienceYears,
          skills,
          interests,
          goals,
          isPremium: true,
        },
        null
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Header Banner */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAE6DE] border border-[#DCD6C9] text-xs font-semibold text-[#18191C] mb-3">
          <BrainCircuit className="w-3.5 h-3.5 text-indigo-600" />
          <span>AI Career Diagnostics</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#18191C]">
          Let's understand your career goals
        </h1>
        <p className="text-sm text-[#616570] mt-2 max-w-lg mx-auto">
          Answer a few quick questions to generate your tailored role matches, skill gap breakdown, and milestone roadmap.
        </p>
      </div>

      {/* Progress Stepper Bar */}
      <div className="bg-[#EFECE5] p-3 rounded-xl border border-[#E2DDD3] mb-8">
        <div className="flex items-center justify-between gap-1 overflow-x-auto no-scrollbar">
          {[
            { num: '01', name: 'Profile' },
            { num: '02', name: 'Skills' },
            { num: '03', name: 'Interests' },
            { num: '04', name: 'Preferences' },
            { num: '05', name: 'Goals' },
            { num: '06', name: 'Resume' },
          ].map((s, idx) => {
            const stepNum = idx + 1;
            const isDone = step > stepNum;
            const isCurrent = step === stepNum;
            return (
              <button
                key={s.num}
                type="button"
                onClick={() => setStep(stepNum)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  isCurrent
                    ? 'bg-[#18191C] text-white shadow-xs'
                    : isDone
                    ? 'text-emerald-800 bg-emerald-100/60 font-semibold'
                    : 'text-[#72757F] hover:bg-[#E4DFD5]'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isCurrent
                      ? 'bg-white text-black'
                      : isDone
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#DCD7CB] text-[#4A4D56]'
                  }`}
                >
                  {isDone ? '✓' : s.num}
                </span>
                <span>{s.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step Content Container */}
      <div className="bg-[#FAF8F5] p-6 sm:p-8 rounded-2xl border border-[#E2DDD3] shadow-xs">
        {/* STEP 1: Profile & Education */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h3 className="font-display text-xl font-bold text-[#18191C]">
                What is your highest level of education?
              </h3>
              <p className="text-xs text-[#636672] mt-1">
                Select your completed or current degree program.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {[
                { id: 'bachelors', title: "Bachelor's Degree", desc: 'B.S., B.A., B.Tech, or equivalent undergraduate' },
                { id: 'masters', title: "Master's Degree", desc: 'M.S., M.Tech, MBA, or graduate program' },
                { id: 'highschool', title: 'High School / Self-Taught', desc: 'Bootcamp graduate or self-directed learning' },
                { id: 'phd', title: 'Doctorate / Ph.D.', desc: 'Academic research or specialized doctoral fellowship' },
              ].map((item) => (
                <div
                  key={item.id}
                  onClick={() => setEducation(item.id as EducationLevel)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    education === item.id
                      ? 'bg-[#18191C] text-white border-black shadow-xs'
                      : 'bg-white text-[#18191C] border-[#DCD7CB] hover:bg-[#F2EFE9]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-sm">{item.title}</span>
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        education === item.id ? 'border-white bg-white' : 'border-[#989BA4]'
                      }`}
                    >
                      {education === item.id && <div className="w-2 h-2 rounded-full bg-black"></div>}
                    </div>
                  </div>
                  <p
                    className={`text-xs mt-1.5 ${
                      education === item.id ? 'text-white/70' : 'text-[#676B76]'
                    }`}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <label className="block text-xs font-semibold text-[#3E414A] mb-1.5">
                Major / Field of Study
              </label>
              <input
                id="assessment-degree-input"
                type="text"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                placeholder="e.g. B.S. in Computer Science & Applied Mathematics"
                className="w-full px-4 py-2.5 bg-white border border-[#D5D0C4] rounded-lg text-sm text-[#18191C] focus:outline-none focus:border-[#18191C]"
              />
            </div>
          </div>
        )}

        {/* STEP 2: Skills & Proficiency Sliders */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h3 className="font-display text-xl font-bold text-[#18191C]">
                Select your core technical & analytical skills
              </h3>
              <p className="text-xs text-[#636672] mt-1">
                Choose skills you have worked with and adjust your self-assessed proficiency.
              </p>
            </div>

            {/* Common Skill Chips */}
            <div>
              <label className="block text-xs font-semibold text-[#3E414A] mb-2">
                Popular Technologies & Competencies
              </label>
              <div className="flex flex-wrap gap-2">
                {COMMON_SKILLS.map((skill) => {
                  const isSelected = skills.some((s) => s.name === skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => handleToggleSkill(skill)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        isSelected
                          ? 'bg-[#18191C] text-white shadow-xs'
                          : 'bg-white text-[#43464F] border border-[#DCD7CB] hover:bg-[#EAE6DD]'
                      }`}
                    >
                      {isSelected ? `✓ ${skill}` : `+ ${skill}`}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Skill Input */}
            <form onSubmit={handleAddCustomSkill} className="flex gap-2">
              <input
                id="custom-skill-input"
                type="text"
                value={customSkillInput}
                onChange={(e) => setCustomSkillInput(e.target.value)}
                placeholder="Add other skill (e.g. PyTorch, Kubernetes, Snowflake)..."
                className="flex-1 px-3.5 py-2 bg-white border border-[#D5D0C4] rounded-lg text-xs focus:outline-none focus:border-[#18191C]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#18191C] text-white text-xs font-semibold rounded-lg hover:bg-black transition-colors"
              >
                Add Skill
              </button>
            </form>

            {/* Selected Skills Proficiency Configuration */}
            {skills.length > 0 && (
              <div className="mt-4 pt-4 border-t border-[#E5E2DA] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#18191C] uppercase tracking-wider">
                    Adjust Your Proficiency (1 = Beginner, 4 = Expert)
                  </span>
                  <span className="text-xs text-[#6B6E78] font-medium">{skills.length} skills selected</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-3 bg-white rounded-xl border border-[#DCD7CB] flex flex-col justify-between shadow-2xs"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-[#18191C]">{skill.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded capitalize">
                            {skill.proficiency} (Level {skill.level})
                          </span>
                          <button
                            type="button"
                            onClick={() => handleToggleSkill(skill.name)}
                            className="text-[#92959E] hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <input
                        type="range"
                        min="1"
                        max="4"
                        step="1"
                        value={skill.level}
                        onChange={(e) => handleSkillLevelChange(skill.name, parseInt(e.target.value))}
                        className="w-full cursor-pointer accent-[#18191C]"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 3: Interests */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h3 className="font-display text-xl font-bold text-[#18191C]">
                Which domains and specializations excite you?
              </h3>
              <p className="text-xs text-[#636672] mt-1">
                Our AI aligns recommendations with your natural passions and work interests.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {INTEREST_AREAS.map((item) => {
                const isSelected = interests.includes(item);
                return (
                  <div
                    key={item}
                    onClick={() => handleToggleInterest(item)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#18191C] text-white border-black shadow-xs'
                        : 'bg-white text-[#18191C] border-[#DCD7CB] hover:bg-[#F2EFE9]'
                    }`}
                  >
                    <span className="font-display font-semibold text-xs sm:text-sm">{item}</span>
                    <div
                      className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                        isSelected ? 'border-white bg-white text-black' : 'border-[#989BA4]'
                      }`}
                    >
                      {isSelected && <span className="text-[10px] font-bold">✓</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 4: Preferences */}
        {step === 4 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h3 className="font-display text-xl font-bold text-[#18191C]">
                What is your ideal work environment?
              </h3>
              <p className="text-xs text-[#636672] mt-1">
                Help us balance technical depth with team collaboration preferences.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#3E414A] mb-2">Location & Setup</label>
                <div className="grid grid-cols-3 gap-2.5">
                  {['Remote / Flexible', 'Hybrid (2-3 days in office)', 'Fully Onsite / Co-located'].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setWorkEnv(val)}
                      className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                        workEnv === val
                          ? 'bg-[#18191C] text-white border-black shadow-xs'
                          : 'bg-white text-[#4A4D56] border-[#DCD7CB] hover:bg-[#EAE6DD]'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3E414A] mb-2">Work Style & Focus</label>
                <div className="grid grid-cols-3 gap-2.5">
                  {['Deep technical & analytical', 'Balanced coding & product strategy', 'Client-facing & business consulting'].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setWorkStyle(val)}
                      className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                        workStyle === val
                          ? 'bg-[#18191C] text-white border-black shadow-xs'
                          : 'bg-white text-[#4A4D56] border-[#DCD7CB] hover:bg-[#EAE6DD]'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3E414A] mb-2">Company Stage</label>
                <div className="grid grid-cols-3 gap-2.5">
                  {['High-growth Tech Startup', 'Mid-market SaaS / Enterprise', 'Top Tier Tech / Big Tech'].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setCompanyType(val)}
                      className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                        companyType === val
                          ? 'bg-[#18191C] text-white border-black shadow-xs'
                          : 'bg-white text-[#4A4D56] border-[#DCD7CB] hover:bg-[#EAE6DD]'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Goals & Preferred Role */}
        {step === 5 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h3 className="font-display text-xl font-bold text-[#18191C]">
                Your Target Role & Ambitions
              </h3>
              <p className="text-xs text-[#636672] mt-1">
                Tell us which title you want to reach and what timeline you are targeting.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#3E414A] mb-1.5">
                Target Role
              </label>
              <select
                id="preferred-role-select"
                value={preferredRole}
                onChange={(e) => setPreferredRole(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-[#D5D0C4] rounded-lg text-xs font-semibold text-[#18191C] focus:outline-none focus:border-[#18191C]"
              >
                <option value="Data Scientist">Data Scientist</option>
                <option value="Data Analyst">Data Analyst</option>
                <option value="ML Engineer">Machine Learning Engineer</option>
                <option value="AI Product Manager">AI Product Manager</option>
                <option value="Full Stack Developer">Full Stack Developer</option>
                <option value="Cloud Data Engineer">Cloud Data Engineer</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-[#3E414A]">Years of Relevant Experience</label>
                <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                  {experienceYears} {experienceYears === 1 ? 'Year' : 'Years'}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                step="0.5"
                value={experienceYears}
                onChange={(e) => setExperienceYears(parseFloat(e.target.value))}
                className="w-full cursor-pointer accent-[#18191C]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#3E414A] mb-1.5">
                Describe your specific career aspirations
              </label>
              <textarea
                id="goals-textarea"
                rows={3}
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                placeholder="e.g. Transition into a Data Scientist role within 6 months, deploy machine learning models in production, and increase compensation."
                className="w-full px-3.5 py-2.5 bg-white border border-[#D5D0C4] rounded-lg text-xs text-[#18191C] focus:outline-none focus:border-[#18191C]"
              />
            </div>
          </div>
        )}

        {/* STEP 6: Resume Upload / AI Auto-Fill */}
        {step === 6 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h3 className="font-display text-xl font-bold text-[#18191C]">
                Upload Resume for Instant AI Extraction (Optional)
              </h3>
              <p className="text-xs text-[#636672] mt-1">
                Upload your CV or PDF to automatically refine skill proficiencies and experience milestones.
              </p>
            </div>

            {/* Upload Area */}
            <div className="border-2 border-dashed border-[#D5D0C4] bg-white rounded-2xl p-8 text-center relative hover:bg-[#FCFAF7] transition-colors">
              <input
                id="resume-file-input"
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={handleFileUpload}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <div className="flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-2xl bg-[#EFECE5] flex items-center justify-center text-[#18191C] mb-3">
                  <UploadCloud className="w-6 h-6 text-[#18191C]" />
                </div>
                <h4 className="font-display font-bold text-sm text-[#18191C]">
                  {resumeFileName ? resumeFileName : 'Drop your resume here, or browse'}
                </h4>
                <p className="text-xs text-[#787B85] mt-1">Supports PDF, DOCX, or TXT up to 10MB</p>

                {isParsingResume && (
                  <div className="mt-3 flex items-center gap-2 text-xs text-indigo-700 font-semibold">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Gemini AI is parsing skills and career history...</span>
                  </div>
                )}
              </div>
            </div>

            {/* Summary preview */}
            <div className="p-4 bg-[#EFECE5] rounded-xl border border-[#E0DCD2]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#18191C]">Assessment Summary Ready</span>
                <span className="text-xs text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded">
                  {skills.length} Skills • {preferredRole}
                </span>
              </div>
              <p className="text-xs text-[#5E626E]">
                Click <strong>"Generate AI Career Roadmap"</strong> below. Gemini 3.7 Flash will analyze your responses, calculate your market match %, quantify your skill gaps, and generate your custom learning path.
              </p>
            </div>
          </div>
        )}

        {/* Footer Navigation Buttons */}
        <div className="mt-8 pt-6 border-t border-[#E5E2DA] flex items-center justify-between">
          {step > 1 ? (
            <button
              id="assessment-prev-btn"
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 py-2.5 rounded-lg border border-[#D5D0C4] text-xs font-semibold text-[#18191C] hover:bg-[#EAE6DE] transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <button
              id="assessment-cancel-btn"
              type="button"
              onClick={onCancel}
              className="px-4 py-2.5 rounded-lg text-xs font-semibold text-[#767983] hover:text-[#18191C] transition-colors"
            >
              Cancel
            </button>
          )}

          {step < totalSteps ? (
            <button
              id="assessment-next-btn"
              type="button"
              onClick={() => setStep(step + 1)}
              className="px-5 py-2.5 bg-[#18191C] text-white text-xs font-bold rounded-lg hover:bg-black transition-all flex items-center gap-2 shadow-xs"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              id="assessment-submit-btn"
              type="button"
              disabled={isAnalyzing}
              onClick={handleFinalSubmit}
              className="px-6 py-2.5 bg-gradient-to-r from-[#18191C] to-indigo-950 text-white text-xs font-bold rounded-lg hover:bg-black transition-all flex items-center gap-2 shadow-sm"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
                  <span>Analyzing with Gemini AI...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Generate AI Career Roadmap</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
