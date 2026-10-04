import { AssessmentAnswer, UserProfile, CareerRecommendation, RoadmapStep, ChatMessage } from '../types';

export async function analyzeAssessmentApi(data: AssessmentAnswer): Promise<any> {
  const res = await fetch('/api/assessment/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error('Assessment analysis failed');
  }
  return res.json();
}

export async function getSkillGapApi(targetRole: string, currentSkills: any[]): Promise<any> {
  const res = await fetch('/api/skills/gap', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ targetRole, currentSkills }),
  });
  if (!res.ok) {
    throw new Error('Skill gap analysis failed');
  }
  return res.json();
}

export async function generateRoadmapApi(targetRole: string, currentSkills: any[], experienceYears: number): Promise<any> {
  const res = await fetch('/api/roadmap/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ targetRole, currentSkills, experienceYears }),
  });
  if (!res.ok) {
    throw new Error('Roadmap generation failed');
  }
  return res.json();
}

export async function sendChatMessageApi(message: string, history: ChatMessage[], userProfile: UserProfile): Promise<string> {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history, userProfile }),
  });
  if (!res.ok) {
    throw new Error('Chat failed');
  }
  const data = await res.json();
  return data.response || "I couldn't process that request at this moment.";
}

export async function parseResumeApi(text: string, filename: string): Promise<any> {
  const res = await fetch('/api/resume/parse', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, filename }),
  });
  if (!res.ok) {
    throw new Error('Resume parsing failed');
  }
  return res.json();
}
