import type { Session } from '@supabase/supabase-js';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Courses from '../components/Courses';
import Community from '../components/Community';
import SpecialLecture from '../components/SpecialLecture';

// App.tsx로부터 props를 받기 위한 타입 정의
interface HomePageProps {
  session: Session | null;
  openModal: (tab: 'login' | 'signup') => void;
}

const HomePage = ({ session, openModal }: HomePageProps) => {
  return (
    <>
      <Hero />
      <Stats />
      {/* Courses 컴포넌트로 props를 전달합니다. */}
      <Courses session={session} openModal={openModal} />
      <Community />
      <SpecialLecture />
    </>
  );
};

export default HomePage;
