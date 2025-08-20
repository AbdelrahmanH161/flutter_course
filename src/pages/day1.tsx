import React, { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import {
	ChevronDown,
	Clock,
	CheckCircle,
	Database,
	Globe,
	Server,
	Code,
	Coffee,
	Play,
	ArrowRight,
	BookOpen,
	Zap,
	Users,
	Target,
	Lightbulb,
	FileText,
	Terminal,
	Settings,
	GitBranch,
	Smartphone,
	Monitor,
	Globe2,
} from 'lucide-react';

const Day1 = () => {
	const [mounted, setMounted] = useState(false);
	const [activeSession, setActiveSession] = useState<number | null>(null);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	const scrollToContent = () => {
		document.getElementById('content')?.scrollIntoView({ behavior: 'smooth' });
	};

	const sessions = [
		{
			id: 1,
			title: 'Introduction to Flutter & Dart',
			duration: '45 min',
			icon: <Smartphone className='w-6 h-6' />,
			content: {
				description:
					'Understanding the fundamentals of Flutter framework and Dart programming language for cross-platform development.',
				topics: [
					'What is Flutter and why use it',
					'Cross-Platform vs Native development',
					'Flutter architecture and widgets',
					'Real-world Flutter applications',
				],
				detailedTopics: {
					whatIsFlutter: {
						title: 'What is Flutter and Why Use It?',
						description:
							'Flutter is an open-source framework by Google for building multi-platform applications from a single codebase using Dart.',
						features: [
							'High performance with native rendering',
							'Fast development with Hot Reload',
							'Beautiful UI with rich widget library',
							'Strong community and Google support',
							'Single codebase for multiple platforms',
						],
						whyFlutter: {
							title: 'Why Choose Flutter:',
							description:
								'Flutter addresses the challenges of traditional cross-platform development:',
							modernChallenges:
								'Traditional approaches often result in poor performance, inconsistent UI, and platform-specific code.',
							solutions: [
								'Native performance without platform-specific code',
								'Consistent UI across all platforms',
								'Faster development cycle',
								'Reduced maintenance overhead',
								'Access to native features',
							],
						},
					},
					realWorldExamples: {
						title: 'Real-World Flutter Applications',
						cases: [
							{
								title: '📱 Google Ads',
								description:
									"Google's advertising platform built with Flutter for consistent experience across platforms.",
								example:
									'Handles complex UI interactions and real-time data updates efficiently.',
							},
							{
								title: '🛒 Alibaba',
								description:
									'E-commerce giant uses Flutter for their mobile applications.',
								example:
									'Provides smooth shopping experience with complex product catalogs.',
							},
							{
								title: '🚗 BMW',
								description:
									'BMW uses Flutter for their connected car applications.',
								example: 'Real-time vehicle data and remote control features.',
							},
						],
					},
				},
			},
		},
		{
			id: 2,
			title: 'Dart Programming Language',
			duration: '60 min',
			icon: <Code className='w-6 h-6' />,
			content: {
				description:
					'Learning the Dart programming language fundamentals, syntax, and features that power Flutter applications.',
				topics: [
					'Dart language overview and features',
					'Variables and data types',
					'Null Safety concept',
					'Operators and expressions',
					'Control flow statements',
				],
				detailedTopics: {
					dartBasics: {
						title: 'Dart Language Fundamentals',
						description:
							'Dart is a client-optimized language for fast apps on any platform.',
						features: [
							'Object-oriented programming',
							'Strong typing with type inference',
							'Null safety by default',
							'Async/await support',
							'Compilation to native code',
						],
					},
					nullSafety: {
						title: 'Null Safety in Dart',
						description:
							"Dart's null safety prevents null reference errors at compile time.",
						examples: [
							'Variables are non-nullable by default',
							'Use ? to make variables nullable',
							'Use ! to assert non-null value',
							'Late initialization with late keyword',
						],
					},
				},
			},
		},
		{
			id: 3,
			title: 'Basic Programming Concepts',
			duration: '75 min',
			icon: <Target className='w-6 h-6' />,
			content: {
				description:
					'Mastering fundamental programming concepts including variables, operators, control flow, and loops.',
				topics: [
					'Variable declaration and types',
					'Arithmetic and logical operators',
					'Conditional statements (if-else)',
					'Switch-case statements',
					'Loops (for, while, do-while)',
				],
				detailedTopics: {
					variables: {
						title: 'Variables and Data Types',
						description:
							'Understanding how to declare and use variables in Dart.',
						types: [
							'int: Integer numbers',
							'double: Decimal numbers',
							'String: Text data',
							'bool: Boolean values',
							'var: Type inference',
							'final: Immutable variables',
							'const: Compile-time constants',
						],
					},
					operators: {
						title: 'Operators in Dart',
						description:
							'Various types of operators for performing operations.',
						categories: [
							'Arithmetic: +, -, *, /, %, ~/',
							'Assignment: =, +=, -=, *=, /=',
							'Comparison: ==, !=, >, <, >=, <=',
							'Logical: &&, ||, !',
							'Increment/Decrement: ++, --',
						],
					},
				},
			},
		},
		{
			id: 4,
			title: 'String Methods & Manipulation',
			duration: '45 min',
			icon: <FileText className='w-6 h-6' />,
			content: {
				description:
					'Learning essential string manipulation methods and techniques in Dart.',
				topics: [
					'String properties and methods',
					'Text manipulation techniques',
					'String formatting and interpolation',
					'Practical string operations',
				],
				detailedTopics: {
					stringMethods: {
						title: 'Essential String Methods',
						description:
							'Dart provides powerful string manipulation capabilities.',
						methods: [
							'length: Get string length',
							'toUpperCase() / toLowerCase()',
							'contains(): Check substring existence',
							'substring(): Extract portions',
							'split(): Divide into list',
							'trim(): Remove whitespace',
							'replaceAll(): Replace text',
							'startsWith() / endsWith()',
							'indexOf() / lastIndexOf()',
							'padLeft() / padRight()',
						],
					},
				},
			},
		},
	];

	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'>
			<main>
				<Suspense fallback={<div>Loading...</div>}>
					{/* Hero Section */}
					<section className='relative min-h-screen flex items-center justify-center overflow-hidden'>
						{/* Background Pattern */}
						<div className='absolute inset-0 opacity-10'>
							<div className='absolute top-20 left-20 w-72 h-72 bg-[#02569b] rounded-full mix-blend-multiply filter blur-xl animate-pulse'></div>
							<div className='absolute top-40 right-20 w-72 h-72 bg-[#13b9fd] rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000'></div>
							<div className='absolute -bottom-8 left-40 w-72 h-72 bg-[#042b59] rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000'></div>
						</div>

						<div className='relative z-10 text-center px-4 max-w-4xl mx-auto'>
							<motion.div
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8 }}>
								<h1 className='text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6'>
									Day 1
								</h1>
								<h2 className='text-3xl md:text-5xl font-bold text-[#02569b] mb-8'>
									Flutter & Dart Fundamentals
								</h2>
								<p className='text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed'>
									Master the fundamentals of Flutter framework, learn Dart
									programming language, and understand cross-platform
									development concepts.
								</p>

								<motion.button
									onClick={scrollToContent}
									className='inline-flex items-center gap-2 bg-[#02569b] hover:bg-[#042b59] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg'
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}>
									<ChevronDown className='w-5 h-5' />
									Explore Day 1 Content
								</motion.button>
							</motion.div>
						</div>

						{/* Scroll Indicator */}
						<motion.div
							className='absolute bottom-8 left-1/2 transform -translate-x-1/2'
							animate={{ y: [0, 10, 0] }}
							transition={{ duration: 2, repeat: Infinity }}>
							<ChevronDown className='w-6 h-6 text-gray-400' />
						</motion.div>
					</section>

					{/* Main Content */}
					<section
						id='content'
						className='py-20 px-4'>
						<div className='max-w-6xl mx-auto'>
							{/* Session Overview */}
							<motion.div
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8 }}
								viewport={{ once: true }}
								className='text-center mb-16'>
								<h3 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
									Today's Sessions
								</h3>
								<p className='text-gray-600 dark:text-gray-300 text-lg'>
									4 comprehensive sessions covering Flutter fundamentals and
									Dart programming
								</p>
							</motion.div>

							{/* Sessions */}
							<div className='space-y-8'>
								{sessions.map((session, index) => (
									<motion.div
										key={session.id}
										initial={{ opacity: 0, y: 30 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.8, delay: index * 0.1 }}
										viewport={{ once: true }}
										className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden'>
										{/* Session Header */}
										<div
											className='p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors'
											onClick={() =>
												setActiveSession(
													activeSession === session.id ? null : session.id
												)
											}>
											<div className='flex items-center justify-between'>
												<div className='flex items-center gap-4'>
													<div className='p-3 bg-[#02569b]/20 rounded-xl text-[#02569b]'>
														{session.icon}
													</div>
													<div>
														<h4 className='text-xl font-semibold text-gray-900 dark:text-white'>
															{session.title}
														</h4>
														<div className='flex items-center gap-4 mt-1'>
															<span className='flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm'>
																<Clock className='w-4 h-4' />
																{session.duration}
															</span>
															<span className='text-gray-500 dark:text-gray-400'>
																Session {session.id}
															</span>
														</div>
													</div>
												</div>
												<motion.div
													animate={{
														rotate: activeSession === session.id ? 180 : 0,
													}}
													transition={{ duration: 0.3 }}>
													<ChevronDown className='w-6 h-6 text-gray-400' />
												</motion.div>
											</div>
										</div>

										{/* Session Content */}
										<motion.div
											initial={false}
											animate={{
												height: activeSession === session.id ? 'auto' : 0,
												opacity: activeSession === session.id ? 1 : 0,
											}}
											transition={{ duration: 0.3 }}
											className='overflow-hidden'>
											<div className='px-6 pb-6 space-y-6'>
												<p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
													{session.content.description}
												</p>

												{/* Topics */}
												<div>
													<h5 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
														Key Topics:
													</h5>
													<ul className='space-y-2'>
														{session.content.topics.map((topic, topicIndex) => (
															<li
																key={topicIndex}
																className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
																<CheckCircle className='w-5 h-5 text-[#02569b] mt-0.5 flex-shrink-0' />
																<span>{topic}</span>
															</li>
														))}
													</ul>
												</div>

												{/* Session-specific content */}
												{session.id === 1 &&
													session.content.detailedTopics?.whatIsFlutter && (
														<div className='space-y-6'>
															{/* What is Flutter */}
															<div className='bg-gray-50 dark:bg-gray-700 rounded-xl p-6'>
																<h5 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
																	{
																		session.content.detailedTopics.whatIsFlutter
																			.title
																	}
																</h5>
																<p className='text-gray-600 dark:text-gray-300 mb-4'>
																	{
																		session.content.detailedTopics.whatIsFlutter
																			.description
																	}
																</p>
																<ul className='list-disc list-inside space-y-2 mb-6'>
																	{session.content.detailedTopics.whatIsFlutter.features.map(
																		(feature, index) => (
																			<li
																				key={index}
																				className='text-gray-600 dark:text-gray-300'>
																				{feature}
																			</li>
																		)
																	)}
																</ul>

																<div className='bg-white dark:bg-gray-600 rounded-lg p-4'>
																	<h6 className='text-[#02569b] font-semibold mb-3'>
																		{
																			session.content.detailedTopics
																				.whatIsFlutter.whyFlutter.title
																		}
																	</h6>
																	<p className='text-gray-600 dark:text-gray-300 mb-3'>
																		{
																			session.content.detailedTopics
																				.whatIsFlutter.whyFlutter.description
																		}
																	</p>
																	<p className='text-gray-600 dark:text-gray-300 mb-4'>
																		{
																			session.content.detailedTopics
																				.whatIsFlutter.whyFlutter
																				.modernChallenges
																		}
																	</p>

																	<div className='mb-4'>
																		<h6 className='text-[#13b9fd] dark:text-[#13b9fd] font-semibold mb-2'>
																			Flutter solves these challenges by
																			providing:
																		</h6>
																		<ul className='list-disc list-inside space-y-1'>
																			{session.content.detailedTopics.whatIsFlutter.whyFlutter.solutions.map(
																				(solution, index) => (
																					<li
																						key={index}
																						className='text-gray-600 dark:text-gray-300 text-sm'>
																						{solution}
																					</li>
																				)
																			)}
																		</ul>
																	</div>
																</div>
															</div>

															{/* Real World Examples */}
															<div className='bg-gray-50 dark:bg-gray-700 rounded-xl p-6'>
																<h5 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
																	{
																		session.content.detailedTopics
																			.realWorldExamples.title
																	}
																</h5>
																<div className='space-y-4'>
																	{session.content.detailedTopics.realWorldExamples.cases.map(
																		(useCase, index) => (
																			<div
																				key={index}
																				className='bg-white dark:bg-gray-600 rounded-lg p-4'>
																				<h6 className='text-[#02569b] font-semibold mb-2'>
																					{useCase.title}
																				</h6>
																				<p className='text-gray-600 dark:text-gray-300 mb-2'>
																					{useCase.description}
																				</p>
																				<p className='text-gray-600 dark:text-gray-300 text-sm italic'>
																					{useCase.example}
																				</p>
																			</div>
																		)
																	)}
																</div>
															</div>
														</div>
													)}

												{session.id === 2 &&
													session.content.detailedTopics?.dartBasics && (
														<div className='space-y-6'>
															{/* Dart Basics */}
															<div className='bg-gray-50 dark:bg-gray-700 rounded-xl p-6'>
																<h5 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
																	{
																		session.content.detailedTopics.dartBasics
																			.title
																	}
																</h5>
																<p className='text-gray-600 dark:text-gray-300 mb-4'>
																	{
																		session.content.detailedTopics.dartBasics
																			.description
																	}
																</p>
																<ul className='list-disc list-inside space-y-2 mb-6'>
																	{session.content.detailedTopics.dartBasics.features.map(
																		(feature, index) => (
																			<li
																				key={index}
																				className='text-gray-600 dark:text-gray-300'>
																				{feature}
																			</li>
																		)
																	)}
																</ul>
															</div>

															{/* Null Safety */}
															{session.content.detailedTopics?.nullSafety && (
																<div className='bg-gray-50 dark:bg-gray-700 rounded-xl p-6'>
																	<h5 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
																		{
																			session.content.detailedTopics.nullSafety
																				.title
																		}
																	</h5>
																	<p className='text-gray-600 dark:text-gray-300 mb-4'>
																		{
																			session.content.detailedTopics.nullSafety
																				.description
																		}
																	</p>
																	<ul className='list-disc list-inside space-y-2'>
																		{session.content.detailedTopics.nullSafety.examples.map(
																			(example, index) => (
																				<li
																					key={index}
																					className='text-gray-600 dark:text-gray-300'>
																					{example}
																				</li>
																			)
																		)}
																	</ul>
																</div>
															)}
														</div>
													)}

												{session.id === 3 &&
													session.content.detailedTopics?.variables && (
														<div className='space-y-6'>
															{/* Variables */}
															<div className='bg-gray-50 dark:bg-gray-700 rounded-xl p-6'>
																<h5 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
																	{
																		session.content.detailedTopics.variables
																			.title
																	}
																</h5>
																<p className='text-gray-600 dark:text-gray-300 mb-4'>
																	{
																		session.content.detailedTopics.variables
																			.description
																	}
																</p>
																<ul className='list-disc list-inside space-y-2 mb-6'>
																	{session.content.detailedTopics.variables.types.map(
																		(type, index) => (
																			<li
																				key={index}
																				className='text-gray-600 dark:text-gray-300'>
																				{type}
																			</li>
																		)
																	)}
																</ul>
															</div>

															{/* Operators */}
															{session.content.detailedTopics?.operators && (
																<div className='bg-gray-50 dark:bg-gray-700 rounded-xl p-6'>
																	<h5 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
																		{
																			session.content.detailedTopics.operators
																				.title
																		}
																	</h5>
																	<p className='text-gray-600 dark:text-gray-300 mb-4'>
																		{
																			session.content.detailedTopics.operators
																				.description
																		}
																	</p>
																	<ul className='list-disc list-inside space-y-2'>
																		{session.content.detailedTopics.operators.categories.map(
																			(category, index) => (
																				<li
																					key={index}
																					className='text-gray-600 dark:text-gray-300'>
																					{category}
																				</li>
																			)
																		)}
																	</ul>
																</div>
															)}
														</div>
													)}

												{session.id === 4 &&
													session.content.detailedTopics?.stringMethods && (
														<div className='space-y-6'>
															{/* String Methods */}
															<div className='bg-gray-50 dark:bg-gray-700 rounded-xl p-6'>
																<h5 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
																	{
																		session.content.detailedTopics.stringMethods
																			.title
																	}
																</h5>
																<p className='text-gray-600 dark:text-gray-300 mb-4'>
																	{
																		session.content.detailedTopics.stringMethods
																			.description
																	}
																</p>
																<ul className='list-disc list-inside space-y-2'>
																	{session.content.detailedTopics.stringMethods.methods.map(
																		(method, index) => (
																			<li
																				key={index}
																				className='text-gray-600 dark:text-gray-300'>
																				{method}
																			</li>
																		)
																	)}
																</ul>
															</div>
														</div>
													)}
											</div>
										</motion.div>
									</motion.div>
								))}
							</div>

							{/* Break Section */}
							<motion.div
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8 }}
								viewport={{ once: true }}
								className='my-12 text-center'>
								<div className='bg-gradient-to-r from-[#02569b]/20 to-[#13b9fd]/20 border border-[#02569b]/30 rounded-2xl p-8'>
									<div className='flex items-center justify-center gap-3 mb-4'>
										<Coffee className='w-8 h-8 text-[#02569b]' />
										<h3 className='text-2xl font-bold text-gray-900 dark:text-white'>
											Break Time
										</h3>
									</div>
									<p className='text-gray-600 dark:text-gray-300 text-lg'>
										Take a 30-minute break to refresh and prepare for the
										hands-on session!
									</p>
								</div>
							</motion.div>

							{/* Summary Section */}
							<motion.div
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8 }}
								viewport={{ once: true }}
								className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8'>
								<h3 className='text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center'>
									Day 1 Summary
								</h3>
								<div className='grid md:grid-cols-2 gap-8'>
									<div>
										<h4 className='text-xl font-semibold text-[#02569b] mb-4'>
											Key Takeaways
										</h4>
										<ul className='space-y-3'>
											<li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
												<CheckCircle className='w-5 h-5 text-[#02569b] mt-0.5 flex-shrink-0' />
												<span>
													Understanding Flutter framework and cross-platform
													development
												</span>
											</li>
											<li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
												<CheckCircle className='w-5 h-5 text-[#02569b] mt-0.5 flex-shrink-0' />
												<span>
													Mastery of Dart programming language fundamentals
												</span>
											</li>
											<li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
												<CheckCircle className='w-5 h-5 text-[#02569b] mt-0.5 flex-shrink-0' />
												<span>
													Understanding variables, operators, and control flow
												</span>
											</li>
											<li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
												<CheckCircle className='w-5 h-5 text-[#02569b] mt-0.5 flex-shrink-0' />
												<span>
													String manipulation and text processing techniques
												</span>
											</li>
										</ul>
									</div>
									<div>
										<h4 className='text-xl font-semibold text-[#13b9fd] mb-4'>
											What's Next
										</h4>
										<p className='text-gray-600 dark:text-gray-300 mb-6'>
											In Day 2, we'll dive deeper into Flutter widgets, state
											management, and building interactive user interfaces.
										</p>
										<button className='inline-flex items-center gap-2 bg-[#13b9fd] hover:bg-[#02569b] text-white px-6 py-3 rounded-lg font-semibold transition-colors'>
											Next: Day 2
											<ArrowRight className='w-5 h-5' />
										</button>
									</div>
								</div>
							</motion.div>

							{/* Assignments Section */}
							<motion.div
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8 }}
								viewport={{ once: true }}
								className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 mt-8'>
								<h3 className='text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center'>
									📝 Today's Assignments
								</h3>

								<div className='space-y-6'>
									<div className='bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6'>
										<h4 className='text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3'>
											Assignment 1: const vs final
										</h4>
										<p className='text-gray-700 dark:text-gray-300'>
											Explain the difference between const and final in Dart
											with illustrative examples.
										</p>
									</div>

									<div className='bg-green-50 dark:bg-green-900/20 rounded-xl p-6'>
										<h4 className='text-xl font-semibold text-green-600 dark:text-green-400 mb-3'>
											Assignment 2: Even or Odd Number
										</h4>
										<p className='text-gray-700 dark:text-gray-300 mb-3'>
											Write a program that takes a number from the user and
											determines if it's even or odd using two methods:
										</p>
										<ol className='list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300'>
											<li>Using basic arithmetic operations</li>
											<li>Using built-in Dart functions</li>
										</ol>
									</div>

									<div className='bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6'>
										<h4 className='text-xl font-semibold text-yellow-700 dark:text-yellow-400 mb-3'>
											Assignment 3: Academic Performance Evaluation
										</h4>
										<p className='text-gray-700 dark:text-gray-300 mb-3'>
											Write a program that asks the user to input their grade
											and evaluates their academic performance:
										</p>
										<ul className='list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300'>
											<li>Above 85: Excellent</li>
											<li>75-85: Very Good</li>
											<li>65-75: Good</li>
											<li>65 or below: Acceptable</li>
										</ul>
									</div>

									<div className='bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6'>
										<h4 className='text-xl font-semibold text-purple-700 dark:text-purple-400 mb-3'>
											Assignment 4: Days of the Week
										</h4>
										<p className='text-gray-700 dark:text-gray-300'>
											Write a program that prints the day name based on the day
											number using switch-case:
										</p>
										<div className='bg-gray-100 dark:bg-gray-700 rounded p-3 mt-3 font-mono text-sm'>
											int day = 3; // 1=Monday, 3=Wednesday, etc.
											<br />
											// Use switch-case to print the day name
										</div>
									</div>

									<div className='bg-red-50 dark:bg-red-900/20 rounded-xl p-6'>
										<h4 className='text-xl font-semibold text-red-700 dark:text-red-400 mb-3'>
											Assignment 5: Number Printing with Exception
										</h4>
										<p className='text-gray-700 dark:text-gray-300'>
											Write a program that prints numbers from 1 to 100 but
											skips the number 41.
										</p>
									</div>

									<div className='bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6'>
										<h4 className='text-xl font-semibold text-indigo-700 dark:text-indigo-400 mb-3'>
											Assignment 6: Prime Numbers
										</h4>
										<p className='text-gray-700 dark:text-gray-300'>
											Write a program that calculates prime numbers from 1 to
											100 using loops and conditions.
										</p>
										<div className='bg-yellow-100 dark:bg-yellow-900/30 rounded p-3 mt-3 text-sm'>
											<strong>Hint:</strong> A prime number is only divisible by
											itself and 1.
										</div>
									</div>
								</div>

								{/* String Methods Exercises */}
								<div className='mt-8'>
									<h4 className='text-2xl font-semibold text-[#02569b] mb-4 text-center'>
										📝 String Methods Exercises
									</h4>

									<div className='space-y-4'>
										<div className='bg-green-50 dark:bg-green-900/20 rounded-xl p-6'>
											<h5 className='text-lg font-semibold text-green-600 dark:text-green-400 mb-3'>
												Exercise 1: String Reversal
											</h5>
											<p className='text-gray-700 dark:text-gray-300 mb-2'>
												Write a function that accepts a string and returns it
												reversed using String methods.
											</p>
											<p className='text-gray-600 dark:text-gray-400 text-sm'>
												Example: "flutter" → "rettulf"
											</p>
											<div className='bg-gray-100 dark:bg-gray-700 rounded p-3 mt-3 text-sm'>
												<strong>Hint:</strong> Use{' '}
												<span className='highlight'>split()</span>,{' '}
												<span className='highlight'>reversed</span>, and{' '}
												<span className='highlight'>join()</span>
											</div>
										</div>

										<div className='bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6'>
											<h5 className='text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3'>
												Exercise 2: Email Masking
											</h5>
											<p className='text-gray-700 dark:text-gray-300 mb-2'>
												Hide the first part of an email address using asterisks
												(*).
											</p>
											<p className='text-gray-600 dark:text-gray-400 text-sm'>
												Example: memo123@gmail.com → m****@gmail.com
											</p>
										</div>
									</div>
								</div>
							</motion.div>

							{/* Resources Section */}
							<motion.div
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8 }}
								viewport={{ once: true }}
								className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 mt-8'>
								<h3 className='text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center'>
									📚 Learning Resources
								</h3>

								<div className='grid md:grid-cols-2 gap-6'>
									<div className='space-y-4'>
										<div className='flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors'>
											<BookOpen className='w-6 h-6 text-[#02569b]' />
											<a
												href='https://dart-tutorial.com/'
												target='_blank'
												rel='noopener noreferrer'
												className='text-[#02569b] hover:underline'>
												Dart Tutorial - Comprehensive Dart Learning
											</a>
										</div>

										<div className='flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors'>
											<FileText className='w-6 h-6 text-[#02569b]' />
											<a
												href='https://dart.dev/guides'
												target='_blank'
												rel='noopener noreferrer'
												className='text-[#02569b] hover:underline'>
												Dart Documentation - Official Guides
											</a>
										</div>

										<div className='flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors'>
											<Smartphone className='w-6 h-6 text-[#02569b]' />
											<a
												href='https://flutter.dev/docs'
												target='_blank'
												rel='noopener noreferrer'
												className='text-[#02569b] hover:underline'>
												Flutter Documentation - Official Docs
											</a>
										</div>
									</div>

									<div className='space-y-4'>
										<div className='flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors'>
											<Monitor className='w-6 h-6 text-[#02569b]' />
											<a
												href='https://www.youtube.com/watch?v=Ej_Pcr4uC2Q'
												target='_blank'
												rel='noopener noreferrer'
												className='text-[#02569b] hover:underline'>
												Dart Basics - CodeWithAndrea
											</a>
										</div>

										<div className='flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors'>
											<Terminal className='w-6 h-6 text-[#02569b]' />
											<a
												href='https://dartpad.dev/'
												target='_blank'
												rel='noopener noreferrer'
												className='text-[#02569b] hover:underline'>
												DartPad - Try Dart in Browser
											</a>
										</div>

										<div className='flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors'>
											<GitBranch className='w-6 h-6 text-[#02569b]' />
											<a
												href='https://github.com/AbdelrahmanH161'
												target='_blank'
												rel='noopener noreferrer'
												className='text-[#02569b] hover:underline'>
												Instructor GitHub - Abdelrahman Hossam
											</a>
										</div>
									</div>
								</div>
							</motion.div>
						</div>
					</section>
				</Suspense>
			</main>
		</div>
	);
};

export default Day1;
