import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Lazy / Safe Gemini initialization
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // 1. AI Assessment Analysis endpoint
  app.post('/api/assessment/analyze', async (req, res) => {
    try {
      const { education, degree, coreSkills, preferredRole, interests, workPreferences, experienceYears, goals, resumeText } = req.body;
      const ai = getGeminiClient();

      if (!ai) {
        // Fallback realistic response if key is missing in dev
        return res.json({
          recommendedRole: preferredRole || 'Data Scientist',
          matchPercentage: 84,
          personalityInsights: 'High analytical rigor paired with strong structured problem-solving approach. Well suited for data-intensive decision making.',
          careerInterests: interests || ['Machine Learning', 'Data Science'],
          strengths: coreSkills ? coreSkills.map((s: any) => s.name) : ['Python', 'SQL', 'Data Analysis'],
          skillGaps: [
            { skill: 'Machine Learning', current: 50, required: 85, priority: 'High', gap: 35 },
            { skill: 'Statistics & Probability', current: 65, required: 80, priority: 'Medium', gap: 15 },
            { skill: 'Deep Learning', current: 30, required: 60, priority: 'Medium', gap: 30 },
          ],
          suggestedCareers: [
            { title: 'Data Scientist', match: 84, reason: 'High alignment with your Python and data extraction background.' },
            { title: 'Data Analyst', match: 92, reason: 'Immediate readiness with your SQL and data manipulation skills.' },
            { title: 'ML Engineer', match: 76, reason: 'Strong programming foundations, needs cloud & model ops training.' },
          ],
          actionPlan: 'Focus your next 30 days on Supervised Machine Learning with Scikit-learn and Regression/Classification metrics.',
        });
      }

      const prompt = `Analyze this user's career profile and assessment data:
Education: ${education} (${degree || 'N/A'})
Experience: ${experienceYears} years
Target Role: ${preferredRole || 'Not specified'}
Current Skills: ${JSON.stringify(coreSkills || [])}
Interests: ${JSON.stringify(interests || [])}
Work Preferences: ${JSON.stringify(workPreferences || {})}
Goals: ${goals || 'Career advancement'}
Resume Summary: ${resumeText || 'None'}

Provide a structured career assessment analysis in JSON.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
        config: {
          systemInstruction: 'You are CareerAI, an expert AI Career Coach and Skill Assessment Strategist. Analyze the user profile with high precision and return JSON.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              recommendedRole: { type: Type.STRING },
              matchPercentage: { type: Type.NUMBER },
              personalityInsights: { type: Type.STRING },
              strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
              skillGaps: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    skill: { type: Type.STRING },
                    current: { type: Type.NUMBER },
                    required: { type: Type.NUMBER },
                    priority: { type: Type.STRING },
                    gap: { type: Type.NUMBER },
                  },
                },
              },
              suggestedCareers: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    match: { type: Type.NUMBER },
                    reason: { type: Type.STRING },
                  },
                },
              },
              actionPlan: { type: Type.STRING },
            },
            required: ['recommendedRole', 'matchPercentage', 'personalityInsights', 'strengths', 'skillGaps', 'suggestedCareers', 'actionPlan'],
          },
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      res.json(parsed);
    } catch (err: any) {
      console.error('Assessment analysis error:', err);
      res.status(500).json({ error: 'Failed to analyze assessment with AI', details: err.message });
    }
  });

  // 2. AI Skill Gap Analysis endpoint
  app.post('/api/skills/gap', async (req, res) => {
    try {
      const { targetRole, currentSkills } = req.body;
      const ai = getGeminiClient();

      if (!ai) {
        return res.json({
          role: targetRole || 'Data Scientist',
          overallMatch: 78,
          criticalGap: {
            skill: 'Machine Learning',
            currentLevel: 50,
            requiredLevel: 85,
            advice: 'Your largest gap for a Data Scientist role is in Machine Learning (50% vs required 85%). We recommend focusing your next sprint on supervised learning algorithms and model evaluation techniques.',
          },
          radarMetrics: [
            { skill: 'Python', user: 80, required: 90 },
            { skill: 'SQL', user: 75, required: 85 },
            { skill: 'ML', user: 50, required: 85 },
            { skill: 'Stats', user: 65, required: 70 },
            { skill: 'Deep L.', user: 30, required: 60 },
          ],
          competencies: [
            { name: 'Python', userScore: 80, requiredScore: 90, status: 'have' },
            { name: 'SQL', userScore: 75, requiredScore: 85, status: 'have' },
            { name: 'Machine Learning', userScore: 50, requiredScore: 85, status: 'need' },
            { name: 'Statistics', userScore: 65, requiredScore: 70, status: 'have' },
            { name: 'Deep Learning', userScore: 30, requiredScore: 60, status: 'need' },
          ],
        });
      }

      const prompt = `Perform a skill gap analysis for Target Role: "${targetRole}".
User's Current Skills: ${JSON.stringify(currentSkills || [])}.
Compare current capabilities against modern industry requirements for this exact title.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              role: { type: Type.STRING },
              overallMatch: { type: Type.NUMBER },
              criticalGap: {
                type: Type.OBJECT,
                properties: {
                  skill: { type: Type.STRING },
                  currentLevel: { type: Type.NUMBER },
                  requiredLevel: { type: Type.NUMBER },
                  advice: { type: Type.STRING },
                },
              },
              radarMetrics: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    skill: { type: Type.STRING },
                    user: { type: Type.NUMBER },
                    required: { type: Type.NUMBER },
                  },
                },
              },
              competencies: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    userScore: { type: Type.NUMBER },
                    requiredScore: { type: Type.NUMBER },
                    status: { type: Type.STRING },
                  },
                },
              },
            },
          },
        },
      });

      res.json(JSON.parse(response.text || '{}'));
    } catch (err: any) {
      console.error('Skill gap error:', err);
      res.status(500).json({ error: 'Failed to compute skill gap', details: err.message });
    }
  });

  // 3. AI Learning Roadmap Generator
  app.post('/api/roadmap/generate', async (req, res) => {
    try {
      const { targetRole, currentSkills, experienceYears } = req.body;
      const ai = getGeminiClient();

      if (!ai) {
        return res.json({
          role: targetRole || 'Data Scientist',
          overallProgress: 54,
          estimatedDuration: '4-6 Months',
          phases: [
            {
              id: 'p1',
              title: 'Python Fundamentals',
              description: 'Data structures, logic, and functional programming.',
              status: 'completed',
              progress: 100,
            },
            {
              id: 'p2',
              title: 'SQL & Databases',
              description: 'Relational database management, complex queries, and data extraction.',
              status: 'completed',
              progress: 100,
            },
            {
              id: 'p3',
              title: 'Statistics & Probability',
              description: 'Descriptive stats, distributions, hypothesis testing.',
              status: 'in_progress',
              progress: 35,
            },
            {
              id: 'p4',
              title: 'Machine Learning',
              description: 'Supervised and unsupervised learning, model evaluation, scikit-learn.',
              status: 'current_focus',
              progress: 50,
              timeLeft: '3 weeks left',
              aiTip: "You're excelling at classification algorithms! Spend an extra 2 hours reviewing Random Forests before moving on to unsupervised learning.",
            },
            {
              id: 'p5',
              title: 'Portfolio Projects',
              description: 'End-to-end data pipelines and predictive modeling applications.',
              status: 'locked',
            },
            {
              id: 'p6',
              title: 'Interview Prep',
              description: 'Technical assessments, behavioral questions, and whiteboarding.',
              status: 'locked',
            },
          ],
        });
      }

      const prompt = `Generate a personalized step-by-step career learning roadmap to become a "${targetRole}".
User skills: ${JSON.stringify(currentSkills || [])}
Experience: ${experienceYears || 0} years.
Create 5 to 6 sequential phases with status (completed, in_progress, current_focus, locked), descriptions, estimated durations, and actionable AI coach tips.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              role: { type: Type.STRING },
              overallProgress: { type: Type.NUMBER },
              estimatedDuration: { type: Type.STRING },
              phases: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    title: { type: Type.STRING },
                    description: { type: Type.STRING },
                    status: { type: Type.STRING },
                    progress: { type: Type.NUMBER },
                    timeLeft: { type: Type.STRING },
                    aiTip: { type: Type.STRING },
                  },
                },
              },
            },
          },
        },
      });

      res.json(JSON.parse(response.text || '{}'));
    } catch (err: any) {
      console.error('Roadmap error:', err);
      res.status(500).json({ error: 'Failed to generate roadmap', details: err.message });
    }
  });

  // 4. AI Career Assistant Chat
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history, userProfile } = req.body;
      const ai = getGeminiClient();

      if (!ai) {
        // High quality contextual fallback
        const lower = (message || '').toLowerCase();
        let reply = "I'm CareerAI, your intelligent career strategist. How can I help you accelerate your journey?";
        
        if (lower.includes('best for me') || lower.includes('which career')) {
          reply = `Based on your proficiency with **Python** and **SQL**, a **Data Scientist** (82% match) or **Data Analyst** (91% match) path aligns closest with your strengths. If you enjoy building predictive systems, focus on closing the Machine Learning gap!`;
        } else if (lower.includes('missing') || lower.includes('gap')) {
          reply = `Your primary skill gap for a Data Scientist role is **Machine Learning** (currently ~50% vs 85% required target) and advanced **Deep Learning** (30% vs 60%). I recommend starting with Scikit-learn pipelines and regression model drills.`;
        } else if (lower.includes('plan') || lower.includes('3-month') || lower.includes('learning')) {
          reply = `Here is your targeted 90-day sprint:\n\n**Month 1: Applied ML Foundations**\n- Scikit-learn classification & regression algorithms\n- Cross-validation & hyperparameter tuning\n\n**Month 2: Feature Engineering & Projects**\n- Build the House Price Prediction & Customer Churn projects\n- Implement XGBoost & LightGBM\n\n**Month 3: Deployment & Mock Interviews**\n- Deploy an ML API with FastAPI\n- Practice SQL & ML whiteboarding interview questions.`;
        } else if (lower.includes('interview')) {
          reply = `To prepare for a Data Science interview:\n1. **Coding/SQL**: Practice window functions and aggregate queries on LeetCode/HackerRank.\n2. **ML Theory**: Review bias-variance tradeoff, regularization (L1/L2), and evaluation metrics (ROC-AUC, Precision/Recall, F1).\n3. **Portfolio**: Be ready to talk through the architecture and decisions behind your predictive models.`;
        }

        return res.json({ response: reply });
      }

      const systemInstruction = `You are CareerAI, an intelligent, empathetic, and highly strategic career guidance assistant.
User Profile Context:
Name: ${userProfile?.name || 'User'}
Current Target Role: ${userProfile?.targetRole || 'Data Scientist'}
Education: ${userProfile?.education || "Bachelor's"} (${userProfile?.degree || 'CS'})
Skills: ${JSON.stringify(userProfile?.skills || [])}
Career Goals: ${userProfile?.goals || 'Career growth'}

Guidelines:
- Provide clear, encouraging, highly actionable advice with structured formatting (bullet points, bold key terms).
- Always tailor responses directly to the user's specific skills, target role, and skill gaps.
- Help with resumes, interview preparation, learning paths, project ideas, and salary negotiation.`;

      // Build contents array for chat
      const contents: any[] = [];
      if (Array.isArray(history)) {
        for (const item of history.slice(-6)) {
          contents.push({
            role: item.sender === 'user' ? 'user' : 'model',
            parts: [{ text: item.text }],
          });
        }
      }
      contents.push({
        role: 'user',
        parts: [{ text: message }],
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents,
        config: {
          systemInstruction,
        },
      });

      res.json({ response: response.text || "I'm analyzing your career pathways. Could you tell me more about your specific goal?" });
    } catch (err: any) {
      console.error('Chat error:', err);
      res.status(500).json({ error: 'Failed to process AI chat message', details: err.message });
    }
  });

  // 5. Resume AI Parser
  app.post('/api/resume/parse', async (req, res) => {
    try {
      const { text, filename } = req.body;
      const ai = getGeminiClient();

      if (!ai) {
        return res.json({
          extractedRole: 'Data Analyst / Junior Scientist',
          extractedSkills: ['Python', 'SQL', 'Data Analysis', 'Pandas', 'NumPy', 'Tableau', 'Git'],
          educationLevel: 'bachelors',
          experienceYears: 1.5,
          summary: 'Software and analytics background with strong proficiency in relational databases and Python data processing.',
        });
      }

      const prompt = `Extract career profile details from this resume text (File: ${filename}):
${text || 'Sample developer resume with Python, SQL, Statistics, and Data Analysis experience.'}
Extract skills, education level, years of experience, and summary.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              extractedRole: { type: Type.STRING },
              extractedSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
              educationLevel: { type: Type.STRING },
              experienceYears: { type: Type.NUMBER },
              summary: { type: Type.STRING },
            },
          },
        },
      });

      res.json(JSON.parse(response.text || '{}'));
    } catch (err: any) {
      console.error('Resume parse error:', err);
      res.status(500).json({ error: 'Failed to parse resume', details: err.message });
    }
  });

  // Vite middleware or production static serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CareerAI server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Server startup failed:', err);
});
