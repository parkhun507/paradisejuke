import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import type { Session } from '@supabase/supabase-js';
import { supabase } from './supabaseClient';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CommunityPage from './pages/CommunityPage';
import LearningPage from './pages/LearningPage';
import AuthModal from './components/AuthModal'; // AuthModal을 직접 사용합니다.

function App() {
  const [session, setSession] = useState<Session | null>(null);
  
  // 로그인 모달 상태를 App.tsx에서 관리합니다.
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialTab, setInitialTab] = useState<'login' | 'signup'>('login');

  useEffect(() => {
    // ... Supabase 세션 관리 로직은 그대로 ...
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setSession(session));
    return () => subscription.unsubscribe();
  }, []);

  const openModal = (tab: 'login' | 'signup') => {
    setInitialTab(tab);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="bg-neutral-50 text-neutral-600 font-sans antialiased">
      {/* Header에 세션 정보와 모달을 여는 함수를 전달합니다. */}
      <Header session={session} openModal={openModal} />
      <main>
        <Routes>
          {/* HomePage에 세션 정보와 모달 함수를 전달합니다. */}
          <Route path="/" element={<HomePage session={session} openModal={openModal} />} />
          <Route path="/community" element={<CommunityPage />} />
          
          {/* LearningPage 경로 보호 */}
          <Route 
            path="/learn/:courseId" 
            element={
              session ? <LearningPage /> : <HomePage session={session} openModal={openModal} />
            } 
          />
        </Routes>
      </main>
      <Footer />

      {/* 모달은 App.tsx에서 직접 렌더링합니다. */}
      {!session && <AuthModal isOpen={isModalOpen} onClose={closeModal} initialTab={initialTab} />}
    </div>
  );
}

export default App;



