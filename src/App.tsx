import { useState, useEffect } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from './supabaseClient';
import { courses } from './courseData'; // 코스 데이터 임포트
import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Courses from './components/Courses';
import Community from './components/Community';
import SpecialLecture from './components/SpecialLecture';
import Footer from './components/Footer';
import LearningPage from './components/LearningPage';

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [currentPage, setCurrentPage] = useState('main');
  // 선택된 코스의 'id'를 저장할 상태
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  useEffect(() => {
    // 페이지 로드 시 현재 세션 정보를 가져옵니다.
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // 인증 상태가 변경될 때마다 감지하여 세션 상태를 업데이트합니다.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // 컴포넌트가 언마운트될 때 구독을 해제합니다.
    return () => subscription.unsubscribe();
  }, []);

  // '학습 계속하기' 버튼 클릭 시 id를 받아 상태를 업데이트
  const handleStartLearning = (id: string) => {
    setSelectedCourseId(id);
    setCurrentPage('learning');
    window.scrollTo(0, 0);
  };

  const handleBackToMain = () => {
    setCurrentPage('main');
    setSelectedCourseId(null);
  };

  // 선택된 id를 기반으로 전체 코스 데이터에서 해당 코스 정보를 찾음
  const selectedCourse = courses.find(course => course.id === selectedCourseId);

  return (
    <div className="bg-neutral-50 text-neutral-600 font-sans antialiased">
      <Header session={session} />
      <main>
        {currentPage === 'main' ? (
          <>
            <Hero />
            <Stats />
            <Courses onStartLearning={handleStartLearning} />
            <Community />
            <SpecialLecture />
          </>
        ) : (
          // 찾은 코스 데이터가 있을 경우에만 LearningPage를 렌더링
          // courseTitle 대신 courseData를 전달하도록 수정
          selectedCourse && (
            <LearningPage 
              courseData={selectedCourse.pageData} 
              onBack={handleBackToMain} 
            />
          )
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;

