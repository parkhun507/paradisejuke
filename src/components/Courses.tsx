import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useState, useEffect, useRef } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

// 도넛 차트 컴포넌트 Props 타입 정의
interface DonutChartProps {
  progress: number;
  color: string;
}

const DonutChart = ({ progress, color }: DonutChartProps) => {
  const data = {
    datasets: [
      {
        data: [progress, 100 - progress],
        backgroundColor: [color, '#F3F4F6'], // 남은 부분 색상
        borderColor: 'transparent',
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '75%', // 도넛 두께를 이미지와 같이 얇게 조절
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

// CourseCard 컴포넌트의 Props 타입을 정의합니다.
interface CourseCardProps {
  level: string;
  title: string;
  progress: number;
  description: string;
  lessons: number;
  duration: number;
  chartColor: string;
  levelColor: string;
}

// CourseCard 컴포넌트를 이미지와 동일한 세로 카드 형태로 수정합니다.
const CourseCard = ({ level, title, progress, description, lessons, duration, chartColor, levelColor }: CourseCardProps) => {
  const [isVisible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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
    // flex-col과 text-center로 카드 내부 요소들을 세로 중앙 정렬합니다.
    <div ref={ref} className="bg-white p-8 rounded-2xl shadow-subtle hover:shadow-lifted hover:-translate-y-2 transition-all duration-300 flex flex-col text-center">
      
      {/* 레벨 태그 */}
      <div className="mb-4">
        <span className={`text-sm font-semibold px-3 py-1 rounded-full ${levelColor}`}>
          {level}
        </span>
      </div>

      {/* 제목: 높이를 고정하여 카드 높이를 일정하게 유지합니다. */}
      <h3 className="text-2xl font-bold text-neutral-800 mb-4 h-16 flex items-center justify-center">{title}</h3>

      {/* 도넛 차트: 이미지와 유사한 크기로 조정합니다. */}
      <div className="w-48 h-48 mx-auto my-4">
        {isVisible && <DonutChart progress={progress} color={chartColor} />}
      </div>

      {/* 설명: flex-grow로 남은 공간을 채워 푸터를 하단에 고정시킵니다. */}
      <p className="text-neutral-500 my-4 flex-grow">{description}</p>

      {/* 구분선 및 추가 정보: mt-auto를 사용하여 항상 카드 하단에 위치하도록 합니다. */}
      <div className="border-t border-neutral-200 mt-auto pt-4 flex justify-between text-sm text-neutral-600">
        <span><b>{lessons}</b>개 레슨</span>
        <span><b>{duration}</b>개월 과정</span>
      </div>
    </div>
  );
};

// 메인 Courses 컴포넌트
const Courses = () => {
  const coursesData: CourseCardProps[] = [
    { 
      level: "초급 (N5, N4)", 
      title: "히라가나·가타카나", 
      progress: 65, 
      description: "기본 문자체계와 간단한 인사말부터 시작해보세요.", 
      lessons: 25, 
      duration: 3, 
      chartColor: '#EC4899', // Pink
      levelColor: 'bg-pink-100 text-pink-800' 
    },
    { 
      level: "중급 (N3, N2)", 
      title: "일상 회화", 
      progress: 40, 
      description: "실생활에서 사용하는 표현과 문법을 익혀보세요.", 
      lessons: 35, 
      duration: 6, 
      chartColor: '#8B5CF6', // Purple
      levelColor: 'bg-purple-100 text-purple-800' 
    },
    { 
      level: "고급 (N1)", 
      title: "비즈니스 일본어", 
      progress: 20, 
      description: "업무와 전문 분야에서 사용하는 고급 표현을 익혀보세요.", 
      lessons: 15, 
      duration: 4, 
      chartColor: '#3B82F6', // Blue
      levelColor: 'bg-blue-100 text-blue-800' 
    },
  ];

  return (
    <section id="courses" className="py-20 bg-neutral-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-neutral-800 mb-4">당신의 레벨에 맞는 학습</h2>
          <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
            체계적인 커리큘럼으로 단계별 일본어 실력 향상을 경험해보세요. 각 과정의 카드를 클릭하여 상세 정보를 확인할 수 있습니다.
          </p>
        </div>

        {/* 그리드 레이아웃: 화면 크기에 따라 카드 개수가 조절됩니다. */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coursesData.map((course) => <CourseCard key={course.title} {...course} />)}
        </div>
      </div>
    </section>
  );
};

export default Courses;

