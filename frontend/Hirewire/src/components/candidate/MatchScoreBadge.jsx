export default function MatchScoreBadge({ score }) {
  const color =
    score >= 80 ? 'bg-green-100 text-green-700' :
    score >= 60 ? 'bg-yellow-100 text-yellow-700' :
    'bg-red-100 text-red-600'

  return (
    <span className={`text-xs font-bold px-3 py-1 rounded-full ${color}`}>
      {score}% Match
    </span>
  )
}