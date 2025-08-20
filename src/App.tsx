import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/home';
import Day1 from './pages/day1';

function App() {
	const [isDarkMode, setIsDarkMode] = useState(false);

	// Initialize theme from localStorage or default to dark
	useEffect(() => {
		const savedTheme = localStorage.getItem('theme');
		if (savedTheme) {
			setIsDarkMode(savedTheme === 'dark');
		} else {
			// Default to light mode
			setIsDarkMode(false);
		}
	}, []);

	// Update theme in localStorage and apply to document
	useEffect(() => {
		localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
		if (isDarkMode) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}, [isDarkMode]);

	useEffect(() => {
		const observerOptions = {
			threshold: 0.1,
			rootMargin: '0px 0px -50px 0px',
		};

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('fade-in-up');
					entry.target.classList.remove('opacity-0', 'translate-y-8');
				}
			});
		}, observerOptions);

		const sections = document.querySelectorAll('.fade-section');
		sections.forEach((section) => observer.observe(section));

		// Smooth scrolling for anchor links
		const handleSmoothScroll = (e: Event) => {
			e.preventDefault();
			const target = e.target as HTMLAnchorElement;
			const href = target.getAttribute('href');
			if (href?.startsWith('#')) {
				const element = document.querySelector(href);
				if (element) {
					element.scrollIntoView({ behavior: 'smooth' });
				}
			}
		};

		const anchorLinks = document.querySelectorAll('a[href^="#"]');
		anchorLinks.forEach((link) => {
			link.addEventListener('click', handleSmoothScroll);
		});

		return () => {
			observer.disconnect();
			anchorLinks.forEach((link) => {
				link.removeEventListener('click', handleSmoothScroll);
			});
		};
	}, []);

	const toggleTheme = () => setIsDarkMode(!isDarkMode);

	return (
		<Router>
			<div className='min-h-screen bg-white dark:bg-[#0d1117] text-gray-900 dark:text-white font-inter transition-colors duration-300'>
				<Navigation
					isDarkMode={isDarkMode}
					toggleTheme={toggleTheme}
				/>

				<Routes>
					<Route
						path='/'
						element={<Home />}
					/>
					<Route
						path='/day1'
						element={<Day1 />}
					/>
				</Routes>

				<Footer />
			</div>
		</Router>
	);
}

export default App;
