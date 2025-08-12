const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-1">
            <h3 className="text-xl font-bold text-white mb-2"><span className="text-pink-400">Paradise</span> Juku</h3>
            <p className="text-sm text-gray-400 mb-4">전 세계 학습자들을 위한 최고의 온라인 일본어 커뮤니티 플랫폼</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">학습</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="courses" className="hover:text-pink-400">초급 코스</a></li>
              <li><a href="courses" className="hover:text-pink-400">중급 코스</a></li>
              <li><a href="courses" className="hover:text-pink-400">고급 코스</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">커뮤니티</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="community" className="hover:text-pink-400">자유게시판</a></li>
              <li><a href="community" className="hover:text-pink-400">스터디 그룹</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">고객지원</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-pink-400">도움말</a></li>
              <li><a href="#" className="hover:text-pink-400">문의하기</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8 text-center text-sm">
          <p>&copy; 2025 Paradise Juku. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;