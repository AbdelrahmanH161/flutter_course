const CourseOverview = () => {
  return (
    <section
      id='overview'
      className='py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-[#161b22] transition-colors duration-300'>
      <div className='max-w-7xl mx-auto'>
        <div className='fade-section opacity-0 translate-y-8 transition-all duration-700 ease-out'>
          <h2 className='text-3xl sm:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-[#0175C2] to-[#01B5F2] bg-clip-text text-transparent'>
            Your 8-Day Learning Path
          </h2>

          <div className='max-w-4xl mx-auto'>
            {/* Timeline */}
            <div className='relative'>
              <div className='absolute left-4 md:left-1/2 md:transform md:-translate-x-0.5 h-full w-0.5 bg-gradient-to-b from-[#0175C2] to-[#01B5F2]'></div>

              {/* Timeline Item 1 */}
              <div
                id='part1'
                className='relative flex items-center mb-12'>
                <div className='flex items-center w-full'>
                  <div className='absolute left-0 md:left-1/2 md:transform md:-translate-x-1/2 w-8 h-8 bg-[#0175C2] rounded-full border-4 border-gray-50 dark:border-[#161b22] flex items-center justify-center'>
                    <span className='text-white text-sm font-bold'>1</span>
                  </div>
                  <div className='ml-12 md:ml-0 md:w-1/2 md:pr-8 md:text-right'>
                    <h3 className='text-2xl font-bold text-[#01B5F2] mb-2'>
                      Days 1-2: The Dart Foundation
                    </h3>
                    <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
                      Master Dart fundamentals, object-oriented programming
                      concepts, and asynchronous programming. Build a solid
                      foundation that will power your Flutter development
                      journey.
                    </p>
                  </div>
                </div>
              </div>

              {/* Timeline Item 2 */}
              <div
                id='part2'
                className='relative flex items-center mb-12'>
                <div className='flex items-center w-full'>
                  <div className='absolute left-0 md:left-1/2 md:transform md:-translate-x-1/2 w-8 h-8 bg-[#01B5F2] rounded-full border-4 border-gray-50 dark:border-[#161b22] flex items-center justify-center'>
                    <span className='text-white text-sm font-bold'>2</span>
                  </div>
                  <div className='ml-12  md:w-1/2 md:pl-8 md:ml-auto'>
                    <h3 className='text-2xl font-bold text-[#01B5F2] mb-2'>
                      Days 3-8: Building with Flutter
                    </h3>
                    <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
                      Dive deep into Flutter widgets, state management,
                      navigation, and UI design. Create beautiful, responsive
                      interfaces and learn best practices for scalable app
                      development.
                    </p>
                  </div>
                </div>
              </div>

              {/* Timeline Item 3 */}
              {/* <div
								id='part3'
								className='relative flex items-center'>
								<div className='flex items-center w-full'>
									<div className='absolute left-0 md:left-1/2 md:transform md:-translate-x-1/2 w-8 h-8 bg-[#0175C2] rounded-full border-4 border-gray-50 dark:border-[#161b22] flex items-center justify-center'>
										<span className='text-white text-sm font-bold'>3</span>
									</div>
									<div className='ml-12 md:ml-0 md:w-1/2 md:pr-8 md:text-right'>
										<h3 className='text-2xl font-bold text-[#01B5F2] mb-2'>
											Days 9-10: Firebase Integration
										</h3>
										<p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
											Connect your Flutter apps to Firebase for authentication,
											real-time databases, and cloud storage. Deploy your first
											production-ready mobile application.
										</p>
									</div>
								</div>
							</div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseOverview;
