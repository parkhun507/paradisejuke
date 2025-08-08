import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import type { Session } from '@supabase/supabase-js';
import { supabase } from './supabaseClient';
import Header from './components/Header';
import Footer from './components/Footer';

// pages 폴더에 있는 모든 페이지 컴포넌트를 불러옵니다.
import HomePage from './pages/HomePage';
import CommunityPage from './pages/CommunityPage';
import LearningPage from './pages/LearningPage';

function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Supabase 로그인 상태를 감지하는 로직
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="bg-neutral-50 text-neutral-600 font-sans antialiased">
      <Header session={session} />
      <main>
        {/* URL 경로에 따라 보여줄 페이지를 정의합니다. */}
        <Routes>
          {/* 기본 경로 ('/')에서는 HomePage를 보여줍니다. */}
          <Route path="/" element={<HomePage />} />
          
          {/* '/community' 경로에서는 CommunityPage를 보여줍니다. */}
          <Route path="/community" element={<CommunityPage />} />
          
          {/* '/learn/:courseId' 경로에서는 LearningPage를 보여줍니다. */}
          <Route path="/learn/:courseId" element={<LearningPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;


