import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Background from '/src/assets/images/Top_images.jpg';
import PcImage1 from '/src/assets/images/Slider-PC-1.jpg';
import PcImage2 from '/src/assets/images/Slider-PC-2.jpg';
import PcImage3 from '/src/assets/images/Slider-PC-3.png';
import EntrustImage from '/src/assets/images/Entrust-PC.png';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/solid';

// カスタム矢印コンポーネント
const NextArrow = ({ className, style, onClick }) => (
  <div
    className={`${className} bg-black bg-opacity-50 shadow-lg p-2 rounded-full`}
    style={{ ...style, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10, right: "5px" }}
    onClick={onClick}
  >
    <ChevronRightIcon className="h-6 w-6 text-white" />
  </div>
);

const PrevArrow = ({ className, style, onClick }) => (
  <div
    className={`${className} bg-black bg-opacity-50 shadow-lg p-2 rounded-full`}
    style={{ ...style, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10, left: "5px" }}
    onClick={onClick}
  >
    <ChevronLeftIcon className="h-6 w-6 text-white" />
  </div>
);

// スライダー用の画像データ
const sliderImages = [
  { src: PcImage1, alt: "product 1", link: "/link1" },
  { src: PcImage2, alt: "product 2", link: "/link2" },
  { src: PcImage3, alt: "product 3", link: "/link3" },
];

// カード用のデータ（上記の更新済み）
const cardsData = [
  {
    title: "動画でわかるPCの組み立て",
    subtitle: "入門編",
    description: `初心者はこの動画からPCについて学びましょう。
QuizKnockがわかりやすく教えてくれます。`,
    image: null, // カード1はYouTube iframeを使用
    type: "video",
    videoSrc: "https://www.youtube.com/embed/eyzBJ8X0BGg?si=m3-Ls8P9QIs2GnXa",
  },
  {
    title: "組んでみる",
    description: `予算、用途をご選択いただくと
構成をご提案させていただきます。
あなたに最適のPC構成をご提案させていただきます。`,
    image: EntrustImage,
    type: "image",
    note: "※この機能を利用するにはログインが必要です。",
    button: {
      text: "おまかせで組む",
      link: "/pc_expert_config", // 仮のリンク先
    },
  },
  {
    title: "カスタマイズ",
    description: `予算、用途をご選択いただくと
それに合わせたものを複数ご提案いたします。
搭載したいパーツを選ぶだけで
簡単にPCをカスタマイズできます。`,
    image: EntrustImage,
    type: "image",
    note: "※この機能を利用するにはログインが必要です。",
    button: {
      text: "カスタマイズする",
      link: "/pc_custom_config", // 仮のリンク先
    },
  },
  {
    title: "構成を保存、出力",
    subtitle: "構成を出力する",
    description: `保存いただいたPC構成をリストにして出力することができます。
実際のお店に持って行って店員との相談に活用してください。`,
    image: EntrustImage,
    type: "image",
    note: "※この機能を利用するにはログインが必要です。",
  },
];

// カードコンポーネント（上記の更新済み）
// カードコンポーネント（修正版）
const Card = ({ data, isReversed }) => (
  <div className="border-2 border-black bg-white p-6 max-w-6xl w-full min-h-64 flex flex-col md:flex-row">
    {/* 画像またはビデオの部分 */}
    { !isReversed && (
      data.type === "video" ? (
        <div className="w-full md:w-1/2 flex justify-center items-center order-1 md:order-1">
          <iframe
            width="560"
            height="315"
            src={data.videoSrc}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <div className="w-full md:w-1/2 flex justify-center items-center relative order-1 md:order-1">
          <div className="relative w-full h-0" style={{ paddingBottom: '56.25%' }}>
            <img
              src={data.image}
              alt={data.title}
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          </div>
        </div>
      )
    )}

    {/* テキスト部分 */}
    <div className={`w-full md:w-1/2 flex flex-col justify-center items-center space-y-4 mt-4 md:mt-0 ${isReversed ? "order-1 md:order-2" : "order-2 md:order-1"}`}>
      <h3 className="text-2xl font-bold">{data.title}</h3>

      {/* サブタイトルをそのまま表示（Linkを削除） */}
      {data.subtitle && (
        <h4 className="text-xl mt-2 bg-custom-blue px-2 py-1 rounded">
          {data.subtitle}
        </h4>
      )}

      <p className="mt-4 text-center text-lg leading-relaxed whitespace-pre-line">
        {data.description}
      </p>

      {/* 1つの Link のみ表示 */}
      {data.button && (
        <Link
          to={data.button.link}
          className="mt-4 px-4 py-2 bg-custom-blue text-black rounded hover:bg-blue-600 transition"
        >
          {data.button.text}
        </Link>
      )}

      {data.note && <p className="mt-4 text-center text-sm text-red-500">{data.note}</p>}
    </div>

    {/* 画像またはビデオの部分（反転時） */}
    { isReversed && (
      data.type === "video" ? (
        <div className="w-full md:w-1/2 flex justify-center items-center order-1 md:order-2">
          <iframe
            width="560"
            height="315"
            src={data.videoSrc}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <div className="w-full md:w-1/2 flex justify-center items-center relative order-1 md:order-2">
          <div className="relative w-full h-0" style={{ paddingBottom: '56.25%' }}>
            <img
              src={data.image}
              alt={data.title}
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          </div>
        </div>
      )
    )}
  </div>
);


const LoggedInTopPage = () => {
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
            <Link
              to="/dashboard"
              className="px-4 sm:px-6 md:px-6 lg:px-6 xl:px-8 2xl:px-10 py-2 sm:py-3 md:py-3 lg:py-3 xl:py-4 2xl:py-5 bg-custom-blue text-black text-sm sm:text-base md:text-base lg:text-base xl:text-lg 2xl:text-xl rounded flex items-center justify-center"
            >
              構成一覧はこちら
            </Link>
          </div>
        </section>

        {/* 2. サイト説明 */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center">サイト説明</h2>
          <p className="mt-4 text-center text-lg">PCの自由なカスタマイズを支援します</p>
        </section>

        {/* スペース */}
        <div className="my-16"></div>

        {/* 3. 追加説明 */}
        <section className="mt-16 px-4">
          <h2 className="text-3xl font-bold text-center">使い方</h2>
          <p className="mt-4 text-center text-lg leading-relaxed whitespace-pre-line">
            本アプリは、PCを構成するための見積り用アプリです。
            構成し終わったら、価格を見て財布と相談するなり
            構成を出力して店に持って行き、プロに相談するなりしましょう。
          </p>
        </section>

        {/* スペース */}
        <div className="my-16"></div>

        {/* 4. スライドするヘッドライン的なリンク付き画像 */}
        <section className="mt-16">
          <Slider {...sliderSettings}>
            {sliderImages.map((image, index) => (
              <div key={index}>
                <a href={image.link}>
                  <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                    <img src={image.src} alt={image.alt} className="absolute top-0 left-0 w-full h-full object-cover" />
                  </div>
                </a>
              </div>
            ))}
          </Slider>
        </section>

        {/* スペース */}
        <div className="my-16"></div>

        {/* 5. サイトの使い方 */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center">機能紹介</h2>
          <p className="mt-4 text-center text-lg">本サイトの機能をご紹介します。</p>
        </section>

        {/* 6. 横長カード */}
        <section className="mt-16 flex flex-col items-center space-y-4">
          {cardsData.map((card, index) => (
            <Card key={index} data={card} isReversed={index % 2 !== 0} />
          ))}
        </section>
      </main>
    </div>
  );
};

export default LoggedInTopPage;
