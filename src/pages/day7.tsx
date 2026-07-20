import { useState, Suspense, lazy, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronDown,
  CheckCircle,
  Clock,
  Timer,
  Globe,
  Zap,
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
    title: 'Dio Package',
    duration: '1 Hour',
    icon: <Zap className='w-6 h-6' />,
    content: {
      description:
        'Level up networking with Dio: BaseOptions, interceptors, typed responses, and cleaner error handling compared to the http package.',
      topics: [
        'Adding dio to pubspec.yaml',
        'BaseOptions (baseUrl, timeouts, headers)',
        'GET / POST with Dio',
        'Interceptors for logging and auth tokens',
        'DioException error handling',
      ],
      detailedTopics: {
        dioSetup: {
          title: 'Dio Setup & BaseOptions',
          code: `// pubspec.yaml:
//   dependencies:
//     dio: ^5.4.0

import 'package:dio/dio.dart';

final dio = Dio(
  BaseOptions(
    baseUrl: 'https://jsonplaceholder.typicode.com',
    connectTimeout: Duration(seconds: 10),
    receiveTimeout: Duration(seconds: 10),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  ),
);

Future<List<dynamic>> fetchPostsWithDio() async {
  final response = await dio.get('/posts');
  // Dio auto-decodes JSON — response.data is already a List/Map
  return response.data as List;
}

Future<Map<String, dynamic>> createPostWithDio(
  String title,
  String body,
) async {
  final response = await dio.post(
    '/posts',
    data: {
      'title': title,
      'body': body,
      'userId': 1,
    },
  );
  return response.data as Map<String, dynamic>;
}`,
        },
        interceptors: {
          title: 'Interceptors & Error Handling',
          code: `void setupDio() {
  dio.interceptors.add(
    InterceptorsWrapper(
      onRequest: (options, handler) {
        // Attach token before every request
        // options.headers['Authorization'] = 'Bearer \$token';
        print('→ \${options.method} \${options.path}');
        return handler.next(options);
      },
      onResponse: (response, handler) {
        print('← \${response.statusCode} \${response.requestOptions.path}');
        return handler.next(response);
      },
      onError: (DioException e, handler) {
        print('✗ \${e.type}: \${e.message}');
        return handler.next(e);
      },
    ),
  );
}

Future<void> safeFetch() async {
  try {
    final response = await dio.get('/posts/1');
    print(response.data);
  } on DioException catch (e) {
    switch (e.type) {
      case DioExceptionType.connectionTimeout:
      case DioExceptionType.receiveTimeout:
        print('Request timed out');
        break;
      case DioExceptionType.badResponse:
        print('Server error: \${e.response?.statusCode}');
        break;
      case DioExceptionType.connectionError:
        print('No internet connection');
        break;
      default:
        print('Unexpected error: \${e.message}');
    }
  }
}

/*
http package  → simple, lightweight, manual JSON
Dio           → BaseOptions, interceptors, auto JSON,
                richer timeouts & error types
*/`,
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
                  APIs & Networking
                </h2>
                <p className='text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed'>
                  Master Futures and async/await, call REST APIs with the http
                  package, then level up with Dio — BaseOptions, interceptors,
                  and robust error handling.
                </p>

                <motion.button
                  onClick={scrollToContent}
                  className='inline-flex items-center gap-2 bg-[#02569B] hover:bg-[#024A87] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}>
                  <ChevronDown className='w-5 h-5' />
                  Explore APIs & Networking
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
                  3 hours: async programming, HTTP CRUD, and Dio for production
                  networking.
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
                          Dio adds BaseOptions, interceptors, auto JSON, and
                          richer DioException handling.
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className='text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4'>
                      What's Next
                    </h4>
                    <p className='text-gray-600 dark:text-gray-300 mb-6'>
                      In Day 8, we'll persist data with SharedPreferences,
                      manage app-wide state with Provider, and prepare an app
                      for production.
                    </p>
                    <button className='inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors'>
                      Next: Day 8
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

export default Day7;
