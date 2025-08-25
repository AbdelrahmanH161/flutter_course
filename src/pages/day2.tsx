import { useState, Suspense, lazy, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronDown,
  CheckCircle,
  Clock,
  Database,
  ArrowRight,
  GitBranch,
  Box,
} from 'lucide-react';

import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const SyntaxHighlighter = lazy(
  () => import('react-syntax-highlighter')
);

const Loading = () => <div>Loading...</div>;

const sessions = [
  {
    id: 1,
    title: 'Data Structures and Collections',
    duration: '1 Hour',
    icon: <Database className='w-6 h-6' />,
    content: {
      description:
        "Collections are objects that can hold multiple values. Dart ships with a core collections API, which includes classes for lists, sets, and maps. For more details, check out the official documentation on [Collections](https://dart.dev/language/collections) and the [dart:core library](https://dart.dev/libraries/dart-core#collections).",
      topics: [
        'Lists: Ordered collections, accessible by index.',
        'Sets: Unordered collections of unique items.',
        'Maps: Unordered collections of key-value pairs.',
        'Common Methods: Powerful tools like `forEach`, `map`, and `where`.',
      ],
      detailedTopics: {
        listCreation: {
          title: 'Lists: Creation and Manipulation',
          code: `// Create an empty list of strings.
var grains = <String>[];
assert(grains.isEmpty);

// Create a list using a list literal.
var fruits = ['apples', 'oranges'];

// Add to a list.
fruits.add('kiwis');

// Add multiple items to a list.
fruits.addAll(['grapes', 'bananas']);
assert(fruits.length == 5);

// Remove a single item.
var appleIndex = fruits.indexOf('apples');
fruits.removeAt(appleIndex);
assert(fruits.length == 4);

// Remove all elements from a list.
fruits.clear();
assert(fruits.isEmpty);`,
        },
        listSorting: {
          title: 'Lists: Sorting',
          code: `var fruits = ['bananas', 'apples', 'oranges'];

// Sort a list.
fruits.sort((a, b) => a.compareTo(b));
assert(fruits[0] == 'apples');`
        },
        set: {
          title: 'Sets: Unordered & Unique',
          code: `// Create an empty set of strings.
var ingredients = <String>{};

// Add new items to it.
ingredients.addAll(['gold', 'titanium', 'xenon']);
assert(ingredients.length == 3);

// Adding a duplicate item has no effect.
ingredients.add('gold');
assert(ingredients.length == 3);

// Remove an item from a set.
ingredients.remove('gold');
assert(ingredients.length == 2);

// Check for an item.
assert(ingredients.contains('titanium'));`,
        },
        map: {
          title: 'Maps: Key-Value Pairs',
          code: `// Maps often use strings as keys.
var hawaiianBeaches = {
  'Oahu': ['Waikiki', 'Kailua', 'Waimanalo'],
  'Big Island': ['Wailea Bay', 'Pololu Beach'],
  'Kauai': ['Hanalei', 'Poipu'],
};

// Retrieve a value with a key.
assert(hawaiianBeaches['Oahu'].contains('Waikiki'));

// Check whether a map contains a key.
assert(hawaiianBeaches.containsKey('Oahu'));

// Use putIfAbsent() to add a key-value pair if the key isn't already there.
var teamAssignments = <String, String>{};
teamAssignments.putIfAbsent('Catcher', () => 'John');
assert(teamAssignments['Catcher'] != null);`
        },
        commonMethods: {
          title: 'Common Collection Methods',
          code: `var teas = ['green', 'black', 'chamomile', 'earl grey'];

// Use forEach to apply a function to each item.
teas.forEach((tea) => print('I drink $tea'));

// Use map() to transform each item.
var loudTeas = teas.map((tea) => tea.toUpperCase()).toList();

// Use where() to filter items.
var decaffeinatedTeas = teas.where((tea) => tea == 'chamomile');

// Use any() to check if at least one item satisfies a condition.
assert(teas.any((tea) => tea == 'chamomile'));

// Use every() to check if all items satisfy a condition.
assert(!teas.every((tea) => tea == 'chamomile'));`
        }
      },
    },
  },
  {
    id: 2,
    title: 'More on Functions',
    duration: '1 Hour',
    icon: <GitBranch className='w-6 h-6' />,
    content: {
      description:
        'Dive deeper into Dart functions by exploring closures and generators.',
      topics: [
        'Closures: Functions that can access variables in their lexical scope.',
      ],
      detailedTopics: {
        closures: {
          title: 'Closures',
          code: `/// Returns a function that adds [addBy] to the
/// function's argument.
Function makeAdder(int addBy) {
  return (int i) => addBy + i;
}

void main() {
  // Create a function that adds 2.
  var add2 = makeAdder(2);

  // Create a function that adds 4.
  var add4 = makeAdder(4);

  assert(add2(3) == 5);
  assert(add4(3) == 7);
}`,
        },
      },
    },
  },
  {
    id: 3,
    title: 'Introduction to OOP',
    duration: '1 Hour',
    icon: <Box className='w-6 h-6' />,
    content: {
      description:
        'Object-Oriented Programming (OOP) is a programming paradigm based on the concept of "objects," which can contain data and code.',
      topics: [
        'Classes: Blueprints for creating objects.',
        'Objects: Instances of a class.',
        'Generative Constructors: The standard way to create an object.',
        'Named Constructors: Provide multiple, clear ways to create objects.',
        'Constant Constructors: For creating compile-time constant objects.',
        'Default Constructors: The constructor used when no other is defined.',
      ],
      detailedTopics: {
        class: {
          title: 'Classes and Objects',
          code: `class Car {
  String color;
  String model;

  Car(this.color, this.model); // Constructor

  void drive() {
    print('The $color $model is driving.');
  }
}

void main() {
    Car myCar = Car('red', 'Tesla');
    myCar.drive(); // Output: The red Tesla is driving.
}`,
        },
        generativeConstructor: {
          title: 'Generative Constructor',
          code: `// A generative constructor with initializing formal parameters.
class Point {
  double x, y;
  Point(this.x, this.y);
}

// A generative constructor with a body.
class Logger {
  final String name;
  bool mute = false;

  // The constructor body runs after all instance variables are initialized.
  Logger(this.name) {
    print('Logger created: $name');
  }
}

void main() {
  var p = Point(1, 2);
  var log = Logger('MyLogger');
}`,
        },
        namedConstructor: {
          title: 'Named Constructor',
          code: `class Point {
  final double x, y;

  // Main constructor
  Point(this.x, this.y);

  // Named constructor with an initializer list
  Point.origin()
      : x = 0,
        y = 0;

  // Named constructor that redirects to the main constructor
  Point.alongXAxis(double x) : this(x, 0);
}

void main() {
  var p1 = Point(2, 3);
  var p2 = Point.origin();
  var p3 = Point.alongXAxis(5);
  print('p1: (\${p1.x}, \${p1.y})');      // p1: (2, 3)
  print('p2 (origin): (\${p2.x}, \${p2.y})'); // p2 (origin): (0, 0)
  print('p3 (alongX): (\${p3.x}, \${p3.y})'); // p3 (alongX): (5, 0)
}`,
        },
        constantConstructor: {
          title: 'Constant Constructor',
          code: `class ImmutablePoint {
  static const ImmutablePoint origin = ImmutablePoint(0, 0);

  final double x, y;

  const ImmutablePoint(this.x, this.y);
}

void main() {
  // These two instances are the same object because of 'const'.
  var a = const ImmutablePoint(1, 1);
  var b = const ImmutablePoint(1, 1);
  assert(identical(a, b)); // They are the same instance!

  // Without 'const', they would be two different instances.
  var c = ImmutablePoint(1, 1);
  var d = ImmutablePoint(1, 1);
  assert(!identical(c, d)); // They are NOT the same instance.
}`,
        },
        defaultConstructor: {
          title: 'Default Constructor',
          code: `// If you don't declare a constructor, a default one is provided.
// It has no arguments and invokes the no-argument constructor
// in the superclass.
class MySimpleClass {}

var myObject = MySimpleClass(); // Uses the default constructor.`
        }
      },
    },
  },
];

const Day2 = () => {
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
              <div className='absolute top-20 left-20 w-72 h-72 bg-[#0055A4] rounded-full mix-blend-multiply filter blur-xl animate-pulse'></div>
              <div className='absolute top-40 right-20 w-72 h-72 bg-[#00A99D] rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000'></div>
              <div className='absolute -bottom-8 left-40 w-72 h-72 bg-[#00B4D8] rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000'></div>
            </div>

            <div className='relative z-10 text-center px-4 max-w-4xl mx-auto'>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}>
                <h1 className='text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6'>
                  Day 2
                </h1>
                <h2 className='text-3xl md:text-5xl font-bold text-[#0055A4] mb-8'>
                  Intermediate Dart
                </h2>
                <p className='text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed'>
                  Today we'll dive deeper into Dart, exploring collections,
                  advanced function concepts, and the basics of
                  Object-Oriented Programming.
                </p>

                <motion.button
                  onClick={scrollToContent}
                  className='inline-flex items-center gap-2 bg-[#0055A4] hover:bg-[#004488] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}>
                  <ChevronDown className='w-5 h-5' />
                  Explore Day 2 Content
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
                  3 sessions to level up your Dart skills.
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
                          <div className='p-3 bg-[#0055A4]/20 rounded-xl text-[#0055A4]'>
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
                        <p className='text-gray-600 dark:text-gray-300 leading-relaxed'
                          dangerouslySetInnerHTML={{ __html: session.content.description }}>
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
                                <CheckCircle className='w-5 h-5 text-[#0055A4] mt-0.5 flex-shrink-0' />
                                <span>{topic}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {session.content.detailedTopics && (
                          <div className='space-y-4 mt-6'>
                            {Object.values(
                              session.content.detailedTopics
                            ).map((topic: any, index) => (
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
                            ))}
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
                  Day 2 Summary
                </h3>
                <div className='grid md:grid-cols-2 gap-8'>
                  <div>
                    <h4 className='text-xl font-semibold text-[#0055A4] mb-4'>
                      Key Takeaways
                    </h4>
                    <ul className='space-y-3'>
                      <li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
                        <CheckCircle className='w-5 h-5 text-[#0055A4] mt-0.5 flex-shrink-0' />
                        <span>
                          Mastered the use of Lists, Maps, and Sets for data collection.
                        </span>
                      </li>
                      <li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
                        <CheckCircle className='w-5 h-5 text-[#0055A4] mt-0.5 flex-shrink-0' />
                        <span>
                          Understood closures and how functions capture their scope.
                        </span>
                      </li>
                      <li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
                        <CheckCircle className='w-5 h-5 text-[#0055A4] mt-0.5 flex-shrink-0' />
                        <span>
                          Learned to create lazy sequences with generator functions.
                        </span>
                      </li>
                      <li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
                        <CheckCircle className='w-5 h-5 text-[#0055A4] mt-0.5 flex-shrink-0' />
                        <span>
                          Grasped the basics of OOP with classes, objects, and constructors.
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className='text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4'>
                      What's Next
                    </h4>
                    <p className='text-gray-600 dark:text-gray-300 mb-6'>
                      In Day 3, we'll explore advanced OOP concepts like inheritance, mixins, and interfaces, and dive into error handling and asynchronous programming in Dart.
                    </p>
                    <button className='inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors'>
                      Next: Day 3
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
                  Lab Exercises
                </h3>

                <div className='bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6'>

                  <h5 className='text-lg font-semibold text-blue-600 dark:text-blue-400 mb-4'>
                    Practice Problems
                  </h5>
                  <ol className='space-y-4'>
                    <li className='text-gray-700 dark:text-gray-300'>
                      <strong>1. Word Frequency Counter:</strong> Write a function that takes a string of text and returns a map where keys are words and values are their frequencies.
                    </li>
                    <li className='text-gray-700 dark:text-gray-300'>
                      <strong>2. Fibonacci Generator:</strong> Create a synchronous generator that produces the Fibonacci sequence up to `n` numbers.
                    </li>
                    <li className='text-gray-700 dark:text-gray-300'>
                      <strong>3. Simple Bank Account:</strong> Create a `BankAccount` class with properties for `balance` and methods to `deposit`, `withdraw`, and `checkBalance`.
                    </li>
                  </ol>
                </div>
              </motion.div>
            </div>
          </section>
        </Suspense>
      </main>
    </div>
  );
};

export default Day2;