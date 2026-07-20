import { useState, Suspense, lazy, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronDown,
  CheckCircle,
  Clock,
  HardDrive,
  Boxes,
  Rocket,
  ArrowRight,
} from 'lucide-react';

import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const SyntaxHighlighter = lazy(() => import('react-syntax-highlighter'));

const Loading = () => <div>Loading...</div>;

const sessions = [
  {
    id: 1,
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
    id: 2,
    title: 'Provider State Management',
    duration: '1 Hour',
    icon: <Boxes className='w-6 h-6' />,
    content: {
      description:
        'Share state across screens with Provider only (no BLoC). Build ChangeNotifier-based AuthProvider and ProductProvider that survive navigation.',
      topics: [
        'Why setState is not enough for app-wide state',
        'ChangeNotifier + notifyListeners()',
        'ChangeNotifierProvider and MultiProvider setup',
        'Consumer, Provider.of, context.read / watch',
        'AuthProvider + ProductProvider pattern',
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
  {
    id: 3,
    title: 'Build App for Production',
    duration: '1 Hour',
    icon: <Rocket className='w-6 h-6' />,
    content: {
      description:
        'Structure a real Flutter project for maintainability, prepare release builds, and follow a production checklist before shipping.',
      topics: [
        'Recommended folder structure',
        'Separating models, services, providers, screens',
        'flutter build apk / appbundle --release',
        'App signing basics',
        'Production checklist before release',
      ],
      detailedTopics: {
        folderStructure: {
          title: 'Production Folder Structure',
          code: `/*
lib/
  main.dart
  app.dart                 → MaterialApp + routes + theme
  models/
    product.dart
    user.dart
  services/
    api_service.dart       → Dio / http calls
    prefs_service.dart     → SharedPreferences helpers
  providers/
    auth_provider.dart
    product_provider.dart
  screens/
    splash_screen.dart
    login_screen.dart
    home_screen.dart
    product_detail_screen.dart
  widgets/
    product_card.dart
    loading_indicator.dart
  utils/
    constants.dart
    validators.dart

Tips:
  - Keep widgets small and reusable
  - Put network logic in services, not screens
  - Providers orchestrate services + notify UI
  - Models stay plain Dart classes (fromJson / toJson)
*/`,
        },
        releaseBuild: {
          title: 'Release Builds & Checklist',
          code: `/*
Build commands:

  # Android APK
  flutter build apk --release

  # Android App Bundle (Play Store)
  flutter build appbundle --release

  # iOS (requires macOS + Xcode)
  flutter build ios --release

Signing (Android):
  1. Create a keystore
  2. Configure android/key.properties
  3. Reference it in android/app/build.gradle

Production checklist:
  ☐ Remove debug prints / print()
  ☐ Set debugShowCheckedModeBanner: false
  ☐ Configure app name + icon
  ☐ Test offline / error states
  ☐ Handle loading & empty states
  ☐ Persist login with SharedPreferences
  ☐ Use Provider for shared state
  ☐ Test release build on a real device
  ☐ Review permissions in AndroidManifest / Info.plist
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
                  Provider & Production
                </h2>
                <p className='text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed'>
                  Persist login with SharedPreferences, manage app-wide state
                  with Provider, and structure your Flutter app for a real
                  production release.
                </p>

                <motion.button
                  onClick={scrollToContent}
                  className='inline-flex items-center gap-2 bg-[#02569B] hover:bg-[#024A87] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}>
                  <ChevronDown className='w-5 h-5' />
                  Explore Provider & Production
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
                  3 hours: SharedPreferences, Provider state management, and
                  production readiness.
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
                      <li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
                        <CheckCircle className='w-5 h-5 text-[#02569B] mt-0.5 flex-shrink-0' />
                        <span>
                          Structure apps with models / services / providers /
                          screens, then ship a release build.
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
                      Provider state management, and production releases.
                    </p>
                    <button className='inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors'>
                      Back to Home
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

export default Day8;
