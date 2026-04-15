import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  Sparkles, 
  Zap, 
  Target, 
  Lightbulb,
  CheckSquare,
  Square
} from 'lucide-react';

const PreSubmissionFeedback = () => {
  const [checklist, setChecklist] = useState([
    { id: 1, text: 'Add "Atomic Design" methodology to portfolio', completed: false },
    { id: 2, text: 'Quantify impact on "E-commerce Redesign" project', completed: false },
    { id: 3, text: 'Sync terminology with the JD (e.g., use "User-Centric" instead of "User-focused")', completed: false },
    { id: 4, text: 'Ensure Figma case study links are public', completed: false },
    { id: 5, text: 'Add "Accessibility Audit" certification', completed: false }
  ]);

  const toggleCheck = (id) => {
    setChecklist(prev => prev.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Green': return 'text-emerald-500 bg-emerald-50 border-emerald-100';
      case 'Yellow': return 'text-amber-500 bg-amber-50 border-amber-100';
      case 'Red': return 'text-rose-500 bg-rose-50 border-rose-100';
      default: return 'text-slate-500 bg-slate-50 border-slate-100';
    }
  };

  const status = 'Yellow'; // Dummy state

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold text-[#1A2B4A]">Feedback</h2>
        <div className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(status)} flex items-center gap-1.5 animate-pulse`}>
          <div className={`w-2 h-2 rounded-full ${status === 'Yellow' ? 'bg-amber-500' : status === 'Green' ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
          NEEDS POLISH
        </div>
      </div>

      {/* 1. Readiness Score */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-white border border-amber-100 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 transition-transform group-hover:scale-110">
          <Target size={40} className="text-amber-500" />
        </div>
        <div className="flex items-center gap-2 mb-2 text-amber-700 font-bold">
          <Zap size={18} />
          <span>Readiness Score</span>
        </div>
        <p className="text-sm text-amber-900 leading-relaxed font-medium">
          The Bottom Line: You're a strong cultural fit, but your technical highlights need more quantifiable impact to stand out in the first screening.
        </p>
      </div>

      {/* 2. Recruiter's First 6 Seconds */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
          <Sparkles size={14} /> Recruiter's First 6 Seconds
        </h3>
        
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
          <div>
            <span className="text-xs font-bold text-slate-400 block mb-1">WHAT STICKS OUT</span>
            <p className="text-sm text-slate-700">Strong visual design portfolio, but missing clear links to user testing results mentioned in your experience.</p>
          </div>
          <div className="pt-3 border-t border-slate-200">
            <span className="text-xs font-bold text-slate-400 block mb-1">TERMINOLOGY ALIGNMENT</span>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="px-2 py-1 rounded-md bg-emerald-100 text-emerald-700 text-[10px] font-bold border border-emerald-200">MATCH: "Design Systems"</span>
              <span className="px-2 py-1 rounded-md bg-rose-100 text-rose-700 text-[10px] font-bold border border-rose-200">MISSING: "Prototyping"</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Must-Haves vs. Nice-to-Haves */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100">
          <span className="text-[10px] font-bold text-rose-500 uppercase block mb-2">Critical Gaps</span>
          <ul className="space-y-1.5">
            <li className="flex items-start gap-1.5 text-xs text-rose-700">
              <XCircle size={12} className="mt-0.5 shrink-0" />
              <span>Advanced Figma (Auto-layout)</span>
            </li>
            <li className="flex items-start gap-1.5 text-xs text-rose-700">
              <XCircle size={12} className="mt-0.5 shrink-0" />
              <span>Basic HTML/CSS knowledge</span>
            </li>
          </ul>
        </div>
        <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100">
          <span className="text-[10px] font-bold text-emerald-500 uppercase block mb-2">Bonus Points</span>
          <ul className="space-y-1.5">
            <li className="flex items-start gap-1.5 text-xs text-emerald-700">
              <CheckCircle2 size={12} className="mt-0.5 shrink-0" />
              <span>3+ years agencies</span>
            </li>
            <li className="flex items-start gap-1.5 text-xs text-emerald-700">
              <CheckCircle2 size={12} className="mt-0.5 shrink-0" />
              <span>AI tools integration</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 4. Impact Enhancements */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
          <Lightbulb size={14} /> Impact Enhancements
        </h3>
        
        <div className="p-4 rounded-2xl bg-indigo-50/30 border border-indigo-100 space-y-3">
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-indigo-400 block uppercase">Weak Phrasing</span>
            <div className="p-2 rounded bg-white/50 border border-indigo-50 text-xs italic text-slate-500 flex items-center justify-between">
              <span>"Responsible for creating design systems..."</span>
              <AlertCircle size={12} className="text-amber-500" />
            </div>
            <div className="p-2 rounded bg-indigo-500 text-white text-xs font-medium flex items-center justify-between shadow-sm">
              <span>"Spearheaded the unification of 4 disparate design systems..."</span>
              <Sparkles size={12} />
            </div>
          </div>
          
          <div className="pt-2">
            <span className="text-[10px] font-bold text-indigo-400 block uppercase mb-1">Missing Numbers</span>
            <p className="text-xs text-indigo-900 leading-relaxed italic">
              "How much did user retention improve after your redesign? Try to add percentage increases."
            </p>
          </div>
        </div>
      </div>

      {/* 5. Quick-Fix Checklist */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
          <CheckSquare size={14} /> Quick-Fix Checklist
        </h3>
        
        <div className="space-y-2">
          {checklist.map(item => (
            <button 
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 text-left ${
                item.completed 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-700 opacity-70' 
                : 'bg-white border-slate-200 text-slate-700 hover:border-indigo-300 hover:bg-slate-50 shadow-sm'
              }`}
            >
              {item.completed ? (
                <CheckSquare size={18} className="text-emerald-500" />
              ) : (
                <Square size={18} className="text-slate-300" />
              )}
              <span className={`text-xs ${item.completed ? 'line-through' : 'font-medium'}`}>
                {item.text}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreSubmissionFeedback;
