import { useState, Suspense, lazy, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronDown,
  CheckCircle,
  Clock,
  Columns3,
  Boxes,
  RefreshCw,
  ToggleLeft,
  ArrowRight,
} from 'lucide-react';

import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const SyntaxHighlighter = lazy(() => import('react-syntax-highlighter'));

const Loading = () => <div>Loading...</div>;

const sessions = [
  {
    id: 1,
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
  {
    id: 2,
    title: 'Advanced Layouts & Core Widgets',
    duration: '1 Hour',
    icon: <Boxes className='w-6 h-6' />,
    content: {
      description:
        'Go beyond basics with Stack, Wrap, and SingleChildScrollView, then master Scaffold, AppBar, Text, Image, Icon, Card, and ListTile — including a Settings page pattern.',
      topics: [
        'Stack and overlapping widgets',
        'Wrap for flowing chips / tags',
        'SingleChildScrollView for overflow',
        'AppBar, Scaffold, Text, Image, Icon',
        'Card + ListTile Settings page pattern',
      ],
      detailedTopics: {
        stackAndScroll: {
          title: 'Stack, Wrap & ScrollView',
          code: `class AdvancedLayouts extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Column(
          children: [
            // Stack — overlay widgets
            SizedBox(
              height: 200,
              child: Stack(
                children: [
                  Image.network(
                    'https://picsum.photos/400/200',
                    width: double.infinity,
                    fit: BoxFit.cover,
                  ),
                  Positioned(
                    bottom: 16,
                    left: 16,
                    child: CircleAvatar(
                      radius: 36,
                      backgroundImage: NetworkImage(
                        'https://i.pravatar.cc/150',
                      ),
                    ),
                  ),
                ],
              ),
            ),
            SizedBox(height: 16),

            // Wrap — auto-flow children
            Padding(
              padding: EdgeInsets.all(16),
              child: Wrap(
                spacing: 8,
                runSpacing: 8,
                children: [
                  Chip(label: Text('Flutter')),
                  Chip(label: Text('Dart')),
                  Chip(label: Text('Material')),
                  Chip(label: Text('Provider')),
                  Chip(label: Text('HTTP')),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}`,
        },
        settingsPage: {
          title: 'Settings Page with Card & ListTile',
          code: `class SettingsPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Settings'),
        leading: IconButton(
          icon: Icon(Icons.arrow_back),
          onPressed: () {},
        ),
        actions: [
          IconButton(icon: Icon(Icons.search), onPressed: () {}),
        ],
      ),
      body: ListView(
        padding: EdgeInsets.all(16),
        children: [
          // Profile header
          Card(
            child: ListTile(
              leading: CircleAvatar(child: Icon(Icons.person)),
              title: Text('Sara Ali'),
              subtitle: Text('sara@example.com'),
              trailing: Icon(Icons.chevron_right),
              onTap: () {},
            ),
          ),
          SizedBox(height: 12),

          Card(
            child: Column(
              children: [
                ListTile(
                  leading: Icon(Icons.notifications),
                  title: Text('Notifications'),
                  trailing: Icon(Icons.chevron_right),
                  onTap: () {},
                ),
                Divider(height: 1),
                ListTile(
                  leading: Icon(Icons.lock),
                  title: Text('Privacy'),
                  trailing: Icon(Icons.chevron_right),
                  onTap: () {},
                ),
                Divider(height: 1),
                ListTile(
                  leading: Icon(Icons.language),
                  title: Text('Language'),
                  subtitle: Text('English'),
                  trailing: Icon(Icons.chevron_right),
                  onTap: () {},
                ),
              ],
            ),
          ),
        ],
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
    title: 'Stateful vs Stateless Widgets',
    duration: '1 Hour',
    icon: <RefreshCw className='w-6 h-6' />,
    content: {
      description:
        'Learn when UI can stay static versus when it must react to user input. Understand StatefulWidget anatomy, createState, setState(), and the widget lifecycle.',
      topics: [
        'StatelessWidget: immutable UI',
        'StatefulWidget + State class anatomy',
        'createState() and setState()',
        'Lifecycle overview (initState, build, dispose)',
        'Counter example with comparison table',
      ],
      detailedTopics: {
        comparison: {
          title: 'Stateless vs Stateful',
          code: `// Stateless — data never changes after build
class Greeting extends StatelessWidget {
  final String name;

  const Greeting({Key? key, required this.name}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Text('Hello, \$name!');
  }
}

// Stateful — UI can change over time
class CounterPage extends StatefulWidget {
  @override
  _CounterPageState createState() => _CounterPageState();
}

class _CounterPageState extends State<CounterPage> {
  int count = 0; // mutable state lives in State

  @override
  void initState() {
    super.initState();
    // Called once when the State is created
  }

  void increment() {
    setState(() {
      count++; // notifies Flutter to rebuild
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Counter')),
      body: Center(
        child: Text('Count: \$count', style: TextStyle(fontSize: 32)),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: increment,
        child: Icon(Icons.add),
      ),
    );
  }

  @override
  void dispose() {
    // Clean up controllers / listeners here
    super.dispose();
  }
}

/*
When to use which?
  Stateless → labels, icons, static layouts
  Stateful  → forms, toggles, counters, animations
*/`,
        },
      },
    },
  },
  {
    id: 4,
    title: 'Practical Lab — Toggle Controls',
    duration: '1 Hour',
    icon: <ToggleLeft className='w-6 h-6' />,
    content: {
      description:
        'Build a Preferences Screen combining Switch, Radio, and Checkbox controls — applying StatefulWidget and setState in a real lab.',
      topics: [
        'Switch and SwitchListTile',
        'Radio and RadioListTile with enums',
        'Checkbox and CheckboxListTile',
        'Combining all controls in one screen',
        'Persisting selections in local state',
      ],
      detailedTopics: {
        preferenceScreen: {
          title: 'Preferences Screen Lab',
          code: `enum Gender { male, female, other }

class PreferencesScreen extends StatefulWidget {
  @override
  _PreferencesScreenState createState() => _PreferencesScreenState();
}

class _PreferencesScreenState extends State<PreferencesScreen> {
  bool darkMode = false;
  bool notifications = true;
  Gender gender = Gender.male;
  bool acceptTerms = false;
  bool newsletter = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Preferences')),
      body: ListView(
        children: [
          // Switches
          SwitchListTile(
            title: Text('Dark Mode'),
            subtitle: Text('Use dark theme'),
            secondary: Icon(Icons.dark_mode),
            value: darkMode,
            onChanged: (v) => setState(() => darkMode = v),
          ),
          SwitchListTile(
            title: Text('Notifications'),
            secondary: Icon(Icons.notifications),
            value: notifications,
            onChanged: (v) => setState(() => notifications = v),
          ),
          Divider(),

          // Radio group
          Padding(
            padding: EdgeInsets.fromLTRB(16, 12, 16, 4),
            child: Text('Gender', style: TextStyle(fontWeight: FontWeight.bold)),
          ),
          RadioListTile<Gender>(
            title: Text('Male'),
            value: Gender.male,
            groupValue: gender,
            onChanged: (v) => setState(() => gender = v!),
          ),
          RadioListTile<Gender>(
            title: Text('Female'),
            value: Gender.female,
            groupValue: gender,
            onChanged: (v) => setState(() => gender = v!),
          ),
          RadioListTile<Gender>(
            title: Text('Other'),
            value: Gender.other,
            groupValue: gender,
            onChanged: (v) => setState(() => gender = v!),
          ),
          Divider(),

          // Checkboxes
          CheckboxListTile(
            title: Text('Accept Terms & Conditions'),
            value: acceptTerms,
            onChanged: (v) => setState(() => acceptTerms = v!),
          ),
          CheckboxListTile(
            title: Text('Subscribe to newsletter'),
            value: newsletter,
            onChanged: (v) => setState(() => newsletter = v!),
          ),
          SizedBox(height: 24),

          Padding(
            padding: EdgeInsets.symmetric(horizontal: 16),
            child: ElevatedButton(
              onPressed: acceptTerms
                  ? () {
                      // Save preferences...
                    }
                  : null, // disabled until terms accepted
              child: Text('Save Preferences'),
            ),
          ),
        ],
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
                  Layouts, Widgets & State
                </h2>
                <p className='text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed'>
                  Build real UIs with layout and Material widgets, then learn
                  Stateful vs Stateless and finish with a Preferences Screen of
                  switches, radios, and checkboxes.
                </p>

                <motion.button
                  onClick={scrollToContent}
                  className='inline-flex items-center gap-2 bg-[#02569B] hover:bg-[#024A87] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}>
                  <ChevronDown className='w-5 h-5' />
                  Explore Layouts & State
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
                  4 hours covering layouts, core widgets, state, and a toggle
                  controls lab.
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
                          Column, Row, Expanded, and Container drive most layout
                          decisions.
                        </span>
                      </li>
                      <li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
                        <CheckCircle className='w-5 h-5 text-[#02569B] mt-0.5 flex-shrink-0' />
                        <span>
                          Stack, Wrap, Card, and ListTile unlock richer screens
                          like Settings pages.
                        </span>
                      </li>
                      <li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
                        <CheckCircle className='w-5 h-5 text-[#02569B] mt-0.5 flex-shrink-0' />
                        <span>
                          Use StatefulWidget + setState when UI must change;
                          Stateless for static UI.
                        </span>
                      </li>
                      <li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
                        <CheckCircle className='w-5 h-5 text-[#02569B] mt-0.5 flex-shrink-0' />
                        <span>
                          Switch, Radio, and Checkbox are the core Material
                          toggle controls.
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className='text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4'>
                      What's Next
                    </h4>
                    <p className='text-gray-600 dark:text-gray-300 mb-6'>
                      In Day 6, we'll apply Material theming, buttons, text
                      input and form validation, then display data with ListView
                      and GridView.
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
                  Hands-on Exercise
                </h3>

                <div className='bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border-l-4 border-blue-500'>
                  <div className='flex items-center gap-3 mb-4'>
                    <div className='w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm'>
                      📝
                    </div>
                    <h5 className='text-xl font-semibold text-blue-700 dark:text-blue-300'>
                      Task: Preferences Screen with Toggle Controls
                    </h5>
                  </div>

                  <div className='mb-6'>
                    <h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-2 text-lg'>
                      Objective
                    </h6>
                    <p className='text-gray-700 dark:text-gray-300'>
                      Build a Preferences Screen using StatefulWidget that
                      combines Switch, Radio, and Checkbox controls, and enables
                      Save only when terms are accepted.
                    </p>
                  </div>

                  <div className='mb-6'>
                    <h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-3 text-lg'>
                      Requirements
                    </h6>
                    <div className='space-y-4'>
                      <div className='bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
                        <ul className='text-sm text-gray-600 dark:text-gray-300 space-y-1'>
                          <li>• Dark Mode + Notifications SwitchListTiles</li>
                          <li>• Gender RadioListTiles using an enum</li>
                          <li>• Accept Terms + Newsletter CheckboxListTiles</li>
                          <li>• Save button disabled until terms are accepted</li>
                          <li>• Use ListView so the page scrolls on small screens</li>
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
                        <li>• Add a PaymentMethod radio group (Cash / Card / Wallet)</li>
                        <li>• Show a SnackBar when Save succeeds</li>
                        <li>• Split sections into reusable widgets</li>
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

export default Day5;
