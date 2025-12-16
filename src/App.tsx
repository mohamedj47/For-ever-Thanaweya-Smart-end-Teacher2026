import React, { useState, useEffect } from 'react';
import { GradeLevel, Subject } from './types';
import { SubjectGrid } from './components/SubjectGrid';
import { ChatInterface } from './components/ChatInterface';
import { SubscriptionModal } from './components/SubscriptionModal';
import { AdminGenerator } from './components/AdminGenerator';
import { TutorialModal } from './components/TutorialModal';

import {
  GraduationCap,
  School,
  Printer,
  Lock,
  Clock,
  AlertTriangle,
  HelpCircle
} from 'lucide-react';

const App: React.FC = () => {
  // State
  const [grade, setGrade] = useState<GradeLevel | null>(null);
  const [subject, setSubject] = useState<Subject | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Trial State
  const [trialTimeLeft, setTrialTimeLeft] = useState<string>("");
  const [isTrialActive, setIsTrialActive] = useState(false);
  const [isCurrentGradeSubscribed, setIsCurrentGradeSubscribed] = useState(false);

  // Manual Subscription Modal State
  const [isManualSubscriptionOpen, setIsManualSubscriptionOpen] = useState(false);

  // Tutorial Modal State
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);

  useEffect(() => {
    const checkHash = () => {
      setIsAdmin(window.location.hash === '#admin');
    };

    checkHash();
    window.addEventListener('hashchange', checkHash);

    if (!localStorage.getItem('trial_start_date')) {
      localStorage.setItem('trial_start_date', new Date().toISOString());
    }

    const timer = setInterval(() => {
      const startStr = localStorage.getItem('trial_start_date');
      if (!startStr) return;

      const startDate = new Date(startStr);
      const endDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000);
      const now = new Date();
      const diff = endDate.getTime() - now.getTime();

      if (diff > 0) {
        setIsTrialActive(true);

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setTrialTimeLeft(
          `${days} يوم : ${hours} ساعة : ${minutes} دقيقة : ${seconds} ثانية`
        );
      } else {
        setIsTrialActive(false);
        setTrialTimeLeft("انتهت الفترة التجريبية");
      }
    }, 1000);

    return () => {
      window.removeEventListener('hashchange', checkHash);
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (!grade) {
      setIsCurrentGradeSubscribed(false);
      return;
    }

    const key = `subscription_expiry_${grade}`;
    const expiryStr = localStorage.getItem(key);

    if (!expiryStr) {
      setIsCurrentGradeSubscribed(false);
      return;
    }

    setIsCurrentGradeSubscribed(new Date() < new Date(expiryStr));
  }, [grade, isManualSubscriptionOpen]);

  const handleGradeSelect = (g: GradeLevel) => setGrade(g);
  const handleSubjectSelect = (s: Subject) => setSubject(s);
  const handleReset = () => setSubject(null);
  const handleFullReset = () => {
    setSubject(null);
    setGrade(null);
  };
  const handlePrint = () => window.print();
  const toggleAdmin = () => (window.location.hash = '#admin');

  if (isAdmin) return <AdminGenerator />;

  return (
    <>
      <SubscriptionModal
        forceOpen={isManualSubscriptionOpen}
        onClose={() => setIsManualSubscriptionOpen(false)}
        currentGrade={grade}
      />

      <TutorialModal
        isOpen={isTutorialOpen}
        onClose={() => setIsTutorialOpen(false)}
      />

      {isTrialActive && !isCurrentGradeSubscribed && trialTimeLeft && (
        <div className="bg-indigo-600 text-white text-xs md:text-sm py-2 px-4 text-center font-bold flex items-center justify-center gap-2 dir-rtl">
          <Clock size={16} className="text-yellow-300 animate-pulse" />
          <span>فترة تجريبية مجانية: متبقي</span>
          <span className="font-mono bg-indigo-700 px-2 py-0.5 rounded text-yellow-300">
            {trialTimeLeft}
          </span>
        </div>
      )}

      {/* باقي الواجهة كما هي بدون أي تغيير */}
    </>
  );
};

export default App;
