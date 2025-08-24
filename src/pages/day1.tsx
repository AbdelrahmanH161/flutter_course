import { useState, Suspense, lazy, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronDown,
  CheckCircle,
  Clock,
  Coffee,
  Code,
  Database,
  Play,
  ArrowRight,
} from 'lucide-react';

import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const SyntaxHighlighter = lazy(
  () => import('react-syntax-highlighter')
);

const Loading = () => <div>Loading...</div>;

const sessions = [
  {
    id: 1,
    title: 'What is Dart and Why?',
    duration: '1 Hour',
    icon: <Database className='w-6 h-6' />,
    content: {
      description:
        "Dart is a programming language developed by Google. Its main purpose is to build beautiful, high-quality applications for mobile, web, and desktop. It's often called a 'client-optimized' language because it's designed specifically to create great user interfaces (UIs) and perform well on devices.",
      topics: [
        'Fast Performance: Compiles to native machine code (AOT).',
        'Hot Reload: Just-in-time (JIT) compilation for instant feedback.',
        'Cross-Platform: Single language for iOS, Android, and web with Flutter.',
        'Easy to Learn: Familiar syntax for developers from other languages.',
      ],
    },
  },
  {
    id: 2,
    title: 'Variable Data Types',
    duration: '1 Hour',
    icon: <Code className='w-6 h-6' />,
    content: {
      description:
        'Every program needs to store information, and in Dart, we do that using variables. A variable is like a container with a label that holds a specific type of data.',
      topics: [
        'int: For whole numbers.',
        'double: For decimal numbers.',
        'String: For text.',
        'bool: For true/false values.',
        'dynamic: A flexible type for any data.',
        'var: Type inference based on the initial value.',
        'Understanding var, final, const, and late.',
      ],
      detailedTopics: {
        int: {
          title: 'Integer (int)',
          code: `int age = 25;\nint year = 2024;`,
        },
        double: {
          title: 'Double (double)',
          code: `double pi = 3.14159;\ndouble temperature = -1.5;`,
        },
        String: {
          title: 'String',
          code: `String name = 'Alice';\nString message = "Hello, world!";`,
        },
        bool: {
          title: 'Boolean (bool)',
          code: `bool isStudent = true;\nbool hasFinished = false;`,
        },
        dynamic: {
          title: 'Dynamic',
          code: `dynamic value = 10;\nvalue = 'Hello';\nvalue = true;`,
        },
        var: {
          title: 'Var',
          code: `var count = 5; // Inferred as int\nvar greeting = 'Hi'; // Inferred as String`,
        },
        varFinalConstLate: {
          title: 'var vs final vs const vs late',
          code: `// 'var' can be reassigned.
var myVariable = 'Initial Value';
myVariable = 'New Value';

// 'final' can only be set once.
final finalVariable = 'You can only set me once.';
// finalVariable = 'Error!'; // This would cause an error.

// 'const' is a compile-time constant.
const constVariable = 100;
// constVariable = 200; // Error!

// 'late' is for variables initialized after declaration.
late String description;
description = 'Initialized later!';
print(description);`
        }
      },
    },
  },
  {
    id: 3,
    title: 'Control Statements',
    duration: '1 Hour',
    icon: <Play className='w-6 h-6' />,
    content: {
      description:
        'Control statements allow you to control the flow of your program based on conditions. They make your programs "smarter" by allowing them to make decisions.',
      topics: [
        'if, else if, else: Conditional execution.',
        'switch: Handling multiple conditions for a single value.',
        'for loops: Repeating code a specific number of times.',
        'while loop: Repeating code as long as a condition is true.',
        'break and continue: Controlling loop execution.',
      ],
      detailedTopics: {
        ifElse: {
          title: 'if, else if, else',
          code: `int score = 85;\nif (score > 90) {\n  print('A+');\n} else if (score > 80) {\n  print('A');\n} else {\n  print('B');\n}`,
        },
        switch: {
          title: 'switch',
          code: `String day = 'Monday';\nswitch (day) {\n  case 'Monday':\n    print('Start of the week.');\n    break;\n  case 'Friday':\n    print('End of the week!');\n    break;\n  default:\n    print('Just another day.');\n}`,
        },
        forLoop: {
          title: 'for loop',
          code: `for (int i = 0; i < 3; i++) {\n  print('Loop number $i');\n}`,
        },
        whileLoop: {
          title: 'while loop',
          code: `int count = 0;\nwhile (count < 5) {\n  print(count);\n  count++;\n}`,
        },
      },
    },
  },
  {
    id: 4,
    title: 'Functions',
    duration: '1 Hour',
    icon: <Coffee className='w-6 h-6' />,
    content: {
      description:
        'A function is a block of organized, reusable code that performs a single, specific task.',
      topics: [
        'Defining a function with `void`.',
        'Returning a value from a function.',
        'Using arrow functions for concise syntax.',
        'Named parameters for clarity.',
        'Optional positional parameters for flexibility.',
      ],
      detailedTopics: {
        defining: {
          title: 'Defining a function',
          code: `void greet(String name) {\n  print('Hello, $name!');\n}\ngreet('Bob');`,
        },
        returning: {
          title: 'Returning a value',
          code: `int addNumbers(int a, int b) {\n  return a + b;\n}\nint sum = addNumbers(5, 3);\nprint(sum); // Output: 8`,
        },
        arrow: {
          title: 'Arrow functions',
          code: `int multiply(int a, int b) => a * b;\nint product = multiply(4, 5);\nprint(product); // Output: 20`,
        },
        namedParams: {
          title: 'Named Parameters',
          code: `// Use { } to specify named parameters.
void enableFlags({bool bold = false, bool hidden = false}) {
  // ...
}

// Call the function using paramName: value
enableFlags(hidden: true, bold: false);`,
        },
        optionalParams: {
          title: 'Optional Positional Parameters',
          code: `// Use [ ] to specify optional positional parameters.
String say(String from, String msg, [String? device]) {
  var result = '$from says $msg';
  if (device != null) {
    result = '$result with a $device';
  }
  return result;
}

// Call without the optional parameter.
say('Bob', 'Howdy');

// Call with the optional parameter.
say('Bob', 'Howdy', 'smoke signal');`,
        },
      },
    },
  },
];

const Day1 = () => {
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
              <div className='absolute top-20 left-20 w-72 h-72 bg-[#007BFF] rounded-full mix-blend-multiply filter blur-xl animate-pulse'></div>
              <div className='absolute top-40 right-20 w-72 h-72 bg-[#00B4AB] rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000'></div>
              <div className='absolute -bottom-8 left-40 w-72 h-72 bg-[#00D2FF] rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000'></div>
            </div>

            <div className='relative z-10 text-center px-4 max-w-4xl mx-auto'>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}>
                <h1 className='text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6'>
                  Day 1
                </h1>
                <h2 className='text-3xl md:text-5xl font-bold text-[#007BFF] mb-8'>
                  Dart Basics
                </h2>
                <p className='text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed'>
                  Welcome to the first day of our Dart course! Today, we'll
                  cover the fundamentals of the Dart language, from variables
                  and data types to control flow and functions.
                </p>

                <motion.button
                  onClick={scrollToContent}
                  className='inline-flex items-center gap-2 bg-[#007BFF] hover:bg-[#0056b3] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}>
                  <ChevronDown className='w-5 h-5' />
                  Explore Day 1 Content
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
                  4 sessions to get you started with Dart.
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
                          <div className='p-3 bg-[#007BFF]/20 rounded-xl text-[#007BFF]'>
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
                                <CheckCircle className='w-5 h-5 text-[#007BFF] mt-0.5 flex-shrink-0' />
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
                  Day 1 Summary
                </h3>
                <div className='grid md:grid-cols-2 gap-8'>
                  <div>
                    <h4 className='text-xl font-semibold text-[#007BFF] mb-4'>
                      Key Takeaways
                    </h4>
                    <ul className='space-y-3'>
                      <li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
                        <CheckCircle className='w-5 h-5 text-[#007BFF] mt-0.5 flex-shrink-0' />
                        <span>
                          Understand what Dart is and its main advantages.
                        </span>
                      </li>
                      <li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
                        <CheckCircle className='w-5 h-5 text-[#007BFF] mt-0.5 flex-shrink-0' />
                        <span>
                          Learn about basic data types like int, double,
                          String, and bool.
                        </span>
                      </li>
                      <li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
                        <CheckCircle className='w-5 h-5 text-[#007BFF] mt-0.5 flex-shrink-0' />
                        <span>
                          Control your code's flow with if/else, switch, and
                          loops.
                        </span>
                      </li>
                      <li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
                        <CheckCircle className='w-5 h-5 text-[#007BFF] mt-0.5 flex-shrink-0' />
                        <span>
                          Write reusable code with functions.
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className='text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4'>
                      What's Next
                    </h4>
                    <p className='text-gray-600 dark:text-gray-300 mb-6'>
                      In Day 2, we'll explore more advanced Dart concepts like
                      collections (Lists, Maps, Sets), null safety, and an
                      introduction to Object-Oriented Programming (OOP) in
                      Dart.
                    </p>
                    <button className='inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors'>
                      Next: Day 2
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
                      <strong>1. Simple Calculator:</strong> Write a function
                      that takes two numbers and an operator ('+', '-', '*',
                      '/') as input and returns the result.
                    </li>
                    <li className='text-gray-700 dark:text-gray-300'>
                      <strong>2. FizzBuzz:</strong> Write a program that prints
                      the numbers from 1 to 100. For multiples of three print
                      "Fizz" instead of the number and for the multiples of
                      five print "Buzz". For numbers which are multiples of
                      both three and five print "FizzBuzz".
                    </li>
                    <li className='text-gray-700 dark:text-gray-300'>
                      <strong>3. Palindrome Checker:</strong> Write a function
                      that checks if a given string is a palindrome (reads the
                      same forwards and backward).
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

export default Day1;