import { useState, Suspense, lazy, useRef } from 'react';
import { motion } from 'framer-motion';
import {
	ChevronDown,
	CheckCircle,
	Clock,
	ArrowRight,
	Box,
	Zap,
} from 'lucide-react';

import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const SyntaxHighlighter = lazy(() => import('react-syntax-highlighter'));

const Loading = () => <div>Loading...</div>;

const sessions = [
	{
		id: 1,
		title: 'More on OOP',
		duration: '30 Minutes',
		icon: <Box className='w-6 h-6' />,
		content: {
			description:
				'We explore advanced OOP concepts in Dart including mixins and enums. These features provide powerful ways to organize and structure your code.',
			topics: [
				'Mixins for code reuse across multiple class hierarchies',
				'Enums for defining sets of named constants',
				'Abstract Classes vs Interfaces for defining contracts',
				'Best practices in OOP design',
			],
			detailedTopics: {
				mixins: {
					title: 'Mixins Example',
					code: `mixin CanFly {
  void fly() {
    print('I can fly!');
  }
}

class Bird with CanFly {
  // The Bird class now has the fly() method.
}`,
				},
				enums: {
					title: 'Enums',
					code: `enum Status {
  pending,
  inProgress,
  completed,
}

enum Color {
  red,
  green,
  blue,
}

void main() {
  var currentStatus = Status.inProgress;
  print(currentStatus); // Output: Status.inProgress
}`,
				},
				abstractClasses: {
					title: 'Abstract Classes vs Interfaces',
					code: `// Abstract Class - can have implementation
abstract class Vehicle {
  void start(); // Abstract method
  
  void stop() {
    print('Vehicle stopped');
  }
}

class Car extends Vehicle {
  @override
  void start() {
    print('Car started with engine');
  }
}

// Interface - only method signatures
class Logger {
  void log(String message) => print(message);
}

class ConsoleLogger implements Logger {
  @override
  void log(String message) {
    print('[CONSOLE] \$message');
  }
}`,
				},
				mixinsDetailed: {
					title: 'Advanced Mixins',
					code: `mixin LoggerMixin {
  void log(String message) {
    print('[LOG] \${DateTime.now()}: \$message');
  }
}

mixin JsonConverterMixin {
  String toJson() {
    return '{}';
  }
}

class User with LoggerMixin, JsonConverterMixin {
  String name;
  int age;
  
  User(this.name, this.age);
  
  void displayInfo() {
    log('Displaying user info');
    print('Name: \$name, Age: \$age');
  }
  
  @override
  String toJson() {
    return '{"name": "\$name", "age": \$age}';
  }
}`,
				},
				enumsAdvanced: {
					title: 'Advanced Enums with Values',
					code: `enum Status {
  pending('Pending'),
  approved('Approved'),
  rejected('Rejected');
  
  final String displayName;
  const Status(this.displayName);
}

enum Day {
  saturday,
  sunday,
  monday,
  tuesday,
  wednesday,
  thursday,
  friday
}

void main() {
  Status myStatus = Status.approved;
  print(myStatus.displayName); // Output: Approved
  
  Day today = Day.monday;
  print(today.index); // Output: 2 (zero-based)
  
  // Iterate through all enum values
  for (var day in Day.values) {
    print(day);
  }
}`,
				},
				extendsVsImplements: {
					title: 'Extends vs Implements',
					code: `// Using extends (Inheritance)
class Animal {
  String name;
  int age;
  
  Animal(this.name, this.age);
  
  void eat() {
    print('\$name is eating');
  }
}

class Dog extends Animal {
  String breed;
  
  Dog(String name, int age, this.breed) : super(name, age);
  
  @override
  void eat() {
    print('\$name (a \$breed) is eating quickly!');
    super.eat(); // Can access parent class methods
  }
}

// Using implements (Interface implementation)
class Logger {
  void log(String message) => print(message);
}

class ConsoleLogger implements Logger {
  @override
  void log(String message) {
    print('[CONSOLE] \$message');
  }
  // Must implement ALL methods from Logger
}

class FileLogger implements Logger {
  @override
  void log(String message) {
    print('[FILE] \$message');
  }
}

void main() {
  // Inheritance example
  Dog myDog = Dog('Rex', 3, 'Golden Retriever');
  myDog.eat(); // Can use parent class methods
  
  // Interface implementation example
  Logger logger1 = ConsoleLogger();
  Logger logger2 = FileLogger();
  
  logger1.log('Test message'); // [CONSOLE] Test message
  logger2.log('Another message'); // [FILE] Another message
}`,
				},
				comparisonTable: {
					title: 'Key Differences: Extends vs Implements',
					code: `/*
EXTENDS vs IMPLEMENTS Comparison:

EXTENDS (Inheritance):
✓ Inherits implementation from parent class
✓ Can use 'super' to access parent members
✓ Can inherit from only ONE class
✓ Creates "is-a" relationship
✓ Can override methods optionally

IMPLEMENTS (Interface):
✗ Must implement ALL inherited members
✗ Cannot use 'super' keyword
✓ Can implement MULTIPLE interfaces
✓ Creates "can-do" relationship
✓ Must override all methods

Example Usage:
class MyClass extends ParentClass { ... }     // Single inheritance
class MyClass implements Interface1, Interface2 { ... }  // Multiple interfaces
*/`,
				},
			},
		},
	},
	{
		id: 2,
		title: 'Introduction to Flutter Framework',
		duration: '30 Minutes',
		icon: <Zap className='w-6 h-6' />,
		content: {
			description:
				'Flutter is an open-source UI software development kit created by Google. It enables building beautiful, natively compiled applications for mobile, web, and desktop from a single codebase.',
			topics: [
				'What is Flutter and why use it',
				'Understanding the Flutter framework architecture',
				'Flutter installation and setup process',
				'Using flutter doctor for environment setup',
			],
			installation: {
				steps: [
					'System Requirements Check',
					'Download Flutter SDK',
					'Extract SDK to appropriate location',
					'Update system PATH variable',
					'Run flutter doctor',
					'Install IDE plugins',
				],
				notes: [
					'Install in a directory without spaces',
					'Add flutter/bin to PATH',
					'Verify setup with flutter doctor',
					'Install necessary IDE extensions',
				],
			},
		},
	},
];

const Day3 = () => {
	const [activeSession, setActiveSession] = useState<number | null>(null);
	const contentRef = useRef<HTMLDivElement>(null);

	const scrollToContent = () => {
		contentRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'>
			<main>
				<Suspense fallback={<Loading />}>
					{/* Hero Section */}
					<section className='relative min-h-screen flex items-center justify-center overflow-hidden'>
						<div className='absolute inset-0 opacity-10'>
							<div className='absolute top-20 left-20 w-72 h-72 bg-[#007BFF] rounded-full mix-blend-multiply filter blur-xl animate-pulse'></div>
							<div className='absolute top-40 right-20 w-72 h-72 bg-[#00A99D] rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000'></div>
							<div className='absolute -bottom-8 left-40 w-72 h-72 bg-[#00D2FF] rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000'></div>
						</div>

						<div className='relative z-10 text-center px-4 max-w-4xl mx-auto'>
							<motion.div
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8 }}>
								<h1 className='text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6'>
									Day 3
								</h1>
								<h2 className='text-3xl md:text-5xl font-bold text-[#007BFF] mb-8'>
									Advanced OOP & Flutter Intro
								</h2>
								<p className='text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed'>
									Today we'll explore advanced Object-Oriented Programming
									concepts in Dart and get introduced to the Flutter framework
									for building beautiful cross-platform applications.
								</p>

								<motion.button
									onClick={scrollToContent}
									className='inline-flex items-center gap-2 bg-[#007BFF] hover:bg-[#0056b3] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg'
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}>
									<ChevronDown className='w-5 h-5' />
									Explore Day 3 Content
								</motion.button>
							</motion.div>
						</div>

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
						ref={contentRef}
						className='py-20 px-4'>
						<div className='max-w-6xl mx-auto'>
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
									4 sessions to master advanced OOP and Flutter basics.
								</p>
							</motion.div>

							<div className='space-y-8'>
								{sessions.map((session, index) => (
									<motion.div
										key={session.id}
										initial={{ opacity: 0, y: 30 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.8, delay: index * 0.1 }}
										viewport={{ once: true }}
										className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden'>
										<div
											className='p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors'
											onClick={() =>
												setActiveSession(
													activeSession === session.id ? null : session.id
												)
											}>
											<div className='flex items-center justify-between'>
												<div className='flex items-center gap-4'>
													<div className='p-3 bg-[#007BFF]/20 rounded-xl text-[#007BFF]'>
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

												<div>
													<h5 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
														Key Topics:
													</h5>
													<ul className='space-y-2'>
														{session.content.topics.map((topic, topicIndex) => (
															<li
																key={topicIndex}
																className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
																<CheckCircle className='w-5 h-5 text-[#007BFF] mt-0.5 flex-shrink-0' />
																<span>{topic}</span>
															</li>
														))}
													</ul>
												</div>

												{session.content.detailedTopics && (
													<div className='space-y-4 mt-6'>
														{Object.values(session.content.detailedTopics).map(
															(topic: any, index) => (
																<div
																	key={index}
																	className='bg-gray-50 dark:bg-gray-700 rounded-xl p-4'>
																	<h6 className='text-md font-semibold text-gray-900 dark:text-white mb-2'>
																		{topic.title}
																	</h6>
																	<Suspense fallback={<Loading />}>
																		<SyntaxHighlighter
																			language='dart'
																			style={tomorrow}
																			customStyle={{
																				background: 'transparent',
																				fontSize: '14px',
																				borderRadius: '8px',
																			}}>
																			{topic.code}
																		</SyntaxHighlighter>
																	</Suspense>
																</div>
															)
														)}
													</div>
												)}

												{session.content.installation && (
													<div className='space-y-4 mt-6'>
														<h6 className='text-lg font-semibold text-gray-900 dark:text-white'>
															Installation Steps
														</h6>
														<div className='grid md:grid-cols-2 gap-6'>
															<div>
																<h6 className='text-md font-semibold text-[#007BFF] mb-3 block'>
																	Steps:
																</h6>
																<ol className='space-y-2'>
																	{session.content.installation.steps.map(
																		(step, stepIndex) => (
																			<li
																				key={stepIndex}
																				className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
																				<span className='bg-[#007BFF] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5'>
																					{stepIndex + 1}
																				</span>
																				<span>{step}</span>
																			</li>
																		)
																	)}
																</ol>
															</div>
															<div>
																<h6 className='text-md font-semibold text-[#007BFF] mb-3 block'>
																	Important Notes:
																</h6>
																<ul className='space-y-2'>
																	{session.content.installation.notes.map(
																		(note, noteIndex) => (
																			<li
																				key={noteIndex}
																				className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
																				<CheckCircle className='w-4 h-4 text-[#007BFF] mt-0.5 flex-shrink-0' />
																				<span>{note}</span>
																			</li>
																		)
																	)}
																</ul>
															</div>
														</div>
													</div>
												)}
											</div>
										</motion.div>
									</motion.div>
								))}
							</div>

							<motion.div
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8 }}
								viewport={{ once: true }}
								className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 mt-12'>
								<h3 className='text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center'>
									Day 3 Summary
								</h3>
								<div className='grid md:grid-cols-2 gap-8'>
									<div>
										<h4 className='text-xl font-semibold text-[#007BFF] mb-4'>
											Key Takeaways
										</h4>
										<ul className='space-y-3'>
											<li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
												<CheckCircle className='w-5 h-5 text-[#007BFF] mt-0.5 flex-shrink-0' />
												<span>
													Mastered inheritance and polymorphism in Dart OOP.
												</span>
											</li>
											<li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
												<CheckCircle className='w-5 h-5 text-[#007BFF] mt-0.5 flex-shrink-0' />
												<span>
													Learned advanced OOP concepts like mixins, enums, and
													static members.
												</span>
											</li>
											<li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
												<CheckCircle className='w-5 h-5 text-[#007BFF] mt-0.5 flex-shrink-0' />
												<span>
													Understood the Flutter framework and its installation
													process.
												</span>
											</li>
											<li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
												<CheckCircle className='w-5 h-5 text-[#007BFF] mt-0.5 flex-shrink-0' />
												<span>
													Prepared for building cross-platform applications with
													Flutter.
												</span>
											</li>
										</ul>
									</div>
									<div>
										<h4 className='text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4'>
											What's Next
										</h4>
										<p className='text-gray-600 dark:text-gray-300 mb-6'>
											In the next phase, we'll start building actual Flutter
											applications, learning about widgets, layouts, and state
											management to create beautiful, interactive user
											interfaces.
										</p>
										<button className='inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors'>
											Start Flutter Development
											<ArrowRight className='w-5 h-5' />
										</button>
									</div>
								</div>
							</motion.div>

							<motion.div
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8 }}
								viewport={{ once: true }}
								className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 mt-8'>
								<h3 className='text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center'>
									Lab Exercises
								</h3>

								{/* Exercise 1: E-Commerce Cart */}
								<div className='bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 mb-6 border-l-4 border-blue-500'>
									<div className='flex items-center gap-3 mb-4'>
										<div className='w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm'>
											1
										</div>
										<h5 className='text-xl font-semibold text-blue-700 dark:text-blue-300'>
											E-Commerce Cart (Collections + Classes)
										</h5>
									</div>
									<p className='text-gray-700 dark:text-gray-300 mb-4'>
										Build a simple cart system with the following requirements:
									</p>
									<div className='space-y-3'>
										<div className='bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
											<h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-2'>
												Class Structure:
											</h6>
											<ul className='space-y-2 text-sm text-gray-600 dark:text-gray-400'>
												<li>
													• <strong>Product:</strong> name, price properties
												</li>
												<li>
													• <strong>Cart:</strong> List&lt;Product&gt; items
												</li>
												<li>
													• <strong>Methods:</strong> addProduct(),
													removeProduct(), totalPrice()
												</li>
											</ul>
										</div>
										<div className='bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
											<h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-2'>
												Required Features:
											</h6>
											<ul className='space-y-2 text-sm text-gray-600 dark:text-gray-400'>
												<li>
													• Use forEach, map, and reduce to calculate total cost
												</li>
												<li>• Apply Set to prevent duplicate products</li>
												<li>• Implement proper error handling</li>
											</ul>
										</div>
									</div>
								</div>

								{/* Exercise 2: Custom Enum with Switch */}
								<div className='bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 mb-6 border-l-4 border-green-500'>
									<div className='flex items-center gap-3 mb-4'>
										<div className='w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm'>
											2
										</div>
										<h5 className='text-xl font-semibold text-green-700 dark:text-green-300'>
											Custom Enum with Switch
										</h5>
									</div>
									<p className='text-gray-700 dark:text-gray-300 mb-4'>
										Create an enum OrderStatus and implement status-based
										filtering:
									</p>
									<div className='space-y-3'>
										<div className='bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
											<h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-2'>
												Enum Definition:
											</h6>
											<ul className='space-y-2 text-sm text-gray-600 dark:text-gray-400'>
												<li>
													• <strong>OrderStatus:</strong> pending, shipped,
													delivered, cancelled
												</li>
												<li>
													• Function to return user-friendly messages using
													switch-case
												</li>
												<li>• Method to filter orders based on status</li>
											</ul>
										</div>
									</div>
								</div>

								{/* Exercise 3: Number Processing */}
								<div className='bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 mb-6 border-l-4 border-purple-500'>
									<div className='flex items-center gap-3 mb-4'>
										<div className='w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm'>
											3
										</div>
										<h5 className='text-xl font-semibold text-purple-700 dark:text-purple-300'>
											Number Processing & Analysis
										</h5>
									</div>
									<p className='text-gray-700 dark:text-gray-300 mb-4'>
										Write a program that processes a list of numbers with
										multiple functions:
									</p>
									<div className='space-y-3'>
										<div className='bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
											<h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-2'>
												Required Functions:
											</h6>
											<ul className='space-y-2 text-sm text-gray-600 dark:text-gray-400'>
												<li>
													• <strong>isPrime():</strong> Find prime numbers
												</li>
												<li>
													• <strong>Separate:</strong> Find even and odd numbers
												</li>
												<li>
													• <strong>factorial():</strong> Calculate factorial
													using recursion
												</li>
												<li>
													• <strong>Loops:</strong> Use for, while, and
													conditional expressions
												</li>
											</ul>
										</div>
									</div>
								</div>

								{/* Exercise 4: Flight Booking System */}
								<div className='bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-6 mb-6 border-l-4 border-orange-500'>
									<div className='flex items-center gap-3 mb-4'>
										<div className='w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm'>
											4
										</div>
										<h5 className='text-xl font-semibold text-orange-700 dark:text-orange-300'>
											Flight Booking System (Maps + Classes)
										</h5>
									</div>
									<p className='text-gray-700 dark:text-gray-300 mb-4'>
										Build a comprehensive flight booking system with the
										following components:
									</p>
									<div className='space-y-3'>
										<div className='bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
											<h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-2'>
												Class Structure:
											</h6>
											<ul className='space-y-2 text-sm text-gray-600 dark:text-gray-400'>
												<li>
													• <strong>Flight:</strong> flightNumber, destination,
													seatsAvailable
												</li>
												<li>
													• <strong>Booking:</strong> passengerName,
													flightNumber
												</li>
												<li>
													• <strong>Storage:</strong> Map&lt;String, Flight&gt;
													for flights
												</li>
												<li>
													• <strong>Storage:</strong> List&lt;Booking&gt; for
													bookings
												</li>
											</ul>
										</div>
										<div className='bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
											<h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-2'>
												Required Methods:
											</h6>
											<ul className='space-y-2 text-sm text-gray-600 dark:text-gray-400'>
												<li>
													• <strong>addBooking():</strong> Decrease seats if
													available
												</li>
												<li>
													• <strong>cancelBooking():</strong> Increase seats
													back
												</li>
												<li>
													• <strong>listPassengers():</strong> Use .where to
													find passengers in a flight
												</li>
											</ul>
										</div>
									</div>
								</div>

								{/* Challenge Section */}
								<div className='bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-xl p-6 border-l-4 border-amber-500'>
									<div className='flex items-center gap-3 mb-4'>
										<div className='w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-lg'>
											🏆
										</div>
										<h5 className='text-xl font-semibold text-amber-700 dark:text-amber-300'>
											Bonus Challenge
										</h5>
									</div>
									<p className='text-gray-700 dark:text-gray-300 mb-4'>
										Try to solve all exercises and test them with different
										inputs. Challenge yourself to write clean, readable code and
										experiment with advanced Dart concepts!
									</p>
									<div className='flex flex-wrap gap-2'>
										<span className='px-3 py-1 bg-amber-100 dark:bg-amber-800 text-amber-800 dark:text-amber-200 rounded-full text-sm font-medium'>
											Collections
										</span>
										<span className='px-3 py-1 bg-amber-100 dark:bg-amber-800 text-amber-800 dark:text-amber-200 rounded-full text-sm font-medium'>
											OOP
										</span>
										<span className='px-3 py-1 bg-amber-100 dark:bg-amber-800 text-amber-800 dark:text-amber-200 rounded-full text-sm font-medium'>
											Enums
										</span>
										<span className='px-3 py-1 bg-amber-100 dark:bg-amber-800 text-amber-800 dark:text-amber-200 rounded-full text-sm font-medium'>
											Maps
										</span>
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

export default Day3;
