import { BookOpen, Target, Users } from 'lucide-react';

const CourseEvaluation = () => {
	const evaluationCriteria = [
		{
			category: 'Technical Implementation',
			weight: '60%',
			description:
				'Application of Flutter concepts, code quality, and technical problem-solving abilities.',
			icon: <BookOpen className='w-5 h-5' />,
		},
		{
			category: 'User Experience',
			weight: '30%',
			description:
				'Design principles, accessibility, and user interface quality across different platforms.',
			icon: <Users className='w-5 h-5' />,
		},
		{
			category: 'Problem Solving',
			weight: '10%',
			description: 'Debugging skills and creative solutions to challenges.',
			icon: <Target className='w-5 h-5' />,
		},
	];

	return (
		<section
			id='evaluation'
			className='py-20 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-7xl mx-auto'>
				<div className='fade-section opacity-0 translate-y-8 transition-all duration-700 ease-out'>
					{/* Course Evaluation */}
					<div className='bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-[#0f172a] dark:to-[#1e293b] rounded-3xl p-12 border border-blue-200 dark:border-blue-800'>
						<div className='text-center mb-12'>
							<h2 className='text-4xl font-bold text-gray-900 dark:text-white mb-4'>
								Course Evaluation
							</h2>
							<p className='text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
								Your progress will be assessed through practical application and
								peer review
							</p>
						</div>

						<div className='grid md:grid-cols-3 gap-8'>
							{evaluationCriteria.map((criteria, index) => (
								<div
									key={index}
									className='bg-white dark:bg-[#161b22] rounded-xl p-8 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300'>
									<div className='flex items-center mb-4'>
										<div className='bg-gradient-to-r from-[#0175C2] to-[#01B5F2] text-white p-3 rounded-lg mr-4'>
											{criteria.icon}
										</div>
										<div>
											<h3 className='font-bold text-gray-900 dark:text-white'>
												{criteria.category}
											</h3>
											<span className='text-2xl font-bold text-[#0175C2] dark:text-[#01B5F2]'>
												{criteria.weight}
											</span>
										</div>
									</div>
									<p className='text-gray-600 dark:text-gray-300'>
										{criteria.description}
									</p>
								</div>
							))}
						</div>

						<div className='mt-12 text-center'>
							<div className='bg-white dark:bg-[#161b22] rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 max-w-2xl mx-auto'>
								<h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
									Final Project Showcase
								</h3>
								<p className='text-gray-600 dark:text-gray-300 mb-6'>
									Present your completed Firebase Flutter application to the
									cohort and receive feedback from instructors.
								</p>
								<div className='flex flex-wrap justify-center gap-4'>
									<span className='bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold'>
										Live Demo
									</span>
									<span className='bg-gradient-to-r from-[#0175C2] to-[#01B5F2] text-white px-4 py-2 rounded-full text-sm font-semibold'>
										Code Review
									</span>
									<span className='bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-semibold'>
										Feedback
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CourseEvaluation;
