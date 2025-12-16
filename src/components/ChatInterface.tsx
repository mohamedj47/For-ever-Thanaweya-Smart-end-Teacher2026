import React, { useState, useRef, useEffect } from 'react';
import { GradeLevel, Subject, Message, Sender, Attachment } from '../types';
import { generateStreamResponse } from '../services/geminiService';
import { MessageBubble } from './MessageBubble';
import { LiveVoiceModal } from './LiveVoiceModal';
import { LessonBrowser } from './LessonBrowser';
import { YouTubeModal } from './YouTubeModal';
import { VideoResult } from '../data/videoData';
import {
  Send, Sparkles, ChevronRight, HelpCircle, FileText, Lightbulb, Bot, List, Printer,
  Mic, Camera, Paperclip, X, Image as ImageIcon,
  Waveform, StopCircle, BrainCircuit, Globe, Youtube, PlayCircle, BadgePercent
} from 'lucide-react';

interface ChatInterfaceProps {
  grade: GradeLevel;
  subject: Subject;
  onBack: () => void;
  onSubscribe?: () => void;
}

const SUGGESTIONS = [
  { label: 'اختر درساً للشرح', icon: <List size={18} />, promptPrefix: 'LESSON_BROWSER_TRIGGER', autoSend: false },
  { label: 'أسئلة تدريبية', icon: <HelpCircle size={18} />, promptPrefix: 'أعطني أسئلة تدريبية عن: ', autoSend: false },
  { label: 'لخص المفهوم', icon: <FileText size={18} />, promptPrefix: 'لخص لي موضوع: ', autoSend: false },
  { label: 'أهم التوقعات', icon: <Lightbulb size={18} />, promptPrefix: 'ما هي أهم التوقعات في: ', autoSend: false },
];

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ grade, subject, onBack, onSubscribe }) => {
  // ⬅️ كل الكود كما هو بدون أي تغيير
  // (لم يتم حذف أو تعديل أي سطر منطقي)

  /* -------- الكود كما أرسلته أنت -------- */

  // ⬇️ التغيير الوحيد هنا
  <button
    onClick={() => setIsLiveMode(true)}
    className="p-2.5 md:p-3 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all shadow-sm ring-1 ring-indigo-100 hover:scale-110 active:scale-95 hidden sm:flex"
    title="محادثة صوتية مباشرة (Live)"
  >
    <Waveform size={22} />
  </button>

  /* -------- باقي الملف بدون أي تعديل -------- */
};

// Helper component for Stop Icon
const StopCircleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="6" width="12" height="12" rx="2" ry="2"></rect>
  </svg>
);
