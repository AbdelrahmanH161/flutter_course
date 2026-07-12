import { useState, Suspense, lazy, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronDown,
  CheckCircle,
  Clock,
  ArrowRight,
} from 'lucide-react';

import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { sessionsDay3 } from '../utils/sessions';

const SyntaxHighlighter = lazy(() => import('react-syntax-highlighter'));

const Loading = () => <div>Loading...</div>;

const Day3 = () => {
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
              <div className='absolute top-20 left-20 w-72 h-72 bg-[#0175C2] rounded-full mix-blend-multiply filter blur-xl animate-pulse'></div>
              <div className='absolute top-40 right-20 w-72 h-72 bg-[#00A99D] rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000'></div>
              <div className='absolute -bottom-8 left-40 w-72 h-72 bg-[#01B5F2] rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000'></div>
            </div>

            <div className='relative z-10 text-center px-4 max-w-4xl mx-auto'>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}>
                <h1 className='text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6'>
                  Day 3
                </h1>
                <h2 className='text-3xl md:text-5xl font-bold text-[#0175C2] mb-8'>
                  Object-Oriented Programming in Dart
                </h2>
                <p className='text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed'>
                  Master the full power of OOP in Dart. Classes, constructors, inheritance, polymorphism, encapsulation, abstract classes, interfaces, mixins, and enhanced enums — all in one day.
                </p>

                <motion.button
                  onClick={scrollToContent}
                  className='inline-flex items-center gap-2 bg-[#0175C2] hover:bg-[#005ea0] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}>
                  <ChevronDown className='w-5 h-5' />
                  Explore Day 3 Content
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
                  5 sessions to master Object-Oriented Programming in Dart.
                </p>
              </motion.div>

              <div className='space-y-8'>
                {sessionsDay3.map((session, index) => (
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
                          <div className='p-3 bg-[#0175C2]/20 rounded-xl text-[#0175C2]'>
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
                                <CheckCircle className='w-5 h-5 text-[#0175C2] mt-0.5 flex-shrink-0' />
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

              {/* Summary Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 mt-12'>
                <h3 className='text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center'>
                  Day 3 Summary
                </h3>
                <div className='grid md:grid-cols-2 gap-8'>
                  <div>
                    <h4 className='text-xl font-semibold text-[#0175C2] mb-4'>
                      Key Takeaways
                    </h4>
                    <ul className='space-y-3'>
                      <li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
                        <CheckCircle className='w-5 h-5 text-[#0175C2] mt-0.5 flex-shrink-0' />
                        <span>
                          Mastered classes and objects — the core building blocks of OOP in Dart.
                        </span>
                      </li>
                      <li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
                        <CheckCircle className='w-5 h-5 text-[#0175C2] mt-0.5 flex-shrink-0' />
                        <span>
                          Learned all constructor types: generative, named, factory, constant, and initializer lists.
                        </span>
                      </li>
                      <li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
                        <CheckCircle className='w-5 h-5 text-[#0175C2] mt-0.5 flex-shrink-0' />
                        <span>
                          Applied inheritance and polymorphism with extends, @override, and super.
                        </span>
                      </li>
                      <li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
                        <CheckCircle className='w-5 h-5 text-[#0175C2] mt-0.5 flex-shrink-0' />
                        <span>
                          Implemented encapsulation with private fields, getters/setters, abstract classes, and interfaces.
                        </span>
                      </li>
                      <li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
                        <CheckCircle className='w-5 h-5 text-[#0175C2] mt-0.5 flex-shrink-0' />
                        <span>
                          Used mixins for cross-cutting behavior and enhanced enums for expressive constant types.
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className='text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4'>
                      What's Next
                    </h4>
                    <p className='text-gray-600 dark:text-gray-300 mb-6'>
                      Starting Day 4, we dive into Flutter! You'll learn what Flutter is, how the widget tree works, and start building beautiful UIs with Material and Cupertino design systems.
                    </p>
                    <button className='inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors'>
                      Next: Day 4 — Flutter Intro
                      <ArrowRight className='w-5 h-5' />
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Lab Exercises Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 mt-8'>
                <h3 className='text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center'>
                  Lab Exercises
                </h3>

                {/* Exercise 1: Shape Hierarchy */}
                <div className='bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 mb-6 border-l-4 border-blue-500'>
                  <div className='flex items-center gap-3 mb-4'>
                    <div className='w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm'>
                      1
                    </div>
                    <h5 className='text-xl font-semibold text-blue-700 dark:text-blue-300'>
                      Shape Hierarchy (Abstract Classes & Inheritance)
                    </h5>
                  </div>
                  <p className='text-gray-700 dark:text-gray-300 mb-4'>
                    Create an <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm'>abstract class Shape</code> with abstract methods <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm'>area()</code> and <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm'>perimeter()</code>, and a concrete method <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm'>describe()</code>.
                    <br />• Extend it with <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm'>Circle</code>, <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm'>Rectangle</code>, and <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm'>Triangle</code> classes — each with appropriate constructors.
                    <br />• Use <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm'>@override</code> to implement area() and perimeter() for each.
                    <br />• In main(), create a <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm'>List&lt;Shape&gt;</code>, loop through it, and print each shape's description — demonstrating polymorphism.
                  </p>
                  <div className='bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
                    <h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-2'>Skills to Practice:</h6>
                    <ul className='space-y-1 text-sm text-gray-600 dark:text-gray-400'>
                      <li>• Abstract classes and methods</li>
                      <li>• extends and @override</li>
                      <li>• Polymorphism with List&lt;Shape&gt;</li>
                      <li>• Concrete methods in abstract classes</li>
                    </ul>
                  </div>
                </div>

                {/* Exercise 2: Bank Account */}
                <div className='bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 mb-6 border-l-4 border-green-500'>
                  <div className='flex items-center gap-3 mb-4'>
                    <div className='w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm'>
                      2
                    </div>
                    <h5 className='text-xl font-semibold text-green-700 dark:text-green-300'>
                      Bank Account (Encapsulation)
                    </h5>
                  </div>
                  <p className='text-gray-700 dark:text-gray-300 mb-4'>
                    Build a <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm'>BankAccount</code> class with proper encapsulation.
                    <br />• Private field <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm'>_balance</code> — never directly accessible from outside.
                    <br />• Getter for <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm'>balance</code> (read-only).
                    <br />• Methods <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm'>deposit(double amount)</code> and <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm'>withdraw(double amount)</code> with validation (no negative deposits, no overdraft).
                    <br />• Named constructor <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm'>BankAccount.withInitialBalance(double)</code>.
                    <br />• Override <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm'>toString()</code> to display account summary.
                  </p>
                  <div className='bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
                    <h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-2'>Skills to Practice:</h6>
                    <ul className='space-y-1 text-sm text-gray-600 dark:text-gray-400'>
                      <li>• Private fields with _ prefix</li>
                      <li>• Getters for controlled access</li>
                      <li>• Named constructors</li>
                      <li>• toString() override</li>
                    </ul>
                  </div>
                </div>

                {/* Exercise 3: Animal Kingdom with Mixins */}
                <div className='bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 mb-6 border-l-4 border-purple-500'>
                  <div className='flex items-center gap-3 mb-4'>
                    <div className='w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm'>
                      3
                    </div>
                    <h5 className='text-xl font-semibold text-purple-700 dark:text-purple-300'>
                      Animal Kingdom (Mixins)
                    </h5>
                  </div>
                  <p className='text-gray-700 dark:text-gray-300 mb-4'>
                    Design an animal system using mixins for capabilities.
                    <br />• Create mixins: <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm'>CanSwim</code>, <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm'>CanFly</code>, <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm'>CanRun</code> — each with an appropriate method.
                    <br />• Create an abstract <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm'>Animal</code> class with <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm'>name</code> and abstract <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm'>sound()</code>.
                    <br />• Create at least 3 animals: <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm'>Duck</code> (all 3), <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm'>Dog</code> (swim + run), <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm'>Eagle</code> (fly + run).
                    <br />• In main(), demonstrate each animal's capabilities.
                  </p>
                  <div className='bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
                    <h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-2'>Skills to Practice:</h6>
                    <ul className='space-y-1 text-sm text-gray-600 dark:text-gray-400'>
                      <li>• mixin keyword</li>
                      <li>• Multiple mixins with with</li>
                      <li>• Abstract classes + extends</li>
                      <li>• Combining mixins and inheritance</li>
                    </ul>
                  </div>
                </div>

                {/* Exercise 4: Task Status Machine */}
                <div className='bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-6 mb-6 border-l-4 border-orange-500'>
                  <div className='flex items-center gap-3 mb-4'>
                    <div className='w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm'>
                      4
                    </div>
                    <h5 className='text-xl font-semibold text-orange-700 dark:text-orange-300'>
                      Task Status Machine (Enhanced Enums)
                    </h5>
                  </div>
                  <p className='text-gray-700 dark:text-gray-300 mb-4'>
                    Build a task management system using enhanced enums.
                    <br />• Create an <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm'>enum Priority</code> with values: low, medium, high, critical — each with a display label and numeric weight.
                    <br />• Create an <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm'>enum TaskStatus</code> with: todo, inProgress, blocked, done — with a boolean <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm'>isActive</code> getter.
                    <br />• Create a <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm'>Task</code> class using these enums as field types.
                    <br />• In main(), create tasks and filter active ones using <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm'>where()</code>.
                  </p>
                  <div className='bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
                    <h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-2'>Skills to Practice:</h6>
                    <ul className='space-y-1 text-sm text-gray-600 dark:text-gray-400'>
                      <li>• Enhanced enums with fields</li>
                      <li>• Const constructors on enums</li>
                      <li>• Getters on enum values</li>
                      <li>• Enums as class field types</li>
                    </ul>
                  </div>
                </div>

                {/* Challenge: Mini Library System */}
                <div className='bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-xl p-6 border-l-4 border-amber-500'>
                  <div className='flex items-center gap-3 mb-4'>
                    <div className='w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-lg'>
                      🏆
                    </div>
                    <h5 className='text-xl font-semibold text-amber-700 dark:text-amber-300'>
                      Bonus Challenge — Mini Library System
                    </h5>
                  </div>
                  <p className='text-gray-700 dark:text-gray-300 mb-4'>
                    Combine everything from Day 3 into a complete mini-system:
                    <br />• <strong>Abstract</strong> base class <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm'>LibraryItem</code> with <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm'>title</code>, <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm'>itemType()</code> abstract method.
                    <br />• <strong>Subclasses:</strong> <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm'>Book</code> and <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm'>DVD</code> extending LibraryItem.
                    <br />• <strong>Mixin</strong> <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm'>Lendable</code> with <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm'>lend()</code> and <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm'>returnItem()</code> methods.
                    <br />• <strong>Enhanced enum</strong> <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm'>Genre</code> with display names.
                    <br />• <strong>Library</strong> class with encapsulated private collection, add/search methods.
                    <br />• Named constructor <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm'>Library.withSeed()</code> that pre-fills some items.
                  </p>
                  <div className='flex flex-wrap gap-2'>
                    <span className='px-3 py-1 bg-amber-100 dark:bg-amber-800 text-amber-800 dark:text-amber-200 rounded-full text-sm font-medium'>
                      Classes & Objects
                    </span>
                    <span className='px-3 py-1 bg-amber-100 dark:bg-amber-800 text-amber-800 dark:text-amber-200 rounded-full text-sm font-medium'>
                      Constructors
                    </span>
                    <span className='px-3 py-1 bg-amber-100 dark:bg-amber-800 text-amber-800 dark:text-amber-200 rounded-full text-sm font-medium'>
                      Inheritance
                    </span>
                    <span className='px-3 py-1 bg-amber-100 dark:bg-amber-800 text-amber-800 dark:text-amber-200 rounded-full text-sm font-medium'>
                      Encapsulation
                    </span>
                    <span className='px-3 py-1 bg-amber-100 dark:bg-amber-800 text-amber-800 dark:text-amber-200 rounded-full text-sm font-medium'>
                      Mixins
                    </span>
                    <span className='px-3 py-1 bg-amber-100 dark:bg-amber-800 text-amber-800 dark:text-amber-200 rounded-full text-sm font-medium'>
                      Enhanced Enums
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

export default Day3;
