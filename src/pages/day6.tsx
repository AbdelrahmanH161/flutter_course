import { useState, Suspense, lazy, useRef } from 'react';
import { motion } from 'framer-motion';
import {
	ChevronDown,
	CheckCircle,
	Clock,
	Navigation,
	Layout,
	Palette,
	ArrowRight,
} from 'lucide-react';

import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const SyntaxHighlighter = lazy(() => import('react-syntax-highlighter'));

const Loading = () => <div>Loading...</div>;

const sessions = [
	{
		id: 1,
		title: 'App Navigation Basics',
		duration: '1 Hour',
		icon: <Navigation className='w-6 h-6' />,
		content: {
			description:
				"Learn to create multi-screen navigation experiences using Flutter's built-in navigation widgets. We'll explore BottomNavigationBar for main sections, TabBar for sub-sections, and Drawer for additional options.",
			topics: [
				'BottomNavigationBar: Main app sections (3-5 screens)',
				'TabBar & TabBarView: Sub-navigation within screens',
				'Drawer: Side menu for additional options',
				'Understanding navigation patterns and UX',
				'Managing navigation state with setState',
			],
			detailedTopics: {
				bottomNavigation: {
					title: 'BottomNavigationBar',
					code: `class MainApp extends StatefulWidget {
  @override
  _MainAppState createState() => _MainAppState();
}

class _MainAppState extends State<MainApp> {
  int _currentIndex = 0;
  
  final List<Widget> _screens = [
    HomeScreen(),
    ProfileScreen(), 
    SettingsScreen(),
  ];
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _screens[_currentIndex],
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: (index) {
          setState(() {
            _currentIndex = index;
          });
        },
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: "Home",
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person),
            label: "Profile",
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.settings),
            label: "Settings",
          ),
        ],
      ),
    );
  }
}`,
				},
				tabBarNavigation: {
					title: 'TabBar & TabBarView',
					code: `class ProfileScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 3,
      child: Scaffold(
        appBar: AppBar(
          title: Text("Profile"),
          bottom: const TabBar(
            tabs: [
              Tab(icon: Icon(Icons.info), text: "Info"),
              Tab(icon: Icon(Icons.post_add), text: "Posts"),
              Tab(icon: Icon(Icons.settings), text: "Settings"),
            ],
          ),
        ),
        body: const TabBarView(
          children: [
            InfoTab(),
            PostsTab(),
            SettingsTab(),
          ],
        ),
      ),
    );
  }
}`,
				},
				drawerNavigation: {
					title: 'Drawer Navigation',
					code: `class MainScreenWithDrawer extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Main Screen"),
        backgroundColor: Colors.teal,
      ),
      drawer: Drawer(
        child: ListView(
          padding: EdgeInsets.zero,
          children: [
            DrawerHeader(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: [Colors.teal, Colors.tealAccent],
                ),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  CircleAvatar(
                    radius: 30,
                    child: Icon(Icons.person, size: 30),
                  ),
                  SizedBox(height: 16),
                  Text(
                    "Welcome User!",
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
            ),
            ListTile(
              leading: Icon(Icons.home),
              title: Text("Home"),
              onTap: () {
                Navigator.pop(context);
              },
            ),
            ListTile(
              leading: Icon(Icons.person),
              title: Text("Profile"),
              onTap: () {
                Navigator.pop(context);
              },
            ),
          ],
        ),
      ),
      body: Center(
        child: Text("Main Content Area"),
      ),
    );
  }
}`,
				},
			},
		},
	},
	{
		id: 2,
		title: 'Multi-Screen Navigation',
		duration: '1 Hour',
		icon: <Layout className='w-6 h-6' />,
		content: {
			description:
				"Master screen-to-screen navigation using Flutter's Navigator. Learn to pass data between screens, handle return values, and create smooth navigation flows for better user experience.",
			topics: [
				'Navigator.push(): Moving to new screens',
				'Navigator.pop(): Going back with data',
				'MaterialPageRoute: Screen transitions',
				'Passing data between screens',
				'Handling async navigation and return values',
			],
			detailedTopics: {
				basicNavigation: {
					title: 'Basic Screen Navigation',
					code: `class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Home")),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              "Welcome to Home Screen",
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 32),
            ElevatedButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => ProfileScreen(),
                  ),
                );
              },
              child: Text("Go to Profile"),
            ),
          ],
        ),
      ),
    );
  }
}`,
				},
				dataPassingNavigation: {
					title: 'Navigation with Data Passing',
					code: `class UserListScreen extends StatelessWidget {
  final List<Map<String, String>> users = [
    {"name": "Alice", "email": "alice@example.com", "role": "Developer"},
    {"name": "Bob", "email": "bob@example.com", "role": "Designer"},
    {"name": "Charlie", "email": "charlie@example.com", "role": "Manager"},
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Users")),
      body: ListView.builder(
        itemCount: users.length,
        itemBuilder: (context, index) {
          final user = users[index];
          return ListTile(
            leading: CircleAvatar(
              child: Text(user['name']![0]),
            ),
            title: Text(user['name']!),
            subtitle: Text(user['email']!),
            trailing: Icon(Icons.arrow_forward_ios),
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => UserDetailScreen(user: user),
                ),
              );
            },
          );
        },
      ),
    );
  }
}`,
				},
				editScreenWithReturn: {
					title: 'Edit Screen with Return Data',
					code: `class EditUserScreen extends StatefulWidget {
  final Map<String, String> user;
  
  const EditUserScreen({Key? key, required this.user}) : super(key: key);

  @override
  _EditUserScreenState createState() => _EditUserScreenState();
}

class _EditUserScreenState extends State<EditUserScreen> {
  late TextEditingController nameController;
  late TextEditingController emailController;

  @override
  void initState() {
    super.initState();
    nameController = TextEditingController(text: widget.user['name']);
    emailController = TextEditingController(text: widget.user['email']);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Edit User"),
        actions: [
          TextButton(
            onPressed: () {
              final updatedUser = {
                'name': nameController.text,
                'email': emailController.text,
              };
              Navigator.pop(context, updatedUser);
            },
            child: Text("Save", style: TextStyle(color: Colors.white)),
          ),
        ],
      ),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          children: [
            TextField(
              controller: nameController,
              decoration: InputDecoration(
                labelText: "Name",
                border: OutlineInputBorder(),
              ),
            ),
            SizedBox(height: 16),
            TextField(
              controller: emailController,
              decoration: InputDecoration(
                labelText: "Email",
                border: OutlineInputBorder(),
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
	{
		id: 3,
		title: 'App Theming',
		duration: '1 Hour',
		icon: <Palette className='w-6 h-6' />,
		content: {
			description:
				"Create a consistent and professional look for your app using Flutter's powerful theming system. Learn to define colors, typography, and component styles that apply across your entire application.",
			topics: [
				'ThemeData: Central app styling configuration',
				'ColorScheme: Consistent color palette',
				'TextTheme: Typography and font styles',
				'Component themes: Button, Card, AppBar styling',
				'Light and Dark theme support',
			],
			detailedTopics: {
				basicTheming: {
					title: 'Basic App Theming',
					code: `class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Themed Flutter App',
      theme: ThemeData(
        // Primary color scheme
        primarySwatch: Colors.teal,
        primaryColor: Colors.teal,
        
        // Background colors
        scaffoldBackgroundColor: Colors.grey[50],
        
        // AppBar theme
        appBarTheme: AppBarTheme(
          backgroundColor: Colors.teal,
          foregroundColor: Colors.white,
          elevation: 4,
          centerTitle: true,
          titleTextStyle: TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.bold,
          ),
        ),
        
        // Elevated button theme
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            backgroundColor: Colors.teal,
            foregroundColor: Colors.white,
            padding: EdgeInsets.symmetric(horizontal: 24, vertical: 12),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(8),
            ),
          ),
        ),
      ),
      home: ThemedHomePage(),
    );
  }
}`,
				},
				advancedTheming: {
					title: 'Advanced Theming with Custom Colors',
					code: `class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Advanced Themed App',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: Color(0xFF2E7D32), // Custom green
          brightness: Brightness.light,
        ),
        
        // Custom text theme
        textTheme: TextTheme(
          headlineLarge: TextStyle(
            fontSize: 32,
            fontWeight: FontWeight.bold,
            color: Color(0xFF1B5E20),
          ),
          headlineMedium: TextStyle(
            fontSize: 24,
            fontWeight: FontWeight.w600,
            color: Color(0xFF2E7D32),
          ),
          bodyLarge: TextStyle(
            fontSize: 16,
            color: Color(0xFF424242),
            height: 1.5,
          ),
        ),
        
        // Input decoration theme
        inputDecorationTheme: InputDecorationTheme(
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: BorderSide(color: Color(0xFF2E7D32), width: 2),
          ),
        ),
      ),
      
      // Dark theme
      darkTheme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: Color(0xFF4CAF50),
          brightness: Brightness.dark,
        ),
      ),
      
      themeMode: ThemeMode.system,
      home: AdvancedThemedHomePage(),
    );
  }
}`,
				},
				themingInAction: {
					title: 'Using Theme in Widgets',
					code: `class ThemedHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;
    
    return Scaffold(
      appBar: AppBar(
        title: Text('Themed App'),
        backgroundColor: colorScheme.primary,
        foregroundColor: colorScheme.onPrimary,
      ),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          children: [
            Card(
              child: Padding(
                padding: EdgeInsets.all(16),
                child: Column(
                  children: [
                    Text(
                      'Welcome to Themed App',
                      style: theme.textTheme.headlineMedium,
                    ),
                    SizedBox(height: 16),
                    Text(
                      'This app uses consistent theming.',
                      style: theme.textTheme.bodyLarge,
                    ),
                  ],
                ),
              ),
            ),
            SizedBox(height: 16),
            ElevatedButton(
              onPressed: () {},
              child: Text('Themed Button'),
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

const Day6 = () => {
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
									Day 6
								</h1>
								<h2 className='text-3xl md:text-5xl font-bold text-[#007BFF] mb-8'>
									App Navigation & Theming
								</h2>
								<p className='text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed'>
									Transform your single-screen app into a multi-screen
									experience! Learn navigation patterns, screen transitions, and
									how to create a consistent, professional theme across your
									entire application.
								</p>

								<motion.button
									onClick={scrollToContent}
									className='inline-flex items-center gap-2 bg-[#007BFF] hover:bg-[#1B5E20] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg'
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}>
									<ChevronDown className='w-5 h-5' />
									Explore Navigation & Theming
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
									3 hours to master navigation patterns and create beautiful,
									consistent app themes.
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
									Day 6 Summary
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
													Master navigation patterns: BottomNavigationBar,
													TabBar, and Drawer for organized app structure.
												</span>
											</li>
											<li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
												<CheckCircle className='w-5 h-5 text-[#007BFF] mt-0.5 flex-shrink-0' />
												<span>
													Navigate between screens using Navigator.push() and
													Navigator.pop() with data passing.
												</span>
											</li>
											<li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
												<CheckCircle className='w-5 h-5 text-[#007BFF] mt-0.5 flex-shrink-0' />
												<span>
													Create professional, consistent app theming with
													ThemeData and ColorScheme.
												</span>
											</li>
											<li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
												<CheckCircle className='w-5 h-5 text-[#007BFF] mt-0.5 flex-shrink-0' />
												<span>
													Support both light and dark themes for better user
													experience.
												</span>
											</li>
										</ul>
									</div>
									<div>
										<h4 className='text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4'>
											What's Next
										</h4>
										<p className='text-gray-600 dark:text-gray-300 mb-6'>
											You've built a solid foundation in Flutter! Your next
											steps involve exploring advanced topics like state
											management (Provider, Bloc), working with APIs, local
											storage, and publishing your app to app stores.
										</p>
										<button className='inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors'>
											Continue Learning
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
									Hands-on Exercise
								</h3>

								{/* Navigation App Task */}
								<div className='bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border-l-4 border-green-500'>
									<div className='flex items-center gap-3 mb-4'>
										<div className='w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm'>
											📱
										</div>
										<h5 className='text-xl font-semibold text-green-700 dark:text-green-300'>
											Task: Multi-Screen Navigation App with Custom Theme
										</h5>
									</div>

									<div className='mb-6'>
										<h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-2 text-lg'>
											Objective
										</h6>
										<p className='text-gray-700 dark:text-gray-300'>
											Build a complete navigation app that demonstrates all
											navigation patterns learned today. Include bottom
											navigation, tabs, drawer, and screen-to-screen navigation
											with a custom theme throughout.
										</p>
									</div>

									<div className='mb-6'>
										<h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-3 text-lg'>
											Requirements
										</h6>

										<div className='space-y-4'>
											<div className='bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
												<h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-2 block'>
													1. Bottom Navigation (Main Structure)
												</h6>
												<ul className='text-sm text-gray-600 dark:text-gray-300 space-y-1'>
													<li>
														• Create 4 main screens: Home, Profile, Favorites,
														Settings
													</li>
													<li>
														• Use BottomNavigationBar to switch between them
													</li>
													<li>
														• Each screen should have distinct content and icons
													</li>
												</ul>
											</div>

											<div className='bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
												<h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-2 block'>
													2. Profile Screen with Tabs
												</h6>
												<ul className='text-sm text-gray-600 dark:text-gray-300 space-y-1'>
													<li>
														• Profile screen should have 3 tabs: Info, Posts,
														Activity
													</li>
													<li>
														• Info tab: Display user information and avatar
													</li>
													<li>• Posts tab: Show a list of user posts</li>
													<li>
														• Activity tab: Display recent user activities
													</li>
												</ul>
											</div>

											<div className='bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
												<h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-2 block'>
													3. Drawer Navigation
												</h6>
												<ul className='text-sm text-gray-600 dark:text-gray-300 space-y-1'>
													<li>• Add a drawer to the Home screen</li>
													<li>• Include user header with avatar and name</li>
													<li>
														• Menu items: Home, Profile, Favorites, Settings,
														About, Logout
													</li>
													<li>
														• Drawer should navigate to respective screens
													</li>
												</ul>
											</div>

											<div className='bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
												<h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-2 block'>
													4. Screen-to-Screen Navigation
												</h6>
												<ul className='text-sm text-gray-600 dark:text-gray-300 space-y-1'>
													<li>
														• Add "Edit Profile" button in Profile screen that
														navigates to edit screen
													</li>
													<li>
														• Edit screen should allow changing name, email, and
														bio
													</li>
													<li>• Return updated data back to Profile screen</li>
													<li>
														• Show confirmation message when profile is updated
													</li>
												</ul>
											</div>

											<div className='bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
												<h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-2 block'>
													5. Custom Theme Implementation
												</h6>
												<ul className='text-sm text-gray-600 dark:text-gray-300 space-y-1'>
													<li>
														• Create a custom color scheme (choose your brand
														colors)
													</li>
													<li>
														• Define consistent typography throughout the app
													</li>
													<li>• Style all buttons, cards, and input fields</li>
													<li>• Support both light and dark themes</li>
													<li>
														• Use theme colors consistently across all screens
													</li>
												</ul>
											</div>
										</div>
									</div>

									<div className='mb-6'>
										<h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-2 text-lg'>
											Expected App Flow
										</h6>
										<div className='bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
											<ul className='text-sm text-gray-600 dark:text-gray-300 space-y-1'>
												<li>
													• User opens app → Home screen with drawer and bottom
													navigation
												</li>
												<li>
													• User taps Profile → Profile screen with tabs (Info,
													Posts, Activity)
												</li>
												<li>
													• User taps "Edit Profile" → Edit screen with form
												</li>
												<li>
													• User saves changes → Returns to Profile with updated
													data
												</li>
												<li>
													• User can navigate using bottom navigation, drawer,
													or back buttons
												</li>
												<li>
													• All screens maintain consistent theme and styling
												</li>
											</ul>
										</div>
									</div>

									<div>
										<h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-2 text-lg'>
											🌟 Bonus Challenges
										</h6>
										<div className='bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-700'>
											<ul className='text-sm text-gray-600 dark:text-gray-300 space-y-1'>
												<li>• Add splash screen animation on app start</li>
												<li>• Implement pull-to-refresh on the Posts tab</li>
												<li>• Add floating action button for "Add New Post"</li>
												<li>
													• Create custom page transitions between screens
												</li>
												<li>
													• Add theme switcher in Settings (Light/Dark/System)
												</li>
												<li>
													• Include search functionality in the Home screen
												</li>
											</ul>
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

export default Day6;
