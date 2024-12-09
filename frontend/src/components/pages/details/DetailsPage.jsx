// src/pages/details/DetailsPage.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // React Router
import { configurations } from '../../../data/configurations'; // データのインポート

const DetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const config = configurations.find(config => config.id === parseInt(id));

  if (!config) {
    return <div className="text-center mt-10">構成が見つかりません。</div>;
  }

  return (
    <div className="relative">
      {/* ナビゲーションバー（固定） */}
      <div className="fixed bottom-0 left-0 right-0 bg-blue-100 bg-opacity-90 shadow-md border-t border-gray-300 z-50">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6 py-4">
          {/* 予算表示部分 */}
          <div className="text-center md:text-left">
            <div className="font-bold text-lg">予算</div>
            <div className="text-2xl font-extrabold text-blue-700">150,000円</div>
          </div>

          {/* アクションボタン部分 */}
          <div className="flex items-center space-x-4 md:space-x-6 mt-4 md:mt-0">
            {/* カスタマイズ・保存ボタン */}
            <button className="btn btn-primary flex items-center space-x-2 px-6 py-3 rounded-full mt-8"
              onClick={() => navigate('/pc_customize_edit')}
            >
              <span>カスタマイズ・保存</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>

            {/* トップに戻るボタン */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="btn btn-circle btn-outline flex items-center justify-center"
              aria-label="トップに戻る"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="pt-16 px-4 py-8 bg-gray-100">
        {/* ページタイトル */}
        <h1 className="text-4xl font-bold text-center mb-8">PC構成詳細</h1>

        {/* メインコンテンツ */}
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-start lg:space-x-8 mb-8">
            {/* 左側: PC画像 */}
            <figure className="w-full lg:w-1/2 mb-6 lg:mb-0">
              <img
                src={config.image}
                alt={`${config.name} の画像`}
                className="w-full h-auto rounded-lg shadow-md"
                loading="lazy"
              />
              <figcaption className="mt-2 text-center text-sm text-gray-600">
                {config.name}
              </figcaption>
            </figure>

            {/* 右側: 構成情報 */}
            <div className="w-full lg:w-1/2 flex flex-col">
              <h2 className="text-2xl font-semibold mb-4">{config.name}</h2>
              <div className="flex items-center mb-4">
                <img
                  src={config.cpuImage}
                  alt="CPUの画像"
                  className="w-16 h-16 mr-4"
                />
                <span className="text-xl font-bold text-red-600">
                  {config.cost.toLocaleString()}
                </span>
              </div>
              <hr className="mb-4 w-32 border-gray-300" />

              {/* 構成一覧をテーブル形式に変更 */}
              <div className="mb-4 overflow-auto">
                <table className="min-w-full table-auto text-left">
                  <thead>
                    <tr>
                      <th className="font-semibold px-2 py-1">項目</th>
                      <th className="font-semibold px-2 py-1">詳細</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-2 py-1">OS</td>
                      <td className="px-2 py-1">{config.os}</td>
                    </tr>
                    <tr>
                      <td className="px-2 py-1">CPU</td>
                      <td className="px-2 py-1">{config.cpu}</td>
                    </tr>
                    <tr>
                      <td className="px-2 py-1">メモリ</td>
                      <td className="px-2 py-1">{config.memory}</td>
                    </tr>
                    <tr>
                      <td className="px-2 py-1">グラフィック</td>
                      <td className="px-2 py-1">{config.graphic}</td>
                    </tr>
                    <tr>
                      <td className="px-2 py-1">ストレージ</td>
                      <td className="px-2 py-1">{config.storage}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* ボタン群 */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-auto">
                {/* 詳細を見るボタン */}
                <button
                  className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 flex items-center justify-center space-x-1 transition duration-200 w-full sm:w-auto mb-2 sm:mb-0"
                  onClick={() => setIsDialogOpen(true)}
                  aria-label="製品の詳細を見る"
                >
                  <span className="text-sm">詳細</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 transform transition-transform duration-200 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>

                {/* SNS共有ボタン群 */}
                <div className="flex space-x-2">
                  {/* X 共有ボタン */}
                  <button
                    className="px-3 py-2 bg-[#1D9BF0] text-white rounded-md shadow hover:bg-[#0A85D9] flex items-center justify-center transition duration-200"
                    onClick={() => {
                      const url = encodeURIComponent(window.location.href);
                      const text = encodeURIComponent(`この構成をチェックしてください: ${config.name}`);
                      window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'noopener,noreferrer');
                    }}
                    aria-label="Xで共有"
                  >
                    {/* Xのロゴ */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775 
                      1.014-.608 1.794-1.574 2.163-2.723-.949.555-2.005.959-3.127 
                      1.184-.897-.959-2.178-1.555-3.594-1.555-2.722 
                      0-4.928 2.206-4.928 4.928 0 .39.045.765.127 
                      1.124-4.094-.205-7.725-2.165-10.148-5.144-.424.722-.666 
                      1.561-.666 2.475 0 1.708.87 3.213 2.188 
                      4.096-.807-.026-1.566-.248-2.229-.616v.061c0 
                      2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 
                      0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.6 
                      3.419-1.68 1.319-3.809 2.105-6.102 
                      2.105-.39 0-.779-.023-1.17-.067 2.179 1.394 
                      4.768 2.21 7.557 2.21 9.054 0 14-7.496 
                      14-13.986 0-.21 0-.423-.015-.634.961-.689 
                      1.8-1.56 2.46-2.548l-.047-.02z" />
                    </svg>
                  </button>

                  {/* LINE 共有ボタン */}
                  <button
                    className="px-3 py-2 bg-[#00C300] text-white rounded-md shadow hover:bg-[#009E00] flex items-center justify-center transition duration-200"
                    onClick={() => {
                      const url = encodeURIComponent(window.location.href);
                      window.open(`https://social-plugins.line.me/lineit/share?url=${url}`, '_blank', 'noopener,noreferrer');
                    }}
                    aria-label="LINEで共有"
                  >
                    {/* LINEのロゴ */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20.52 3.479A11.78 11.78 0 0012 0C5.373 0 
                      0 5.373 0 12c0 2.159.586 4.184 1.595 
                      5.919L0 24l6.47-1.682A11.867 11.867 0 
                      0012 24c6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12zm-3.63 
                      17.436l-.405-2.118c-.07-.383-.233-1.214-.291-1.456l-.07-.277c-.037-.155-.144-.155-.217-.155h-.326c-.07 0-.202.037-.286.37l-.317 
                      1.332c-.037.16-.163.16-.2.16h-.324c-.154 0-.32-.074-.4-.187l-1.18-1.722c-.046-.074-.138-.13-.2-.13h-.352c-.074 0-.16.037-.232.13l-1.567 
                      2.314c-.137.193-.29.277-.467.277h-.635c-.309 
                      0-.807-.37-.807-1.155V9.854c0-.616.186-.96.373-1.17.138-.16.277-.193.42-.18h1.527c.388 0 
                      1.22.074 1.22 1.183v8.362c0 .24.31.466.56.466h2.085c.24 
                      0 .414-.046.485-.135.07-.074.18-.277.247-.425l1.707-4.505c.107-.25.142-.347.217-.347h.265c.155 
                      0 .31.155.31.413v4.928c0 .388.08.557.188.557h1.492c.168 0 .31-.07.31-.173V6.924c0-.24-.15-.36-.31-.36h-.62c-.155 
                      0-.318.067-.37.24l-.363 1.645c-.046.205-.187.414-.317.413h-.635c-.347 0-.467-.173-.467-.347V4.073c0-.194.138-.31.277-.31h.56c.347 0 
                      .435.168.435.31v9.78c0 .194-.094.347-.18.347h-.405c-.19 
                      0-.38-.155-.467-.31l-1.034-2.303c-.046-.092-.138-.21-.22-.21H9.816c-.26 
                      0-.52.137-.62.347l-.848 2.087c-.15.347-.363.56-.56.56h-.308c-.28 
                      0-.467-.14-.467-.347V6.079c0-.347.185-.56.346-.56h1.143c.347 
                      0 .56.168.56.347v5.31c0 .155-.168.347-.277.347h-.52c-.084 
                      0-.155-.07-.155-.154V6.28c0-.28.185-.56.38-.56h.52c.347 
                      0 .56.14.56.28v7.204c0 .155-.084.277-.185.347z" />
                    </svg>
                  </button>

                  {/* Facebook 共有ボタン */}
                  <button
                    className="px-3 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 flex items-center justify-center transition duration-200"
                    onClick={() => {
                      const url = encodeURIComponent(window.location.href);
                      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'noopener,noreferrer');
                    }}
                    aria-label="Facebookで共有"
                  >
                    {/* Facebookのロゴ */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M22.675 0h-21.35C.596 0 0 .597 0 1.333v21.333C0 23.404.596 24 
                      1.325 24H12.82v-9.294H9.692V11.41h3.128V8.413c0-3.1 
                      1.893-4.788 4.659-4.788 1.325 
                      0 2.464.099 2.795.143v3.24l-1.918.001c-1.504 
                      0-1.796.715-1.796 1.764v2.313h3.587l-.467 
                      3.622h-3.12V24h6.116C23.404 24 24 23.404 
                      24 22.667V1.333C24 .597 23.404 0 22.675 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* 特徴セクション */}
        <div className="mb-8">
          <h3 className="text-3xl font-bold text-center mb-6">特徴</h3>
          <div className="space-y-6">
            {/* 特徴カード1: タイトル中央、左解説・右画像 */}
            <div className="bg-white p-6 rounded-lg shadow-md max-w-5xl mx-auto">
              <h4 className="text-xl font-semibold text-center mb-4">高速CPU</h4>
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2">
                  <p>最新のCPUを搭載し、高速な処理能力を実現しています。</p>
                </div>
                <div className="md:w-1/2 mt-4 md:mt-0">
                  <img src={config.cpuImage} alt="CPU" className="w-full h-auto rounded-lg" />
                </div>
              </div>
            </div>

            {/* 特徴カード2: タイトル中央、左画像・右解説 */}
            <div className="bg-white p-6 rounded-lg shadow-md max-w-5xl mx-auto">
              <h4 className="text-xl font-semibold text-center mb-4">大容量メモリ</h4>
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2">
                  <img src={config.memoryImage} alt="メモリ" className="w-full h-auto rounded-lg" />
                </div>
                <div className="md:w-1/2 mt-4 md:mt-0">
                  <p>16GBのメモリ搭載で、マルチタスクもスムーズに行えます。</p>
                </div>
              </div>
            </div>

            {/* 必要に応じて他の特徴カードを追加 */}
          </div>
        </div>
      </div>

      {/* 詳細ダイアログ */}
      {isDialogOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setIsDialogOpen(false)} // 背景クリックでダイアログを閉じる
        >
          <div
            className="bg-white rounded-lg w-11/12 md:w-2/3 lg:w-1/2 p-6 relative shadow-lg"
            onClick={(e) => e.stopPropagation()} // ダイアログ内部のクリックを停止
          >
            {/* 閉じるボタン */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded"
              onClick={() => setIsDialogOpen(false)}
              aria-label="ダイアログを閉じる"
            >
              {/* SVGアイコンを使用 */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {/* ダイアログタイトル */}
            <h2 className="text-2xl font-bold mb-4">構成詳細</h2>
            {/* 詳細内容をテーブル形式に変更 */}
            <div className="overflow-auto">
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border-b-2 border-gray-300 text-left text-lg font-semibold">項目</th>
                    <th className="px-4 py-2 border-b-2 border-gray-300 text-left text-lg font-semibold">詳細</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2 border-b border-gray-200">OS</td>
                    <td className="px-4 py-2 border-b border-gray-200">{config.os}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b border-gray-200">CPU</td>
                    <td className="px-4 py-2 border-b border-gray-200">{config.cpu}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b border-gray-200">CPUクーラー</td>
                    <td className="px-4 py-2 border-b border-gray-200">{config.cpuCooler}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b border-gray-200">グラフィックボード</td>
                    <td className="px-4 py-2 border-b border-gray-200">{config.graphic}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b border-gray-200">ビデオメモリ</td>
                    <td className="px-4 py-2 border-b border-gray-200">{config.videoMemory}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b border-gray-200">マザーボード</td>
                    <td className="px-4 py-2 border-b border-gray-200">{config.motherboard}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b border-gray-200">チップセット</td>
                    <td className="px-4 py-2 border-b border-gray-200">{config.chipset}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b border-gray-200">サウンドカード</td>
                    <td className="px-4 py-2 border-b border-gray-200">{config.soundCard}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b border-gray-200">ストレージ</td>
                    <td className="px-4 py-2 border-b border-gray-200">{config.storage}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b border-gray-200">光学ドライブ</td>
                    <td className="px-4 py-2 border-b border-gray-200">{config.opticalDrive}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b border-gray-200">インターフェース</td>
                    <td className="px-4 py-2 border-b border-gray-200">{config.interface}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b border-gray-200">電源ユニット</td>
                    <td className="px-4 py-2 border-b border-gray-200">{config.powerSupply}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b border-gray-200">ケース</td>
                    <td className="px-4 py-2 border-b border-gray-200">{config.case}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsPage;
