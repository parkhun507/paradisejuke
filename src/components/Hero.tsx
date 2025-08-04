const Hero = () => {
  return (
    // 배경에 새로 추가한 그라데이션을 적용합니다.
    <section id="home" className="text-center py-24 md:py-32 bg-hero-gradient">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-black text-neutral-800 mb-4 leading-tight">
          일본어를 즐겁게 배우세요
        </h1>
        <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto mb-10">
          Paradise Juku에서 전 세계 학습자들과 함께 일본어 실력을 키워보세요!<br />
          체계적인 학습과 활발한 커뮤니티 활동으로 일본어 마스터가 되어보세요!
        </p>
       
      
      </div>
    </section>
  );
};

export default Hero;
