import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Background from '/src/assets/images/Top_images.jpg';
import PcImage1 from '/src/assets/images/Slider-PC-1.jpg';
import PcImage2 from '/src/assets/images/Slider-PC-2.jpg';
import PcImage3 from '/src/assets/images/Slider-PC-3.png';
import EntrustImage from '/src/assets/images/Entrust-PC.png';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/solid';

import { useNavigate } from 'react-router-dom';

const TopPage = () => {
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    navigate('/dashboard');
  };

  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
      className={`${className} bg-black bg-opacity-50 shadow-lg p-2 rounded-full`}
      style={{ ...style, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10, right: "5px" }}
      onClick={onClick}
      >
        <ChevronRightIcon className="h-6 w-6 text-white" />
      </div>
    );
  };

  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
      className={`${className} bg-black bg-opacity-50 shadow-lg p-2 rounded-full`}
      style={{ ...style, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10, left: "5px" }}
      onClick={onClick}
      >
        <ChevronLeftIcon className="h-6 w-6 text-white" />
      </div>
    );
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        }
      }
    ]
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto p-4">
        {/* 1. 画像背景とタイトル、登録ボタン */}
        <section className="relative h-[80vh] bg-center-80 bg-cover" style={{ backgroundImage: `url(${Background})` }}>
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
            <h1 className="text-3xl sm:text-4xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-4 sm:mb-6 md:mb-6 lg:mb-6 xl:mb-8 2xl:mb-10">
              PC構成支援ツール
            </h1>
            <button
              className="px-4 sm:px-6 md:px-6 lg:px-6 xl:px-8 2xl:px-10 py-2 sm:py-3 md:py-3 lg:py-3 xl:py-4 2xl:py-5 bg-custom-blue text-black text-sm sm:text-base md:text-base lg:text-base xl:text-lg 2xl:text-xl rounded"
              onClick={handleDashboardClick}
            >
              ダッシュボードはこちら
            </button>
          </div>
        </section>

        {/* 2. サイト説明 */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center">サイト説明</h2>
          <p className="mt-4 text-center text-lg">PCの自由なカスタマイズを支援します</p>
        </section>

        {/* 大きなスペース */}
        <div className="my-16"></div>

        {/* 3. 追加説明 */}
        <section className="mt-16 px-4">
          <h2 className="text-3xl font-bold text-center">使い方</h2>
          <p className="mt-4 text-center text-lg leading-relaxed">
            本アプリは、PCを構成するための見積り用アプリです。<br />
            構成し終わったら、価格を見て財布と相談するなり<br />
            構成を出力して店に持って行き、プロに相談するなりしましょう。
          </p>
        </section>

        {/* 大きなスペース */}
        <div className="my-16"></div>

        {/* 4. スライドするヘッドライン的なリンク付き画像 */}
        <section className="mt-16">
          <Slider {...sliderSettings}>
            <div>
              <a href="/link1">
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <img src={PcImage1} alt="product 1" className="absolute top-0 left-0 w-full h-full object-cover" />
                </div>
              </a>
            </div>
            <div>
              <a href="/link2">
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <img src={PcImage2} alt="product 2" className="absolute top-0 left-0 w-full h-full object-cover" />
                </div>
              </a>
            </div>
            <div>
              <a href="/link3">
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <img src={PcImage3} alt="product 3" className="absolute top-0 left-0 w-full h-full object-cover" />
                </div>
              </a>
            </div>
          </Slider>
        </section>

        {/* 大きなスペース */}
        <div className="my-16"></div>

        {/* 5. サイトの使い方 */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center">機能紹介</h2>
          <p className="mt-4 text-center text-lg">本サイトの機能をご紹介します。</p>
        </section>

        {/* 6. 横長カード */}
        <section className="mt-16 flex flex-col items-center space-y-4">
          <div className="border-2 border-black bg-white p-6 max-w-6xl w-full min-h-64 flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center space-y-4 order-2 md:order-1 mt-4 md:mt-0">
              <h3 className="text-2xl font-bold">動画でわかるPCの組み立て</h3>
              <h4 className="text-xl mt-2 bg-custom-blue px-2 py-1 rounded">入門編</h4>
              <p className="mt-4 text-center text-lg leading-relaxed">
                初心者はこの動画からPCについて学びましょう。<br />
                QuizKnockがわかりやすく教えてくれます。
              </p>
            </div>
            <div className="w-full md:w-1/2 flex justify-center items-center order-1 md:order-2">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/eyzBJ8X0BGg?si=m3-Ls8P9QIs2GnXa"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <div className="border-2 border-black bg-white p-6 max-w-6xl w-full min-h-64 flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 flex justify-center items-center relative">
              <div className="relative" style={{ width: '560px', height: '315px' }}>
                <img
                  src={EntrustImage}
                  alt="おまかせ構成の画像"
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center space-y-4 mt-4 md:mt-0">
              <h3 className="text-2xl font-bold">組んでみる</h3>
              <h4 className="text-xl mt-2 bg-custom-blue px-2 py-1 rounded">おまかせで組む</h4>
              <p className="mt-4 text-center text-lg leading-relaxed">
                予算、用途をご選択いただくと<br />
                構成をご提案させていただきます。<br />
                あなたに最適のPC構成をご提案させていただきます。
              </p>
              <p className="mt-4 text-center text-sm text-red-500">
                ※この機能を利用するにはログインが必要です。
              </p>
            </div>
          </div>
          <div className="border-2 border-black bg-white p-6 max-w-6xl w-full min-h-64 flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center space-y-4 order-2 md:order-1 mt-4 md:mt-0">
              <h3 className="text-2xl font-bold">カスタマイズ</h3>
              <h4 className="text-xl mt-2 bg-custom-blue px-2 py-1 rounded">カスタマイズする</h4>
              <p className="mt-4 text-center text-lg leading-relaxed">
                予算、用途をご選択いただくと<br />
                それに合わせたものを複数ご提案いたします。<br />
                搭載したいパーツを選ぶだけで<br />
                簡単にPCをカスタマイズできます。
              </p>
              <p className="mt-4 text-center text-sm text-red-500">
                ※この機能を利用するにはログインが必要です。
              </p>
            </div>
            <div className="w-full md:w-1/2 flex justify-center items-center relative order-1 md:order-2">
              <div className="relative" style={{ width: '560px', height: '315px' }}>
                <img
                  src={EntrustImage}
                  alt="おまかせ構成の画像"
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          <div className="border-2 border-black bg-white p-6 max-w-6xl w-full min-h-64 flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 flex justify-center items-center relative">
              <div className="relative" style={{ width: '560px', height: '315px' }}>
                <img
                src={EntrustImage}
                alt="おまかせ構成の画像"
                className="absolute top-0 left-0 w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center space-y-4 mt-4 md:mt-0">
              <h3 className="text-2xl font-bold">構成を保存、出力</h3>
              <h4 className="text-xl mt-2 bg-custom-blue px-2 py-1 rounded">構成を出力する</h4>
              <p className="mt-4 text-center text-lg leading-relaxed">
                保存いただいたPC構成をリストにして出力することができます。<br />
                実際のお店に持って行って店員との相談に活用してください。<br />
              </p>
              <p className="mt-4 text-center text-sm text-red-500">
                ※この機能を利用するにはログインが必要です。
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default TopPage;
