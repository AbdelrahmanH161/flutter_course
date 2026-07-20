import { useState, Suspense, lazy, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronDown,
  CheckCircle,
  Clock,
  Boxes,
  RefreshCw,
  MousePointerClick,
  List,
  ArrowRight,
} from 'lucide-react';

import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const SyntaxHighlighter = lazy(() => import('react-syntax-highlighter'));

const Loading = () => <div>Loading...</div>;

const sessions = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
    title: 'Buttons & Text Input',
    duration: '1 Hour',
    icon: <MousePointerClick className='w-6 h-6' />,
    content: {
      description:
        'Use the right button for each action priority, then collect user input with TextField and TextFormField — controllers, decoration, keyboard types, and validators.',
      topics: [
        'ElevatedButton, TextButton, OutlinedButton',
        'IconButton, FAB, DropdownButton',
        'TextField with controller and decoration',
        'TextFormField with validator',
        'keyboardType and onChanged',
      ],
      detailedTopics: {
        buttons: {
          title: 'Flutter Button Types',
          code: `class ButtonsDemo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Buttons')),
      floatingActionButton: FloatingActionButton(
        onPressed: () {},
        child: Icon(Icons.add),
      ),
      body: Padding(
        padding: EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Primary action
            ElevatedButton(
              onPressed: () {},
              child: Text('ElevatedButton — primary'),
            ),
            SizedBox(height: 12),

            // Secondary action
            OutlinedButton(
              onPressed: () {},
              child: Text('OutlinedButton — secondary'),
            ),
            SizedBox(height: 12),

            // Lowest emphasis
            TextButton(
              onPressed: () {},
              child: Text('TextButton — tertiary'),
            ),
            SizedBox(height: 12),

            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                IconButton(
                  icon: Icon(Icons.favorite),
                  onPressed: () {},
                ),
                DropdownButton<String>(
                  value: 'EGP',
                  items: ['EGP', 'USD', 'EUR']
                      .map((c) => DropdownMenuItem(value: c, child: Text(c)))
                      .toList(),
                  onChanged: (v) {},
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

/*
Priority guide:
  Elevated > Outlined > Text
  FAB for the single main page action
*/`,
        },
        textInput: {
          title: 'TextField & TextFormField',
          code: `class LoginFields extends StatefulWidget {
  @override
  _LoginFieldsState createState() => _LoginFieldsState();
}

class _LoginFieldsState extends State<LoginFields> {
  final emailController = TextEditingController();
  final passwordController = TextEditingController();

  @override
  void dispose() {
    emailController.dispose();
    passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.all(16),
      child: Column(
        children: [
          // Plain TextField
          TextField(
            controller: emailController,
            keyboardType: TextInputType.emailAddress,
            decoration: InputDecoration(
              labelText: 'Email',
              hintText: 'you@example.com',
              prefixIcon: Icon(Icons.email),
            ),
            onChanged: (value) {
              print('Email: \$value');
            },
          ),
          SizedBox(height: 16),

          // TextFormField with validator
          TextFormField(
            controller: passwordController,
            obscureText: true,
            decoration: InputDecoration(
              labelText: 'Password',
              prefixIcon: Icon(Icons.lock),
            ),
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'Password is required';
              }
              if (value.length < 6) {
                return 'At least 6 characters';
              }
              return null;
            },
            autovalidateMode: AutovalidateMode.onUserInteraction,
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
    id: 4,
    title: 'ListView & GridView',
    duration: '1 Hour',
    icon: <List className='w-6 h-6' />,
    content: {
      description:
        'Display dynamic collections efficiently with ListView.builder and ListView.separated, then build product catalogs with GridView.builder.',
      topics: [
        'ListView, ListView.builder, ListView.separated',
        'scrollDirection, physics, shrinkWrap',
        'GridView.count and GridView.builder',
        'SliverGridDelegateWithFixedCrossAxisCount',
        'ListView vs GridView — when to use each',
      ],
      detailedTopics: {
        listView: {
          title: 'ListView.builder & separated',
          code: `final products = [
  {'name': 'Laptop', 'price': 1200},
  {'name': 'Phone', 'price': 800},
  {'name': 'Headphones', 'price': 150},
  {'name': 'Keyboard', 'price': 90},
];

class ProductList extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ListView.separated(
      // physics: AlwaysScrollableScrollPhysics(),
      // shrinkWrap: true, // when nested inside Column
      itemCount: products.length,
      separatorBuilder: (_, __) => Divider(height: 1),
      itemBuilder: (context, index) {
        final p = products[index];
        return ListTile(
          leading: CircleAvatar(child: Text('\${index + 1}')),
          title: Text(p['name'] as String),
          subtitle: Text('\\$\${p['price']}'),
          trailing: Icon(Icons.chevron_right),
          onTap: () {},
        );
      },
    );
  }
}

/*
ListView          → small fixed children list
ListView.builder  → large / dynamic lists (lazy)
ListView.separated → builder + divider between items
*/`,
        },
        gridView: {
          title: 'GridView.builder Product Catalog',
          code: `class Product {
  final String name;
  final double price;
  final String imageUrl;

  const Product(this.name, this.price, this.imageUrl);
}

const products = [
  Product('Laptop', 1200, 'https://picsum.photos/200?1'),
  Product('Phone', 800, 'https://picsum.photos/200?2'),
  Product('Watch', 250, 'https://picsum.photos/200?3'),
  Product('Headphones', 150, 'https://picsum.photos/200?4'),
  Product('Camera', 540, 'https://picsum.photos/200?5'),
  Product('Tablet', 400, 'https://picsum.photos/200?6'),
];

class ProductGridPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Products')),
      body: GridView.builder(
        padding: EdgeInsets.all(12),
        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
          crossAxisSpacing: 12,
          mainAxisSpacing: 12,
          childAspectRatio: 0.75, // taller cards
        ),
        itemCount: products.length,
        itemBuilder: (context, index) {
          final p = products[index];
          return Card(
            clipBehavior: Clip.antiAlias,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Expanded(
                  child: Image.network(p.imageUrl, fit: BoxFit.cover),
                ),
                Padding(
                  padding: EdgeInsets.all(8),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        p.name,
                        style: TextStyle(fontWeight: FontWeight.bold),
                      ),
                      SizedBox(height: 4),
                      Text(
                        '\\$\${p.price.toStringAsFixed(0)}',
                        style: TextStyle(color: Colors.green[700]),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}

/*
Use GridView when items share a uniform card layout
Use ListView for rows of rich / varying content
*/`,
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
                  Layouts, State & UI Controls
                </h2>
                <p className='text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed'>
                  Build real UIs with advanced layouts, learn Stateful vs
                  Stateless, master buttons and text input, then display data
                  with ListView and GridView.
                </p>

                <motion.button
                  onClick={scrollToContent}
                  className='inline-flex items-center gap-2 bg-[#02569B] hover:bg-[#024A87] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}>
                  <ChevronDown className='w-5 h-5' />
                  Explore Layouts & UI Controls
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
                  4 hours covering advanced layouts, state, buttons, and data
                  display widgets.
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
                          Choose button emphasis wisely; use TextField and
                          TextFormField for input.
                        </span>
                      </li>
                      <li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
                        <CheckCircle className='w-5 h-5 text-[#02569B] mt-0.5 flex-shrink-0' />
                        <span>
                          ListView.builder for dynamic lists; GridView.builder
                          for uniform product cards.
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className='text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4'>
                      What's Next
                    </h4>
                    <p className='text-gray-600 dark:text-gray-300 mb-6'>
                      In Day 6, we'll apply Material theming, form validation,
                      and connect screens with Navigator, Named Routes, Dialogs,
                      and SnackBars.
                    </p>
                    <button className='inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors'>
                      Next: Day 6
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

export default Day5;
