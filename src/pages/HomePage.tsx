import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Courses from '../components/Courses';
import Community from '../components/Community';
import SpecialLecture from '../components/SpecialLecture';

const HomePage = () => {
  return (
    <>
      <Hero />
      <Stats />
      <Courses />
      <Community />
      <SpecialLecture />
    </>
  );
};

export default HomePage;