import { useState, Suspense, lazy, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronDown,
  CheckCircle,
  Clock,
  Layers,
  Building2,
  Layout,
  User,
  ArrowRight,
} from 'lucide-react';

import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const SyntaxHighlighter = lazy(() => import('react-syntax-highlighter'));

const Loading = () => <div>Loading...</div>;

const sessions = [
  {
    id: 1,
    title: 'What is Flutter?',
    duration: '1 Hour',
    icon: <Layers className='w-6 h-6' />,
    content: {
      description:
        'Discover Flutter as Google\'s cross-platform UI toolkit. Learn how Dart and Flutter work together, why everything is a widget, and the difference between Hot Reload and Hot Restart.',
      topics: [
        'Cross-platform development with one codebase',
        'Dart + Flutter relationship',
        'Widget concept and immutability',
        'Basic Flutter widgets overview',
        'Hot Reload vs Hot Restart',
      ],
      detailedTopics: {
        whatIsFlutter: {
          title: 'What is Flutter?',
          code: `/*
Flutter is Google's UI toolkit for building
natively compiled applications for:
  • Android
  • iOS
  • Web
  • Desktop (Windows, macOS, Linux)

Key ideas:
  - Single codebase → multiple platforms
  - Written in Dart
  - Rich set of pre-built Material & Cupertino widgets
  - Custom rendering engine (Skia / Impeller)
  - Fast development with Hot Reload
*/

void main() {
  // Entry point of every Flutter app
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Hello Flutter',
      home: Scaffold(
        appBar: AppBar(title: Text('Hello Flutter')),
        body: Center(
          child: Text('Welcome to Flutter!'),
        ),
      ),
    );
  }
}`,
        },
        widgetConcept: {
          title: 'Everything is a Widget',
          code: `/*
In Flutter, the entire UI is built from widgets.
Widgets are immutable descriptions of UI.

Common basic widgets:
  MaterialApp  → root of a Material Design app
  Scaffold     → page structure (AppBar, body, FAB...)
  AppBar       → top navigation bar
  Text         → display text
  Container    → box with padding, color, decoration
  Row / Column → horizontal / vertical layouts
  Icon         → Material icons
  Image        → display images (asset or network)
*/

// Simple StatelessWidget example
class MyText extends StatelessWidget {
  final String message;

  const MyText({Key? key, required this.message}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // build() returns the widget tree for this component
    return Text(
      message,
      style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
    );
  }
}`,
        },
        hotReload: {
          title: 'Hot Reload vs Hot Restart',
          code: `/*
Hot Reload:
  - Injects updated code into the running Dart VM
  - Preserves app state (counters, form values, scroll...)
  - Best for UI tweaks and small logic changes
  - Shortcut: usually "r" in terminal / lightning bolt in IDE

Hot Restart:
  - Re-runs main() from scratch
  - Resets all in-memory state
  - Use when Hot Reload is not enough
    (e.g., changing initState, enums, main())
  - Shortcut: usually "R" in terminal

Tip: Prefer Hot Reload during UI building.
Use Hot Restart after structural / init changes.
*/`,
        },
      },
    },
  },
  {
    id: 2,
    title: 'Flutter Architecture',
    duration: '1 Hour',
    icon: <Building2 className='w-6 h-6' />,
    content: {
      description:
        'Understand Flutter\'s layered architecture — from your Dart app down to the platform embedder — and how the widget tree drives rendering.',
      topics: [
        'Four layers: Application → Framework → Engine → Embedder',
        'Custom rendering engine overview',
        'Widget tree structure',
        'How UI updates flow through layers',
        'Why architecture matters for performance',
      ],
      detailedTopics: {
        fourLayers: {
          title: 'Flutter Architecture Layers',
          code: `/*
┌─────────────────────────────────────┐
│  1. Application Layer               │
│     Your Dart code (widgets, logic) │
├─────────────────────────────────────┤
│  2. Framework Layer (Dart)          │
│     Material / Cupertino / Widgets  │
│     Rendering, Animation, Gestures  │
├─────────────────────────────────────┤
│  3. Engine Layer (C++)              │
│     Skia / Impeller rendering       │
│     Dart runtime, text layout       │
├─────────────────────────────────────┤
│  4. Embedder Layer                  │
│     Platform-specific (Android/iOS) │
│     Window, input, thread setup     │
└─────────────────────────────────────┘

Your code talks to the Framework.
The Framework talks to the Engine.
The Embedder hosts everything on the OS.
*/

void main() {
  runApp(
    // Application Layer
    MaterialApp(
      // Framework → Material widgets
      home: Scaffold(
        body: Center(child: Text('Architecture demo')),
      ),
    ),
  );
}`,
        },
        widgetTree: {
          title: 'Widget Tree Structure',
          code: `/*
Typical widget tree:

MaterialApp
 └─ Scaffold
     ├─ AppBar
     │   └─ Text ("Home")
     └─ body: Center
         └─ Column
             ├─ Text ("Hello")
             ├─ Icon (Icons.star)
             └─ ElevatedButton
                 └─ Text ("Click me")

Rules of thumb:
  - Parent widgets control layout of children
  - Prefer shallow, readable trees
  - Extract repeated UI into small widgets
*/

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Home')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text('Hello'),
            Icon(Icons.star, color: Colors.amber),
            ElevatedButton(
              onPressed: () {},
              child: Text('Click me'),
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
    title: 'UI Planning & First App',
    duration: '1 Hour',
    icon: <Layout className='w-6 h-6' />,
    content: {
      description:
        'Learn a practical 5-step process to plan any screen, decompose designs into widgets, and build your first Flutter page with Scaffold, AppBar, Column, and Text.',
      topics: [
        '5-step UI planning process',
        'Decomposing a screen into components',
        'Mapping components to Flutter widgets',
        'Scaffold, AppBar, Column, Text walkthrough',
        'Building a complete StatelessWidget page',
      ],
      detailedTopics: {
        planningSteps: {
          title: '5-Step UI Planning Process',
          code: `/*
Step 1 — Requirements
  What does the screen show? What can the user do?

Step 2 — Components
  Break the design into boxes:
  header, avatar, title, body, actions...

Step 3 — Widgets
  Map each box to a Flutter widget:
  AppBar, CircleAvatar, Text, Row, Column...

Step 4 — Widget Tree
  Sketch parent → child relationships on paper.

Step 5 — Interactions
  Buttons, taps, navigation, loading states.

Example: Profile Screen decomposition
  • Cover image        → Image / Container
  • Avatar             → CircleAvatar (in Stack)
  • Name + bio         → Column of Text
  • Stats row          → Row of Column(s)
  • Action buttons     → ElevatedButton / IconButton
*/`,
        },
        firstApp: {
          title: 'First Flutter App Walkthrough',
          code: `import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'My First App',
      theme: ThemeData(primarySwatch: Colors.blue),
      home: const HomePage(),
    );
  }
}

class HomePage extends StatelessWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('My First App'),
        centerTitle: true,
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.flutter_dash, size: 80, color: Colors.blue),
            SizedBox(height: 16),
            Text(
              'Hello, Flutter!',
              style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 8),
            Text(
              'One codebase, many platforms',
              style: TextStyle(fontSize: 16, color: Colors.grey[600]),
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
    id: 4,
    title: 'Practical Lab — Profile Card',
    duration: '1 Hour',
    icon: <User className='w-6 h-6' />,
    content: {
      description:
        'Apply widget-tree thinking by building a static Profile Card: avatar, name, bio, stats row, and social icon buttons — no state management required yet.',
      topics: [
        'CircleAvatar for profile pictures',
        'Column + Row composition',
        'Stats row (posts / followers / following)',
        'IconButton for social actions',
        'Card + Padding for polished layout',
      ],
      detailedTopics: {
        profileCard: {
          title: 'Complete Profile Card Example',
          code: `import 'package:flutter/material.dart';

void main() => runApp(MaterialApp(home: ProfileCardPage()));

class ProfileCardPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[100],
      appBar: AppBar(title: Text('Profile Card'), centerTitle: true),
      body: Center(
        child: Card(
          margin: EdgeInsets.all(24),
          elevation: 4,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
          ),
          child: Padding(
            padding: EdgeInsets.all(24),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                // Avatar
                CircleAvatar(
                  radius: 50,
                  backgroundImage: NetworkImage(
                    'https://i.pravatar.cc/150?img=12',
                  ),
                ),
                SizedBox(height: 16),

                // Name
                Text(
                  'Ahmed Hassan',
                  style: TextStyle(
                    fontSize: 22,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                SizedBox(height: 4),

                // Bio
                Text(
                  'Flutter Developer | ITI Graduate',
                  style: TextStyle(color: Colors.grey[600], fontSize: 14),
                  textAlign: TextAlign.center,
                ),
                SizedBox(height: 20),

                // Stats row
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    _StatColumn(label: 'Posts', value: '24'),
                    _StatColumn(label: 'Followers', value: '1.2K'),
                    _StatColumn(label: 'Following', value: '180'),
                  ],
                ),
                SizedBox(height: 20),
                Divider(),
                SizedBox(height: 8),

                // Social icons
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    IconButton(
                      icon: Icon(Icons.email, color: Colors.blue),
                      onPressed: () {},
                    ),
                    IconButton(
                      icon: Icon(Icons.link, color: Colors.teal),
                      onPressed: () {},
                    ),
                    IconButton(
                      icon: Icon(Icons.share, color: Colors.orange),
                      onPressed: () {},
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _StatColumn extends StatelessWidget {
  final String label;
  final String value;

  const _StatColumn({required this.label, required this.value});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text(
          value,
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
        SizedBox(height: 4),
        Text(label, style: TextStyle(color: Colors.grey[600], fontSize: 12)),
      ],
    );
  }
}`,
        },
      },
    },
  },
];

const Day4 = () => {
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
                  Day 4
                </h1>
                <h2 className='text-3xl md:text-5xl font-bold text-[#02569B] mb-8'>
                  Flutter Foundations
                </h2>
                <p className='text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed'>
                  Start your Flutter journey: understand what Flutter is, explore
                  its architecture layers, plan UIs like a pro, and build your
                  first Profile Card hands-on.
                </p>

                <motion.button
                  onClick={scrollToContent}
                  className='inline-flex items-center gap-2 bg-[#02569B] hover:bg-[#024A87] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}>
                  <ChevronDown className='w-5 h-5' />
                  Explore Flutter Foundations
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
                  4 hours from Flutter intro and architecture to your first
                  practical Profile Card lab.
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
                  Day 4 Summary
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
                          Flutter builds natively compiled apps from one Dart
                          codebase using immutable widgets.
                        </span>
                      </li>
                      <li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
                        <CheckCircle className='w-5 h-5 text-[#02569B] mt-0.5 flex-shrink-0' />
                        <span>
                          Architecture layers: Application → Framework → Engine
                          → Embedder.
                        </span>
                      </li>
                      <li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
                        <CheckCircle className='w-5 h-5 text-[#02569B] mt-0.5 flex-shrink-0' />
                        <span>
                          Plan UIs in five steps before writing code: requirements,
                          components, widgets, tree, interactions.
                        </span>
                      </li>
                      <li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
                        <CheckCircle className='w-5 h-5 text-[#02569B] mt-0.5 flex-shrink-0' />
                        <span>
                          Compose layouts with Scaffold, Column, Row, and Card
                          — as in the Profile Card lab.
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className='text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4'>
                      What's Next
                    </h4>
                    <p className='text-gray-600 dark:text-gray-300 mb-6'>
                      In Day 5, we'll dive into layout widgets, core Material
                      widgets, and learn Stateful vs Stateless widgets with
                      toggle controls.
                    </p>
                    <button className='inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors'>
                      Next: Day 5
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

                <div className='bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border-l-4 border-blue-500'>
                  <div className='flex items-center gap-3 mb-4'>
                    <div className='w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm'>
                      📝
                    </div>
                    <h5 className='text-xl font-semibold text-blue-700 dark:text-blue-300'>
                      Task: Build a Static Profile Card
                    </h5>
                  </div>

                  <div className='mb-6'>
                    <h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-2 text-lg'>
                      Objective
                    </h6>
                    <p className='text-gray-700 dark:text-gray-300'>
                      Create a polished Profile Card screen using only
                      StatelessWidgets. Practice widget-tree thinking: avatar,
                      name, bio, stats, and social actions.
                    </p>
                  </div>

                  <div className='mb-6'>
                    <h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-3 text-lg'>
                      Requirements
                    </h6>

                    <div className='space-y-4'>
                      <div className='bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
                        <h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-2 block'>
                          Profile Header
                        </h6>
                        <ul className='text-sm text-gray-600 dark:text-gray-300 space-y-1'>
                          <li>• CircleAvatar with a network or asset image</li>
                          <li>• Name as a bold Text widget</li>
                          <li>• Short bio / job title under the name</li>
                        </ul>
                      </div>

                      <div className='bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
                        <h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-2 block'>
                          Stats Row
                        </h6>
                        <ul className='text-sm text-gray-600 dark:text-gray-300 space-y-1'>
                          <li>• Row with three columns: Posts, Followers, Following</li>
                          <li>• Each column shows a number + label</li>
                          <li>• Extract a small reusable StatColumn widget</li>
                        </ul>
                      </div>

                      <div className='bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
                        <h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-2 block'>
                          Social Actions
                        </h6>
                        <ul className='text-sm text-gray-600 dark:text-gray-300 space-y-1'>
                          <li>• Row of IconButtons (email, link, share...)</li>
                          <li>• Wrap everything in a Card with padding</li>
                          <li>• Center the card on the screen</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-2 text-lg'>
                      👉 Bonus Challenge
                    </h6>
                    <div className='bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-700'>
                      <ul className='text-sm text-gray-600 dark:text-gray-300 space-y-1'>
                        <li>• Add a cover image above the avatar using Stack</li>
                        <li>• Style with BoxDecoration and border radius</li>
                        <li>• Add a "Follow" ElevatedButton below the stats</li>
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

export default Day4;
