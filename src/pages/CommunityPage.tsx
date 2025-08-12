import { useState, useEffect } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../supabaseClient';

// Post와 Like의 타입을 정의합니다.
interface Post {
  id: string;
  created_at: string;
  content: string;
  user_email: string;
  user_id: string;
  likes: Like[];
}
interface Like {
  id: number;
  post_id: string;
  user_id: string;
}

const CommunityPage = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [loading, setLoading] = useState(true);

  // Supabase에서 게시글과 좋아요 정보를 가져오는 함수
  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*, likes (*)')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
      setPosts([]);
    } else {
      setPosts(data as Post[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    const initialize = async () => {
      setLoading(true);
      await supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
      });
      await fetchPosts();
    };
    initialize();

    const channel = supabase
      .channel('public:posts_and_likes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'posts' }, fetchPosts)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'likes' }, fetchPosts)
      .subscribe();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      supabase.removeChannel(channel);
      subscription.unsubscribe();
    };
  }, []);

  // 새 글 작성 함수
  const handleCreatePost = async () => {
    if (!newPostContent.trim() || !session) return;
    await supabase.from('posts').insert({
      content: newPostContent,
      user_id: session.user.id,
      user_email: session.user.email,
    });
    setNewPostContent('');
  };
  
  // 좋아요/좋아요 취소 함수
  const handleLike = async (postId: string) => {
    if (!session) return alert('로그인이 필요합니다.');
    const userId = session.user.id;
    const post = posts.find(p => p.id === postId);
    const userHasLiked = post?.likes.some(like => like.user_id === userId);

    if (userHasLiked) {
      await supabase.from('likes').delete().match({ post_id: postId, user_id: userId });
    } else {
      await supabase.from('likes').insert({ post_id: postId, user_id: userId });
    }
  };

  // ## 글 삭제 함수 추가 ##
  const handleDeletePost = async (postId: string) => {
    // 사용자에게 정말 삭제할 것인지 확인받습니다.
    const isConfirmed = window.confirm('정말로 이 글을 삭제하시겠습니까?');
    if (isConfirmed) {
      const { error } = await supabase.from('posts').delete().match({ id: postId });
      if (error) {
        console.error('Error deleting post:', error);
        alert('글을 삭제하는 데 실패했습니다.');
      }
      // 삭제 성공 시 실시간 구독이 자동으로 UI를 업데이트합니다.
    }
  };

  return (
    <section id="community-page" className="py-20 bg-neutral-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-neutral-800 mb-4">학습 커뮤니티</h2>
          <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
            전 세계 학습자들과 학습 경험을 나누고 궁금한 점을 해결하세요.
          </p>
        </div>

        {session && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8 max-w-3xl mx-auto">
            <textarea
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
              rows={3}
              placeholder={`${session.user.email?.split('@')[0]}님, 새로운 글을 작성해보세요...`}
            />
            <div className="text-right">
              <button onClick={handleCreatePost} className="mt-4 bg-pink-500 text-white font-semibold px-5 py-2 rounded-lg hover:bg-pink-600 transition">
                글쓰기
              </button>
            </div>
          </div>
        )}

        <div className="space-y-6 max-w-3xl mx-auto">
          {loading ? <p className="text-center">게시글을 불러오는 중...</p> : 
            posts.map(post => (
              <div key={post.id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-start">
                  <p className="text-sm text-gray-500 font-semibold">{post.user_email?.split('@')[0]}</p>
                  
                  {/* ## 삭제 버튼 추가 ## */}
                  {/* 현재 로그인한 사용자가 글쓴이일 경우에만 삭제 버튼을 보여줍니다. */}
                  {session?.user.id === post.user_id && (
                    <button 
                      onClick={() => handleDeletePost(post.id)}
                      className="text-xs text-gray-400 hover:text-red-500"
                    >
                      삭제
                    </button>
                  )}
                </div>
                <p className="text-gray-800 my-4 text-lg whitespace-pre-wrap">{post.content}</p>
                <div className="flex items-center space-x-4 text-gray-500">
                  <button onClick={() => handleLike(post.id)} className="flex items-center space-x-1 hover:text-red-500 transition">
                    <span className={post.likes.some(like => like.user_id === session?.user.id) ? 'text-red-500' : ''}>
                      ❤️
                    </span>
                    <span>{post.likes.length}</span>
                  </button>
                  <span>💬 0</span>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  );
};

export default CommunityPage;

