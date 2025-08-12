import { Link } from 'react-router-dom';

// 메인 페이지에 보여줄 간단한 '미리보기'용 커뮤니티 컴포넌트입니다.
const Community = () => {
  // 실제 데이터 대신 보여줄 샘플 게시글 (디자인 확인용)
  const samplePosts = [
    { id: 1, author: '사쿠라모리', time: '2시간 전', title: 'JLPT N2 합격 후기 공유해요! 🎉' },
    { id: 2, author: '토토로짱', time: '4시간 전', title: '도쿄 여행 중 현지인과 대화 성공! 😆' },
  ];

  return (
    <section id="community" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-neutral-800 mb-4">활발한 학습 커뮤니티</h2>
          <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
            전 세계 학습자들과 학습 경험을 나누고 궁금한 점을 해결하세요.
          </p>
        </div>

        {/* 최신 글 미리보기 */}
        <div className="max-w-3xl mx-auto space-y-4">
          {samplePosts.map(post => (
            <div key={post.id} className="bg-neutral-100 p-4 rounded-lg shadow-sm transition hover:shadow-md">
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{post.author}</span>
                <span>{post.time}</span>
              </div>
              <p className="font-semibold text-neutral-800 mt-1">{post.title}</p>
            </div>
          ))}
        </div>

        {/* 전체 커뮤니티 페이지로 이동하는 버튼 */}
        <div className="text-center mt-12">
          <Link
            to="/community"
            className="bg-pink-500 text-white font-semibold px-8 py-3 rounded-lg hover:bg-pink-600 transition shadow-md"
          >
            커뮤니티 전체 보기
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Community;
