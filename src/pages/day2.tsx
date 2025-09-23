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
                  Intermediate Dart
                </h2>
                <p className='text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed'>
                  Today we'll dive deeper into Dart, exploring collections,
                  advanced function concepts, and the basics of Object-Oriented
                  Programming.
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
                          Mastered the use of Lists, Maps, and Sets for data
                          collection.
                        </span>
                      </li>
                      <li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
                        <CheckCircle className='w-5 h-5 text-[#0055A4] mt-0.5 flex-shrink-0' />
                        <span>
                          Understood closures and how functions capture their
                          scope.
                        </span>
                      </li>
                      <li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
                        <CheckCircle className='w-5 h-5 text-[#0055A4] mt-0.5 flex-shrink-0' />
                        <span>
                          Learned to create lazy sequences with generator
                          functions.
                        </span>
                      </li>
                      <li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
                        <CheckCircle className='w-5 h-5 text-[#0055A4] mt-0.5 flex-shrink-0' />
                        <span>
                          Grasped the basics of OOP with classes, objects, and
                          constructors.
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className='text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4'>
                      What's Next
                    </h4>
                    <p className='text-gray-600 dark:text-gray-300 mb-6'>
                      In Day 3, we'll explore advanced OOP concepts like
                      inheritance, mixins, and interfaces, and dive into error
                      handling and asynchronous programming in Dart.
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

                {/* Exercise 1: Lists & Sets */}
                <div className='bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 mb-6 border-l-4 border-blue-500'>
                  <div className='flex items-center gap-3 mb-4'>
                    <div className='w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm'>
                      1
                    </div>
                    <h5 className='text-xl font-semibold text-blue-700 dark:text-blue-300'>
                      Lists & Sets
                    </h5>
                  </div>
                  <p className='text-gray-700 dark:text-gray-300 mb-4'>
                    Create a list of 5 numbers and print the 3rd element. Then
                    create a set of the same numbers and explain the difference
                    between the list and the set.
                  </p>
                </div>

                {/* Exercise 2: Classes & Objects */}
                <div className='bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 mb-6 border-l-4 border-green-500'>
                  <div className='flex items-center gap-3 mb-4'>
                    <div className='w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm'>
                      2
                    </div>
                    <h5 className='text-xl font-semibold text-green-700 dark:text-green-300'>
                      Classes & Objects
                    </h5>
                  </div>
                  <p className='text-gray-700 dark:text-gray-300 mb-4'>
                    Define a simple class Car with two properties: brand and
                    year. Create an object of this class and print its
                    properties.
                  </p>
                </div>

                {/* Exercise 3: Maps */}
                <div className='bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 mb-6 border-l-4 border-purple-500'>
                  <div className='flex items-center gap-3 mb-4'>
                    <div className='w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm'>
                      3
                    </div>
                    <h5 className='text-xl font-semibold text-purple-700 dark:text-purple-300'>
                      Maps
                    </h5>
                  </div>
                  <p className='text-gray-700 dark:text-gray-300 mb-4'>
                    Create a map of 3 students with their names as keys and
                    grades as values. Print all students who have grades above
                    80 using the .where() method.
                  </p>
                </div>

                {/* Exercise 4: Constructors */}
                <div className='bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-6 mb-6 border-l-4 border-orange-500'>
                  <div className='flex items-center gap-3 mb-4'>
                    <div className='w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm'>
                      4
                    </div>
                    <h5 className='text-xl font-semibold text-orange-700 dark:text-orange-300'>
                      Constructors
                    </h5>
                  </div>
                  <p className='text-gray-700 dark:text-gray-300 mb-4'>
                    Create a Student class with two constructors: A generative
                    constructor that takes name and age, and a named constructor
                    Student.withoutAge that only takes name and sets age to
                    null. Demonstrate both in main().
                  </p>
                </div>

                {/* Exercise 5: Inheritance */}
                <div className='bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-xl p-6 mb-6 border-l-4 border-teal-500'>
                  <div className='flex items-center gap-3 mb-4'>
                    <div className='w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold text-sm'>
                      5
                    </div>
                    <h5 className='text-xl font-semibold text-teal-700 dark:text-teal-300'>
                      Inheritance
                    </h5>
                  </div>
                  <p className='text-gray-700 dark:text-gray-300 mb-4'>
                    Create a parent class Animal with a method makeSound().
                    Extend it in two child classes: Dog and Cat, and override
                    makeSound() in both.
                  </p>
                </div>

                {/* Exercise 6: Maps (Hard Version) */}
                <div className='bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 rounded-xl p-6 mb-6 border-l-4 border-rose-500'>
                  <div className='flex items-center gap-3 mb-4'>
                    <div className='w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center text-white font-bold text-sm'>
                      6
                    </div>
                    <h5 className='text-xl font-semibold text-rose-700 dark:text-rose-300'>
                      Maps (Hard Version)
                    </h5>
                  </div>
                  <p className='text-gray-700 dark:text-gray-300 mb-4'>
                    Create a map of students with their names as keys and
                    another map as value (containing "math", "science", and
                    "english" grades). Use .forEach to print each student's
                    grades, .map to create average grades, and .where to find
                    students above 85 average.
                  </p>
                </div>

                {/* Exercise 7: Encapsulation & Getters/Setters */}
                <div className='bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-violet-900/20 dark:to-indigo-900/20 rounded-xl p-6 mb-6 border-l-4 border-violet-500'>
                  <div className='flex items-center gap-3 mb-4'>
                    <div className='w-8 h-8 bg-violet-500 rounded-full flex items-center justify-center text-white font-bold text-sm'>
                      7
                    </div>
                    <h5 className='text-xl font-semibold text-violet-700 dark:text-violet-300'>
                      Encapsulation & Getters/Setters
                    </h5>
                  </div>
                  <p className='text-gray-700 dark:text-gray-300 mb-4'>
                    Create a BankAccount class with a private _balance property.
                    Provide a getter to check balance and a setter that prevents
                    depositing a negative amount. Show how encapsulation is
                    achieved.
                  </p>
                </div>

                {/* Exercise 8: Abstract & Static */}
                <div className='bg-gradient-to-r from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20 rounded-xl p-6 mb-6 border-l-4 border-sky-500'>
                  <div className='flex items-center gap-3 mb-4'>
                    <div className='w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center text-white font-bold text-sm'>
                      8
                    </div>
                    <h5 className='text-xl font-semibold text-sky-700 dark:text-sky-300'>
                      Abstract & Static
                    </h5>
                  </div>
                  <p className='text-gray-700 dark:text-gray-300 mb-4'>
                    Create an abstract class Shape with an abstract method
                    area(). Implement two classes: Circle and Rectangle. Use
                    @override to calculate area in each class. Add a static
                    method Shape.info() that prints "All shapes have an area."
                  </p>
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
                    inputs. Challenge yourself to write clean, readable code and
                    experiment with the concepts!
                  </p>
                  <div className='flex flex-wrap gap-2'>
                    <span className='px-3 py-1 bg-amber-100 dark:bg-amber-800 text-amber-800 dark:text-amber-200 rounded-full text-sm font-medium'>
                      Collections
                    </span>
                    <span className='px-3 py-1 bg-amber-100 dark:bg-amber-800 text-amber-800 dark:text-amber-200 rounded-full text-sm font-medium'>
                      OOP
                    </span>
                    <span className='px-3 py-1 bg-amber-100 dark:bg-amber-800 text-amber-800 dark:text-amber-200 rounded-full text-sm font-medium'>
                      Inheritance
                    </span>
                    <span className='px-3 py-1 bg-amber-100 dark:bg-amber-800 text-amber-800 dark:text-amber-200 rounded-full text-sm font-medium'>
                      Encapsulation
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
