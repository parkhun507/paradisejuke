const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-neutral-200">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        
        <div className="bg-white shadow-md rounded-xl px-4 py-2 hover:shadow-lg transition">
          <a href="#home" className="text-xl font-bold text-neutral-800">
            <span className="text-pink-500">Paradise</span> Juku
          </a>
        </div>
        
        <nav className="md:flex items-center space-x-8 text-base font-medium">
          <a href="#courses" className="text-neutral-700 hover:text-pink-500 transition">레벨별 학습</a>
          <a href="#community" className="text-neutral-700 hover:text-pink-500 transition">커뮤니티</a>
          <a href="#special-lecture" className="text-neutral-700 hover:text-pink-500 transition">추천 특강</a>
        </nav>

        <div className="flex items-center space-x-3">
          <a href="#courses" className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold px-5 py-2 rounded-full shadow-md hover:scale-105 transition">
            학습 시작하기
          </a>
          <button className="bg-pink-500 text-white font-semibold px-5 py-2 rounded-full hover:bg-pink-600 shadow-md transition">
            회원가입
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

