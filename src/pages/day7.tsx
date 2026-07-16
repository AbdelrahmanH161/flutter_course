import { useState, Suspense, lazy, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronDown,
  CheckCircle,
  Clock,
  Navigation,
  Route,
  MessageSquare,
  Layers,
  ArrowRight,
} from 'lucide-react';

import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const SyntaxHighlighter = lazy(() => import('react-syntax-highlighter'));

const Loading = () => <div>Loading...</div>;

const sessions = [
  {
    id: 1,
    title: 'Screen Navigation',
    duration: '1 Hour',
    icon: <Navigation className='w-6 h-6' />,
    content: {
      description:
        'Understand the Navigator stack and move between screens with MaterialPageRoute — push, pop, pass data via constructors, and return results with await.',
      topics: [
        'Navigator stack concept',
        'Navigator.push and Navigator.pop',
        'MaterialPageRoute',
        'Passing data via constructor',
        'Returning data with await Navigator.push',
      ],
      detailedTopics: {
        pushPop: {
          title: 'push, pop & MaterialPageRoute',
          code: `class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Home')),
      body: Center(
        child: ElevatedButton(
          child: Text('Open Details'),
          onPressed: () {
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => DetailsPage(title: 'Flutter Course'),
              ),
            );
          },
        ),
      ),
    );
  }
}

class DetailsPage extends StatelessWidget {
  final String title;

  const DetailsPage({Key? key, required this.title}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(title)),
      body: Center(
        child: ElevatedButton(
          child: Text('Go Back'),
          onPressed: () {
            Navigator.pop(context); // remove this route from the stack
          },
        ),
      ),
    );
  }
}`,
        },
        returnData: {
          title: 'Passing & Returning Data',
          code: `// Home → Edit → return updated name
class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  String name = 'Guest';

  Future<void> _editName() async {
    final result = await Navigator.push<String>(
      context,
      MaterialPageRoute(
        builder: (_) => EditNamePage(currentName: name),
      ),
    );

    if (result != null) {
      setState(() => name = result);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Welcome, \$name')),
      floatingActionButton: FloatingActionButton(
        onPressed: _editName,
        child: Icon(Icons.edit),
      ),
    );
  }
}

class EditNamePage extends StatefulWidget {
  final String currentName;
  const EditNamePage({required this.currentName});

  @override
  _EditNamePageState createState() => _EditNamePageState();
}

class _EditNamePageState extends State<EditNamePage> {
  late TextEditingController controller;

  @override
  void initState() {
    super.initState();
    controller = TextEditingController(text: widget.currentName);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Edit Name')),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          children: [
            TextField(controller: controller),
            SizedBox(height: 16),
            ElevatedButton(
              onPressed: () => Navigator.pop(context, controller.text),
              child: Text('Save'),
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
    id: 2,
    title: 'Named Routes',
    duration: '1 Hour',
    icon: <Route className='w-6 h-6' />,
    content: {
      description:
        'Centralize navigation with a route table in MaterialApp. Use pushNamed, arguments, pushReplacement, and know when Named Routes beat MaterialPageRoute.',
      topics: [
        'Defining routes in MaterialApp',
        'Navigator.pushNamed and pushReplacementNamed',
        'Passing arguments via route settings',
        'Reading arguments with ModalRoute',
        'MaterialPageRoute vs Named Routes comparison',
      ],
      detailedTopics: {
        namedRoutes: {
          title: 'Named Routes Setup',
          code: `void main() {
  runApp(MaterialApp(
    initialRoute: '/',
    routes: {
      '/': (context) => HomePage(),
      '/details': (context) => DetailsPage(),
      '/about': (context) => AboutPage(),
    },
  ));
}

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Home')),
      body: Column(
        children: [
          ElevatedButton(
            child: Text('Open Details'),
            onPressed: () {
              Navigator.pushNamed(
                context,
                '/details',
                arguments: {'id': 42, 'title': 'Flutter'},
              );
            },
          ),
          ElevatedButton(
            child: Text('Replace with About'),
            onPressed: () {
              // Removes current route, then pushes /about
              Navigator.pushReplacementNamed(context, '/about');
            },
          ),
        ],
      ),
    );
  }
}

class DetailsPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final args =
        ModalRoute.of(context)!.settings.arguments as Map<String, dynamic>;

    return Scaffold(
      appBar: AppBar(title: Text(args['title'])),
      body: Center(child: Text('Item ID: \${args['id']}')),
    );
  }
}`,
        },
        comparison: {
          title: 'MaterialPageRoute vs Named Routes',
          code: `/*
MaterialPageRoute
  ✅ Simple, type-safe constructor params
  ✅ Great for prototypes / small apps
  ❌ Hard to see all routes in one place
  ❌ Deep linking needs extra work

Named Routes
  ✅ Central route table in MaterialApp
  ✅ Easy to navigate from anywhere by string
  ✅ Better for medium apps & splash→login flows
  ❌ Arguments need casting
  ❌ Less compile-time safety

Tip: You can mix both in the same app.
For large apps later, consider go_router.
*/`,
        },
      },
    },
  },
  {
    id: 3,
    title: 'Dialogs & SnackBars',
    duration: '1 Hour',
    icon: <MessageSquare className='w-6 h-6' />,
    content: {
      description:
        'Give users clear feedback: blocking confirmations with AlertDialog, and lightweight messages with SnackBar via ScaffoldMessenger.',
      topics: [
        'showDialog + AlertDialog',
        'Confirm delete pattern',
        'Custom Dialog widgets',
        'SnackBar via ScaffoldMessenger',
        'SnackBar with action button',
      ],
      detailedTopics: {
        dialogs: {
          title: 'AlertDialog Confirm Delete',
          code: `Future<void> confirmDelete(BuildContext context, VoidCallback onConfirm) async {
  final result = await showDialog<bool>(
    context: context,
    builder: (context) => AlertDialog(
      title: Text('Delete item?'),
      content: Text('This action cannot be undone.'),
      actions: [
        TextButton(
          onPressed: () => Navigator.pop(context, false),
          child: Text('Cancel'),
        ),
        ElevatedButton(
          onPressed: () => Navigator.pop(context, true),
          style: ElevatedButton.styleFrom(backgroundColor: Colors.red),
          child: Text('Delete'),
        ),
      ],
    ),
  );

  if (result == true) {
    onConfirm();
  }
}

// Custom simple dialog
void showInfoDialog(BuildContext context) {
  showDialog(
    context: context,
    builder: (_) => Dialog(
      child: Padding(
        padding: EdgeInsets.all(24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(Icons.info, size: 48, color: Colors.blue),
            SizedBox(height: 12),
            Text('Custom Dialog Content'),
            SizedBox(height: 16),
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: Text('Close'),
            ),
          ],
        ),
      ),
    ),
  );
}`,
        },
        snackbars: {
          title: 'SnackBar Feedback',
          code: `void showSimpleSnackBar(BuildContext context, String message) {
  ScaffoldMessenger.of(context).showSnackBar(
    SnackBar(
      content: Text(message),
      duration: Duration(seconds: 2),
    ),
  );
}

void showSnackBarWithAction(BuildContext context) {
  ScaffoldMessenger.of(context).showSnackBar(
    SnackBar(
      content: Text('Item deleted'),
      backgroundColor: Colors.black87,
      action: SnackBarAction(
        label: 'UNDO',
        textColor: Colors.amber,
        onPressed: () {
          // Restore the item
        },
      ),
    ),
  );
}

/*
Use Dialog when the user MUST decide (delete, logout...).
Use SnackBar for brief status (saved, error, offline...).
*/`,
        },
      },
    },
  },
  {
    id: 4,
    title: 'Practical Lab — Master-Detail App',
    duration: '1 Hour',
    icon: <Layers className='w-6 h-6' />,
    content: {
      description:
        'Build a list-to-details flow: tap an item to open DetailsPage (constructor or Named Route), navigate back, and delete with a confirmation dialog.',
      topics: [
        'Item model + ListView of cards',
        'Navigate to DetailsPage with data',
        'Back navigation',
        'Delete with confirmation dialog',
        'Hybrid Named Route + MaterialPageRoute',
      ],
      detailedTopics: {
        masterDetail: {
          title: 'Master-Detail Lab',
          code: `class Item {
  final int id;
  final String title;
  final String description;

  const Item(this.id, this.title, this.description);
}

final items = [
  Item(1, 'Flutter', 'Cross-platform UI toolkit'),
  Item(2, 'Dart', 'Programming language for Flutter'),
  Item(3, 'Provider', 'Simple state management'),
];

void main() {
  runApp(MaterialApp(
    initialRoute: '/',
    routes: {
      '/': (context) => ItemsListPage(),
      '/details': (context) => DetailsPage(),
    },
  ));
}

class ItemsListPage extends StatefulWidget {
  @override
  _ItemsListPageState createState() => _ItemsListPageState();
}

class _ItemsListPageState extends State<ItemsListPage> {
  late List<Item> data;

  @override
  void initState() {
    super.initState();
    data = List.from(items);
  }

  Future<void> _deleteItem(Item item) async {
    final ok = await showDialog<bool>(
      context: context,
      builder: (_) => AlertDialog(
        title: Text('Delete \${item.title}?'),
        content: Text('This cannot be undone.'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context, false),
            child: Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () => Navigator.pop(context, true),
            child: Text('Delete'),
          ),
        ],
      ),
    );

    if (ok == true) {
      setState(() => data.removeWhere((e) => e.id == item.id));
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('\${item.title} deleted')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Items')),
      body: ListView.builder(
        itemCount: data.length,
        itemBuilder: (context, index) {
          final item = data[index];
          return ListTile(
            title: Text(item.title),
            subtitle: Text(item.description),
            trailing: IconButton(
              icon: Icon(Icons.delete, color: Colors.red),
              onPressed: () => _deleteItem(item),
            ),
            onTap: () {
              Navigator.pushNamed(
                context,
                '/details',
                arguments: item,
              );
            },
          );
        },
      ),
    );
  }
}

class DetailsPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final item = ModalRoute.of(context)!.settings.arguments as Item;

    return Scaffold(
      appBar: AppBar(title: Text(item.title)),
      body: Padding(
        padding: EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('ID: \${item.id}', style: TextStyle(color: Colors.grey)),
            SizedBox(height: 12),
            Text(item.description, style: TextStyle(fontSize: 18)),
            Spacer(),
            ElevatedButton(
              onPressed: () => Navigator.pop(context),
              child: Text('Back'),
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

const Day7 = () => {
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
                  Day 7
                </h1>
                <h2 className='text-3xl md:text-5xl font-bold text-[#02569B] mb-8'>
                  Navigation & User Feedback
                </h2>
                <p className='text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed'>
                  Connect screens with Navigator and Named Routes, confirm
                  actions with Dialogs, show SnackBars, and build a master-detail
                  lab.
                </p>

                <motion.button
                  onClick={scrollToContent}
                  className='inline-flex items-center gap-2 bg-[#02569B] hover:bg-[#024A87] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}>
                  <ChevronDown className='w-5 h-5' />
                  Explore Navigation & Feedback
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
                  4 hours: navigation patterns, user feedback, and a
                  master-detail app lab.
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
                  Day 7 Summary
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
                          Navigator.push/pop and MaterialPageRoute handle most
                          simple screen flows.
                        </span>
                      </li>
                      <li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
                        <CheckCircle className='w-5 h-5 text-[#02569B] mt-0.5 flex-shrink-0' />
                        <span>
                          Named Routes centralize navigation and work well for
                          splash → login → home.
                        </span>
                      </li>
                      <li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
                        <CheckCircle className='w-5 h-5 text-[#02569B] mt-0.5 flex-shrink-0' />
                        <span>
                          Dialogs for critical decisions; SnackBars for brief
                          feedback.
                        </span>
                      </li>
                      <li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
                        <CheckCircle className='w-5 h-5 text-[#02569B] mt-0.5 flex-shrink-0' />
                        <span>
                          Master-detail + confirm-delete is a core mobile
                          pattern.
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className='text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4'>
                      What's Next
                    </h4>
                    <p className='text-gray-600 dark:text-gray-300 mb-6'>
                      In Day 8, we'll work with Futures, HTTP APIs,
                      SharedPreferences, and Provider for app-wide state — no
                      BLoC.
                    </p>
                    <button className='inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors'>
                      Next: Day 8
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
                      Task: Master-Detail App with Confirm Delete
                    </h5>
                  </div>

                  <div className='mb-6'>
                    <h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-2 text-lg'>
                      Objective
                    </h6>
                    <p className='text-gray-700 dark:text-gray-300'>
                      Build a list → details navigation app. Pass item data to
                      the details screen, support back navigation, and delete
                      items only after an AlertDialog confirmation.
                    </p>
                  </div>

                  <div className='mb-6'>
                    <h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-3 text-lg'>
                      Requirements
                    </h6>
                    <div className='bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
                      <ul className='text-sm text-gray-600 dark:text-gray-300 space-y-1'>
                        <li>• ListView of items (title + subtitle)</li>
                        <li>• Tap opens DetailsPage (Named Route or MaterialPageRoute)</li>
                        <li>• Delete icon shows confirm AlertDialog</li>
                        <li>• On confirm: remove item + show SnackBar</li>
                        <li>• Optional Undo action on the SnackBar</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-2 text-lg'>
                      👉 Bonus Challenge
                    </h6>
                    <div className='bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-700'>
                      <ul className='text-sm text-gray-600 dark:text-gray-300 space-y-1'>
                        <li>• Add an About page with pushReplacementNamed</li>
                        <li>• Edit screen that returns updated title via pop</li>
                        <li>• Empty state when the list is empty</li>
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

export default Day7;
