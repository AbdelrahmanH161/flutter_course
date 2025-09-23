import { useState, Suspense, lazy, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronDown,
  CheckCircle,
  Clock,
  ArrowRight,
} from 'lucide-react';

import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { sessionsDay1 } from '../utils/sessions';

const SyntaxHighlighter = lazy(() => import('react-syntax-highlighter'));

const Loading = () => <div>Loading...</div>;



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
                {sessionsDay1.map((session, index) => (
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
                          Learn about basic data types like int, double, String,
                          and bool.
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
                        <span>Write reusable code with functions.</span>
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
                      introduction to Object-Oriented Programming (OOP) in Dart.
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

                {/* Exercise 1: Const vs Final */}
                <div className='bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 mb-6 border-l-4 border-blue-500'>
                  <div className='flex items-center gap-3 mb-4'>
                    <div className='w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm'>
                      1
                    </div>
                    <h5 className='text-xl font-semibold text-blue-700 dark:text-blue-300'>
                      Const vs Final in Dart
                    </h5>
                  </div>
                  <p className='text-gray-700 dark:text-gray-300 mb-4'>
                    Explain the difference between{' '}
                    <code className='bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm'>
                      const
                    </code>{' '}
                    and{' '}
                    <code className='bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm'>
                      final
                    </code>{' '}
                    in Dart with illustrative examples.
                  </p>
                  <div className='bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
                    <h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-2'>
                      Key Differences:
                    </h6>
                    <ul className='space-y-2 text-sm text-gray-600 dark:text-gray-400'>
                      <li>
                        • <strong>const:</strong> Compile-time constant, must be
                        known at compile time
                      </li>
                      <li>
                        • <strong>final:</strong> Runtime constant, can be
                        computed at runtime but set only once
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Exercise 2: Personal Info Analyzer */}
                <div className='bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 mb-6 border-l-4 border-green-500'>
                  <div className='flex items-center gap-3 mb-4'>
                    <div className='w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm'>
                      2
                    </div>
                    <h5 className='text-xl font-semibold text-green-700 dark:text-green-300'>
                      Personal Info Analyzer
                    </h5>
                  </div>
                  <p className='text-gray-700 dark:text-gray-300 mb-4'>
                    Create variables for a person's name (String), age (int), height (double), and active status (bool).
                    Use arithmetic operators to calculate the year they were born.
                    Use a conditional operator (?:) to print whether they are an adult.
                    Use a switch statement to classify their height range (short, average, tall).
                  </p>
                  <div className='bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
                    <h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-2'>
                      Skills to Practice:
                    </h6>
                    <ul className='space-y-1 text-sm text-gray-600 dark:text-gray-400'>
                      <li>• Variable declarations and data types</li>
                      <li>• Arithmetic operators (+, -, *, /)</li>
                      <li>• Ternary operator (?:)</li>
                      <li>• Switch statements</li>
                      <li>• Conditional logic</li>
                    </ul>
                  </div>
                </div>

                {/* Exercise 3: Simple Grade Calculator */}
                <div className='bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 mb-6 border-l-4 border-purple-500'>
                  <div className='flex items-center gap-3 mb-4'>
                    <div className='w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm'>
                      3
                    </div>
                    <h5 className='text-xl font-semibold text-purple-700 dark:text-purple-300'>
                      Simple Grade Calculator
                    </h5>
                  </div>
                  <p className='text-gray-700 dark:text-gray-300 mb-4'>
                    Create a Map of subjects and marks.
                    Use a for loop to calculate the total and average.
                    Use if/else and relational operators to print the grade (A, B, etc.).
                    Use ?? to handle a possible null value for an optional subject mark.
                    Wrap the logic in a function calculateGrade(Map&lt;String,int&gt; marks) that returns a String grade.
                  </p>
                  <div className='bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
                    <h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-2'>
                      Skills to Practice:
                    </h6>
                    <ul className='space-y-1 text-sm text-gray-600 dark:text-gray-400'>
                      <li>• Maps and data structures</li>
                      <li>• For loops and iteration</li>
                      <li>• Relational operators (&gt;, &lt;, &gt;=, &lt;=)</li>
                      <li>• Null-aware operators (??)</li>
                      <li>• Function creation and return types</li>
                    </ul>
                  </div>
                </div>

                {/* Exercise 4: Product Price Adjuster */}
                <div className='bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-6 mb-6 border-l-4 border-orange-500'>
                  <div className='flex items-center gap-3 mb-4'>
                    <div className='w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm'>
                      4
                    </div>
                    <h5 className='text-xl font-semibold text-orange-700 dark:text-orange-300'>
                      Product Price Adjuster
                    </h5>
                  </div>
                  <p className='text-gray-700 dark:text-gray-300 mb-4'>
                    Create a List of product prices.
                    Use forEach or map to increase each price by 10% tax.
                    Use a Set to store product categories (ensuring uniqueness).
                    Use while to remove prices lower than a threshold.
                    Use assignment operators (+=, -=) to modify totals and logical operators to check stock availability.
                  </p>
                  <div className='bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
                    <h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-2'>
                      Skills to Practice:
                    </h6>
                    <ul className='space-y-1 text-sm text-gray-600 dark:text-gray-400'>
                      <li>• Lists and Sets</li>
                      <li>• forEach and map methods</li>
                      <li>• While loops</li>
                      <li>• Assignment operators (+=, -=)</li>
                      <li>• Logical operators (&&, ||)</li>
                    </ul>
                  </div>
                </div>

                {/* Exercise 5: Lucky Number Checker */}
                <div className='bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-xl p-6 mb-6 border-l-4 border-teal-500'>
                  <div className='flex items-center gap-3 mb-4'>
                    <div className='w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold text-sm'>
                      5
                    </div>
                    <h5 className='text-xl font-semibold text-teal-700 dark:text-teal-300'>
                      Lucky Number Checker
                    </h5>
                  </div>
                  <p className='text-gray-700 dark:text-gray-300 mb-4'>
                    Ask the user (hardcode or simulate input) for a lucky number (int).
                    Use type test operators (is, is!) to confirm the input type.
                    Use a for loop to check numbers 1–20:
                    If the lucky number matches, print "You won!" and break.
                    Use continue to skip even numbers if the lucky number is odd.
                    Put this logic inside a function with an optional positional parameter for the range end (default 20).
                  </p>
                  <div className='bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
                    <h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-2'>
                      Skills to Practice:
                    </h6>
                    <ul className='space-y-1 text-sm text-gray-600 dark:text-gray-400'>
                      <li>• Type test operators (is, is!)</li>
                      <li>• For loops with break and continue</li>
                      <li>• Optional positional parameters</li>
                      <li>• Function parameters and defaults</li>
                      <li>• Control flow statements</li>
                    </ul>
                  </div>
                </div>

                {/* Exercise 6: Discount Calculator with Functions */}
                <div className='bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 rounded-xl p-6 mb-6 border-l-4 border-rose-500'>
                  <div className='flex items-center gap-3 mb-4'>
                    <div className='w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center text-white font-bold text-sm'>
                      6
                    </div>
                    <h5 className='text-xl font-semibold text-rose-700 dark:text-rose-300'>
                      Discount Calculator with Functions
                    </h5>
                  </div>
                  <p className='text-gray-700 dark:text-gray-300 mb-4'>
                    Create a function double applyDiscount(double price, {'{'}double discount = 0.1{'}'}) that uses named parameters.
                    Use arrow function syntax to return the discounted price.
                    Call the function for several prices stored in a List, then use map and where to filter discounted prices above a certain amount.
                    Use a ternary operator to print "Big Discount!" if any final price drops below 50, otherwise "Regular Discount".
                  </p>
                  <div className='bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
                    <h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-2'>
                      Skills to Practice:
                    </h6>
                    <ul className='space-y-1 text-sm text-gray-600 dark:text-gray-400'>
                      <li>• Named parameters with default values</li>
                      <li>• Arrow function syntax</li>
                      <li>• map and where methods</li>
                      <li>• Ternary operator (?:)</li>
                      <li>• Function composition and chaining</li>
                    </ul>
                  </div>
                </div>

                {/* Challenge Section */}
                <div className='bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-xl p-6 border-l-4 border-amber-500'>
                  <div className='flex items-center gap-3 mb-4'>
                    <div className='w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-lg'>
                      🏆
                    </div>
                    <h5 className='text-xl font-semibold text-amber-700 dark:text-amber-300'>
                      Bonus Challenge
                    </h5>
                  </div>
                  <p className='text-gray-700 dark:text-gray-300 mb-4'>
                    Try to solve all exercises and test them with different
                    inputs. Challenge yourself to write clean, readable code!
                  </p>
                  <div className='flex flex-wrap gap-2'>
                    <span className='px-3 py-1 bg-amber-100 dark:bg-amber-800 text-amber-800 dark:text-amber-200 rounded-full text-sm font-medium'>
                      Dart Basics
                    </span>
                    <span className='px-3 py-1 bg-amber-100 dark:bg-amber-800 text-amber-800 dark:text-amber-200 rounded-full text-sm font-medium'>
                      Control Flow
                    </span>
                    <span className='px-3 py-1 bg-amber-100 dark:bg-amber-800 text-amber-800 dark:text-amber-200 rounded-full text-sm font-medium'>
                      Functions
                    </span>
                    <span className='px-3 py-1 bg-amber-100 dark:bg-amber-800 text-amber-800 dark:text-amber-200 rounded-full text-sm font-medium'>
                      String Manipulation
                    </span>
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

export default Day1;
