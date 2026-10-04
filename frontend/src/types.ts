export type EducationLevel = 'highschool' | 'bachelors' | 'masters' | 'phd';
export type UserRole = 'student' | 'fresher' | 'professional';
export type SkillProficiency = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface UserSkill {
  name: string;
  proficiency: SkillProficiency;
  level: number; // 1-4
  category?: string;
  isCustom?: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  education: EducationLevel;
  degree?: string;
  targetRole: string;
  experienceYears: number;
  skills: UserSkill[];
  interests: string[];
  goals: string;
  resumeFileName?: string;
  resumeSummary?: string;
  isPremium: boolean;
  avatarUrl?: string;
}

export interface AssessmentAnswer {
  education: EducationLevel;
  degree: string;
  coreSkills: UserSkill[];
  preferredRole: string;
  interests: string[];
  workPreferences: {
    environment: string;
    style: string;
    focus: string;
  };
  experienceYears: number;
  goals: string;
  resumeText?: string;
}

export interface SkillItem {
  name: string;
  userScore: number; // 0-100
  requiredScore: number; // 0-100
  status: 'have' | 'need' | 'improving';
  category?: string;
}

export interface CareerRecommendation {
  id: string;
  title: string;
  matchPercentage: number;
  skillGapLevel: 'Low Skill Gap' | 'Medium Skill Gap' | 'High Skill Gap';
  category: string;
  description: string;
  estimatedDuration: string;
  icon: string;
  salaryRange?: string;
  growthRate?: string;
  requiredSkills: {
    name: string;
    status: 'Have' | 'Need';
  }[];
  skillsGap: SkillItem[];
  typicalRoles: string[];
  recommendedProjects: string[];
  aiAdvice: string;
}

export interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'current_focus' | 'locked';
  progress?: number;
  estimatedDuration?: string;
  timeLeft?: string;
  icon?: string;
  resourcesCount?: number;
  topics?: string[];
  resources?: LearningResource[];
  aiTip?: string;
}

export interface LearningResource {
  id: string;
  title: string;
  type: 'video' | 'project' | 'reading' | 'practice';
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  impact?: 'High Impact' | 'Medium Impact';
  url?: string;
  skill: string;
  completed: boolean;
  inProgress?: boolean;
  image?: string;
  prerequisites?: string[];
}

export interface ProgressStats {
  readinessScore: number;
  skillsMastered: number;
  coursesDone: number;
  projectsBuilt: number;
  currentStreak: number;
  totalLearningHours: number;
  targetGoalText: string;
  weeklyHours: { day: string; hours: number }[];
  recentMilestones: {
    id: string;
    title: string;
    date: string;
    type: 'skill' | 'course' | 'project' | 'streak';
  }[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedActions?: {
    label: string;
    action: () => void;
  }[];
}

export type ActiveTab = 
  | 'dashboard'
  | 'skills'
  | 'careers'
  | 'skill-gap'
  | 'roadmap'
  | 'learning'
  | 'progress'
  | 'help'
  | 'settings'
  | 'profile'
  | 'assessment'
  | 'landing';
