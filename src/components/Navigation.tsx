import { useState } from 'react';
import { Menu, X, ChevronDown, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';
import FlutterLogo from './FlutterLogo';

interface NavigationProps {
	isDarkMode: boolean;
	toggleTheme: () => void;
}

const Navigation = ({ isDarkMode, toggleTheme }: NavigationProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
	const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

	return (
		<nav className='sticky top-0 z-50 bg-white/95 dark:bg-[#0d1117]/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 transition-colors duration-300'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between items-center h-16'>
					<div className='flex items-center space-x-3'>
						<Link
							to='/'
							className='flex items-center space-x-3'>
							<FlutterLogo className='w-8 h-8' />
							<span className='text-xl font-bold bg-gradient-to-r from-[#0175C2] to-[#01B5F2] bg-clip-text text-transparent'>
								Flutter in 10 Days
							</span>
						</Link>
					</div>

					{/* Desktop Navigation */}
					<div className='hidden md:flex items-center space-x-8'>
						<Link
							to='/'
							className='text-gray-600 dark:text-gray-300 hover:text-[#01B5F2] transition-colors duration-200'>
							Home
						</Link>

						{/* 10 Day Plan Dropdown */}
						<div className='relative'>
							<button
								onClick={toggleDropdown}
								className='flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-[#01B5F2] transition-colors duration-200'>
								<span>10 Day Plan</span>
								<ChevronDown className='w-4 h-4' />
							</button>
							{isDropdownOpen && (
								<div className='absolute top-full mt-2 w-48 bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-700 rounded-md shadow-lg transition-colors duration-300'>
									<a
										href='/day1'
										className='block px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-[#01B5F2] transition-colors duration-200'>
										Days 1
									</a>
									<a
										href='/day2'
										className='block px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-[#01B5F2] transition-colors duration-200'>
										Days 2
									</a>
									<a
										href='/day3'
										className='block px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-[#01B5F2] transition-colors duration-200'>
										Days 3
									</a>
									<a
										href='/day4'
										className='block px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-[#01B5F2] transition-colors duration-200'>
										Days 4
									</a>
									<a
										href='/day5'
										className='block px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-[#01B5F2] transition-colors duration-200'>
										Days 5
									</a>
									{/* <a
										href='/day4'
										className='block px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-[#01B5F2] transition-colors duration-200'>
										Days 4
									</a>
									<a
										href='/day5'
										className='block px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-[#01B5F2] transition-colors duration-200'>
										Days 5
									</a>
									<a
										href='/day6'
										className='block px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-[#01B5F2] transition-colors duration-200'>
										Days 6
									</a>
									<a
										href='/day7'
										className='block px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-[#01B5F2] transition-colors duration-200'>
										Days 7
									</a>
									<a
										href='/day8'
										className='block px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-[#01B5F2] transition-colors duration-200'>
										Days 8
									</a>
									<a
										href='/day9'
										className='block px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-[#01B5F2] transition-colors duration-200'>
										Days 9
									</a>
									<a
										href='/day10'
										className='block px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-[#01B5F2] transition-colors duration-200'>
										Days 10
									</a> */}
								</div>
							)}
						</div>

						{/* Theme Toggle */}
						<button
							onClick={toggleTheme}
							className='p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-[#01B5F2] hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200'
							aria-label='Toggle theme'>
							{isDarkMode ? (
								<Sun className='w-5 h-5' />
							) : (
								<Moon className='w-5 h-5' />
							)}
						</button>
					</div>

					{/* Mobile menu button */}
					<button
						onClick={toggleMenu}
						className='md:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200'>
						{isMenuOpen ? (
							<X className='w-6 h-6' />
						) : (
							<Menu className='w-6 h-6' />
						)}
					</button>
				</div>

				{/* Mobile Navigation */}
				{isMenuOpen && (
					<div className='md:hidden bg-gray-50 dark:bg-[#161b22] border-t border-gray-200 dark:border-gray-700 transition-colors duration-300'>
						<div className='px-2 pt-2 pb-3 space-y-1'>
							<Link
								to='/'
								className='block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-[#01B5F2] transition-colors duration-200'>
								Home
							</Link>
							<Link
								to='/about'
								className='block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-[#01B5F2] transition-colors duration-200'>
								About
							</Link>
							<Link
								to='/contact'
								className='block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-[#01B5F2] transition-colors duration-200'>
								Contact
							</Link>
							<div className='px-3 py-2'>
								<div className='text-gray-500 dark:text-gray-400 text-sm font-medium mb-2'>
									10 Day Plan
								</div>
								<Link
									to='/day1'
									className='block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-[#01B5F2] transition-colors duration-200'>
									Days 1
								</Link>
								<Link
									to='/day2'
									className='block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-[#01B5F2] transition-colors duration-200'>
									Days 1
								</Link>
								<Link
									to='/day3'
									className='block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-[#01B5F2] transition-colors duration-200'>
									Days 1
								</Link>
								<Link
									to='/day4'
									className='block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-[#01B5F2] transition-colors duration-200'>
									Days 1
								</Link>
							</div>
							<div className='px-3 py-2'>
								<button
									onClick={toggleTheme}
									className='flex items-center space-x-2 px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-[#01B5F2] transition-colors duration-200'>
									{isDarkMode ? (
										<Sun className='w-4 h-4' />
									) : (
										<Moon className='w-4 h-4' />
									)}
									<span className='text-sm'>
										{isDarkMode ? 'Light Mode' : 'Dark Mode'}
									</span>
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navigation;
