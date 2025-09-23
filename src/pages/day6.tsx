import { useState, Suspense, lazy, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronDown,
  CheckCircle,
  Clock,
  Globe,
  Zap,
  Database,
  ArrowRight,
} from 'lucide-react';

import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const SyntaxHighlighter = lazy(() => import('react-syntax-highlighter'));

const Loading = () => <div>Loading...</div>;

const sessions = [
  {
    id: 1,
    title: 'Asynchronous Dart',
    duration: '1 Hour',
    icon: <Zap className='w-6 h-6' />,
    content: {
      description:
        'Learn the fundamentals of asynchronous programming in Dart. Understand how Futures work, the difference between sync and async operations, and how to keep your UI responsive while performing background tasks.',
      topics: [
        'Sync vs Async: Understanding the difference',
        'Futures: Promises for data that will be available later',
        'async/await: Modern syntax for handling asynchronous code',
        'Future.delayed(): Simulating time-consuming operations',
        'Error handling in asynchronous operations',
      ],
      detailedTopics: {
        syncVsAsync: {
          title: 'Sync vs Async Operations',
          code: `// Synchronous - blocks the UI
void syncOperation() {
  print("Start");
  // This blocks the entire app for 3 seconds
  sleep(Duration(seconds: 3));
  print("End");
}

// Asynchronous - doesn't block the UI
Future<void> asyncOperation() async {
  print("Start");
  // This runs in the background
  await Future.delayed(Duration(seconds: 3));
  print("End");
}

void main() {
  print("Before sync");
  syncOperation(); // UI freezes here
  print("After sync");
  
  print("Before async");
  asyncOperation(); // UI remains responsive
  print("After async");
}`,
        },
        futuresBasics: {
          title: 'Working with Futures',
          code: `// Future represents a value that will be available later
Future<String> fetchData() async {
  // Simulate network delay
  await Future.delayed(Duration(seconds: 2));
  return "Data loaded successfully!";
}

// Using the Future
void main() async {
  print("Fetching data...");
  
  // Method 1: Using await
  String result = await fetchData();
  print(result);
  
  // Method 2: Using .then()
  fetchData().then((data) {
    print("Data received: $data");
  }).catchError((error) {
    print("Error: $error");
  });
  
  print("This runs immediately, not waiting for fetchData");
}`,
        },
        errorHandling: {
          title: 'Error Handling in Async Operations',
          code: `Future<String> fetchUserData(int userId) async {
  await Future.delayed(Duration(seconds: 1));
  
  if (userId <= 0) {
    throw Exception("Invalid user ID");
  }
  
  if (userId == 404) {
    throw Exception("User not found");
  }
  
  return "User data for ID: $userId";
}

void main() async {
  try {
    // This will succeed
    String user1 = await fetchUserData(1);
    print(user1);
    
    // This will throw an error
    String user2 = await fetchUserData(404);
    print(user2);
  } catch (e) {
    print("Caught error: $e");
  }
  
  // Alternative error handling
  fetchUserData(-1).then((data) {
    print("Success: $data");
  }).catchError((error) {
    print("Error occurred: $error");
  });
}`,
        },
      },
    },
  },
  {
    id: 2,
    title: 'Networking with http',
    duration: '1 Hour',
    icon: <Globe className='w-6 h-6' />,
    content: {
      description:
        'Learn to make HTTP requests using the http package. This lightweight package is perfect for simple networking needs and is easy to get started with for basic API calls.',
      topics: [
        'Adding http package to pubspec.yaml',
        'Making GET requests to fetch data',
        'Handling HTTP response status codes',
        'Working with JSON data from APIs',
        'Error handling for network requests',
      ],
      detailedTopics: {
        httpSetup: {
          title: 'Setting up http Package',
          code: `# pubspec.yaml
dependencies:
  flutter:
    sdk: flutter
  http: ^1.2.2

# After adding, run: flutter pub get

# Import in your Dart file
import 'dart:convert';
import 'package:http/http.dart' as http;`,
        },
        httpGetRequest: {
          title: 'Making GET Requests',
          code: `import 'dart:convert';
import 'package:http/http.dart' as http;

Future<void> fetchUsers() async {
  try {
    // Make GET request
    final response = await http.get(
      Uri.parse('https://jsonplaceholder.typicode.com/users')
    );
    
    // Check if request was successful
    if (response.statusCode == 200) {
      // Parse JSON response
      final List<dynamic> data = jsonDecode(response.body);
      
      // Access the data
      print('First user: \${data[0]['name']}');
      print('Email: \${data[0]['email']}');
      
      // Process all users
      for (var user in data) {
        print('User: \${user['name']} - \${user['email']}');
      }
    } else {
      print('Failed to load users: \${response.statusCode}');
    }
  } catch (e) {
    print('Error fetching users: $e');
  }
}

void main() async {
  await fetchUsers();
}`,
        },
        httpPostRequest: {
          title: 'Making POST Requests',
          code: `Future<void> createUser() async {
  try {
    // Prepare data to send
    Map<String, dynamic> userData = {
      'name': 'John Doe',
      'email': 'john@example.com',
      'phone': '123-456-7890'
    };
    
    // Make POST request
    final response = await http.post(
      Uri.parse('https://jsonplaceholder.typicode.com/users'),
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonEncode(userData),
    );
    
    if (response.statusCode == 201) {
      final createdUser = jsonDecode(response.body);
      print('User created: $ {createdUser['name']}');
      print('ID: $ {createdUser['id']}');
    } else {
      print('Failed to create user: $ {response.statusCode}');
    }
  } catch (e) {
    print('Error creating user: $e');
  }
}`,
        },
      },
    },
  },
  {
    id: 3,
    title: 'Networking with Dio',
    duration: '1 Hour',
    icon: <Database className='w-6 h-6' />,
    content: {
      description:
        'Explore Dio, a powerful HTTP client for Dart that offers advanced features like interceptors, automatic JSON parsing, and built-in error handling. Perfect for complex networking needs.',
      topics: [
        'Adding Dio package and basic setup',
        'Making requests with automatic JSON parsing',
        'Using interceptors for logging and authentication',
        'Advanced error handling and timeout configuration',
        'File upload and download capabilities',
      ],
      detailedTopics: {
        dioSetup: {
          title: 'Setting up Dio',
          code: `# pubspec.yaml
dependencies:
  flutter:
    sdk: flutter
  dio: ^5.4.0

# Import in your Dart file
import 'package:dio/dio.dart';

# Basic Dio setup
void main() {
  final dio = Dio();
  
  // Optional: Set default timeout
  dio.options.connectTimeout = Duration(seconds: 5);
  dio.options.receiveTimeout = Duration(seconds: 3);
  
  // Optional: Set default headers
  dio.options.headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
}`,
        },
        dioGetRequest: {
          title: 'Making GET Requests with Dio',
          code: `Future<void> fetchUsersWithDio() async {
  final dio = Dio();
  
  try {
    // Simple GET request - Dio automatically parses JSON
    final response = await dio.get('https://jsonplaceholder.typicode.com/users');
    
    // Access data directly (no need for jsonDecode)
    final List<dynamic> users = response.data;
    
    print('Total users: \${users.length}');
    print('First user: \${users[0]['name']}');
    
    // Process users
    for (var user in users) {
      print('User: \${user['name']} (\${user['email']})');
    }
  } on DioException catch (e) {
    // Dio-specific error handling
    if (e.response != null) {
      print('Server error: \${e.response?.statusCode}');
      print('Error data: \${e.response?.data}');
    } else {
      print('Network error: \${e.message}');
    }
  } catch (e) {
    print('Unexpected error: $e');
  }
}`,
        },
        dioInterceptors: {
          title: 'Using Interceptors',
          code: `void setupDioWithInterceptors() {
  final dio = Dio();
  
  // Request interceptor - runs before each request
  dio.interceptors.add(InterceptorsWrapper(
    onRequest: (options, handler) {
      print('🚀 Request: \${options.method} \${options.path}');
      print('Headers: \${options.headers}');
      
      // Add authentication token
      options.headers['Authorization'] = 'Bearer your-token-here';
      
      handler.next(options);
    },
    
    onResponse: (response, handler) {
      print('✅ Response: \${response.statusCode}');
      print('Data: \${response.data}');
      handler.next(response);
    },
    
    onError: (error, handler) {
      print('❌ Error: \${error.message}');
      handler.next(error);
    },
  ));
  
  // Use the configured dio instance
  fetchDataWithInterceptors(dio);
}

Future<void> fetchDataWithInterceptors(Dio dio) async {
  try {
    final response = await dio.get('https://jsonplaceholder.typicode.com/posts');
    print('Posts fetched: \${response.data.length}');
  } catch (e) {
    print('Request failed: $e');
  }
}`,
        },
      },
    },
  },
  {
    id: 4,
    title: 'Handling JSON Data',
    duration: '1 Hour',
    icon: <Database className='w-6 h-6' />,
    content: {
      description:
        'Master JSON data handling in Dart. Learn to serialize Dart objects to JSON and deserialize JSON back to Dart objects, essential skills for working with APIs and data storage.',
      topics: [
        'Understanding JSON format and structure',
        'JSON serialization: Converting Dart objects to JSON',
        'JSON deserialization: Converting JSON to Dart objects',
        'Working with complex nested JSON structures',
        'Creating model classes for type safety',
      ],
      detailedTopics: {
        jsonBasics: {
          title: 'JSON Serialization & Deserialization',
          code: `import 'dart:convert';

void main() {
  // JSON String to Dart Map (Deserialization)
  String jsonString = '''
  {
    "name": "Abdelrahman",
    "age": 25,
    "isStudent": true,
    "hobbies": ["coding", "reading", "gaming"]
  }
  ''';
  
  // Parse JSON string to Dart Map
  Map<String, dynamic> user = jsonDecode(jsonString);
  
  print('Name: \${user['name']}');
  print('Age: \${user['age']}');
  print('Is Student: \${user['isStudent']}');
  print('Hobbies: \${user['hobbies']}');
  
  // Dart Map to JSON String (Serialization)
  Map<String, dynamic> newUser = {
    'name': 'Sarah',
    'age': 30,
    'isStudent': false,
    'hobbies': ['painting', 'cooking']
  };
  
  String jsonOutput = jsonEncode(newUser);
  print('JSON String: $jsonOutput');
}`,
        },
        modelClasses: {
          title: 'Creating Model Classes',
          code: `class User {
  final String name;
  final int age;
  final bool isStudent;
  final List<String> hobbies;
  
  User({
    required this.name,
    required this.age,
    required this.isStudent,
    required this.hobbies,
  });
  
  // Factory constructor to create User from JSON
  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      name: json['name'],
      age: json['age'],
      isStudent: json['isStudent'],
      hobbies: List<String>.from(json['hobbies']),
    );
  }
  
  // Method to convert User to JSON
  Map<String, dynamic> toJson() {
    return {
      'name': name,
      'age': age,
      'isStudent': isStudent,
      'hobbies': hobbies,
    };
  }
  
  @override
  String toString() {
    return 'User(name: $name, age: $age, isStudent: $isStudent, hobbies: $hobbies)';
  }
}

void main() {
  // JSON to User object
  String jsonString = '''
  {
    "name": "Ahmed",
    "age": 28,
    "isStudent": true,
    "hobbies": ["swimming", "photography"]
  }
  ''';
  
  Map<String, dynamic> userJson = jsonDecode(jsonString);
  User user = User.fromJson(userJson);
  
  print('User: $user');
  
  // User object to JSON
  User newUser = User(
    name: 'Fatima',
    age: 24,
    isStudent: false,
    hobbies: ['dancing', 'music'],
  );
  
  String userJsonString = jsonEncode(newUser.toJson());
  print('JSON: $userJsonString');
}`,
        },
        complexJson: {
          title: 'Working with Complex JSON',
          code: `class Address {
  final String street;
  final String city;
  final String country;
  
  Address({required this.street, required this.city, required this.country});
  
  factory Address.fromJson(Map<String, dynamic> json) {
    return Address(
      street: json['street'],
      city: json['city'],
      country: json['country'],
    );
  }
  
  Map<String, dynamic> toJson() {
    return {
      'street': street,
      'city': city,
      'country': country,
    };
  }
}

class Company {
  final String name;
  final Address address;
  
  Company({required this.name, required this.address});
  
  factory Company.fromJson(Map<String, dynamic> json) {
    return Company(
      name: json['name'],
      address: Address.fromJson(json['address']),
    );
  }
  
  Map<String, dynamic> toJson() {
    return {
      'name': name,
      'address': address.toJson(),
    };
  }
}

class Employee {
  final String name;
  final int age;
  final Company company;
  final List<String> skills;
  
  Employee({
    required this.name,
    required this.age,
    required this.company,
    required this.skills,
  });
  
  factory Employee.fromJson(Map<String, dynamic> json) {
    return Employee(
      name: json['name'],
      age: json['age'],
      company: Company.fromJson(json['company']),
      skills: List<String>.from(json['skills']),
    );
  }
  
  Map<String, dynamic> toJson() {
    return {
      'name': name,
      'age': age,
      'company': company.toJson(),
      'skills': skills,
    };
  }
}

void main() {
  String complexJson = '''
  {
    "name": "Omar",
    "age": 32,
    "company": {
      "name": "Tech Corp",
      "address": {
        "street": "123 Tech Street",
        "city": "Cairo",
        "country": "Egypt"
      }
    },
    "skills": ["Flutter", "Dart", "Firebase", "UI/UX"]
  }
  ''';
  
  Map<String, dynamic> employeeJson = jsonDecode(complexJson);
  Employee employee = Employee.fromJson(employeeJson);
  
  print('Employee: \${employee.name}');
  print('Company: \${employee.company.name}');
  print('Address: \${employee.company.address.city}, \${employee.company.address.country}');
  print('Skills: \${employee.skills.join(", ")}');
}`,
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
                  Day 6
                </h1>
                <h2 className='text-3xl md:text-5xl font-bold text-[#02569B] mb-8'>
                  Asynchronous Programming & Networking
                </h2>
                <p className='text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed'>
                  Master asynchronous programming in Dart and learn to fetch
                  live data from the internet. Compare http and Dio packages
                  while building real-world networking applications.
                </p>

                <motion.button
                  onClick={scrollToContent}
                  className='inline-flex items-center gap-2 bg-[#02569B] hover:bg-[#0056b3] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}>
                  <ChevronDown className='w-5 h-5' />
                  Explore Async Programming & Networking
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
                  4 hours to master asynchronous programming and networking in
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
                          Master asynchronous programming with Futures,
                          async/await, and proper error handling.
                        </span>
                      </li>
                      <li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
                        <CheckCircle className='w-5 h-5 text-[#02569B] mt-0.5 flex-shrink-0' />
                        <span>
                          Use http package for simple networking needs and basic
                          API calls.
                        </span>
                      </li>
                      <li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
                        <CheckCircle className='w-5 h-5 text-[#02569B] mt-0.5 flex-shrink-0' />
                        <span>
                          Leverage Dio for advanced networking with interceptors
                          and automatic JSON parsing.
                        </span>
                      </li>
                      <li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
                        <CheckCircle className='w-5 h-5 text-[#02569B] mt-0.5 flex-shrink-0' />
                        <span>
                          Handle JSON data with proper
                          serialization/deserialization and model classes.
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className='text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4'>
                      What's Next
                    </h4>
                    <p className='text-gray-600 dark:text-gray-300 mb-6'>
                      You've mastered networking and async programming! Next
                      steps include state management (Provider, Bloc), local
                      storage, working with databases, and advanced Flutter
                      patterns.
                    </p>
                    <button className='inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors'>
                      Continue Learning
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
                  📝 Hands-on Exercise
                </h3>

                {/* Login & Product Catalog Task */}
                <div className='bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border-l-4 border-blue-500'>
                  <div className='flex items-center gap-3 mb-4'>
                    <div className='w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm'>
                      🛍️
                    </div>
                    <h5 className='text-xl font-semibold text-blue-700 dark:text-blue-300'>
                      Task: Login & Product Catalog with API Integration
                    </h5>
                  </div>

                  <div className='mb-6'>
                    <h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-2 text-lg'>
                      Objective
                    </h6>
                    <p className='text-gray-700 dark:text-gray-300'>
                      Build a Flutter app with API integration for login and
                      products, where the Home Page displays products with a
                      scrollable category tab bar at the top.
                    </p>
                  </div>

                  <div className='mb-6'>
                    <h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-3 text-lg'>
                      API References
                    </h6>
                    <div className='bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
                      <ul className='text-sm text-gray-600 dark:text-gray-300 space-y-2'>
                        <li>
                          <strong>Login API:</strong>{' '}
                          https://dummyjson.com/auth/login
                        </li>
                        <li className='ml-4'>• Requires: username, password</li>
                        <li className='ml-4'>
                          • Example: kminchelle / 0lelplR
                        </li>
                        <li className='ml-4'>• Returns: user data + token</li>
                        <li className='mt-3'>
                          <strong>Get All Products:</strong>{' '}
                          https://dummyjson.com/products
                        </li>
                        <li>
                          <strong>Get Categories:</strong>{' '}
                          https://dummyjson.com/products/categories
                        </li>
                        <li>
                          <strong>Get Products by Category:</strong>{' '}
                          https://dummyjson.com/products/category/{'{category}'}
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className='mb-6'>
                    <h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-3 text-lg'>
                      Requirements
                    </h6>

                    <div className='space-y-4'>
                      <div className='bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
                        <h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-2 block'>
                          1. Splash Screen
                        </h6>
                        <ul className='text-sm text-gray-600 dark:text-gray-300 space-y-1'>
                          <li>• Show a simple splash (logo/text)</li>
                          <li>• After 2–3 seconds → navigate to Login Page</li>
                        </ul>
                      </div>

                      <div className='bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
                        <h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-2 block'>
                          2. Login Page
                        </h6>
                        <ul className='text-sm text-gray-600 dark:text-gray-300 space-y-1'>
                          <li>
                            • Form with: Username (TextField), Password
                            (TextField, obscured)
                          </li>
                          <li>
                            • On pressing Login button: Call the Login API
                          </li>
                          <li>
                            • If success → navigate to Home Page and store token
                          </li>
                          <li>• If fail → show error message</li>
                        </ul>
                      </div>

                      <div className='bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
                        <h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-2 block'>
                          3. Home Page
                        </h6>
                        <ul className='text-sm text-gray-600 dark:text-gray-300 space-y-1'>
                          <li>• Layout: AppBar with title = "Products"</li>
                          <li>
                            • Scrollable TabBar at the top: First Tab → "All
                            Products", Other Tabs → dynamically loaded
                            categories
                          </li>
                          <li>
                            • TabBarView below: For "All Products" → fetch from
                            products API, For each category → fetch from
                            category API
                          </li>
                          <li>
                            • Product Card should show: Product Image, Title,
                            Price
                          </li>
                          <li>
                            • Add a Drawer with dummy menu items (Profile,
                            Settings, Logout)
                          </li>
                          <li>
                            • Add Logout button inside Drawer to go back to
                            Login Page
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className='mb-6'>
                    <h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-2 text-lg'>
                      Example Flow
                    </h6>
                    <div className='bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
                      <ul className='text-sm text-gray-600 dark:text-gray-300 space-y-1'>
                        <li>
                          • Open App → Splash Screen → navigates to Login Page
                        </li>
                        <li>
                          • User logs in with (kminchelle / 0lelplR) → success →
                          goes to Home Page
                        </li>
                        <li>
                          • On Home Page: Categories load into scrollable TabBar
                        </li>
                        <li>• First tab → All Products (default)</li>
                        <li>
                          • User taps "smartphones" → Products reload with only
                          smartphones
                        </li>
                        <li>
                          • User taps Logout in Drawer → navigates back to Login
                          Page
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-2 text-lg'>
                      👉 Bonus Challenge
                    </h6>
                    <div className='bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-700'>
                      <ul className='text-sm text-gray-600 dark:text-gray-300 space-y-1'>
                        <li>• Add a loading spinner when fetching products</li>
                        <li>
                          • Add a Pull-to-Refresh feature in the product list
                        </li>
                        <li>• Show product details when a product is tapped</li>
                        <li>
                          • Use Dio interceptors to attach token automatically
                        </li>
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

export default Day6;
