import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

export default function AtsScore({ score }) {
  const color =
    score >= 80 ? '#0D9488' :
    score >= 60 ? '#F59E0B' : '#EF4444'

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center gap-3 border border-gray-100">
      <h3 className="font-semibold text-[#1A2B4A]">Your ATS Score</h3>
      <div className="w-28 h-28">
        <CircularProgressbar
          value={score}
          text={`${score}%`}
          styles={buildStyles({
            textColor: color,
            pathColor: color,
            trailColor: '#E2E8F0',
            textSize: '20px',
          })}
        />
      </div>
      <p className="text-xs text-gray-400 text-center">
        {score >= 80 ? 'Excellent! Your resume is well optimized.' :
         score >= 60 ? 'Good. A few improvements can boost your score.' :
         'Needs work. Check your skill gap section.'}
      </p>
    </div>
  )
}