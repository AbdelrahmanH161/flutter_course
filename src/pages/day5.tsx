import { useState, Suspense, lazy, useRef } from 'react';
import { motion } from 'framer-motion';
import {
	ChevronDown,
	CheckCircle,
	Clock,
	RefreshCw,
	Edit3,
	List,
	ArrowRight,
} from 'lucide-react';

import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const SyntaxHighlighter = lazy(() => import('react-syntax-highlighter'));

const Loading = () => <div>Loading...</div>;

const sessions = [
	{
		id: 1,
		title: 'Stateful vs. Stateless Widgets',
		duration: '1 Hour',
		icon: <RefreshCw className='w-6 h-6' />,
		content: {
			description:
				'Learn the fundamental difference between widgets that can change state and those that remain static. Understanding when to use each type is crucial for building interactive Flutter apps.',
			topics: [
				'StatelessWidget: Static, immutable widgets',
				'StatefulWidget: Dynamic, mutable widgets',
				'Understanding setState() method',
				'When to use each widget type',
				'State lifecycle and management',
			],
			detailedTopics: {
				statelessVsStateful: {
					title: 'Stateless vs Stateful Widgets',
					code: `// StatelessWidget - Cannot change after creation
class MyStatelessWidget extends StatelessWidget {
  final String title;
  
  const MyStatelessWidget({Key? key, required this.title}) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return Text(title); // Always displays the same title
  }
}

// StatefulWidget - Can change during runtime
class MyStatefulWidget extends StatefulWidget {
  @override
  _MyStatefulWidgetState createState() => _MyStatefulWidgetState();
}

class _MyStatefulWidgetState extends State<MyStatefulWidget> {
  int counter = 0; // Mutable state
  
  void incrementCounter() {
    setState(() {
      counter++; // Triggers rebuild with new state
    });
  }
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('Count: \$counter'),
        ElevatedButton(
          onPressed: incrementCounter,
          child: Text('Increment'),
        ),
      ],
    );
  }
}`,
				},
				setStateExample: {
					title: 'Understanding setState()',
					code: `class CounterExample extends StatefulWidget {
  @override
  _CounterExampleState createState() => _CounterExampleState();
}

class _CounterExampleState extends State<CounterExample> {
  int count = 0;
  bool isVisible = true;
  
  void toggleVisibility() {
    setState(() {
      isVisible = !isVisible; // Toggle boolean state
    });
  }
  
  void incrementCount() {
    setState(() {
      count++; // Increment counter
    });
  }
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        if (isVisible) Text('Count: \$count'),
        Row(
          children: [
            ElevatedButton(
              onPressed: incrementCount,
              child: Text('Increment'),
            ),
            ElevatedButton(
              onPressed: toggleVisibility,
              child: Text(isVisible ? 'Hide' : 'Show'),
            ),
          ],
        ),
      ],
    );
  }
}`,
				},
			},
		},
	},
	{
		id: 2,
		title: 'Building a Form',
		duration: '1 Hour',
		icon: <Edit3 className='w-6 h-6' />,
		content: {
			description:
				'Create interactive forms that can collect user input, validate data, and respond to user actions. Learn to use form widgets and controllers to build user-friendly input interfaces.',
			topics: [
				'Form widget and form validation',
				'TextFormField with validation',
				'TextEditingController for input handling',
				'ElevatedButton and onPressed callbacks',
				'Building a complete user input form',
			],
			detailedTopics: {
				formBasics: {
					title: 'Form Widgets and Validation',
					code: `class UserForm extends StatefulWidget {
  @override
  _UserFormState createState() => _UserFormState();
}

class _UserFormState extends State<UserForm> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  
  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        children: [
          TextFormField(
            controller: _nameController,
            decoration: InputDecoration(
              labelText: 'Name',
              border: OutlineInputBorder(),
            ),
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'Please enter your name';
              }
              return null;
            },
          ),
          SizedBox(height: 16),
          TextFormField(
            controller: _emailController,
            decoration: InputDecoration(
              labelText: 'Email',
              border: OutlineInputBorder(),
            ),
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'Please enter your email';
              }
              if (!value.contains('@')) {
                return 'Please enter a valid email';
              }
              return null;
            },
          ),
          SizedBox(height: 24),
          ElevatedButton(
            onPressed: () {
              if (_formKey.currentState!.validate()) {
                // Form is valid, process the data
                print('Name: \${_nameController.text}');
                print('Email: \${_emailController.text}');
              }
            },
            child: Text('Submit'),
          ),
        ],
      ),
    );
  }
}`,
				},
				formWithState: {
					title: 'Form with State Management',
					code: `class DynamicForm extends StatefulWidget {
  @override
  _DynamicFormState createState() => _DynamicFormState();
}

class _DynamicFormState extends State<DynamicForm> {
  final _taskController = TextEditingController();
  List<String> tasks = [];
  
  void addTask() {
    if (_taskController.text.isNotEmpty) {
      setState(() {
        tasks.add(_taskController.text);
        _taskController.clear();
      });
    }
  }
  
  void removeTask(int index) {
    setState(() {
      tasks.removeAt(index);
    });
  }
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Row(
          children: [
            Expanded(
              child: TextField(
                controller: _taskController,
                decoration: InputDecoration(
                  labelText: 'Enter a new task',
                  border: OutlineInputBorder(),
                ),
              ),
            ),
            SizedBox(width: 16),
            ElevatedButton(
              onPressed: addTask,
              child: Icon(Plus),
            ),
          ],
        ),
        SizedBox(height: 16),
        ...tasks.asMap().entries.map((entry) {
          int index = entry.key;
          String task = entry.value;
          return ListTile(
            leading: Icon(Icons.task),
            title: Text(task),
            trailing: IconButton(
              icon: Icon(Trash2),
              onPressed: () => removeTask(index),
            ),
          );
        }).toList(),
      ],
    );
  }
}`,
				},
			},
		},
	},
	{
		id: 3,
		title: 'Displaying Data with Lists & Grids',
		duration: '1 Hour',
		icon: <List className='w-6 h-6' />,
		content: {
			description:
				'Learn to display dynamic data in organized layouts using ListView and GridView. These widgets are essential for showing collections of items in a user-friendly way.',
			topics: [
				'ListView for vertical scrolling lists',
				'GridView for grid layouts',
				'Dynamic data binding with setState',
				'Custom item builders and separators',
				'Combining forms with data display',
			],
			detailedTopics: {
				listViewBasics: {
					title: 'ListView Basics',
					code: `class ListViewExample extends StatefulWidget {
  @override
  _ListViewExampleState createState() => _ListViewExampleState();
}

class _ListViewExampleState extends State<ListViewExample> {
  List<String> items = ['Apple', 'Banana', 'Orange', 'Mango'];
  
  void addItem(String item) {
    setState(() {
      items.add(item);
    });
  }
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        ElevatedButton(
          onPressed: () => addItem('New Item'),
          child: Text('Add Item'),
        ),
        Expanded(
          child: ListView.builder(
            itemCount: items.length,
            itemBuilder: (context, index) {
              return ListTile(
                leading: Icon(Icons.favorite, color: Colors.red),
                title: Text(items[index]),
                trailing: IconButton(
                  icon: Icon(Icons.delete),
                  onPressed: () {
                    setState(() {
                      items.removeAt(index);
                    });
                  },
                ),
              );
            },
          ),
        ),
      ],
    );
  }
}`,
				},
				gridViewExample: {
					title: 'GridView with Dynamic Content',
					code: `class GridViewExample extends StatefulWidget {
  @override
  _GridViewExampleState createState() => _GridViewExampleState();
}

class _GridViewExampleState extends State<GridViewExample> {
  List<Color> colors = [
    Colors.red, Colors.blue, Colors.green, Colors.yellow,
    Colors.purple, Colors.orange, Colors.pink, Colors.teal
  ];
  
  void addColor() {
    setState(() {
      colors.add(Colors.primaries[colors.length % Colors.primaries.length]);
    });
  }
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        ElevatedButton(
          onPressed: addColor,
          child: Text('Add Color'),
        ),
        Expanded(
          child: GridView.builder(
            gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 3,
              crossAxisSpacing: 8,
              mainAxisSpacing: 8,
            ),
            itemCount: colors.length,
            itemBuilder: (context, index) {
              return Container(
                decoration: BoxDecoration(
                  color: colors[index],
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Center(
                  child: Text(
                    'Color \${index + 1}',
                    style: TextStyle(
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              );
            },
          ),
        ),
      ],
    );
  }
}`,
				},
				combinedExample: {
					title: 'Complete App: Form + List + Grid',
					code: `class CompleteApp extends StatefulWidget {
  @override
  _CompleteAppState createState() => _CompleteAppState();
}

class _CompleteAppState extends State<CompleteApp> {
  final _nameController = TextEditingController();
  final _hobbyController = TextEditingController();
  List<Map<String, String>> people = [];
  
  void addPerson() {
    if (_nameController.text.isNotEmpty && _hobbyController.text.isNotEmpty) {
      setState(() {
        people.add({
          'name': _nameController.text,
          'hobby': _hobbyController.text,
        });
        _nameController.clear();
        _hobbyController.clear();
      });
    }
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('People & Hobbies')),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          children: [
            // Form Section
            Card(
              child: Padding(
                padding: EdgeInsets.all(16),
                child: Column(
                  children: [
                    Text('Add New Person', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                    SizedBox(height: 16),
                    TextField(
                      controller: _nameController,
                      decoration: InputDecoration(
                        labelText: 'Name',
                        border: OutlineInputBorder(),
                      ),
                    ),
                    SizedBox(height: 16),
                    TextField(
                      controller: _hobbyController,
                      decoration: InputDecoration(
                        labelText: 'Hobby',
                        border: OutlineInputBorder(),
                      ),
                    ),
                    SizedBox(height: 16),
                    ElevatedButton(
                      onPressed: addPerson,
                      child: Text('Add Person'),
                    ),
                  ],
                ),
              ),
            ),
            SizedBox(height: 16),
            
            // List View
            if (people.isNotEmpty) ...[
              Text('People List', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
              SizedBox(height: 8),
              Expanded(
                child: ListView.builder(
                  itemCount: people.length,
                  itemBuilder: (context, index) {
                    return ListTile(
                      leading: CircleAvatar(
                        child: Text(people[index]['name']![0]),
                      ),
                      title: Text(people[index]['name']!),
                      subtitle: Text(people[index]['hobby']!),
                      trailing: IconButton(
                        icon: Icon(Trash2),
                        onPressed: () {
                          setState(() {
                            people.removeAt(index);
                          });
                        },
                      ),
                    );
                  },
                ),
              ),
            ],
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

const Day5 = () => {
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
									Day 5
								</h1>
								<h2 className='text-3xl md:text-5xl font-bold text-[#02569B] mb-8'>
									State & User Interaction
								</h2>
								<p className='text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed'>
									Today's focus is on making the app dynamic. We'll learn how to
									manage state and respond to user input by adding buttons,
									forms, and displaying data using lists and grids.
								</p>

								<motion.button
									onClick={scrollToContent}
									className='inline-flex items-center gap-2 bg-[#02569B] hover:bg-[#024A87] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg'
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}>
									<ChevronDown className='w-5 h-5' />
									Explore State & User Interaction
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
									3 hours to master state management and user interaction in
									Flutter.
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
									Day 5 Summary
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
													Understanding the difference between StatelessWidget
													and StatefulWidget.
												</span>
											</li>
											<li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
												<CheckCircle className='w-5 h-5 text-[#02569B] mt-0.5 flex-shrink-0' />
												<span>
													Mastering setState() for dynamic UI updates and state
													management.
												</span>
											</li>
											<li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
												<CheckCircle className='w-5 h-5 text-[#02569B] mt-0.5 flex-shrink-0' />
												<span>
													Building interactive forms with validation and user
													input handling.
												</span>
											</li>
											<li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
												<CheckCircle className='w-5 h-5 text-[#02569B] mt-0.5 flex-shrink-0' />
												<span>
													Displaying dynamic data using ListView and GridView
													widgets.
												</span>
											</li>
										</ul>
									</div>
									<div>
										<h4 className='text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4'>
											What's Next
										</h4>
										<p className='text-gray-600 dark:text-gray-300 mb-6'>
											In Day 6, we'll explore navigation between screens,
											passing data between routes, and building multi-screen
											applications with proper navigation patterns.
										</p>
										<button className='inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors'>
											Next: Day 6
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
									Hands-on Exercises
								</h3>

								{/* Exercise 1: Favorite Items List */}
								<div className='bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 mb-6 border-l-4 border-blue-500'>
									<div className='flex items-center gap-3 mb-4'>
										<div className='w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm'>
											1
										</div>
										<h5 className='text-xl font-semibold text-blue-700 dark:text-blue-300'>
											Favorite Items List
										</h5>
									</div>
									<p className='text-gray-700 dark:text-gray-300 mb-4'>
										Create a simple ListView of favorite items (hobbies, fruits,
										tasks) with the ability to add new items dynamically.
									</p>
									<div className='bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
										<h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-2'>
											Requirements:
										</h6>
										<ul className='text-sm text-gray-600 dark:text-gray-300 space-y-1'>
											<li>• Use StatefulWidget to manage the list state</li>
											<li>• Implement a form to add new items</li>
											<li>• Display items in a ListView.builder</li>
											<li>• Add delete functionality for each item</li>
											<li>
												• Use setState() to update the UI when adding/removing
												items
											</li>
										</ul>
									</div>
								</div>

								{/* Exercise 2: Image Gallery Grid */}
								<div className='bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 mb-6 border-l-4 border-green-500'>
									<div className='flex items-center gap-3 mb-4'>
										<div className='w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm'>
											2
										</div>
										<h5 className='text-xl font-semibold text-green-700 dark:text-green-300'>
											Image Gallery Grid
										</h5>
									</div>
									<p className='text-gray-700 dark:text-gray-300 mb-4'>
										Build a GridView to display a set of images or colored boxes
										with dynamic content management.
									</p>
									<div className='bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
										<h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-2'>
											Requirements:
										</h6>
										<ul className='text-sm text-gray-600 dark:text-gray-300 space-y-1'>
											<li>• Create a GridView with 3 columns</li>
											<li>
												• Display colored containers or placeholder images
											</li>
											<li>• Add a button to dynamically add new grid items</li>
											<li>• Implement item removal functionality</li>
											<li>• Use proper spacing and responsive design</li>
										</ul>
									</div>
								</div>

								{/* Exercise 3: Combined Form + List + Grid */}
								<div className='bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border-l-4 border-purple-500'>
									<div className='flex items-center gap-3 mb-4'>
										<div className='w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm'>
											3
										</div>
										<h5 className='text-xl font-semibold text-purple-700 dark:text-purple-300'>
											Complete App: Form + List + Grid
										</h5>
									</div>
									<p className='text-gray-700 dark:text-gray-300 mb-4'>
										Combine all concepts to build a complete app that uses forms
										to collect data and displays it in both list and grid
										formats.
									</p>
									<div className='bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
										<h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-2'>
											Requirements:
										</h6>
										<ul className='text-sm text-gray-600 dark:text-gray-300 space-y-1'>
											<li>
												• Create a form to collect user information (name,
												hobby, etc.)
											</li>
											<li>
												• Display collected data in a ListView below the form
											</li>
											<li>
												• Add a toggle to switch between list and grid views
											</li>
											<li>
												• Implement CRUD operations (Create, Read, Update,
												Delete)
											</li>
											<li>• Use proper state management and UI updates</li>
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

export default Day5;
