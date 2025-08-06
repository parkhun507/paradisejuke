import { useState, type FormEvent } from 'react';
import { supabase } from '../supabaseClient';
import type { AuthError } from '@supabase/supabase-js'; // Supabase의 AuthError 타입을 불러옵니다.

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab: 'login' | 'signup';
}

const AuthModal = ({ isOpen, onClose, initialTab }: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAuth = async (event: FormEvent, authType: 'login' | 'signup') => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let response;
      if (authType === 'signup') {
        response = await supabase.auth.signUp({ email, password });
      } else {
        response = await supabase.auth.signInWithPassword({ email, password });
      }
      
      const { error } = response;
      if (error) throw error;

      alert(authType === 'signup' ? '회원가입 성공! 이메일을 확인하여 인증해주세요.' : '로그인 성공!');
      onClose();

    } catch (e) {
      // 'any' 대신 'AuthError' 타입으로 오류를 처리합니다.
      const error = e as AuthError;
      setError(error.message); // 표준 오류 메시지를 사용합니다.
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex border-b mb-6">
          <button onClick={() => setActiveTab('login')} className={`flex-1 py-2 text-lg font-semibold transition-colors ${activeTab === 'login' ? 'text-pink-500 border-b-2 border-pink-500' : 'text-gray-500'}`}>
            로그인
          </button>
          <button onClick={() => setActiveTab('signup')} className={`flex-1 py-2 text-lg font-semibold transition-colors ${activeTab === 'signup' ? 'text-pink-500 border-b-2 border-pink-500' : 'text-gray-500'}`}>
            회원가입
          </button>
        </div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {activeTab === 'login' && (
          <form onSubmit={(e) => handleAuth(e, 'login')} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">이메일</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">비밀번호</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500" />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:scale-105 transition disabled:opacity-50">
              {loading ? '처리 중...' : '로그인'}
            </button>
          </form>
        )}

        {activeTab === 'signup' && (
          <form onSubmit={(e) => handleAuth(e, 'signup')} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">이메일</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">비밀번호</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="6자 이상 입력" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500" />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-pink-500 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-pink-600 transition disabled:opacity-50">
              {loading ? '처리 중...' : '회원가입'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthModal;


