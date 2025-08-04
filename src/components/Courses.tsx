import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useState, useEffect, useRef } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DonutChartProps {
  progress: number;
  color: string;
}

const DonutChart = ({ progress, color }: DonutChartProps) => {
  const data = {
    labels: ['진행률', '남은 과정'],
    datasets: [
      {
        data: [progress, 100 - progress],
        backgroundColor: [color, '#e5e7eb'],
        borderColor: ['#ffffff'],
        borderWidth: 2,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.label}: ${context.raw}%`,
        },
      },
    },
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };

  return <Doughnut data={data} options={options} />;
};


const CourseCard = ({ level, levelColor, title, progress, description, lessons, duration, chartColor }: any) => {
    const [isVisible, setVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setVisible(true);
                observer.disconnect();
            }
        }, { threshold: 0.5 });

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);


    return (
        <div ref={ref} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-200/80">
            <span className={`text-sm font-semibold text-${levelColor}-500 bg-${levelColor}-100 px-3 py-1 rounded-full`}>{level}</span>
            <h3 className="text-2xl font-bold text-gray-800 my-4">{title}</h3>
            <div className="chart-container" style={{ position: 'relative', width: '100%', maxWidth: '200px', height: '200px', margin: 'auto' }}>
                {isVisible && <DonutChart progress={progress} color={chartColor} />}
            </div>
            <p className="text-gray-600 my-4">{description}</p>
            <div className="flex justify-between text-sm text-gray-500 border-t border-gray-200 pt-4">
                <span><b>{lessons}</b>개 레슨</span>
                <span><b>{duration}</b>개월 과정</span>
            </div>
        </div>
    );
};

const coursesData = [
  { level: "초급 (N5, N4)", levelColor: "pink", title: "히라가나·가타카나", progress: 65, description: "기본 문자체계와 간단한 인사말부터 시작해보세요.", lessons: 25, duration: 3, chartColor: '#ec4899' },
  { level: "중급 (N3, N2)", levelColor: "purple", title: "일상 회화", progress: 40, description: "실생활에서 사용하는 표현과 문법을 익혀보세요.", lessons: 35, duration: 6, chartColor: '#8b5cf6' },
  { level: "고급 (N1)", levelColor: "indigo", title: "비즈니스 일본어", progress: 20, description: "업무와 전문 분야에서 사용하는 고급 표현을 익혀보세요.", lessons: 15, duration: 4, chartColor: '#4f46e5' },
];

const Courses = () => {
    return (
        <section id="courses" className="py-20 bg-gray-50">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">당신의 레벨에 맞는 학습</h2>
                <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
                    체계적인 커리큘럼으로 단계별 일본어 실력 향상을 경험해보세요. 각 과정의 카드를 클릭하여 상세 정보를 확인할 수 있습니다.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {coursesData.map((course, index) => <CourseCard key={index} {...course} />)}
                </div>
            </div>
        </section>
    );
};

export default Courses;