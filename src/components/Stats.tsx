import { useState, useEffect, useRef } from 'react';

// useAnimatedCounter 훅 (변경 없음)
const useAnimatedCounter = (target: number, duration = 1500) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let current = 0;
          const stepTime = Math.abs(Math.floor(duration / target)) || 1;
          const timer = setInterval(() => {
            current += 1;
            setCount(current);
            if (current === target) {
              clearInterval(timer);
            }
          }, stepTime);
          observer.unobserve(element);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [target, duration]);
  return { ref, count };
};


const StatItem = ({ icon, target, label, unit = '' }: { icon: string; target: number; label: string; unit?: string }) => {
  const { ref, count } = useAnimatedCounter(target);
  return (
    // 원본과 같이 심플한 디자인으로 변경
    <div className="p-8 rounded-2xl">
      <div className="text-5xl mb-2">{icon}</div>
      <p ref={ref} className="text-4xl font-bold text-gray-800">{count}{unit}</p>
      <p className="text-gray-500 text-lg">{label}</p>
    </div>
  );
};

const Stats = () => {
  const statsData = [
    { icon: '👥', target: 10000, label: '활성 학습자' },
    { icon: '📚', target: 500, label: '학습 콘텐츠' },
    { icon: '✅', target: 95, label: '학습 만족도', unit: '%' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {statsData.map((stat, index) => (
            <StatItem key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
