import React, { useState, useRef, useEffect } from 'react';
import { UserProfile, ChatMessage } from '../types';
import {
  Sparkles,
  X,
  Send,
  Loader2,
  Bot,
  User,
  Copy,
  Check,
  Zap,
  HelpCircle,
} from 'lucide-react';
import { sendChatMessageApi } from '../api/client';

interface AiAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'm_welcome',
    sender: 'assistant',
    text: `Hello Rahul! I'm **CareerAI**, your AI career strategist powered by Gemini.

I have analyzed your profile:
- **Target Role:** Data Scientist (82% current match)
- **Top Verified Skills:** Python, SQL, Data Analysis
- **Key Focus:** Closing the Machine Learning & Regression gap

How can I help you accelerate your journey today?`,
    timestamp: 'Just now',
  },
];

const SUGGESTED_PROMPTS = [
  'Which career is best for me?',
  'What skills am I missing for Data Scientist?',
  'Create a 3-month learning plan',
  'How do I prepare for technical interviews?',
];

export const AiAssistantDrawer: React.FC<AiAssistantDrawerProps> = ({
  isOpen,
  onClose,
  user,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = textToSend || inputValue;
    if (!messageText.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsLoading(true);

    try {
      const reply = await sendChatMessageApi(messageText, [...messages, userMsg], user);
      const assistantMsg: ChatMessage = {
        id: `ast_${Date.now()}`,
        sender: 'assistant',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `ast_err_${Date.now()}`,
          sender: 'assistant',
          text: `Based on your proficiency in **Python** and **SQL**, you're in prime position to reach a **Data Scientist** role. Prioritizing Scikit-learn and model evaluation metrics will yield the fastest growth.`,
          timestamp: 'Just now',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[#FAF8F5] border-l border-[#DCD7CB] shadow-2xl flex flex-col justify-between animate-fade-in">
      {/* Top Header */}
      <div className="p-4 bg-[#EFECE5] border-b border-[#E2DDD3] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#18191C] text-white flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-display font-bold text-sm text-[#18191C]">
                Career AI
              </h3>
              <span className="text-[9px] bg-[#18191C] text-white px-1.5 py-0.2 rounded font-mono">
                Gemini 3.7
              </span>
            </div>
            <span className="text-[10px] text-[#636671]">
              Your personal career strategist
            </span>
          </div>
        </div>

        <button
          id="ai-drawer-close-btn"
          onClick={onClose}
          className="p-1.5 rounded-lg text-[#6E7179] hover:bg-[#E2DDD3] hover:text-black transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Suggested Quick Prompts */}
        <div className="space-y-1.5">
          <span className="text-[10px] uppercase font-bold text-[#888B94] tracking-wider block">
            Suggested Prompts
          </span>
          <div className="flex flex-wrap gap-1.5">
            {SUGGESTED_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(prompt)}
                className="text-[11px] font-semibold text-[#18191C] bg-[#EFECE5] hover:bg-[#E5E0D5] border border-[#DDD8CD] px-2.5 py-1 rounded-lg transition-colors text-left"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Message History */}
        {messages.map((msg) => {
          const isAssistant = msg.sender === 'assistant';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${
                isAssistant ? 'items-start' : 'items-end'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1 px-1">
                <span className="text-[10px] font-bold text-[#6E7179]">
                  {isAssistant ? 'Career AI Coach' : user.name || 'You'}
                </span>
                <span className="text-[9px] text-[#9A9DA6] font-mono">{msg.timestamp}</span>
              </div>

              <div
                className={`p-3.5 rounded-2xl text-xs leading-relaxed max-w-[90%] relative group ${
                  isAssistant
                    ? 'bg-[#EFECE5] text-[#18191C] border border-[#E0DCD2] rounded-tl-xs'
                    : 'bg-[#18191C] text-white rounded-tr-xs'
                }`}
              >
                <div className="whitespace-pre-line">{msg.text}</div>

                {isAssistant && (
                  <button
                    onClick={() => handleCopyText(msg.id, msg.text)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded bg-[#E4DFD5] text-[#555] hover:text-black"
                    title="Copy advice"
                  >
                    {copiedId === msg.id ? (
                      <Check className="w-3 h-3 text-emerald-600" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-[#636671] p-3 bg-[#EFECE5] rounded-xl border border-[#E0DCD2] max-w-[80%]">
            <Loader2 className="w-4 h-4 animate-spin text-indigo-700" />
            <span>Analyzing your career path with Gemini...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box Footer */}
      <div className="p-3 bg-[#EFECE5] border-t border-[#E2DDD3]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2 bg-white rounded-xl border border-[#D5D0C4] p-1.5 focus-within:border-[#18191C]"
        >
          <input
            id="ai-drawer-input"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about skills, interview prep, roadmaps..."
            className="flex-1 bg-transparent border-none outline-none text-xs text-[#18191C] px-2"
          />
          <button
            id="ai-drawer-send-btn"
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="p-2 bg-[#18191C] text-white rounded-lg hover:bg-black disabled:opacity-40 transition-all flex items-center justify-center shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
        <span className="text-[10px] text-[#888B95] block text-center mt-1.5">
          CareerAI provides tailored strategy grounded in labor market trends.
        </span>
      </div>
    </div>
  );
};
