export default function SkillTag({ skill, matched }) {
  return (
    <span className={`text-xs px-3 py-1 rounded-full font-medium
      ${matched
        ? 'bg-teal-50 text-teal-700 border border-teal-200'
        : 'bg-red-50 text-red-500 border border-red-200'}`}
    >
      {matched ? '✓' : '✗'} {skill}
    </span>
  )
}