import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { configurations } from '../../data/configurations';

const PCSlider = ({ budget }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSlideChange = (swiper) => {
    setCurrentIndex(swiper.activeIndex);
  };

  // 予算とタイプに基づいてデータをフィルタリング
  const filteredConfigs = configurations.filter(config => config.budget === budget);

  return (
    <div className="relative px-4 py-8 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-8">おすすめPCランキング</h2>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={3}
        onSlideChange={handleSlideChange}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        navigation={true}
        pagination={{ clickable: true }}
        className="mySwiper"
      >
        {filteredConfigs.map((config) => (
          <SwiperSlide key={config.id}>
            <div className="card bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
              <div className="text-center text-lg font-bold mb-2">
                {config.id}位
              </div>
              <img
                src={config.image}
                alt={config.name}
                className="w-full h-40 object-cover mb-2"
              />
              <div className="text-center mb-2">
                <h3 className="text-xl font-semibold">{config.name}</h3>
                {/* 詳細リンクが正しく設定されているか確認 */}
                <a href={`/details/${config.id}`} className="text-blue-500 hover:underline">
                  詳細を見る
                </a>
              </div>
              <div className="text-center mb-2">
                <span className="text-lg font-bold">{config.cost}</span>
              </div>
              <div className="flex space-x-2 mb-2">
                {config.memo && (
                  <span className="badge badge-secondary">
                    {config.memo}
                  </span>
                )}
                {/* 必要に応じて他のマークも表示 */}
              </div>
              <div className="text-center text-sm mb-2">
                OS: {config.os}<br />
                CPU: {config.cpu}<br />
                メモリ: {config.memory}<br />
                グラフィック: {config.graphic}<br />
                ストレージ: {config.storage}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PCSlider;

