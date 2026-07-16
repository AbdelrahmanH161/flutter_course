import { useState, Suspense, lazy, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronDown,
  CheckCircle,
  Clock,
  Timer,
  Globe,
  HardDrive,
  Boxes,
  ArrowRight,
} from 'lucide-react';

import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const SyntaxHighlighter = lazy(() => import('react-syntax-highlighter'));

const Loading = () => <div>Loading...</div>;

const sessions = [
  {
    id: 1,
    title: 'Async Programming & Futures',
    duration: '1 Hour',
    icon: <Timer className='w-6 h-6' />,
    content: {
      description:
        'Keep the UI responsive while work happens in the background. Master Futures, async/await, Future.delayed, and a splash screen that navigates after a delay.',
      topics: [
        'What is a Future?',
        'async / await vs then / catchError',
        'Future.delayed for timers',
        'Future.any race pattern',
        'Splash screen with delayed navigation',
      ],
      detailedTopics: {
        futuresBasics: {
          title: 'Futures, async & await',
          code: `// Synchronous — blocks the thread
String syncFetch() {
  // Imagine a long calculation...
  return 'Done sync';
}

// Asynchronous — returns a Future
Future<String> asyncFetch() async {
  await Future.delayed(Duration(seconds: 2));
  return 'Done async';
}

void demo() {
  // Style 1: then / catchError
  asyncFetch()
      .then((value) => print(value))
      .catchError((e) => print('Error: \$e'));

  // Style 2: async / await (preferred)
  loadData();
}

Future<void> loadData() async {
  try {
    print('Loading...');
    final result = await asyncFetch();
    print(result);
  } catch (e) {
    print('Failed: \$e');
  }
}

/*
Common pitfall:
  final x = asyncFetch(); // x is Future<String>, not String!
  final x = await asyncFetch(); // correct
*/`,
        },
        splash: {
          title: 'Splash Screen with Future.delayed',
          code: `class SplashScreen extends StatefulWidget {
  @override
  _SplashScreenState createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    _goNext();
  }

  Future<void> _goNext() async {
    await Future.delayed(Duration(seconds: 2));
    if (!mounted) return;
    Navigator.pushReplacementNamed(context, '/home');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            FlutterLogo(size: 96),
            SizedBox(height: 24),
            CircularProgressIndicator(),
            SizedBox(height: 12),
            Text('Loading...'),
          ],
        ),
      ),
    );
  }
}

// Race: take whoever finishes first
Future<String> fastestSource() {
  return Future.any([
    Future.delayed(Duration(seconds: 3), () => 'From API'),
    Future.delayed(Duration(seconds: 1), () => 'From Cache'),
  ]);
}`,
        },
      },
    },
  },
  {
    id: 2,
    title: 'HTTP & API Integration',
    duration: '1 Hour',
    icon: <Globe className='w-6 h-6' />,
    content: {
      description:
        'Talk to REST APIs with the http package. Perform GET, POST, PUT, DELETE, parse JSON, handle status codes, and build a simple Posts CRUD screen.',
      topics: [
        'Adding and importing the http package',
        'GET / POST / PUT / DELETE requests',
        'JSON decoding and model mapping',
        'Status codes and error SnackBars',
        'JSONPlaceholder Posts CRUD pattern',
      ],
      detailedTopics: {
        httpBasics: {
          title: 'HTTP CRUD with http package',
          code: `// pubspec.yaml:
//   dependencies:
//     http: ^1.2.0

import 'dart:convert';
import 'package:http/http.dart' as http;

const baseUrl = 'https://jsonplaceholder.typicode.com';

Future<List<dynamic>> fetchPosts() async {
  final response = await http.get(Uri.parse('\$baseUrl/posts'));
  if (response.statusCode == 200) {
    return jsonDecode(response.body) as List;
  }
  throw Exception('Failed to load posts (\${response.statusCode})');
}

Future<Map<String, dynamic>> createPost(String title, String body) async {
  final response = await http.post(
    Uri.parse('\$baseUrl/posts'),
    headers: {'Content-Type': 'application/json; charset=UTF-8'},
    body: jsonEncode({
      'title': title,
      'body': body,
      'userId': 1,
    }),
  );
  if (response.statusCode == 201) {
    return jsonDecode(response.body);
  }
  throw Exception('Failed to create post');
}

Future<void> updatePost(int id, String title) async {
  final response = await http.put(
    Uri.parse('\$baseUrl/posts/\$id'),
    headers: {'Content-Type': 'application/json; charset=UTF-8'},
    body: jsonEncode({'id': id, 'title': title, 'userId': 1}),
  );
  if (response.statusCode != 200) {
    throw Exception('Failed to update');
  }
}

Future<void> deletePost(int id) async {
  final response = await http.delete(Uri.parse('\$baseUrl/posts/\$id'));
  if (response.statusCode != 200) {
    throw Exception('Failed to delete');
  }
}`,
        },
        postsUi: {
          title: 'Posts Screen Pattern',
          code: `class PostsPage extends StatefulWidget {
  @override
  _PostsPageState createState() => _PostsPageState();
}

class _PostsPageState extends State<PostsPage> {
  late Future<List<dynamic>> postsFuture;

  @override
  void initState() {
    super.initState();
    postsFuture = fetchPosts();
  }

  void _showError(String msg) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(msg), backgroundColor: Colors.red),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Posts')),
      body: FutureBuilder<List<dynamic>>(
        future: postsFuture,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(child: CircularProgressIndicator());
          }
          if (snapshot.hasError) {
            return Center(child: Text('Error: \${snapshot.error}'));
          }
          final posts = snapshot.data!;
          return ListView.builder(
            itemCount: posts.length,
            itemBuilder: (context, index) {
              final post = posts[index];
              return ListTile(
                title: Text(post['title']),
                subtitle: Text(post['body'], maxLines: 2),
              );
            },
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () async {
          try {
            await createPost('New Post', 'Hello API');
            setState(() => postsFuture = fetchPosts());
          } catch (e) {
            _showError(e.toString());
          }
        },
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
    title: 'SharedPreferences',
    duration: '1 Hour',
    icon: <HardDrive className='w-6 h-6' />,
    content: {
      description:
        'Persist small key-value data locally: login flags, usernames, settings. Build a Splash → Login → Home flow that remembers the user across restarts.',
      topics: [
        'What SharedPreferences is (and is not)',
        'setBool / setString / setInt / setStringList',
        'Reading with defaults (??)',
        'PrefsKeys constants class',
        'Splash → Login → Home with logout clear()',
      ],
      detailedTopics: {
        prefsBasics: {
          title: 'SharedPreferences Basics',
          code: `// pubspec.yaml:
//   shared_preferences: ^2.2.2

import 'package:shared_preferences/shared_preferences.dart';

class PrefsKeys {
  static const loggedIn = 'loggedIn';
  static const username = 'username';
  static const themeMode = 'themeMode';
}

Future<void> saveLogin(String username) async {
  final prefs = await SharedPreferences.getInstance();
  await prefs.setBool(PrefsKeys.loggedIn, true);
  await prefs.setString(PrefsKeys.username, username);
}

Future<bool> isLoggedIn() async {
  final prefs = await SharedPreferences.getInstance();
  return prefs.getBool(PrefsKeys.loggedIn) ?? false;
}

Future<String> getUsername() async {
  final prefs = await SharedPreferences.getInstance();
  return prefs.getString(PrefsKeys.username) ?? 'Guest';
}

Future<void> logout() async {
  final prefs = await SharedPreferences.getInstance();
  await prefs.clear(); // or remove specific keys
}

/*
Do NOT store passwords or tokens insecurely.
Use flutter_secure_storage for secrets.
Use SQLite / Hive for larger structured data.
*/`,
        },
        authFlow: {
          title: 'Splash → Login → Home Flow',
          code: `// main.dart routes: '/', '/login', '/home'

class SplashPage extends StatefulWidget {
  @override
  _SplashPageState createState() => _SplashPageState();
}

class _SplashPageState extends State<SplashPage> {
  @override
  void initState() {
    super.initState();
    _checkAuth();
  }

  Future<void> _checkAuth() async {
    await Future.delayed(Duration(seconds: 2));
    final loggedIn = await isLoggedIn();
    if (!mounted) return;
    Navigator.pushReplacementNamed(
      context,
      loggedIn ? '/home' : '/login',
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(body: Center(child: CircularProgressIndicator()));
  }
}

class LoginPage extends StatelessWidget {
  final controller = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Login')),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          children: [
            TextField(
              controller: controller,
              decoration: InputDecoration(labelText: 'Username'),
            ),
            SizedBox(height: 16),
            ElevatedButton(
              onPressed: () async {
                await saveLogin(controller.text);
                Navigator.pushReplacementNamed(context, '/home');
              },
              child: Text('Login'),
            ),
          ],
        ),
      ),
    );
  }
}

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return FutureBuilder<String>(
      future: getUsername(),
      builder: (context, snapshot) {
        return Scaffold(
          appBar: AppBar(
            title: Text('Hello, \${snapshot.data ?? '...'}'),
            actions: [
              IconButton(
                icon: Icon(Icons.logout),
                onPressed: () async {
                  await logout();
                  Navigator.pushReplacementNamed(context, '/login');
                },
              ),
            ],
          ),
          body: Center(child: Text('Home')),
        );
      },
    );
  }
}`,
        },
      },
    },
  },
  {
    id: 4,
    title: 'Practical Lab — Provider State Management',
    duration: '1 Hour',
    icon: <Boxes className='w-6 h-6' />,
    content: {
      description:
        'Share state across screens with Provider only (no BLoC). Build ChangeNotifier-based AuthProvider and ProductProvider that survive navigation.',
      topics: [
        'Why setState is not enough for app-wide state',
        'ChangeNotifier + notifyListeners()',
        'ChangeNotifierProvider setup',
        'Consumer and Provider.of',
        'Auth + Product providers lab',
      ],
      detailedTopics: {
        providerSetup: {
          title: 'Provider Setup & AuthProvider',
          code: `// pubspec.yaml:
//   provider: ^6.1.0

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';

class AuthProvider extends ChangeNotifier {
  bool _isLoggedIn = false;
  String _username = '';

  bool get isLoggedIn => _isLoggedIn;
  String get username => _username;

  Future<void> loadFromPrefs() async {
    final prefs = await SharedPreferences.getInstance();
    _isLoggedIn = prefs.getBool('loggedIn') ?? false;
    _username = prefs.getString('username') ?? '';
    notifyListeners();
  }

  Future<void> login(String username) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool('loggedIn', true);
    await prefs.setString('username', username);
    _isLoggedIn = true;
    _username = username;
    notifyListeners();
  }

  Future<void> logout() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.clear();
    _isLoggedIn = false;
    _username = '';
    notifyListeners();
  }
}

void main() {
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider()..loadFromPrefs()),
        ChangeNotifierProvider(create: (_) => ProductProvider()),
      ],
      child: MyApp(),
    ),
  );
}`,
        },
        productProvider: {
          title: 'ProductProvider + Consumer UI',
          code: `class Product {
  final String name;
  final double price;
  Product(this.name, this.price);
}

class ProductProvider extends ChangeNotifier {
  final List<Product> _products = [];
  List<Product> get products => List.unmodifiable(_products);

  void add(String name, double price) {
    _products.add(Product(name, price));
    notifyListeners();
  }

  void removeAt(int index) {
    _products.removeAt(index);
    notifyListeners();
  }
}

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final auth = Provider.of<AuthProvider>(context);

    return Scaffold(
      appBar: AppBar(
        title: Text('Hi, \${auth.username}'),
        actions: [
          IconButton(
            icon: Icon(Icons.logout),
            onPressed: () async {
              await auth.logout();
              Navigator.pushReplacementNamed(context, '/login');
            },
          ),
        ],
      ),
      body: Consumer<ProductProvider>(
        builder: (context, products, child) {
          if (products.products.isEmpty) {
            return Center(child: Text('No products yet'));
          }
          return ListView.builder(
            itemCount: products.products.length,
            itemBuilder: (context, index) {
              final p = products.products[index];
              return ListTile(
                title: Text(p.name),
                subtitle: Text('\\$\${p.price}'),
                trailing: IconButton(
                  icon: Icon(Icons.delete),
                  onPressed: () => products.removeAt(index),
                ),
              );
            },
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          context.read<ProductProvider>().add('New Item', 9.99);
        },
        child: Icon(Icons.add),
      ),
    );
  }
}

/*
Provider.of(context)        → rebuilds when notifyListeners runs
context.watch<T>()          → same as Provider.of (listen: true)
context.read<T>()           → no rebuild (use in callbacks)
Consumer<T>                 → rebuilds only its subtree
*/`,
        },
      },
    },
  },
];

const Day8 = () => {
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
                  Day 8
                </h1>
                <h2 className='text-3xl md:text-5xl font-bold text-[#02569B] mb-8'>
                  Data, APIs & State Management
                </h2>
                <p className='text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed'>
                  Work with Futures and HTTP APIs, persist login with
                  SharedPreferences, and manage app-wide state with Provider —
                  no BLoC.
                </p>

                <motion.button
                  onClick={scrollToContent}
                  className='inline-flex items-center gap-2 bg-[#02569B] hover:bg-[#024A87] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}>
                  <ChevronDown className='w-5 h-5' />
                  Explore Data & Provider
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
                  4 hours: async, HTTP, SharedPreferences, and a Provider lab.
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
                  Day 8 Summary
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
                          Futures + async/await keep the UI responsive during
                          network and timer work.
                        </span>
                      </li>
                      <li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
                        <CheckCircle className='w-5 h-5 text-[#02569B] mt-0.5 flex-shrink-0' />
                        <span>
                          The http package covers REST CRUD; always check status
                          codes and show errors.
                        </span>
                      </li>
                      <li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
                        <CheckCircle className='w-5 h-5 text-[#02569B] mt-0.5 flex-shrink-0' />
                        <span>
                          SharedPreferences persists small settings and login
                          state across app restarts.
                        </span>
                      </li>
                      <li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
                        <CheckCircle className='w-5 h-5 text-[#02569B] mt-0.5 flex-shrink-0' />
                        <span>
                          Provider (ChangeNotifier) is the course state
                          management approach — no BLoC required.
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className='text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4'>
                      Course Complete
                    </h4>
                    <p className='text-gray-600 dark:text-gray-300 mb-6'>
                      You can now build cross-platform Flutter apps with
                      layouts, Material Design, navigation, APIs, persistence,
                      and Provider state management.
                    </p>
                    <button className='inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors'>
                      Back to Home
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
                      Task: Auth + Products with Provider (No BLoC)
                    </h5>
                  </div>

                  <div className='mb-6'>
                    <h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-2 text-lg'>
                      Objective
                    </h6>
                    <p className='text-gray-700 dark:text-gray-300'>
                      Combine SharedPreferences and Provider to build Splash →
                      Login → Home. Auth and product lists should survive
                      navigation using ChangeNotifier — do not use BLoC or Cubit.
                    </p>
                  </div>

                  <div className='mb-6'>
                    <h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-3 text-lg'>
                      Requirements
                    </h6>
                    <div className='bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
                      <ul className='text-sm text-gray-600 dark:text-gray-300 space-y-1'>
                        <li>• AuthProvider: login, logout, loadFromPrefs</li>
                        <li>• ProductProvider: add / remove products with notifyListeners</li>
                        <li>• MultiProvider at app root</li>
                        <li>• Splash checks loggedIn and routes accordingly</li>
                        <li>• Home uses Consumer for products + Provider.of for auth</li>
                        <li>• Optional: fetch initial products from an API (http)</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-2 text-lg'>
                      👉 Bonus Challenge
                    </h6>
                    <div className='bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-700'>
                      <ul className='text-sm text-gray-600 dark:text-gray-300 space-y-1'>
                        <li>• rememberMe checkbox persisted in SharedPreferences</li>
                        <li>• Dark mode toggle via a ThemeProvider</li>
                        <li>• Pull-to-refresh that reloads API data into ProductProvider</li>
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

export default Day8;
