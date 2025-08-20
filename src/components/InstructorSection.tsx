import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Phone } from 'lucide-react';

const InstructorSection = () => {
	return (
		<section
			id='instructor'
			className='py-24 bg-gray-50 dark:bg-gray-800'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className='text-center mb-16'>
					<h2 className='text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6'>
						Meet Your Instructor
					</h2>
					<p className='text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
						Learn from industry experts with real-world MongoDB experience
					</p>
				</motion.div>

				<div className='max-w-4xl mx-auto'>
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						className='bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden'>
						<div className='md:flex'>
							{/* Profile Image */}
							<div className='md:w-1/3 bg-gradient-to-br from-[#0175C2] to-[#01B5F2] flex items-center justify-center'>
								<img
									src='/images/instructor.jpg'
									alt='Instructor'
									width={192}
									height={192}
									className='w-full h-full object-cover'
								/>
							</div>

							{/* Profile Content */}
							<div className='md:w-2/3 p-8'>
								<div className='mb-6'>
									<h3 className='text-3xl font-bold text-gray-900 dark:text-white mb-2'>
										Eng. Abdelrahman Hossam
									</h3>
									<p className='text-lg text-[#01B5F2] font-semibold mb-4'>
										mid level Software Engineer & MERN Stack Developer
									</p>
									<p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
										With over 3 years of experience in software development,
										Abdelrahman Hossam is a skilled Front-End and Mobile
										Developer who specializes in building responsive,
										high-performance web and mobile applications using React.js,
										Next.js, and Flutter. He has a proven track record of
										enhancing user satisfaction and engagement by delivering
										innovative, user-centric solutions.
									</p>
								</div>

								{/* Stats
								<div className='grid grid-cols-3 gap-4 mb-6'>
									<div className='text-center'>
										<div className='flex items-center justify-center w-12 h-12 bg-[#13AA52]/10 rounded-lg mx-auto mb-2'>
											<Users className='w-6 h-6 text-[#13AA52]' />
										</div>
										<div className='text-2xl font-bold text-gray-900 dark:text-white'>
											500+
										</div>
										<div className='text-sm text-gray-600 dark:text-gray-400'>
											Students Taught
										</div>
									</div>
									<div className='text-center'>
										<div className='flex items-center justify-center w-12 h-12 bg-[#13AA52]/10 rounded-lg mx-auto mb-2'>
											<Award className='w-6 h-6 text-[#13AA52]' />
										</div>
										<div className='text-2xl font-bold text-gray-900 dark:text-white'>
											3
										</div>
										<div className='text-sm text-gray-600 dark:text-gray-400'>
											Certifications
										</div>
									</div>
									<div className='text-center'>
										<div className='flex items-center justify-center w-12 h-12 bg-[#13AA52]/10 rounded-lg mx-auto mb-2'>
											<Star className='w-6 h-6 text-[#13AA52]' />
										</div>
										<div className='text-2xl font-bold text-gray-900 dark:text-white'>
											4.9
										</div>
										<div className='text-sm text-gray-600 dark:text-gray-400'>
											Rating
										</div>
									</div>
								</div> */}

								{/* Contact */}
								<div className='flex flex-wrap gap-3'>
									<motion.a
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										href='mailto:geo.abdelrahmanem@gmail.com'
										target='_blank'
										className='flex items-center space-x-2 px-4 py-2 bg-[#13AA52] text-white rounded-lg hover:bg-[#0F8A42] transition-colors'>
										<Mail className='w-4 h-4' />
										<span>Email</span>
									</motion.a>
									<motion.a
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										href='https://www.linkedin.com/in/abdelrahman-hosam-6915b4229/'
										target='_blank'
										className='flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'>
										<Linkedin className='w-4 h-4' />
										<span>LinkedIn</span>
									</motion.a>
									<motion.a
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										href='https://github.com/AbdelrahmanH161'
										target='_blank'
										className='flex items-center space-x-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors'>
										<Github className='w-4 h-4' />
										<span>GitHub</span>
									</motion.a>
                  <motion.a
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										href='https://wa.me/201115275161'
										target='_blank'
										className='flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors'>
										<Phone className='w-4 h-4' />
										<span>Whatsapp</span>
									</motion.a>
								</div>
							</div>
						</div>
					</motion.div>

					{/* Testimonials */}
					{/* <motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.3 }}
						className='mt-16 grid md:grid-cols-2 gap-8'>
						<div className='bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg'>
							<div className='flex items-center space-x-1 mb-4'>
								{[...Array(5)].map((_, i) => (
									<Star
										key={i}
										className='w-5 h-5 text-yellow-400 fill-current'
									/>
								))}
							</div>
							<p className='text-gray-600 dark:text-gray-300 mb-4'>
								"Excellent course! Sarah's teaching style made complex MongoDB
								concepts easy to understand. The hands-on approach was
								particularly valuable."
							</p>
							<div className='text-sm text-gray-500 dark:text-gray-400'>
								— Alex Chen, Software Engineer
							</div>
						</div>

						<div className='bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg'>
							<div className='flex items-center space-x-1 mb-4'>
								{[...Array(5)].map((_, i) => (
									<Star
										key={i}
										className='w-5 h-5 text-yellow-400 fill-current'
									/>
								))}
							</div>
							<p className='text-gray-600 dark:text-gray-300 mb-4'>
								"This course transformed how I approach database design. The
								real-world examples and best practices are incredibly valuable."
							</p>
							<div className='text-sm text-gray-500 dark:text-gray-400'>
								— Maria Rodriguez, Database Administrator
							</div>
						</div>
					</motion.div> */}
				</div>
			</div>
		</section>
	);
};

export default InstructorSection;
