import { useState } from 'react';
import type { Session } from '@supabase/supabase-js'; // Supabase 타입 임포트
import { supabase } from '../supabaseClient'; // Supabase 클라이언트 임포트
import AuthModal from './AuthModal'; // 모달 컴포넌트 임포트

// Header가 App.tsx로부터 session 정보를 받기 위한 타입 정의
interface HeaderProps {
  session: Session | null;
}

const Header = ({ session }: HeaderProps) => {
  // 모달의 열림/닫힘 상태를 관리합니다.
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 모달이 열릴 때 어떤 탭을 먼저 보여줄지 관리합니다.
  const [initialTab, setInitialTab] = useState<'login' | 'signup'>('login');

  // 모달을 여는 함수
  const openModal = (tab: 'login' | 'signup') => {
    setInitialTab(tab);
    setIsModalOpen(true);
  };

  // 모달을 닫는 함수
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 로그아웃 처리 함수
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
    } else {
      // 로그아웃 성공 시 별도 알림 없이 UI가 자동으로 바뀝니다.
    }
  };

  return (
    <>
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-neutral-200">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          
          <div className="bg-white shadow-md rounded-xl px-4 py-2 hover:shadow-lg transition">
            <a href="#home" className="text-xl font-bold text-neutral-800">
              <span className="text-pink-500">Paradise</span> Juku
            </a>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8 text-base font-medium">
            <a href="#courses" className="text-neutral-700 hover:text-pink-500 transition">레벨별 학습</a>
            <a href="#community" className="text-neutral-700 hover:text-pink-500 transition">커뮤니티</a>
            <a href="#special-lecture" className="text-neutral-700 hover:text-pink-500 transition">추천 특강</a>
          </nav>

          <div className="flex items-center space-x-3">
            {/* ## 로그인 상태에 따른 UI 분기 처리 ## */}
            {session ? (
              // 1. 로그인 상태일 때 보여줄 UI
              <>
                <span className="text-sm text-neutral-700 hidden sm:block">
                  {session.user.email}
                </span>
                <button 
                  onClick={handleSignOut}
                  className="bg-gray-200 text-gray-700 font-semibold px-5 py-2 rounded-full hover:bg-gray-300 transition"
                >
                  로그아웃
                </button>
              </>
            ) : (
              // 2. 로그아웃 상태일 때 보여줄 UI
              <>
                <button 
                  onClick={() => openModal('login')}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold px-5 py-2 rounded-full shadow-md hover:scale-105 transition"
                >
                  로그인
                </button>
                <button 
                  onClick={() => openModal('signup')}
                  className="bg-pink-500 text-white font-semibold px-5 py-2 rounded-full hover:bg-pink-600 shadow-md transition"
                >
                  회원가입
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* 모달은 로그아웃 상태일 때만 렌더링합니다. */}
      {!session && (
        <AuthModal 
          isOpen={isModalOpen} 
          onClose={closeModal} 
          initialTab={initialTab} 
        />
      )}
    </>
  );
};

export default Header;



