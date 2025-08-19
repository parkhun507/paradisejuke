import type { Session } from '@supabase/supabase-js';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';

// Header가 App.tsx로부터 받을 props 타입을 정의합니다.
interface HeaderProps {
  session: Session | null;
  openModal: (tab: 'login' | 'signup') => void;
}

const Header = ({ session, openModal }: HeaderProps) => {
  // 로그아웃 처리 함수
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-neutral-200">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        
        <div className="bg-white shadow-md rounded-xl px-4 py-2 hover:shadow-lg transition">
          <Link to="/" className="text-xl font-bold text-neutral-800">
            <span className="text-pink-500">Paradise</span> Juku
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8 text-base font-medium">
          <a href="/#courses" className="text-neutral-700 hover:text-pink-500 transition">레벨별 학습</a>
          <Link to="/community" className="text-neutral-700 hover:text-pink-500 transition">커뮤니티</Link>
          <a href="/#special-lecture" className="text-neutral-700 hover:text-pink-500 transition">추천 특강</a>
        </nav>

        <div className="flex items-center space-x-3">
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
    // AuthModal 컴포넌트는 App.tsx에서 관리하므로 여기서 제거합니다.
  );
};

export default Header;



