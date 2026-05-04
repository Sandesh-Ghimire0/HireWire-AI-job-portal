export default function MatchScoreBadge({ score }) {
  const getStyles = () => {
    if (score >= 90) return 'bg-indigo-100 text-indigo-700 border-indigo-200'
    if (score >= 80) return 'bg-emerald-100 text-emerald-700 border-emerald-200'
    if (score >= 70) return 'bg-blue-100 text-blue-700 border-blue-200'
    if (score >= 60) return 'bg-amber-100 text-amber-700 border-amber-200'
    return 'bg-rose-100 text-rose-700 border-rose-200'
  }

  return (
    <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg border uppercase tracking-tighter ${getStyles()}`}>
      {score}%
    </span>
  )
}