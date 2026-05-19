import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  Sparkles, 
  Zap, 
  Target, 
  Lightbulb,
  CheckSquare,
  Square,
  Loader2
} from 'lucide-react';
import { getJobFeedback } from '../../api/job';

const PreSubmissionFeedback = ({ jobId }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [checklist, setChecklist] = useState([]);

  useEffect(() => {
    if (!jobId) return;

    const fetchFeedback = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getJobFeedback(jobId);
        if (response && response.data) {
          setFeedback(response.data);
          if (response.data.checklist) {
            setChecklist(response.data.checklist.map((item, index) => ({
              id: index + 1,
              text: item.text,
              completed: !!item.completed
            })));
          }
        } else {
          throw new Error("Could not parse AI response.");
        }
      } catch (err) {
        console.error('Error fetching job feedback:', err);
        setError(err.response?.data?.message || err.message || "Failed to load pre-submission feedback.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [jobId]);

  const toggleCheck = (id) => {
    setChecklist(prev => prev.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center space-y-4 bg-slate-50 border border-slate-100 rounded-3xl animate-pulse min-h-[300px]">
        <Loader2 className="animate-spin text-teal-500" size={32} />
        <div>
          <h3 className="text-sm font-bold text-[#1A2B4A]">Generating AI Feedback</h3>
          <p className="text-xs text-slate-500 mt-1.5 leading-relaxed max-w-[200px] mx-auto">
            Comparing your resume against the job details...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    const isNoResume = error.includes("upload your resume") || error.includes("resume");
    if (isNoResume) {
      return (
        <div className="p-6 rounded-3xl bg-gradient-to-br from-teal-50/50 to-white border border-teal-100/80 shadow-sm text-center space-y-4">
          <div className="w-12 h-12 bg-teal-100/50 rounded-full flex items-center justify-center mx-auto text-teal-600">
            <Sparkles size={22} className="animate-pulse" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-sm font-bold text-[#1A2B4A]">AI Pre-Submission Feedback</h3>
            <p className="text-xs text-slate-500 leading-relaxed max-w-[220px] mx-auto">
              Upload your resume to receive instant, personalized feedback comparing your skills against this job!
            </p>
          </div>
          <Link
            to="/candidate/resume"
            className="inline-flex items-center justify-center w-full px-5 py-2.5 bg-teal-500 text-white rounded-full text-xs font-semibold hover:bg-teal-600 shadow-sm transition-all duration-200 active:scale-[0.98]"
          >
            Upload Resume
          </Link>
        </div>
      );
    }

    return (
      <div className="p-5 rounded-3xl bg-rose-50 border border-rose-100 text-center space-y-2">
        <AlertCircle className="text-rose-500 mx-auto" size={24} />
        <h3 className="text-sm font-bold text-rose-800">Failed to load feedback</h3>
        <p className="text-xs text-rose-600 leading-relaxed">{error}</p>
      </div>
    );
  }

  if (!feedback) return null;

  const status = feedback.status || 'Yellow';
  const statusText = feedback.statusText || 'NEEDS POLISH';
  const readinessScoreText = feedback.readinessScoreText || '';
  const recruiterFirst6Seconds = feedback.recruiterFirst6Seconds || {};
  const criticalGaps = feedback.criticalGaps || [];
  const bonusPoints = feedback.bonusPoints || [];
  const impactEnhancements = feedback.impactEnhancements || {};

  const getScoreCardStyles = (statusVal) => {
    switch (statusVal) {
      case 'Green':
        return {
          bg: 'bg-gradient-to-br from-emerald-50 to-white border-emerald-100/80',
          text: 'text-emerald-950',
          header: 'text-emerald-800',
          iconColor: 'text-emerald-500',
          badgeBg: 'text-emerald-600 bg-emerald-50 border-emerald-100/80',
          badgeDot: 'bg-emerald-500'
        };
      case 'Red':
        return {
          bg: 'bg-gradient-to-br from-rose-50 to-white border-rose-100/80',
          text: 'text-rose-950',
          header: 'text-rose-800',
          iconColor: 'text-rose-500',
          badgeBg: 'text-rose-600 bg-rose-50 border-rose-100/80',
          badgeDot: 'bg-rose-500'
        };
      case 'Yellow':
      default:
        return {
          bg: 'bg-gradient-to-br from-amber-50 to-white border-amber-100/80',
          text: 'text-amber-950',
          header: 'text-amber-800',
          iconColor: 'text-amber-500',
          badgeBg: 'text-amber-600 bg-amber-50 border-amber-100/80',
          badgeDot: 'bg-amber-500'
        };
    }
  };

  const theme = getScoreCardStyles(status);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold text-[#1A2B4A]">Feedback</h2>
        <div className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${theme.badgeBg} flex items-center gap-1.5 animate-pulse shadow-sm`}>
          <div className={`w-1.5 h-1.5 rounded-full ${theme.badgeDot}`}></div>
          {statusText}
        </div>
      </div>

      {/* 1. Readiness Score */}
      <div className={`p-5 rounded-2xl border shadow-sm relative overflow-hidden group transition-all duration-300 hover:shadow-md ${theme.bg}`}>
        <div className="absolute top-0 right-0 p-4 opacity-10 transition-transform group-hover:scale-110">
          <Target size={40} className={theme.iconColor} />
        </div>
        <div className={`flex items-center gap-2 mb-2 font-bold ${theme.header}`}>
          <Zap size={18} />
          <span>Readiness Score</span>
        </div>
        <p className={`text-sm leading-relaxed font-medium ${theme.text}`}>
          {readinessScoreText}
        </p>
      </div>

      {/* 2. Recruiter's First 6 Seconds */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
          <Sparkles size={14} className="text-indigo-500" /> Recruiter's First 6 Seconds
        </h3>
        
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100/80 space-y-3 shadow-sm">
          <div>
            <span className="text-[10px] font-bold text-slate-400 block mb-1">WHAT STICKS OUT</span>
            <p className="text-sm text-slate-700 leading-relaxed font-medium">{recruiterFirst6Seconds.whatSticksOut}</p>
          </div>
          {recruiterFirst6Seconds.terminologyAlignment && recruiterFirst6Seconds.terminologyAlignment.length > 0 && (
            <div className="pt-3 border-t border-slate-200/60">
              <span className="text-[10px] font-bold text-slate-400 block mb-1.5">TERMINOLOGY ALIGNMENT</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {recruiterFirst6Seconds.terminologyAlignment.map((item, idx) => (
                  <span 
                    key={idx} 
                    className={`px-2 py-1 rounded-md text-[10px] font-bold border transition-all duration-200 hover:scale-105 shadow-sm ${
                      item.match 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                        : 'bg-rose-50 text-rose-700 border-rose-100'
                    }`}
                  >
                    {item.match ? 'MATCH' : 'MISSING'}: "{item.term}"
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. Must-Haves vs. Nice-to-Haves */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 rounded-2xl bg-rose-50/20 border border-rose-100/80 transition-all duration-300 hover:bg-rose-50/40 shadow-sm">
          <span className="text-[10px] font-bold text-rose-500 uppercase block mb-2.5 tracking-wider">Critical Gaps</span>
          {criticalGaps && criticalGaps.length > 0 ? (
            <ul className="space-y-2">
              {criticalGaps.map((gap, idx) => (
                <li key={idx} className="flex items-start gap-1.5 text-xs text-rose-800 font-semibold leading-relaxed">
                  <XCircle size={12} className="mt-0.5 shrink-0 text-rose-500" />
                  <span>{gap}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[10px] text-slate-400 italic">No critical gaps.</p>
          )}
        </div>
        <div className="p-4 rounded-2xl bg-emerald-50/20 border border-emerald-100/80 transition-all duration-300 hover:bg-emerald-50/40 shadow-sm">
          <span className="text-[10px] font-bold text-emerald-500 uppercase block mb-2.5 tracking-wider">Bonus Points</span>
          {bonusPoints && bonusPoints.length > 0 ? (
            <ul className="space-y-2">
              {bonusPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-1.5 text-xs text-emerald-800 font-semibold leading-relaxed">
                  <CheckCircle2 size={12} className="mt-0.5 shrink-0 text-emerald-500" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[10px] text-slate-400 italic">No bonus matches.</p>
          )}
        </div>
      </div>

      {/* 4. Impact Enhancements */}
      {impactEnhancements && (impactEnhancements.weakPhrasing || impactEnhancements.missingNumbersText) && (
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <Lightbulb size={14} className="text-amber-500 animate-pulse" /> Impact Enhancements
          </h3>
          
          <div className="p-4 rounded-2xl bg-indigo-50/30 border border-indigo-100/80 space-y-3 shadow-sm">
            {impactEnhancements.weakPhrasing && (
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-indigo-400 block uppercase tracking-wider">Suggested Phrasing</span>
                <div className="p-2.5 rounded-xl bg-white border border-indigo-50/80 text-xs italic text-slate-500 flex items-center justify-between shadow-sm">
                  <span className="leading-relaxed">"{impactEnhancements.weakPhrasing.weak}"</span>
                  <AlertCircle size={12} className="text-amber-500 shrink-0 ml-2" />
                </div>
                <div className="p-2.5 rounded-xl bg-indigo-500 text-white text-xs font-semibold flex items-center justify-between shadow-md transition-all duration-200 hover:scale-[1.01]">
                  <span className="leading-relaxed">"{impactEnhancements.weakPhrasing.strong}"</span>
                  <Sparkles size={12} className="shrink-0 ml-2 animate-bounce" />
                </div>
              </div>
            )}
            
            {impactEnhancements.missingNumbersText && (
              <div className="pt-2 border-t border-indigo-100/40">
                <span className="text-[10px] font-bold text-indigo-400 block uppercase tracking-wider mb-1">Missing Numbers Tip</span>
                <p className="text-xs text-indigo-950 leading-relaxed font-semibold italic">
                  "{impactEnhancements.missingNumbersText}"
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 5. Custom Actionable Checklist */}
      {checklist && checklist.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <CheckSquare size={14} className="text-teal-500" /> Actionable Checklist
          </h3>
          <div className="p-4 rounded-2xl bg-teal-50/20 border border-teal-100/60 space-y-2 shadow-sm">
            {checklist.map((item) => (
              <button
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className="flex items-start gap-2.5 w-full text-left p-2 rounded-xl hover:bg-teal-50/60 transition-all duration-200 group"
              >
                <div className="mt-0.5 text-teal-500 transition-transform duration-200 group-hover:scale-110 shrink-0">
                  {item.completed ? (
                    <CheckSquare size={16} className="fill-teal-50 text-teal-500" />
                  ) : (
                    <Square size={16} className="text-slate-300 group-hover:text-teal-400" />
                  )}
                </div>
                <span className={`text-xs font-semibold transition-all ${
                  item.completed 
                    ? 'text-slate-400 line-through' 
                    : 'text-slate-700 group-hover:text-teal-950'
                }`}>
                  {item.text}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PreSubmissionFeedback;
