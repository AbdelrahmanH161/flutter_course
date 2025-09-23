import { useState, Suspense, lazy, useRef } from 'react';
import { motion } from 'framer-motion';
import {
	ChevronDown,
	CheckCircle,
	Clock,
	Smartphone,
	Monitor,
	Palette,
	ArrowRight,
} from 'lucide-react';

import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Picture1 from '/images/Picture1.jpg';
import Picture2 from '/images/Picture2.jpg';

const SyntaxHighlighter = lazy(() => import('react-syntax-highlighter'));

const Loading = () => <div>Loading...</div>;

const sessions = [
	{
		id: 1,
		title: 'Introduction to Flutter',
		duration: '1 Hour',
		icon: <Smartphone className='w-6 h-6' />,
		content: {
			description:
				'Flutter is a UI toolkit from Google for building beautiful, natively compiled applications for mobile, web, and desktop from a single codebase.',
			topics: [
				'What is Flutter and why use it?',
				'Flutter Architecture: Framework, Engine, Embedder',
				'Everything is a Widget philosophy',
				'Cross-platform development advantages',
				'Hot Reload for instant feedback',
			],
			detailedTopics: {
				whatIsFlutter: {
					title: 'What is Flutter?',
					code: `// Flutter is Google's UI toolkit for building natively compiled
// applications for multiple platforms from a single codebase.

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      home: MyHomePage(),
    );
  }
}`,
				},
				flutterArchitecture: {
					title: 'Flutter Architecture',
					code: `/*
Flutter Architecture (3 Layers):

Framework Layer (Dart):
- Material Design, Cupertino widgets
- Rendering layer, Animation & gestures
- Foundation classes

Engine Layer (C++):
- Skia graphics engine
- Dart runtime
- Text layout and rendering

Embedder Layer (Platform Specific):
- Platform-specific code
- Window management
- Native platform APIs
*/`,
				},
			},
		},
	},
	{
		id: 2,
		title: 'Your First Flutter UI',
		duration: '1 Hour',
		icon: <Monitor className='w-6 h-6' />,
		content: {
			description:
				'Get hands-on with the most common Flutter widgets and learn how to structure your UI using layout widgets.',
			topics: [
				'Basic Widgets: Container, Text, Icon, Image',
				'Layout Widgets: Row, Column, Center, Padding',
				'Scaffold for Material Design structure',
				'Building your first widget tree',
				'Understanding widget composition',
			],
			detailedTopics: {
				basicWidgets: {
					title: 'Basic Widgets',
					code: `// Container - A box for styling
Container(
  width: 200,
  height: 100,
  decoration: BoxDecoration(
    color: Colors.blue,
    borderRadius: BorderRadius.circular(10),
  ),
  padding: EdgeInsets.all(16),
  child: Text('I am in a container!'),
)

// Text - For displaying strings
Text(
  'Hello Flutter!',
  style: TextStyle(
    fontSize: 24,
    fontWeight: FontWeight.bold,
    color: Colors.blue,
  ),
)`,
				},
				layoutWidgets: {
					title: 'Layout Widgets',
					code: `// Row - Arranges children horizontally
Row(
  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
  children: [
    Icon(Icons.star, color: Colors.amber),
    Text('Rating'),
    Text('4.5', style: TextStyle(fontWeight: FontWeight.bold)),
  ],
)

// Column - Arranges children vertically
Column(
  crossAxisAlignment: CrossAxisAlignment.center,
  children: [
    Text('Welcome'),
    SizedBox(height: 10), // Add spacing
    ElevatedButton(
      onPressed: () {},
      child: Text('Get Started'),
    ),
  ],
)

// Center - Centers its child
Center(
  child: Text('I am centered!'),
)

// Padding - Adds space around its child
Padding(
  padding: EdgeInsets.all(16.0),
  child: Text('I have padding around me'),
)

// SizedBox - For explicit spacing
SizedBox(height: 20), // Vertical space
SizedBox(width: 20),  // Horizontal space

// Expanded - Takes remaining space
Row(
  children: [
    Text('Left'),
    Expanded(child: Text('Center - takes remaining space')),
    Text('Right'),
  ],
)`,
				},
				scaffold: {
					title: 'Scaffold Structure',
					code: `class MyHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('My Flutter App'),
        backgroundColor: Colors.blue,
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.flutter_dash, size: 100, color: Colors.blue),
            SizedBox(height: 20),
            Text('Welcome to Flutter!',
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
            ElevatedButton(
              onPressed: () => print('Button pressed!'),
              child: Text('Get Started'),
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {},
        child: Icon(Icons.add),
      ),
    );
  }
}`,
				},
			},
		},
	},
	{
		id: 3,
		title: 'Material Design & Assets',
		duration: '1 Hour',
		icon: <Palette className='w-6 h-6' />,
		content: {
			description:
				"Flutter makes it easy to create apps that follow Google's Material Design guidelines using pre-built widgets and learn how to work with assets like images.",
			topics: [
				'Material Design principles in Flutter',
				'Material widgets: AppBar, Card, FloatingActionButton',
				'Working with assets and images',
				'Setting up pubspec.yaml for assets',
				'Creating a complete User Profile app',
			],
			detailedTopics: {
				workingWithAssets: {
					title: 'Working with Assets',
					code: `// 1. Create assets folder structure:
/*
your_project/
├── assets/
│   ├── images/
│   │   ├── profile_picture.jpg
│   │   └── flutter_logo.png
├── lib/
└── pubspec.yaml
*/

// 2. Declare assets in pubspec.yaml:
/*
flutter:
  assets:
    - assets/images/
*/

// 3. Use assets in your Flutter code:
Image.asset(
  'assets/images/flutter_logo.png',
  width: 200,
  height: 200,
)`,
				},
				userProfileApp: {
					title: 'User Profile App Example',
					code: `class UserProfileScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('My Profile')),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          children: [
            CircleAvatar(
              radius: 60,
              backgroundImage: AssetImage('assets/images/profile.jpg'),
            ),
            SizedBox(height: 20),
            Text('Sarah Johnson',
                style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold)),
            Text('Flutter Developer'),
            SizedBox(height: 30),
            Card(
              child: ListTile(
                leading: Icon(Icons.email),
                title: Text('Email'),
                subtitle: Text('sarah@email.com'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}`,
				},
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
							<div className='absolute top-20 left-20 w-72 h-72 bg-[#02569B] rounded-full mix-blend-multiply filter blur-xl animate-pulse'></div>
							<div className='absolute top-40 right-20 w-72 h-72 bg-[#13B9FD] rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000'></div>
							<div className='absolute -bottom-8 left-40 w-72 h-72 bg-[#0175C2] rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000'></div>
						</div>

						<div className='relative z-10 text-center px-4 max-w-4xl mx-auto'>
							<motion.div
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8 }}>
								<h1 className='text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6'>
									Day 3
								</h1>
								<h2 className='text-3xl md:text-5xl font-bold text-[#02569B] mb-8'>
									Flutter Fundamentals
								</h2>
								<p className='text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed'>
									Welcome to Flutter! Today we'll explore Google's powerful UI
									toolkit and build our first static User Profile app using
									Material Design principles.
								</p>

								<motion.button
									onClick={scrollToContent}
									className='inline-flex items-center gap-2 bg-[#02569B] hover:bg-[#024A87] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg'
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}>
									<ChevronDown className='w-5 h-5' />
									Explore Flutter Fundamentals
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
									3 hours to master Flutter fundamentals and static UI.
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
													<div className='p-3 bg-[#02569B]/20 rounded-xl text-[#02569B]'>
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
																<CheckCircle className='w-5 h-5 text-[#02569B] mt-0.5 flex-shrink-0' />
																<span>{topic}</span>
															</li>
														))}
													</ul>
												</div>

												{session.content.detailedTopics && (
													<div className='space-y-4 mt-6'>
														{Object.values(session.content.detailedTopics).map(
															(topic, index) => (
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
									Day 3 Summary
								</h3>
								<div className='grid md:grid-cols-2 gap-8'>
									<div>
										<h4 className='text-xl font-semibold text-[#02569B] mb-4'>
											Key Takeaways
										</h4>
										<ul className='space-y-3'>
											<li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
												<CheckCircle className='w-5 h-5 text-[#02569B] mt-0.5 flex-shrink-0' />
												<span>
													Understanding Flutter architecture and "Everything is
													a Widget" philosophy.
												</span>
											</li>
											<li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
												<CheckCircle className='w-5 h-5 text-[#02569B] mt-0.5 flex-shrink-0' />
												<span>
													Mastering basic widgets: Container, Text, Icon, Image,
													Row, Column.
												</span>
											</li>
											<li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
												<CheckCircle className='w-5 h-5 text-[#02569B] mt-0.5 flex-shrink-0' />
												<span>
													Building structured UIs with Scaffold and layout
													widgets.
												</span>
											</li>
											<li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
												<CheckCircle className='w-5 h-5 text-[#02569B] mt-0.5 flex-shrink-0' />
												<span>
													Implementing Material Design principles and working
													with assets.
												</span>
											</li>
										</ul>
									</div>
									<div>
										<h4 className='text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4'>
											What's Next
										</h4>
										<p className='text-gray-600 dark:text-gray-300 mb-6'>
											In Day 4, we'll add interactivity to our apps with
											StatefulWidgets, handle user input, manage state, and
											explore navigation between screens.
										</p>
										<button className='inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors'>
											Next: Day 4
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

								{/* Exercise 1: Picture1 Layout */}
								<div className='bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 mb-6 border-l-4 border-blue-500'>
									<div className='flex items-center gap-3 mb-4'>
										<div className='w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm'>
											1
										</div>
										<h5 className='text-xl font-semibold text-blue-700 dark:text-blue-300'>
											Layout Task 1: Picture1.jpg Design
										</h5>
									</div>
									<p className='text-gray-700 dark:text-gray-300 mb-4'>
										Recreate the layout shown in Picture1.jpg using Flutter
										widgets. Focus on the arrangement, spacing, and visual
										hierarchy of elements.
									</p>
									<div className='bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
										<h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-2'>
											Requirements:
										</h6>
										<img
											src={Picture1}
											alt='Picture1'
										/>
										<ul className='text-sm text-gray-600 dark:text-gray-300 space-y-1'>
											<li>
												• Analyze the image structure and identify key
												components
											</li>
											<li>
												• Use appropriate layout widgets (Row, Column, Stack,
												etc.)
											</li>
											<li>• Implement proper spacing and alignment</li>
											<li>• Match the visual style and proportions</li>
										</ul>
									</div>
								</div>

								{/* Exercise 2: Picture2 Layout */}
								<div className='bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 mb-6 border-l-4 border-green-500'>
									<div className='flex items-center gap-3 mb-4'>
										<div className='w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm'>
											2
										</div>
										<h5 className='text-xl font-semibold text-green-700 dark:text-green-300'>
											Layout Task 2: Picture2.jpg Design
										</h5>
									</div>
									<p className='text-gray-700 dark:text-gray-300 mb-4'>
										Build the layout structure from Picture2.jpg. Pay attention
										to the positioning, sizing, and relationships between UI
										elements.
									</p>
									<div className='bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
										<h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-2'>
											Requirements:
										</h6>
										<img
											src={Picture2}
											alt='Picture2'
										/>
										<ul className='text-sm text-gray-600 dark:text-gray-300 space-y-1'>
											<li>
												• Study the image layout and component arrangement
											</li>
											<li>• Choose the right combination of layout widgets</li>
											<li>• Implement responsive design principles</li>
											<li>• Ensure proper widget nesting and hierarchy</li>
										</ul>
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

