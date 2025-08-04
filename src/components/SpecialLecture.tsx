const SpecialLecture = () => {
  return (
    <section id="special-lecture" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-8 md:p-12 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-8 text-white shadow-2xl">
          <div>
            <div className="flex items-center mb-2">
              <span className="text-2xl mr-2">🌟</span>
              <span className="font-semibold">오늘의 추천</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-2">일본 문화 특강: 온천 예절</h3>
            <p className="opacity-90">일본 온천 문화와 관련 표현을 배워보세요. 여행이 더욱 풍요로워집니다.</p>
          </div>
          <button className="bg-white text-pink-500 font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform shadow-lg flex-shrink-0">
            지금 수강하기
          </button>
        </div>
      </div>
    </section>
  );
};

export default SpecialLecture;