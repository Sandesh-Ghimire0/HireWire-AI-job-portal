import Sidebar from '../../components/common/Sidebar'

export default function RecommendedJobs() {
	return (
		<div className="flex min-h-screen bg-gray-50">
			<Sidebar role="candidate" />

			<main className="flex-1 p-8">
				<div className="mb-8">
					<h1 className="text-2xl font-bold text-[#1A2B4A]">Recommended Jobs</h1>
					<p className="text-gray-400 text-sm">Personalized recommendations will appear here soon.</p>
				</div>

				<div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
					No recommended jobs yet.
				</div>
			</main>
		</div>
	)
}
