import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Courses from './components/Courses';
import Community from './components/Community';
import SpecialLecture from './components/SpecialLecture';
import Footer from './components/Footer';
import "./index.css";

function App() {
  return (
    <div className="bg-neutral-50 text-neutral-600 font-sans antialiased">
      <Header />
      <main>
        <Hero />
        <Stats />
        <Courses />
        <Community />
        <SpecialLecture />
      </main>
      <Footer />
    </div>
  );
}

export default App;