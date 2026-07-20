import { useState, Suspense, lazy, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronDown,
  CheckCircle,
  Clock,
  Layers,
  Layout,
  Columns3,
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
    id: 3,
    title: 'Core Layout Widgets',
    duration: '1 Hour',
    icon: <Columns3 className='w-6 h-6' />,
    content: {
      description:
        'Master the building blocks of every Flutter screen: Column, Row, Container, SizedBox, Center, Padding, and Expanded — including alignment and flex sizing.',
      topics: [
        'Column and Row with mainAxisAlignment / crossAxisAlignment',
        'Container for decoration, padding, and constraints',
        'SizedBox for fixed gaps and sizes',
        'Center and Padding helpers',
        'Expanded and Flexible for flex layouts',
      ],
      detailedTopics: {
        columnRow: {
          title: 'Column, Row & Alignment',
          code: `class LayoutBasics extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Layouts')),
      body: Column(
        // Vertical arrangement
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Container(
            color: Colors.blue,
            height: 60,
            child: Center(child: Text('Top', style: TextStyle(color: Colors.white))),
          ),
          SizedBox(height: 12),
          Row(
            // Horizontal arrangement
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              Icon(Icons.star, color: Colors.amber, size: 40),
              Icon(Icons.favorite, color: Colors.red, size: 40),
              Icon(Icons.thumb_up, color: Colors.blue, size: 40),
            ],
          ),
          SizedBox(height: 12),
          Container(
            color: Colors.teal,
            height: 60,
            child: Center(child: Text('Bottom', style: TextStyle(color: Colors.white))),
          ),
        ],
      ),
    );
  }
}`,
        },
        expanded: {
          title: 'Expanded & Flex Sizing',
          code: `class FlexExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        // Takes 1 part of remaining space
        Expanded(
          flex: 1,
          child: Container(
            height: 80,
            color: Colors.red,
            child: Center(child: Text('1')),
          ),
        ),
        // Takes 2 parts of remaining space
        Expanded(
          flex: 2,
          child: Container(
            height: 80,
            color: Colors.green,
            child: Center(child: Text('2')),
          ),
        ),
        // Fixed width — does not expand
        Container(
          width: 60,
          height: 80,
          color: Colors.blue,
          child: Center(child: Text('Fixed')),
        ),
      ],
    );
  }
}

/*
Tips:
  - Expanded must be a child of Row / Column / Flex
  - Use SizedBox(width/height) for fixed gaps
  - Padding wraps a child; Container can combine
    color + padding + margin + decoration
*/`,
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
                  Start your Flutter journey: understand what Flutter is, plan
                  UIs like a pro, and master the core layout widgets that power
                  every screen.
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
                  3 hours from Flutter intro and UI planning to core layout
                  widgets.
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
                          Plan UIs in five steps before writing code: requirements,
                          components, widgets, tree, interactions.
                        </span>
                      </li>
                      <li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
                        <CheckCircle className='w-5 h-5 text-[#02569B] mt-0.5 flex-shrink-0' />
                        <span>
                          Column, Row, Expanded, and Container drive most layout
                          decisions.
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className='text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4'>
                      What's Next
                    </h4>
                    <p className='text-gray-600 dark:text-gray-300 mb-6'>
                      In Day 5, we'll dive into advanced layouts, Stateful vs
                      Stateless widgets, buttons, text input, ListView, and
                      GridView.
                    </p>
                    <button className='inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors'>
                      Next: Day 5
                      <ArrowRight className='w-5 h-5' />
                    </button>
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
