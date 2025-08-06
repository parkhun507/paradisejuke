import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useState, useEffect, useRef } from 'react';
import { courses } from '../courseData'; // 코스 데이터 파일을 불러옵니다.

// Chart.js를 등록합니다.
ChartJS.register(ArcElement, Tooltip, Legend);

// 1. DonutChart 컴포넌트와 Props 타입을 정의합니다.
interface DonutChartProps {
  progress: number;
  color: string;
}

const DonutChart = ({ progress, color }: DonutChartProps) => {
  const data = {
    datasets: [
      {
        data: [progress, 100 - progress],
        backgroundColor: [color, '#F3F4F6'],
        borderColor: 'transparent',
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '75%',
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };

  return <Doughnut data={data} options={options} />;
};


// 2. CourseCard 컴포넌트와 Props 타입을 정의합니다.
interface CourseCardProps {
  course: typeof courses[0]; // course 객체 전체를 받도록 타입을 정의합니다.
  onStartLearning: (id: string) => void; // App.tsx로부터 받을 함수 타입을 정의합니다.
}

const CourseCard = ({ course, onStartLearning }: CourseCardProps) => {
  const [isVisible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // 카드가 화면에 보일 때 애니메이션을 한 번만 실행하기 위한 useEffect
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

  return (
    <div ref={ref} className="bg-white p-8 rounded-2xl shadow-subtle hover:shadow-lifted hover:-translate-y-2 transition-all duration-300 flex flex-col text-center">
      <div className="mb-4">
        <span className={`text-sm font-semibold px-3 py-1 rounded-full ${course.levelColor}`}>
          {course.level}
        </span>
      </div>
      <h3 className="text-2xl font-bold text-neutral-800 mb-4 h-16 flex items-center justify-center">{course.title}</h3>
      <div className="w-48 h-48 mx-auto my-4">
        {/* isVisible 상태가 true일 때만 DonutChart를 렌더링합니다. */}
        {isVisible && <DonutChart progress={course.progress} color={course.chartColor} />}
      </div>
      <p className="text-neutral-500 my-4 flex-grow">{course.description}</p>
      <div className="border-t border-neutral-200 mt-auto pt-4 flex justify-between text-sm text-neutral-600">
        <span><b>{course.lessons}</b>개 레슨</span>
        <span><b>{course.duration}</b>개월 과정</span>
      </div>
      <button 
        onClick={() => onStartLearning(course.id)} // 클릭 시 course.id를 App.tsx로 전달합니다.
        className="mt-6 w-full bg-pink-500 text-white font-semibold py-2 rounded-lg hover:bg-pink-600 transition-colors"
      >
        학습 계속하기
      </button>
    </div>
  );
};


// 3. 메인 Courses 컴포넌트를 정의합니다.
const Courses = ({ onStartLearning }: { onStartLearning: (id: string) => void }) => {
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
          {/* courses 데이터를 매핑하여 각 CourseCard를 렌더링합니다. */}
          {courses.map((course) => (
            <CourseCard 
              key={course.id}
              course={course} 
              onStartLearning={onStartLearning}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;

