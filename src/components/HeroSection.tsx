import { motion } from 'framer-motion';
import { ChevronDown, Code, Zap, Database } from 'lucide-react';

const HeroSection = () => {
	const scrollToOverview = () => {
		const overviewSection = document.getElementById('overview');
		if (overviewSection) {
			overviewSection.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<section
			id='hero'
			className='min-h-screen flex items-center justify-center relative overflow-hidden'>
			{/* Background Animation */}
			<div className='absolute inset-0 bg-gradient-to-br from-[#0175C2]/5 via-transparent to-[#01B5F2]/10' />

			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10'>
				
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className='space-y-8'>
					{/* Floating Icons */}
					<div className='flex justify-center space-x-8 mb-8'>
						<motion.div
							animate={{ y: [-10, 10, -10] }}
							transition={{ duration: 3, repeat: Infinity }}
							className='p-4 bg-[#0175C2]/10 rounded-full'>
							<Database className='w-8 h-8 text-[#0175C2]' />
						</motion.div>
						<motion.div
							animate={{ y: [10, -10, 10] }}
							transition={{ duration: 3, repeat: Infinity, delay: 1 }}
							className='p-4 bg-[#0175C2]/10 rounded-full'>
							<Code className='w-8 h-8 text-[#0175C2]' />
						</motion.div>
						<motion.div
							animate={{ y: [-10, 10, -10] }}
							transition={{ duration: 3, repeat: Infinity, delay: 2 }}
							className='p-4 bg-[#0175C2]/10 rounded-full'>
							<Zap className='w-8 h-8 text-[#0175C2]' />
						</motion.div>
					</div>

					<h1 className='text-5xl md:text-7xl font-bold text-gray-900 dark:text-white leading-tight'>
						Learn{' '}
						<span className='text-[#0175C2] relative'>
							Flutter
							<motion.div
								initial={{ width: 0 }}
								animate={{ width: '100%' }}
								transition={{ duration: 1, delay: 1 }}
								className='absolute bottom-2 left-0 h-1 bg-[#0175C2]/30 rounded'
							/>
						</span>{' '}
						& <span className='text-[#01B5F2]'>Dart</span>
						<br />
						<span className='text-gray-600 dark:text-gray-300'>in 10 Days</span>
					</h1>

					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.5 }}
						className='text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed'>
						Master Flutter and build beautiful cross-platform apps through
						hands-on projects, real-world examples, and expert guidance.
					</motion.p>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.8 }}
						className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							onClick={scrollToOverview}
							className='px-8 py-4 bg-[#0175C2] text-white rounded-xl font-semibold text-lg shadow-lg hover:bg-[#01579B] transition-colors flex items-center space-x-2'>
							<span>Start Learning</span>
							<ChevronDown className='w-5 h-5' />
						</motion.button>

						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 1.2 }}
							className='flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400'>
							<div className='flex items-center space-x-2'>
								<div className='w-2 h-2 bg-[#0175C2] rounded-full' />
								<span>10 Days Intensive</span>
							</div>
							<div className='flex items-center space-x-2'>
								<div className='w-2 h-2 bg-[#0175C2] rounded-full' />
								<span>Hands-on Projects</span>
							</div>
							<div className='flex items-center space-x-2'>
								<div className='w-2 h-2 bg-[#0175C2] rounded-full' />
								<span>Expert Instructor</span>
							</div>
						</motion.div>
					</motion.div>
				</motion.div>
			</div>

			{/* Animated scroll indicator */}
			<motion.div
				animate={{ y: [0, 10, 0] }}
				transition={{ duration: 2, repeat: Infinity }}
				className='absolute bottom-8 left-1/2 transform -translate-x-1/2'>
				<ChevronDown className='w-6 h-6 text-gray-400' />
			</motion.div>
		</section>
	);
};

export default HeroSection;
