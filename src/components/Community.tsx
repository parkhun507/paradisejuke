import { useState, useEffect } from 'react';

// 타입 정의 (변경 없음)
interface Post {
  id: number;
  author: string;
  time: string;
  title: string;
  content: string;
  likes: number;
  comments: number;
  tags: string[];
}

// 데이터 (변경 없음)
const allPosts: Post[] = [
  { id: 1, author: '사쿠라모리', time: '2시간 전', title: 'JLPT N2 합격 후기 공유해요! 🎉', content: '6개월 동안 열심히 공부한 결과 드디어 N2에 합격했어요! 공부법과 팁을 공유할게요.', likes: 24, comments: 8, tags: ['jlpt'] },
  { id: 2, author: '토토로짱', time: '4시간 전', title: '도쿄 여행 중 현지인과 대화 성공! 😆', content: '어제 시부야에서 길을 물어보는데, 일본어로 대화가 되더라고요! Paradise Juku 덕분인 것 같아요...', likes: 15, comments: 12, tags: ['travel'] },
  { id: 3, author: '일본어마스터', time: '1일 전', title: '온라인 스터디 그룹 멤버 모집합니다!', content: '매주 화요일 저녁 8시에 온라인으로 만나서 회화 연습을 하고 있어요. 중급 레벨 이상 환영!', likes: 31, comments: 6, tags: ['study'] },
  { id: 4, author: '김프로', time: '2일 전', title: '비즈니스 일본어 과정, 이메일 작성 팁', content: '비즈니스 과정에서 배운 경어 표현을 활용해서 이메일을 작성해봤는데, 거래처 반응이 좋네요. 팁 공유합니다.', likes: 18, comments: 5, tags: ['business'] },
];

const tags = [
    { tag: 'all', name: '#전체보기' },
    { tag: 'jlpt', name: '#JLPT합격후기' },
    { tag: 'travel', name: '#일본여행' },
    { tag: 'study', name: '#스터디모집' },
    { tag: 'business', name: '#비즈니스일본어' }
];

const Community = () => {
  const [activeTag, setActiveTag] = useState('all');
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(allPosts);

  useEffect(() => {
    if (activeTag === 'all') {
      setFilteredPosts(allPosts);
    } else {
      setFilteredPosts(allPosts.filter(post => post.tags.includes(activeTag)));
    }
  }, [activeTag]);

  return (
    // ✅ 섹션 스타일 통일
    <section id="community" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          {/* ✅ 제목/부제목 타이포그래피 개선 */}
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-800 mb-4">학습 커뮤니티</h2>
          <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
            전 세계 학습자들과 학습 경험을 나누고 궁금한 점을 해결하세요.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Posts */}
          <div className="lg:w-2/3">
            <h3 className="text-2xl font-bold text-neutral-800 mb-6">최신 글</h3>
            <div className="space-y-6">
              {filteredPosts.map(post => (
                // ✅ 게시글을 카드 형태로 변경하고 호버 효과 추가
                <div key={post.id} className="bg-white p-6 rounded-xl border border-neutral-200 shadow-subtle hover:shadow-lifted transition-all duration-300 cursor-pointer">
                  <div className="flex items-center justify-between text-sm text-neutral-500">
                    <span>{post.author}</span>
                    <span>{post.time}</span>
                  </div>
                  <h4 className="font-bold text-lg my-2 text-neutral-800 group-hover:text-brand-primary transition-colors">
                    {post.title}
                  </h4>
                  <p className="text-neutral-600 text-base leading-relaxed">
                    {post.content}
                  </p>
                  <div className="flex items-center space-x-4 mt-4 text-sm text-neutral-500 border-t border-neutral-200 pt-4">
                    <span>❤️ {post.likes}</span>
                    <span>💬 {post.comments}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-28">
              <h3 className="text-2xl font-bold text-neutral-800 mb-6">인기 토픽</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map(({tag, name}) => (
                    // ✅ 필터 버튼 디자인 대폭 개선 (활성/비활성 상태 구분)
                    <button 
                        key={tag}
                        onClick={() => setActiveTag(tag)}
                        className={`px-4 py-1.5 rounded-full font-semibold text-sm transition-all duration-200 ${
                            activeTag === tag
                            ? 'bg-brand-primary text-white shadow-md'
                            : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-800'
                        }`}
                    >
                       {name}
                    </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;