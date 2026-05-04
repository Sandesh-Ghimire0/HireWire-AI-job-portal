import { useEffect, useState } from 'react'
import { Loader2, Sparkles } from 'lucide-react'
import Sidebar from '../../components/common/Sidebar'
import JobCard from '../../components/candidate/JobCard'
import { getRecommendedJobs } from '../../api/job'

export default function RecommendedJobs() {
	const [jobs, setJobs] = useState([])
	const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

	useEffect(() => {
		const fetchRecommendedJobs = async () => {
			try {
				const response = await getRecommendedJobs()
				setJobs(response.data)
			} catch (error) {
				console.error('Error fetching recommended jobs:', error)
                setError(error.response?.data?.message || 'Failed to fetch recommendations')
			} finally {
				setLoading(false)
			}
		}

		fetchRecommendedJobs()
	}, [])

	if (loading) {
		return (
			<div className="flex min-h-screen bg-gray-50">
				<Sidebar role="candidate" />
				<main className="flex-1 flex items-center justify-center">
					<Loader2 className="animate-spin text-teal-500" size={32} />
				</main>
			</div>
		)
	}

	return (
		<div className="flex min-h-screen bg-gray-50">
			<Sidebar role="candidate" />

			<main className="flex-1 p-8">
				<div className="mb-8">
                    <div className="flex items-center gap-2 mb-1">
					    <h1 className="text-2xl font-bold text-[#1A2B4A]">Recommended Jobs</h1>
                        <Sparkles className="text-teal-500" size={20} />
                    </div>
					<p className="text-gray-400 text-sm">Jobs tailored to your skills and resume profile.</p>
				</div>

                {error ? (
                    <div className="rounded-xl border border-red-100 bg-red-50 p-10 text-center text-red-600">
                        {error}
                    </div>
                ) : jobs.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {jobs.map((job) => (
                            <JobCard key={job._id} job={job} showMatchScore={true} />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
                        No recommended jobs found. Make sure your profile and resume are complete.
                    </div>
                )}
			</main>
		</div>
	)
}
