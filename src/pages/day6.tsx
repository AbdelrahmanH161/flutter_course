import { useState, Suspense, lazy, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronDown,
  CheckCircle,
  Clock,
  Palette,
  List,
  Navigation,
  Route,
  MessageSquare,
  ArrowRight,
} from 'lucide-react';

import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const SyntaxHighlighter = lazy(() => import('react-syntax-highlighter'));

const Loading = () => <div>Loading...</div>;

const sessions = [
  {
    id: 1,
    title: 'ThemeData & Material Design',
    duration: '1 Hour',
    icon: <Palette className='w-6 h-6' />,
    content: {
      description:
        'Centralize your app look-and-feel with ThemeData: colorScheme, textTheme, and component themes so every screen stays consistent.',
      topics: [
        'ThemeData and MaterialApp theme',
        'ColorScheme and TextTheme',
        'Component themes (AppBar, InputDecoration, Buttons)',
        'Applying Theme.of(context) in widgets',
        'Light theme setup for the whole app',
      ],
      detailedTopics: {
        themeSetup: {
          title: 'ThemeData Configuration',
          code: `void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: Colors.indigo,
          brightness: Brightness.light,
        ),
        textTheme: TextTheme(
          headlineMedium: TextStyle(
            fontSize: 24,
            fontWeight: FontWeight.bold,
          ),
          bodyLarge: TextStyle(fontSize: 16),
        ),
        appBarTheme: AppBarTheme(
          centerTitle: true,
          elevation: 0,
        ),
        inputDecorationTheme: InputDecorationTheme(
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
          ),
        ),
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            padding: EdgeInsets.symmetric(horizontal: 24, vertical: 12),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(12),
            ),
          ),
        ),
      ),
      home: HomePage(),
    );
  }
}`,
        },
        usingTheme: {
          title: 'Using Theme in Widgets',
          code: `class ThemedCard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colors = theme.colorScheme;

    return Card(
      color: colors.surface,
      child: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Featured Product',
              style: theme.textTheme.headlineMedium?.copyWith(
                color: colors.primary,
              ),
            ),
            SizedBox(height: 8),
            Text(
              'Styled with ThemeData — no hard-coded colors.',
              style: theme.textTheme.bodyLarge,
            ),
            SizedBox(height: 16),
            ElevatedButton(
              onPressed: () {},
              child: Text('Shop Now'),
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
    title: 'Form Validation',
    duration: '1 Hour',
    icon: <List className='w-6 h-6' />,
    content: {
      description:
        'Wrap inputs in a Form with GlobalKey for validation — login / register patterns, password confirmation matching, and submitting only when valid.',
      topics: [
        'Form + GlobalKey<FormState>',
        'Login / register validation patterns',
        'Password confirmation matching',
        'autovalidateMode options',
        'Showing success feedback with SnackBar',
      ],
      detailedTopics: {
        formValidation: {
          title: 'Complete Form with Validation',
          code: `class RegisterForm extends StatefulWidget {
  @override
  _RegisterFormState createState() => _RegisterFormState();
}

class _RegisterFormState extends State<RegisterForm> {
  final _formKey = GlobalKey<FormState>();
  final _emailCtrl = TextEditingController();
  final _passCtrl = TextEditingController();
  final _confirmCtrl = TextEditingController();

  @override
  void dispose() {
    _emailCtrl.dispose();
    _passCtrl.dispose();
    _confirmCtrl.dispose();
    super.dispose();
  }

  void _submit() {
    if (_formKey.currentState!.validate()) {
      // Form is valid — proceed
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Registered as \${_emailCtrl.text}')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        children: [
          TextFormField(
            controller: _emailCtrl,
            decoration: InputDecoration(labelText: 'Email'),
            validator: (v) {
              if (v == null || v.isEmpty) return 'Enter email';
              if (!RegExp(r'^[^@]+@[^@]+\\.[^@]+').hasMatch(v)) {
                return 'Invalid email';
              }
              return null;
            },
          ),
          SizedBox(height: 12),
          TextFormField(
            controller: _passCtrl,
            obscureText: true,
            decoration: InputDecoration(labelText: 'Password'),
            validator: (v) {
              if (v == null || v.length < 6) return 'Min 6 characters';
              return null;
            },
          ),
          SizedBox(height: 12),
          TextFormField(
            controller: _confirmCtrl,
            obscureText: true,
            decoration: InputDecoration(labelText: 'Confirm Password'),
            validator: (v) {
              if (v != _passCtrl.text) return 'Passwords do not match';
              return null;
            },
          ),
          SizedBox(height: 24),
          ElevatedButton(onPressed: _submit, child: Text('Register')),
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
    id: 4,
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
    id: 5,
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
                  Day 6
                </h1>
                <h2 className='text-3xl md:text-5xl font-bold text-[#02569B] mb-8'>
                  Material Design, Forms, Navigation & Feedback
                </h2>
                <p className='text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed'>
                  Theme your app with Material Design, validate forms, connect
                  screens with Navigator and Named Routes, and give users
                  feedback with Dialogs and SnackBars.
                </p>

                <motion.button
                  onClick={scrollToContent}
                  className='inline-flex items-center gap-2 bg-[#02569B] hover:bg-[#024A87] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}>
                  <ChevronDown className='w-5 h-5' />
                  Explore Forms & Navigation
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
                  5 hours: theming, form validation, navigation patterns, and
                  user feedback.
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
                  Day 6 Summary
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
                          ThemeData keeps Material colors, text, and components
                          consistent across the app.
                        </span>
                      </li>
                      <li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
                        <CheckCircle className='w-5 h-5 text-[#02569B] mt-0.5 flex-shrink-0' />
                        <span>
                          Form + GlobalKey&lt;FormState&gt; validates input before
                          submit.
                        </span>
                      </li>
                      <li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
                        <CheckCircle className='w-5 h-5 text-[#02569B] mt-0.5 flex-shrink-0' />
                        <span>
                          Navigator.push/pop and Named Routes handle screen
                          flows; Dialogs for decisions, SnackBars for feedback.
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className='text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4'>
                      What's Next
                    </h4>
                    <p className='text-gray-600 dark:text-gray-300 mb-6'>
                      In Day 7, we'll work with Futures, the http package, and
                      Dio for REST API integration.
                    </p>
                    <button className='inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors'>
                      Next: Day 7
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

export default Day6;
