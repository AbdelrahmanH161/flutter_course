import { useState, Suspense, lazy, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronDown,
  CheckCircle,
  Clock,
  ArrowRight,
} from 'lucide-react';

import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { sessionsDay2 } from '../utils/sessions';

const SyntaxHighlighter = lazy(() => import('react-syntax-highlighter'));

const Loading = () => <div>Loading...</div>;

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
                  Advanced Dart — Functions, Collections & Error Handling
                </h2>
                <p className='text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed'>
                  Go deeper into Dart! Master advanced function patterns, declarative collection operators, robust error handling with custom exceptions, and the full power of Dart's null safety system.
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
                  4 sessions covering advanced Dart fundamentals.
                </p>
              </motion.div>

              <div className='space-y-8'>
                {sessionsDay2.map((session, index) => (
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
                        <p
                          className='text-gray-600 dark:text-gray-300 leading-relaxed'
                          dangerouslySetInnerHTML={{
                            __html: session.content.description,
                          }}></p>

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
                          Mastered all function types: positional, optional, named, arrow, closures, and higher-order functions.
                        </span>
                      </li>
                      <li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
                        <CheckCircle className='w-5 h-5 text-[#0055A4] mt-0.5 flex-shrink-0' />
                        <span>
                          Built dynamic collections using spread (...), collection if, and collection for.
                        </span>
                      </li>
                      <li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
                        <CheckCircle className='w-5 h-5 text-[#0055A4] mt-0.5 flex-shrink-0' />
                        <span>
                          Handled errors gracefully with try/on/catch/finally and custom Exception classes.
                        </span>
                      </li>
                      <li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
                        <CheckCircle className='w-5 h-5 text-[#0055A4] mt-0.5 flex-shrink-0' />
                        <span>
                          Applied null safety operators: ?, !, ??, ??=, ?., and late for safe, robust code.
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className='text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4'>
                      What's Next
                    </h4>
                    <p className='text-gray-600 dark:text-gray-300 mb-6'>
                      In Day 3, we dive into Object-Oriented Programming — the core of Dart architecture. You'll learn classes, all constructor types, inheritance, polymorphism, encapsulation, mixins, and enums.
                    </p>
                    <button className='inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors'>
                      Next: Day 3 — OOP
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

                {/* Exercise 1: Message Formatter */}
                <div className='bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 mb-6 border-l-4 border-blue-500'>
                  <div className='flex items-center gap-3 mb-4'>
                    <div className='w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm'>
                      1
                    </div>
                    <h5 className='text-xl font-semibold text-blue-700 dark:text-blue-300'>
                      Message Formatter (Functions)
                    </h5>
                  </div>
                  <p className='text-gray-700 dark:text-gray-300 mb-4'>
                    Write a function <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm'>formatMessage</code> with named parameters: <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm'>required String text</code>, <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm'>String prefix = '[INFO]'</code>, and an optional positional parameter for timestamp.
                    <br />• Use arrow syntax for a helper <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm'>shout(String s)</code> that returns s.toUpperCase().
                    <br />• Write a higher-order function <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm'>applyFilter(List&lt;String&gt; msgs, bool Function(String) filter)</code> and use it to filter messages containing 'ERROR'.
                    <br />• Store an anonymous function that reverses a string in a variable and call it.
                  </p>
                  <div className='bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
                    <h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-2'>Skills to Practice:</h6>
                    <ul className='space-y-1 text-sm text-gray-600 dark:text-gray-400'>
                      <li>• Named & optional positional parameters</li>
                      <li>• Arrow function syntax</li>
                      <li>• Higher-order functions</li>
                      <li>• Anonymous functions & closures</li>
                    </ul>
                  </div>
                </div>

                {/* Exercise 2: Shopping Cart Builder */}
                <div className='bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 mb-6 border-l-4 border-green-500'>
                  <div className='flex items-center gap-3 mb-4'>
                    <div className='w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm'>
                      2
                    </div>
                    <h5 className='text-xl font-semibold text-green-700 dark:text-green-300'>
                      Shopping Cart Builder (Collections & Operators)
                    </h5>
                  </div>
                  <p className='text-gray-700 dark:text-gray-300 mb-4'>
                    Build a shopping cart using Dart's collection operators.
                    <br />• Start with two separate lists of items (groceries and electronics) and merge them with the spread operator.
                    <br />• Use <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm'>collection if</code> to add a 'Gift Wrap' item only if a boolean <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm'>isGiftOrder</code> is true.
                    <br />• Use <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm'>collection for</code> to generate discount labels for a list of promo codes.
                    <br />• Handle a nullable <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm'>List&lt;String&gt;? bonusItems</code> using null-aware spread (...?).
                  </p>
                  <div className='bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
                    <h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-2'>Skills to Practice:</h6>
                    <ul className='space-y-1 text-sm text-gray-600 dark:text-gray-400'>
                      <li>• Spread operator (...)</li>
                      <li>• Null-aware spread (...?)</li>
                      <li>• Collection if & for</li>
                      <li>• Nullable collections</li>
                    </ul>
                  </div>
                </div>

                {/* Exercise 3: Custom Exception Handler */}
                <div className='bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 mb-6 border-l-4 border-purple-500'>
                  <div className='flex items-center gap-3 mb-4'>
                    <div className='w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm'>
                      3
                    </div>
                    <h5 className='text-xl font-semibold text-purple-700 dark:text-purple-300'>
                      Custom Exception Handler (Error Handling)
                    </h5>
                  </div>
                  <p className='text-gray-700 dark:text-gray-300 mb-4'>
                    Build a robust data processing pipeline.
                    <br />• Create a custom exception <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm'>ValidationException</code> with a <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm'>field</code> and <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm'>message</code>.
                    <br />• Write a function <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm'>validateAge(int? age)</code> that throws <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm'>ValidationException</code> for null or out-of-range values.
                    <br />• Call it in a try/on/catch/finally block — catch ValidationException specifically and all others generally.
                    <br />• Add a <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm'>rethrow</code> in a wrapper function, and catch it in main.
                  </p>
                  <div className='bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
                    <h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-2'>Skills to Practice:</h6>
                    <ul className='space-y-1 text-sm text-gray-600 dark:text-gray-400'>
                      <li>• Custom Exception classes</li>
                      <li>• throw, try, on, catch, finally</li>
                      <li>• rethrow up the call stack</li>
                      <li>• Specific vs generic catches</li>
                    </ul>
                  </div>
                </div>

                {/* Exercise 4: Null Safety Challenge */}
                <div className='bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-6 mb-6 border-l-4 border-orange-500'>
                  <div className='flex items-center gap-3 mb-4'>
                    <div className='w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm'>
                      4
                    </div>
                    <h5 className='text-xl font-semibold text-orange-700 dark:text-orange-300'>
                      User Profile Builder (Null Safety)
                    </h5>
                  </div>
                  <p className='text-gray-700 dark:text-gray-300 mb-4'>
                    Model a user profile with nullable and non-nullable fields.
                    <br />• Create variables: <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm'>String username</code>, <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm'>String? nickname</code>, <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm'>int? age</code>, <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm'>late String bio</code>.
                    <br />• Use <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm'>??</code> to display nickname or username as fallback.
                    <br />• Use <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm'>??=</code> to assign a default age if not set.
                    <br />• Use <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm'>?.</code> to safely access a nullable object's method.
                    <br />• Initialize <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm'>bio</code> after declaration using <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm'>late</code>.
                  </p>
                  <div className='bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
                    <h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-2'>Skills to Practice:</h6>
                    <ul className='space-y-1 text-sm text-gray-600 dark:text-gray-400'>
                      <li>• Nullable vs non-nullable types (?)</li>
                      <li>• If-null operator (??)</li>
                      <li>• If-null assignment (??=)</li>
                      <li>• Null-aware access (?.) and late</li>
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
                      Bonus Challenge — Safe Data Pipeline
                    </h5>
                  </div>
                  <p className='text-gray-700 dark:text-gray-300 mb-4'>
                    Combine everything from Day 2: write a function pipeline that takes a nullable list of raw strings, uses collection operators to clean & filter them, wraps parsing in try/catch with a custom exception, and applies null safety patterns throughout. Handle the entire flow without a single null crash!
                  </p>
                  <div className='flex flex-wrap gap-2'>
                    <span className='px-3 py-1 bg-amber-100 dark:bg-amber-800 text-amber-800 dark:text-amber-200 rounded-full text-sm font-medium'>
                      Functions
                    </span>
                    <span className='px-3 py-1 bg-amber-100 dark:bg-amber-800 text-amber-800 dark:text-amber-200 rounded-full text-sm font-medium'>
                      Collections
                    </span>
                    <span className='px-3 py-1 bg-amber-100 dark:bg-amber-800 text-amber-800 dark:text-amber-200 rounded-full text-sm font-medium'>
                      Error Handling
                    </span>
                    <span className='px-3 py-1 bg-amber-100 dark:bg-amber-800 text-amber-800 dark:text-amber-200 rounded-full text-sm font-medium'>
                      Null Safety
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

export default Day2;
