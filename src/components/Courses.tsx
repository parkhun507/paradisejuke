import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // <Link> 대신 useNavigate를 사용합니다.
import type { Session } from '@supabase/supabase-js';
import { courses } from '../courseData';

ChartJS.register(ArcElement, Tooltip, Legend);

// DonutChart 컴포넌트 정의
const DonutChart = ({ progress, color }: { progress: number; color: string }) => {
  const data = {
    datasets: [{
      data: [progress, 100 - progress],
      backgroundColor: [color, '#F3F4F6'],
      borderColor: 'transparent'
    }]
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '75%',
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false }
    }
  };
  return <Doughnut data={data} options={options} />;
};

// CourseCard가 받을 props 타입을 정의합니다.
interface CourseCardProps {
  course: typeof courses[0];
  session: Session | null;
  openModal: (tab: 'login' | 'signup') => void;
}

// CourseCard 컴포넌트 정의
const CourseCard = ({ course, session, openModal }: CourseCardProps) => {
  const [isVisible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate(); // 페이지 이동을 위한 hook

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.3 });

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // '학습 계속하기' 버튼 클릭 시 실행될 함수
  const handleStartLearning = () => {
    if (session) {
      // 1. 로그인 상태이면 학습 페이지로 이동합니다.
      navigate(`/learn/${course.id}`);
    } else {
      // 2. 로그아웃 상태이면 로그인 모달을 띄웁니다.
      openModal('login');
    }
  };

  return (
    <div ref={ref} className="bg-white p-8 rounded-2xl shadow-subtle hover:shadow-lifted hover:-translate-y-2 transition-all duration-300 flex flex-col text-center">
      <div className="mb-4">
        <span className={`text-sm font-semibold px-3 py-1 rounded-full ${course.levelColor}`}>
          {course.level}
        </span>
      </div>
      <h3 className="text-2xl font-bold text-neutral-800 mb-4 h-16 flex items-center justify-center">{course.title}</h3>
      <div className="w-48 h-48 mx-auto my-4">
        {isVisible && <DonutChart progress={course.progress} color={course.chartColor} />}
      </div>
      <p className="text-neutral-500 my-4 flex-grow">{course.description}</p>
      <div className="border-t border-neutral-200 mt-auto pt-4 flex justify-between text-sm text-neutral-600">
        <span><b>{course.lessons}</b>개 레슨</span>
        <span><b>{course.duration}</b>개월 과정</span>
      </div>
      {/* <Link> 대신 <button>을 사용하고 onClick 이벤트를 연결합니다. */}
      <button
        onClick={handleStartLearning}
        className="mt-6 w-full block bg-pink-500 text-white font-semibold py-2 rounded-lg hover:bg-pink-600 transition-colors"
      >
        학습 계속하기
      </button>
    </div>
  );
};

// Courses 컴포넌트가 받을 props 타입을 정의합니다.
interface CoursesProps {
  session: Session | null;
  openModal: (tab: 'login' | 'signup') => void;
}

// 메인 Courses 컴포넌트
const Courses = ({ session, openModal }: CoursesProps) => {
  return (
    <section id="courses" className="py-20 bg-neutral-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-neutral-800 mb-4">당신의 레벨에 맞는 학습</h2>
          <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
            체계적인 커리큘럼으로 단계별 일본어 실력 향상을 경험해보세요.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <CourseCard 
              key={course.id} 
              course={course}
              // App.tsx로부터 받은 session과 openModal 함수를 전달합니다.
              session={session}
              openModal={openModal}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;




