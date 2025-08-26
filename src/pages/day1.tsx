import { useState, Suspense, lazy, useRef } from 'react';
import { motion } from 'framer-motion';
import {
	ChevronDown,
	CheckCircle,
	Clock,
	Coffee,
	Code,
	Database,
	Play,
	ArrowRight,
} from 'lucide-react';

import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const SyntaxHighlighter = lazy(() => import('react-syntax-highlighter'));

const Loading = () => <div>Loading...</div>;

const sessions = [
	{
		id: 1,
		title: 'What is Dart and Why?',
		duration: '30 Minutes',
		icon: <Database className='w-6 h-6' />,
		content: {
			description:
				"Dart is a programming language developed by Google. Its main purpose is to build beautiful, high-quality applications for mobile, web, and desktop. It's often called a 'client-optimized' language because it's designed specifically to create great user interfaces (UIs) and perform well on devices.",
			topics: [
				'Fast Performance: Compiles to native machine code (AOT).',
				'Hot Reload: Just-in-time (JIT) compilation for instant feedback.',
				'Cross-Platform: Single language for iOS, Android, and web with Flutter.',
				'Easy to Learn: Familiar syntax for developers from other languages.',
			],
		},
	},
	{
		id: 2,
		title: 'Variable Data Types',
		duration: '30 minute',
		icon: <Code className='w-6 h-6' />,
		content: {
			description:
				'Every program needs to store information, and in Dart, we do that using variables. A variable is like a container with a label that holds a specific type of data.',
			topics: [
				'int: For whole numbers.',
				'double: For decimal numbers.',
				'String: For text.',
				'bool: For true/false values.',
				'dynamic: A flexible type for any data.',
				'var: Type inference based on the initial value.',
				'Understanding var, final, const, and late.',
			],
			detailedTopics: {
				int: {
					title: 'Integer (int)',
					code: `int age = 25;\nint year = 2024;`,
				},
				double: {
					title: 'Double (double)',
					code: `double pi = 3.14159;\ndouble temperature = -1.5;`,
				},
				String: {
					title: 'String',
					code: `String name = 'Alice';\nString message = "Hello, world!";`,
				},
				bool: {
					title: 'Boolean (bool)',
					code: `bool isStudent = true;\nbool hasFinished = false;`,
				},
				dynamic: {
					title: 'Dynamic',
					code: `dynamic value = 10;\nvalue = 'Hello';\nvalue = true;`,
				},
				var: {
					title: 'Var',
					code: `var count = 5; // Inferred as int\nvar greeting = 'Hi'; // Inferred as String`,
				},
				varFinalConstLate: {
					title: 'var vs final vs const vs late',
					code: `// 'var' can be reassigned.
var myVariable = 'Initial Value';
myVariable = 'New Value';

// 'final' can only be set once.
final finalVariable = 'You can only set me once.';
// finalVariable = 'Error!'; // This would cause an error.

// 'const' is a compile-time constant.
const constVariable = 100;
// constVariable = 200; // Error!

// 'late' is for variables initialized after declaration.
late String description;
description = 'Initialized later!';
print(description);`,
				},
			},
		},
	},
	{
		id: 3,
		title: 'Operators',
		duration: '30 minutes',
		icon: <Code className='w-6 h-6' />,
		content: {
			description:
				'Operators in Dart are special symbols that perform operations on one or more operands. They help you perform calculations, comparisons, and logical operations in your code.',
			topics: [
				'Arithmetic operators (+, -, *, /, ~/, %)',
				'Increment/Decrement operators (++, --)',
				'Equality and Relational operators (==, !=, >, <, >=, <=)',
				'Type test operators (is, is!)',
				'Assignment operators (=, +=, -=, etc.)',
				'Logical operators (&&, ||, !)',
				'Conditional expressions (?:, ??)',
			],
			detailedTopics: {
				arithmetic: {
					title: 'Arithmetic Operators',
					code: `// Basic arithmetic
assert(2 + 3 == 5);
assert(2 - 3 == -1);
assert(2 * 3 == 6);
assert(5 / 2 == 2.5); // Result is double
assert(5 ~/ 2 == 2);  // Integer division
assert(5 % 2 == 1);   // Modulo/remainder`,
				},
				incrementDecrement: {
					title: 'Increment/Decrement',
					code: `int a = 0;
int b = ++a;    // Increment a before
assert(a == b); // 1 == 1

a = 0;
b = a++;        // Increment a after
assert(a != b); // 1 != 0`,
				},
				equality: {
					title: 'Equality and Relational',
					code: `assert(2 == 2);
assert(2 != 3);
assert(3 > 2);
assert(2 < 3);
assert(3 >= 3);
assert(2 <= 3);`,
				},
				typeTest: {
					title: 'Type Test Operators',
					code: `Object obj = 'Hello';
if (obj is String) {
  // Type check
  print(obj.length);
}

// Type cast
String str = obj as String;`,
				},
				assignment: {
					title: 'Assignment Operators',
					code: `int a = 2;    // Basic assignment
a += 3;         // Add and assign
assert(a == 5);

String? name;
name ??= 'Guest'; // Assign if null`,
				},
				logical: {
					title: 'Logical Operators',
					code: `bool done = false;
int col = 0;

if (!done && (col == 0 || col == 3)) {
  print('Condition met');
}`,
				},
				conditional: {
					title: 'Conditional Expressions',
					code: `// Ternary operator
bool isPublic = true;
String visibility = isPublic ? 'public' : 'private';

// Null-coalescing operator
String? name;
String displayName = name ?? 'Guest';`,
				},
			},
		},
	},
	{
		id: 4,
		title: 'Control Statements',
		duration: '1 Hour',
		icon: <Play className='w-6 h-6' />,
		content: {
			description:
				'Control statements allow you to control the flow of your program based on conditions. They make your programs "smarter" by allowing them to make decisions.',
			topics: [
				'if, else if, else: Conditional execution.',
				'switch: Handling multiple conditions for a single value.',
				'for loops: Repeating code a specific number of times.',
				'while loop: Repeating code as long as a condition is true.',
				'break and continue: Controlling loop execution.',
			],
			detailedTopics: {
				ifElse: {
					title: 'if, else if, else',
					code: `int score = 85;\nif (score > 90) {\n  print('A+');\n} else if (score > 80) {\n  print('A');\n} else {\n  print('B');\n}`,
				},
				switch: {
					title: 'switch',
					code: `String day = 'Monday';\nswitch (day) {\n  case 'Monday':\n    print('Start of the week.');\n    break;\n  case 'Friday':\n    print('End of the week!');\n    break;\n  default:\n    print('Just another day.');\n}`,
				},
				forLoop: {
					title: 'for loop',
					code: `for (int i = 0; i < 3; i++) {\n  print('Loop number $i');\n}`,
				},
				whileLoop: {
					title: 'while loop',
					code: `int count = 0;\nwhile (count < 5) {\n  print(count);\n  count++;\n}`,
				},
			},
		},
	},
	{
		id: 5,
		title: 'Functions',
		duration: '1 Hour',
		icon: <Coffee className='w-6 h-6' />,
		content: {
			description:
				'A function is a block of organized, reusable code that performs a single, specific task.',
			topics: [
				'Defining a function with `void`.',
				'Returning a value from a function.',
				'Using arrow functions for concise syntax.',
				'Named parameters for clarity.',
				'Optional positional parameters for flexibility.',
			],
			detailedTopics: {
				defining: {
					title: 'Defining a function',
					code: `void greet(String name) {\n  print('Hello, $name!');\n}\ngreet('Bob');`,
				},
				returning: {
					title: 'Returning a value',
					code: `int addNumbers(int a, int b) {\n  return a + b;\n}\nint sum = addNumbers(5, 3);\nprint(sum); // Output: 8`,
				},
				arrow: {
					title: 'Arrow functions',
					code: `int multiply(int a, int b) => a * b;\nint product = multiply(4, 5);\nprint(product); // Output: 20`,
				},
				namedParams: {
					title: 'Named Parameters',
					code: `// Use { } to specify named parameters.
void enableFlags({bool bold = false, bool hidden = false}) {
  // ...
}

// Call the function using paramName: value
enableFlags(hidden: true, bold: false);`,
				},
				optionalParams: {
					title: 'Optional Positional Parameters',
					code: `// Use [ ] to specify optional positional parameters.
String say(String from, String msg, [String? device]) {
  var result = '$from says $msg';
  if (device != null) {
    result = '$result with a $device';
  }
  return result;
}

// Call without the optional parameter.
say('Bob', 'Howdy');

// Call with the optional parameter.
say('Bob', 'Howdy', 'smoke signal');`,
				},
			},
		},
	},
];

const Day1 = () => {
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
							<div className='absolute top-40 right-20 w-72 h-72 bg-[#00B4AB] rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000'></div>
							<div className='absolute -bottom-8 left-40 w-72 h-72 bg-[#00D2FF] rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000'></div>
						</div>

						<div className='relative z-10 text-center px-4 max-w-4xl mx-auto'>
							<motion.div
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8 }}>
								<h1 className='text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6'>
									Day 1
								</h1>
								<h2 className='text-3xl md:text-5xl font-bold text-[#007BFF] mb-8'>
									Dart Basics
								</h2>
								<p className='text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed'>
									Welcome to the first day of our Dart course! Today, we'll
									cover the fundamentals of the Dart language, from variables
									and data types to control flow and functions.
								</p>

								<motion.button
									onClick={scrollToContent}
									className='inline-flex items-center gap-2 bg-[#007BFF] hover:bg-[#0056b3] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg'
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}>
									<ChevronDown className='w-5 h-5' />
									Explore Day 1 Content
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
									4 sessions to get you started with Dart.
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
									Day 1 Summary
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
													Understand what Dart is and its main advantages.
												</span>
											</li>
											<li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
												<CheckCircle className='w-5 h-5 text-[#007BFF] mt-0.5 flex-shrink-0' />
												<span>
													Learn about basic data types like int, double, String,
													and bool.
												</span>
											</li>
											<li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
												<CheckCircle className='w-5 h-5 text-[#007BFF] mt-0.5 flex-shrink-0' />
												<span>
													Control your code's flow with if/else, switch, and
													loops.
												</span>
											</li>
											<li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
												<CheckCircle className='w-5 h-5 text-[#007BFF] mt-0.5 flex-shrink-0' />
												<span>Write reusable code with functions.</span>
											</li>
										</ul>
									</div>
									<div>
										<h4 className='text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4'>
											What's Next
										</h4>
										<p className='text-gray-600 dark:text-gray-300 mb-6'>
											In Day 2, we'll explore more advanced Dart concepts like
											collections (Lists, Maps, Sets), null safety, and an
											introduction to Object-Oriented Programming (OOP) in Dart.
										</p>
										<button className='inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors'>
											Next: Day 2
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

								{/* Exercise 1: Const vs Final */}
								<div className='bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 mb-6 border-l-4 border-blue-500'>
									<div className='flex items-center gap-3 mb-4'>
										<div className='w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm'>
											1
										</div>
										<h5 className='text-xl font-semibold text-blue-700 dark:text-blue-300'>
											Const vs Final in Dart
										</h5>
									</div>
									<p className='text-gray-700 dark:text-gray-300 mb-4'>
										Explain the difference between{' '}
										<code className='bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm'>
											const
										</code>{' '}
										and{' '}
										<code className='bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm'>
											final
										</code>{' '}
										in Dart with illustrative examples.
									</p>
									<div className='bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
										<h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-2'>
											Key Differences:
										</h6>
										<ul className='space-y-2 text-sm text-gray-600 dark:text-gray-400'>
											<li>
												• <strong>const:</strong> Compile-time constant, must be
												known at compile time
											</li>
											<li>
												• <strong>final:</strong> Runtime constant, can be
												computed at runtime but set only once
											</li>
										</ul>
									</div>
								</div>

								{/* Exercise 2: Even/Odd Checker */}
								<div className='bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 mb-6 border-l-4 border-green-500'>
									<div className='flex items-center gap-3 mb-4'>
										<div className='w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm'>
											2
										</div>
										<h5 className='text-xl font-semibold text-green-700 dark:text-green-300'>
											Even/Odd Number Checker
										</h5>
									</div>
									<p className='text-gray-700 dark:text-gray-300 mb-4'>
										Write a program that takes a number from the user and
										determines if it's even or odd using two methods:
									</p>
									<div className='grid md:grid-cols-2 gap-4'>
										<div className='bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
											<h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-2'>
												Method 1: Basic Arithmetic
											</h6>
											<p className='text-sm text-gray-600 dark:text-gray-400'>
												Using modulo operator (%)
											</p>
										</div>
										<div className='bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
											<h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-2'>
												Method 2: Built-in Functions
											</h6>
											<p className='text-sm text-gray-600 dark:text-gray-400'>
												Using Dart's built-in methods
											</p>
										</div>
									</div>
								</div>

								{/* Exercise 3: Grade Evaluator */}
								<div className='bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 mb-6 border-l-4 border-purple-500'>
									<div className='flex items-center gap-3 mb-4'>
										<div className='w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm'>
											3
										</div>
										<h5 className='text-xl font-semibold text-purple-700 dark:text-purple-300'>
											Academic Performance Evaluator
										</h5>
									</div>
									<p className='text-gray-700 dark:text-gray-300 mb-4'>
										Write a program that asks the user to input their grade and
										evaluates their academic performance:
									</p>
									<div className='bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
										<div className='grid md:grid-cols-2 gap-4 text-sm'>
											<div>
												<div className='flex items-center gap-2 mb-2'>
													<div className='w-3 h-3 bg-green-500 rounded-full'></div>
													<span className='font-medium text-gray-800 dark:text-gray-200'>
														Above 85: ممتاز
													</span>
												</div>
												<div className='flex items-center gap-2 mb-2'>
													<div className='w-3 h-3 bg-blue-500 rounded-full'></div>
													<span className='font-medium text-gray-800 dark:text-gray-200'>
														75-85: جيد جدًا
													</span>
												</div>
											</div>
											<div>
												<div className='flex items-center gap-2 mb-2'>
													<div className='w-3 h-3 bg-yellow-500 rounded-full'></div>
													<span className='font-medium text-gray-800 dark:text-gray-200'>
														65-75: جيد
													</span>
												</div>
												<div className='flex items-center gap-2'>
													<div className='w-3 h-3 bg-red-500 rounded-full'></div>
													<span className='font-medium text-gray-800 dark:text-gray-200'>
														65 or less: مقبول
													</span>
												</div>
											</div>
										</div>
									</div>
								</div>

								{/* Exercise 4: Day of Week */}
								<div className='bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-6 mb-6 border-l-4 border-orange-500'>
									<div className='flex items-center gap-3 mb-4'>
										<div className='w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm'>
											4
										</div>
										<h5 className='text-xl font-semibold text-orange-700 dark:text-orange-300'>
											Day of Week Printer
										</h5>
									</div>
									<p className='text-gray-700 dark:text-gray-300 mb-4'>
										Write a program that prints the day name based on the day
										number in the week using switch-case:
									</p>
									<div className='bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
										<div className='text-sm text-gray-600 dark:text-gray-400'>
											<p>
												Input: 1-7 → Output: Sunday, Monday, Tuesday, Wednesday,
												Thursday, Friday, Saturday
											</p>
										</div>
									</div>
								</div>

								{/* Exercise 5: Number Printer */}
								<div className='bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-xl p-6 mb-6 border-l-4 border-teal-500'>
									<div className='flex items-center gap-3 mb-4'>
										<div className='w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold text-sm'>
											5
										</div>
										<h5 className='text-xl font-semibold text-teal-700 dark:text-teal-300'>
											Number Printer (Skip 41)
										</h5>
									</div>
									<p className='text-gray-700 dark:text-gray-300 mb-4'>
										Write a program that prints numbers from 1 to 100 but skips
										the number 41:
									</p>
									<div className='bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
										<div className='text-sm text-gray-600 dark:text-gray-400'>
											<p>Output: 1, 2, 3... 40, 42, 43... 100</p>
										</div>
									</div>
								</div>

								{/* Exercise 6: String Reverser */}
								<div className='bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 rounded-xl p-6 mb-6 border-l-4 border-rose-500'>
									<div className='flex items-center gap-3 mb-4'>
										<div className='w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center text-white font-bold text-sm'>
											6
										</div>
										<h5 className='text-xl font-semibold text-rose-700 dark:text-rose-300'>
											String Reverser Function
										</h5>
									</div>
									<p className='text-gray-700 dark:text-gray-300 mb-4'>
										Write a function that accepts text and returns it reversed
										using String functions:
									</p>
									<div className='bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
										<div className='text-sm text-gray-600 dark:text-gray-400'>
											<p>
												<strong>Example:</strong> flutter → rettulf
											</p>
										</div>
									</div>
								</div>

								{/* Exercise 7: Email Masker */}
								<div className='bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-violet-900/20 dark:to-indigo-900/20 rounded-xl p-6 mb-6 border-l-4 border-violet-500'>
									<div className='flex items-center gap-3 mb-4'>
										<div className='w-8 h-8 bg-violet-500 rounded-full flex items-center justify-center text-white font-bold text-sm'>
											7
										</div>
										<h5 className='text-xl font-semibold text-violet-700 dark:text-violet-300'>
											Email Masker
										</h5>
									</div>
									<p className='text-gray-700 dark:text-gray-300 mb-4'>
										Hide the first part of the email using asterisks (*):
									</p>
									<div className='bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
										<div className='text-sm text-gray-600 dark:text-gray-400'>
											<p>
												<strong>Example:</strong> memo123@gmail.com →
												m****@gmail.com
											</p>
										</div>
									</div>
								</div>

								{/* Exercise 8: Lists and Iteration */}
								<div className='bg-gradient-to-r from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20 rounded-xl p-6 mb-6 border-l-4 border-sky-500'>
									<div className='flex items-center gap-3 mb-4'>
										<div className='w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center text-white font-bold text-sm'>
											8
										</div>
										<h5 className='text-xl font-semibold text-sky-700 dark:text-sky-300'>
											Lists and Iteration
										</h5>
									</div>
									<p className='text-gray-700 dark:text-gray-300 mb-4'>
										Create a List of String called fruits containing at least
										five different fruit names. Use a for...in loop to iterate
										through the list and print each fruit name. After the loop,
										use the built-in .add() method to add a new fruit to the
										list and print the updated list to show the change.
									</p>
									{/* <div className='bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
										<div className='text-sm text-gray-600 dark:text-gray-400'>
											<p><strong>Skills:</strong> List creation, for...in loops, .add() method</p>
											<p><strong>Example:</strong> ["Apple", "Banana", "Orange", "Mango", "Grape"]</p>
										</div>
									</div> */}
								</div>

								{/* Exercise 11: Ternary Operator */}
								<div className='bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-xl p-6 mb-6 border-l-4 border-orange-500'>
									<div className='flex items-center gap-3 mb-4'>
										<div className='w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm'>
											9
										</div>
										<h5 className='text-xl font-semibold text-orange-700 dark:text-orange-300'>
											Ternary Operator (?:)
										</h5>
									</div>
									<p className='text-gray-700 dark:text-gray-300 mb-4'>
										Declare an int variable named temperature. Use a ternary
										operator (?:) to assign a String value to a new variable
										called weatherCondition. If the temperature is greater than
										25, the weatherCondition should be "Hot." Otherwise, it
										should be "Cool." Print the final weatherCondition to
										confirm the logic.
									</p>
								</div>

								{/* Exercise 12: Null-Aware Operators */}
								<div className='bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl p-6 mb-6 border-l-4 border-red-500'>
									<div className='flex items-center gap-3 mb-4'>
										<div className='w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm'>
											10
										</div>
										<h5 className='text-xl font-semibold text-red-700 dark:text-red-300'>
											Null-Aware Operators
										</h5>
									</div>
									<p className='text-gray-700 dark:text-gray-300 mb-4'>
										Create a nullable String? variable named name and set its
										value to null. Use the null-aware access operator (?.) to
										try to print the length of the string. Observe that it
										doesn't cause an error. Then, set name to a non-null value
										(e.g., "Dart") and use the ?. operator again to successfully
										print the length.
									</p>
								</div>

								{/* Exercise 13: Named Parameters with Default Values */}
								<div className='bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-xl p-6 mb-6 border-l-4 border-indigo-500'>
									<div className='flex items-center gap-3 mb-4'>
										<div className='w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm'>
											11
										</div>
										<h5 className='text-xl font-semibold text-indigo-700 dark:text-indigo-300'>
											Named Parameters with Default Values
										</h5>
									</div>
									<p className='text-gray-700 dark:text-gray-300 mb-4'>
										Write a function named sendEmail that takes three named
										parameters: to (required, String), subject (required,
										String), and body (optional, String, with a default value of
										"No body text."). Call this function twice, once providing
										all three parameters and once omitting the body parameter.
										Print the results to see the default value in action.
									</p>
									<div className='bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
										<div className='text-sm text-gray-600 dark:text-gray-400'>
											<p>
												<strong>Skills:</strong> Named parameters, default
												values, function calls
											</p>
											<p>
												<strong>Syntax:</strong> void sendEmail(required String
												to, required String subject, String body = "No body
												text.")
											</p>
										</div>
									</div>
								</div>

								{/* Exercise 14: First-Class Functions */}
								<div className='bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-cyan-900/20 dark:to-teal-900/20 rounded-xl p-6 mb-6 border-l-4 border-cyan-500'>
									<div className='flex items-center gap-3 mb-4'>
										<div className='w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm'>
											12
										</div>
										<h5 className='text-xl font-semibold text-cyan-700 dark:text-cyan-300'>
											First-Class Functions
										</h5>
									</div>
									<p className='text-gray-700 dark:text-gray-300 mb-4'>
										Declare a variable named addNumbers that holds a function.
										This function should take two int parameters and return
										their sum. Call this function-variable with two numbers and
										print the result. This exercise demonstrates how functions
										are first-class objects in Dart.
									</p>
									<div className='bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
										<div className='text-sm text-gray-600 dark:text-gray-400'>
											<p>
												<strong>Skills:</strong> First-class functions, function
												variables, function types
											</p>
											<p>
												<strong>Syntax:</strong> int Function(int, int)
												addNumbers = (int a, int b) = {'>'} a + b;
											</p>
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
										inputs. Challenge yourself to write clean, readable code!
									</p>
									<div className='flex flex-wrap gap-2'>
										<span className='px-3 py-1 bg-amber-100 dark:bg-amber-800 text-amber-800 dark:text-amber-200 rounded-full text-sm font-medium'>
											Dart Basics
										</span>
										<span className='px-3 py-1 bg-amber-100 dark:bg-amber-800 text-amber-800 dark:text-amber-200 rounded-full text-sm font-medium'>
											Control Flow
										</span>
										<span className='px-3 py-1 bg-amber-100 dark:bg-amber-800 text-amber-800 dark:text-amber-200 rounded-full text-sm font-medium'>
											Functions
										</span>
										<span className='px-3 py-1 bg-amber-100 dark:bg-amber-800 text-amber-800 dark:text-amber-200 rounded-full text-sm font-medium'>
											String Manipulation
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

export default Day1;
