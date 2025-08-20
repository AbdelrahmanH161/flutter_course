import CourseEvaluation from '../components/CourseEvaluation';
import CourseOverview from '../components/CourseOverview';
import HeroSection from '../components/HeroSection';
import InstructorSection from '../components/InstructorSection';

const Home = () => {
	return (
		<div>
			<HeroSection />
			<CourseOverview />
			<CourseEvaluation />
			<InstructorSection />
		</div>
	);
};

export default Home;
