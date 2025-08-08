import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { courses } from '../courseData';

const LearningPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const course = courses.find(c => c.id === courseId);
  const [activeTab, setActiveTab] = useState('description');

  if (!course) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">강의를 찾을 수 없습니다.</h1>
        <Link to="/" className="text-pink-500 hover:underline mt-4 inline-block">홈으로 돌아가기</Link>
      </div>
    );
  }

  const courseData = course.pageData;

  return (
    <div className="container mx-auto px-6 py-12">
      <Link to="/" className="mb-6 text-pink-500 font-semibold hover:underline inline-block">
        &larr; 모든 강좌 보기
      </Link>
      
      <div className="mb-8">
        <p className="text-sm text-gray-500">{courseData.subTitle}</p>
        <h1 className="text-4xl font-bold text-gray-800">{courseData.mainTitle}</h1>
        <p className="text-lg text-gray-600 mt-2">{courseData.pageDescription}</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-grow">
          <div className="aspect-video bg-black rounded-lg flex items-center justify-center text-white mb-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold">{courseData.videoTitle}</h2>
              <p className="text-lg">{courseData.videoSubTitle}</p>
            </div>
          </div>

          <div className="border-b border-gray-200">
            <nav className="flex space-x-6">
              <button onClick={() => setActiveTab('description')} className={`py-2 px-1 font-semibold ${activeTab === 'description' ? 'text-pink-500 border-b-2 border-pink-500' : 'text-gray-500 hover:text-gray-700'}`}>강의설명</button>
              <button onClick={() => setActiveTab('qna')} className={`py-2 px-1 font-semibold ${activeTab === 'qna' ? 'text-pink-500 border-b-2 border-pink-500' : 'text-gray-500 hover:text-gray-700'}`}>질문</button>
            </nav>
          </div>

          <div className="py-6">
            {activeTab === 'description' && (
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">{courseData.videoSubTitle}</h3>
                <p>이 레슨에서는 해당 주제의 기본 구조와 발음법을 배우게 됩니다.</p>
              </div>
            )}
            {activeTab === 'qna' && <p>질문 섹션입니다.</p>}
          </div>
        </div>

        <aside className="lg:w-96 flex-shrink-0">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">커리큘럼</h3>
              <span className="text-sm text-gray-500">{courseData.totalLessons}개 레슨</span>
            </div>
            <ul className="space-y-1">
              {courseData.curriculum.map(chapter => (
                <li key={chapter.id}>
                  <details className="group" open>
                    <summary className="p-3 rounded-md flex justify-between items-center font-semibold cursor-pointer hover:bg-gray-100">
                      {chapter.title}
                    </summary>
                    <ul className="pl-4 mt-1 space-y-1">
                      {chapter.lessons?.map(lesson => (
                         <li key={lesson.title} className="p-2 rounded-md flex justify-between items-center text-sm text-gray-600 hover:bg-gray-50">
                           <span>- {lesson.title}</span>
                           <span>{lesson.duration}</span>
                         </li>
                      ))}
                    </ul>
                  </details>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <p className="text-sm text-gray-600 mb-1">진도율</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-pink-500 h-2.5 rounded-full" style={{ width: `${courseData.progress}%` }}></div>
              </div>
              <p className="text-right text-sm text-gray-500 mt-1">{courseData.progress}%</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default LearningPage;
