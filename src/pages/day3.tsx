import { useState, Suspense, lazy, useRef } from 'react';
import { motion } from 'framer-motion';
import {
	ChevronDown,
	CheckCircle,
	Clock,
	ArrowRight,
	Layers,
	Box,
	Zap,
} from 'lucide-react';

import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const SyntaxHighlighter = lazy(() => import('react-syntax-highlighter'));

const Loading = () => <div>Loading...</div>;

const sessions = [
	{
		id: 1,
		title: 'OOP - Inheritance & Polymorphism',
		duration: '60 Minutes',
		icon: <Layers className='w-6 h-6' />,
		content: {
			description:
				'Inheritance is a mechanism where a new class (child or subclass) can inherit properties and methods from an existing class (parent or superclass). Polymorphism is the ability of an object to take on many forms.',
			topics: [
				'Understanding inheritance and parent-child relationships',
				'Using the extends keyword and super constructor',
				'Method overriding with @override',
				'Abstract classes and interfaces',
			],
			detailedTopics: {
				inheritance: {
					title: 'Inheritance Example',
					code: `class ElectricCar extends Car {
  int batteryLevel;

  ElectricCar(String color, String model, this.batteryLevel) : super(color, model);
  // The super() keyword calls the parent constructor.

  void charge() {
    print('The electric car is charging.');
  }
}`,
				},
				polymorphism: {
					title: 'Polymorphism Example',
					code: `@override
void drive() {
  print('The electric car is driving silently.');
}`,
				},
			},
		},
	},
	{
		id: 2,
		title: 'Encapsulation, Abstraction & Static Members',
		duration: '60 Minutes',
		icon: <Box className='w-6 h-6' />,
		content: {
			description:
				'Encapsulation is the bundling of data and methods that operate on that data within a single unit. Abstraction is the concept of hiding complex implementation details and showing only necessary features.',
			topics: [
				'Private members using underscore (_) prefix',
				'Getters and setters for controlled access',
				'Abstract classes and methods',
				'Static members and their uses',
				'Understanding encapsulation principles',
			],
			detailedTopics: {
				encapsulation: {
					title: 'Encapsulation with Private Members',
					code: `class BankAccount {
  // Private member (starts with underscore)
  double _balance = 0.0;
  
  // Public getter
  double get balance => _balance;
  
  // Public setter with validation
  set balance(double value) {
    if (value >= 0) {
      _balance = value;
    }
  }
  
  void deposit(double amount) {
    if (amount > 0) {
      _balance += amount;
    }
  }
  
  bool withdraw(double amount) {
    if (amount > 0 && amount <= _balance) {
      _balance -= amount;
      return true;
    }
    return false;
  }
}`,
				},
				abstraction: {
					title: 'Abstraction with Abstract Classes',
					code: `// Abstract class - cannot be instantiated
abstract class Shape {
  // Abstract method - must be implemented by subclasses
  double calculateArea();
  double calculatePerimeter();
  
  // Concrete method - has implementation
  void displayInfo() {
    print('Area: \${calculateArea()}');
    print('Perimeter: \${calculatePerimeter()}');
  }
}

class Circle extends Shape {
  double radius;
  
  Circle(this.radius);
  
  @override
  double calculateArea() => 3.14159 * radius * radius;
  
  @override
  double calculatePerimeter() => 2 * 3.14159 * radius;
}`,
				},
				staticMembers: {
					title: 'Static Members',
					code: `class MathUtils {
  // Static constant
  static const double pi = 3.14159;
  
  // Static method
  static int add(int a, int b) => a + b;
  static int multiply(int a, int b) => a * b;
  
  // Static getter
  static String get description => 'Utility class for mathematical operations';
}

void main() {
  // Access static members without creating an instance
  print(MathUtils.pi); // 3.14159
  print(MathUtils.add(5, 3)); // 8
  print(MathUtils.description); // Utility class for mathematical operations
}`,
				},
			},
		},
	},
	{
		id: 3,
		title: 'More on OOP',
		duration: '30 Minutes',
		icon: <Box className='w-6 h-6' />,
		content: {
			description:
				'We explore advanced OOP concepts in Dart including mixins and enums. These features provide powerful ways to organize and structure your code.',
			topics: [
				'Mixins for code reuse across multiple class hierarchies',
				'Enums for defining sets of named constants',
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
			},
		},
	},
	{
		id: 4,
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

								<div className='bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6'>
									<h5 className='text-lg font-semibold text-blue-600 dark:text-blue-400 mb-4'>
										Practice Problems
									</h5>
									<ol className='space-y-4'>
										<li className='text-gray-700 dark:text-gray-300'>
											<strong>1. Animal Hierarchy:</strong> Create a base Animal
											class with subclasses like Dog, Cat, and Bird. Implement
											inheritance and polymorphism with different sound methods
											for each animal.
										</li>
										<li className='text-gray-700 dark:text-gray-300'>
											<strong>2. Shape Calculator:</strong> Create an abstract
											Shape class with abstract methods for area and perimeter.
											Implement concrete classes for Circle, Rectangle, and
											Triangle.
										</li>
										<li className='text-gray-700 dark:text-gray-300'>
											<strong>3. Flutter Setup Verification:</strong> Install
											Flutter on your system, run flutter doctor, and create a
											simple "Hello World" Flutter app to verify your setup is
											working correctly.
										</li>
									</ol>
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
