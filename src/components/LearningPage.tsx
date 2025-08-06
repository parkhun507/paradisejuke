import { useState } from 'react';

// 이 페이지가 받을 데이터의 타입을 정의합니다.
// courseData.ts 파일의 pageData 객체와 일치합니다.
interface CoursePageData {
  subTitle: string;
  mainTitle: string;
  pageDescription: string;
  videoTitle: string;
  videoSubTitle: string;
  curriculum: { id: number; title: string; unlocked: boolean; lessons?: {title: string; duration: string}[] }[];
  totalLessons: number;
  progress: number;
}

interface LearningPageProps {
  courseData: CoursePageData;
  onBack: () => void;
}

const LearningPage = ({ courseData, onBack }: LearningPageProps) => {
  const [activeTab, setActiveTab] = useState('description');

  return (
    <div className="container mx-auto px-6 py-12">
      <button onClick={onBack} className="mb-6 text-pink-500 font-semibold hover:underline">
        &larr; 모든 강좌 보기
      </button>
      
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
              <p className="text-sm text-gray-400 mt-2">타나카 선생님</p>
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
                <p className="text-gray-700 mb-4">이 레슨에서는 해당 주제의 기본 구조와 발음법을 배우게 됩니다.</p>
                <h4 className="font-semibold mb-2">학습 목표</h4>
                <ul className="list-disc list-inside text-gray-700">
                  <li>관련 문자를 정확히 읽고 쓸 수 있다</li>
                  <li>기본 발음 규칙을 이해한다</li>
                </ul>
              </div>
            )}
            {activeTab === 'qna' && (
              <div>
                <h3 className="text-xl font-bold mb-4">강의 질문</h3>
                <p>이곳에 질문 컴포넌트가 표시됩니다.</p>
              </div>
            )}
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
                      <svg className="w-4 h-4 transition-transform transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
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


