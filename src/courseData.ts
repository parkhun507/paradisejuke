// 각 코스별 커리큘럼 데이터 (예시)
export const beginnerCurriculum = [
  { id: 1, title: 'Chapter 1. 히라가나 기초', unlocked: true, lessons: [{title: '히라가나 소개', duration: '06:41'}] },
  { id: 2, title: 'Chapter 2. 히라가나 심화', unlocked: true, lessons: [] },
  { id: 3, title: 'Chapter 3. 가타카나 기초', unlocked: false, lessons: [] },
];

export const intermediateCurriculum = [
    { id: 1, title: 'Chapter 1. 기본 인사와 소개', unlocked: true, lessons: [{title: '첫 만남 인사', duration: '10:20'}, {title: '자기소개하기', duration: '12:15'}, {title: '취미 말하기', duration: '09:45'}] },
    { id: 2, title: 'Chapter 2. 일상 생활 표현', unlocked: false, lessons: [] },
];

export const advancedCurriculum = [
    { id: 1, title: 'Chapter 1. 비즈니스 기초', unlocked: true, lessons: [{title: '비즈니스 인사', duration: '15:30'}, {title: '회의 참여하기', duration: '18:45'}, {title: '발표 기초', duration: '20:15'}] },
    { id: 2, title: 'Chapter 2. 발표 및 협상', unlocked: false, lessons: [] },
];

// 모든 코스 정보를 담고 있는 메인 데이터 배열
export const courses = [
    {
        id: 'beginner',
        level: "초급 (N5, N4)",
        title: "히라가나·가타카나 마스터",
        progress: 65,
        description: "기본 문자체계와 간단한 인사말부터 시작해보세요.",
        lessons: 25,
        duration: 3,
        chartColor: '#EC4899',
        levelColor: 'bg-pink-100 text-pink-800',
        pageData: {
            subTitle: '일본어 학습 ・ 초급',
            mainTitle: '히라가나·가타카나 마스터',
            pageDescription: '일본어의 기본 문자 체계를 완벽하게 익혀보세요.',
            videoTitle: 'ひらがな',
            videoSubTitle: '히라가나 소개',
            curriculum: beginnerCurriculum,
            totalLessons: 9,
            progress: 22,
        }
    },
    {
        id: 'intermediate',
        level: "중급 (N3, N2)",
        title: "일상 회화",
        progress: 40,
        description: "실생활에서 사용하는 표현과 문법을 익혀보세요.",
        lessons: 35,
        duration: 6,
        chartColor: '#8B5CF6',
        levelColor: 'bg-purple-100 text-purple-800',
        pageData: {
            subTitle: '일본어 학습 ・ 중급',
            mainTitle: '일상 회화 완성',
            pageDescription: '일본인과 자연스럽게 대화할 수 있는 실력을 기르세요.',
            videoTitle: '会話',
            videoSubTitle: '첫 만남 인사',
            curriculum: intermediateCurriculum,
            totalLessons: 6,
            progress: 17,
        }
    },
    {
        id: 'advanced',
        level: "고급 (N1)",
        title: "비즈니스 일본어",
        progress: 20,
        description: "업무와 전문 분야에서 사용하는 고급 표현을 익혀보세요.",
        lessons: 15,
        duration: 4,
        chartColor: '#3B82F6',
        levelColor: 'bg-blue-100 text-blue-800',
        pageData: {
            subTitle: '일본어 학습 ・ 고급',
            mainTitle: '비즈니스 일본어 준비',
            pageDescription: '직장에서 사용하는 전문적인 일본어 표현을 학습하세요.',
            videoTitle: 'ビジネス',
            videoSubTitle: '비즈니스 인사',
            curriculum: advancedCurriculum,
            totalLessons: 3,
            progress: 33,
        }
    },
];
