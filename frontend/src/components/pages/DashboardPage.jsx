import React, { useState, useEffect, useContext } from 'react';
import Pagination from '../layouts/Pagination.jsx';

// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { configurations as initialConfigurations } from '/src/data/configurations';
import { AuthContext } from '../../contexts/AuthContext';

const DashboardPage = () => {
  const [fetchedConfigurations, setFetchedConfigurations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedConfig, setSelectedConfig] = useState(null); // 初期値をnullに設定

  const configurationsPerPage = 10;
  const totalPages = Math.ceil(fetchedConfigurations.length / configurationsPerPage);

  const indexOfLastConfig = currentPage * configurationsPerPage;
  const indexOfFirstConfig = indexOfLastConfig - configurationsPerPage;
  const currentConfigs = fetchedConfigurations.slice(indexOfFirstConfig, indexOfLastConfig);

  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext)

  useEffect(() => {
    // ダミーデータを使用
    setFetchedConfigurations(initialConfigurations);
    if (initialConfigurations.length > 0) {
      setSelectedConfig(initialConfigurations[0]); // 最初の構成を選択
    }

    // API からデータを取得
    // axios.get('/api/v1/dashboard')
    //   .then(response => {
    //     setFetchedConfigurations(response.data);
    //     if (response.data.length > 0) {
    //       setSelectedConfig(response.data[0]); // 最初の構成を選択
    //     }
    //   })
    //   .catch(error => {
    //     console.error('データの取得に失敗しました:', error);
    //   });
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    const newSelected = fetchedConfigurations[(pageNumber - 1) * configurationsPerPage];
    setSelectedConfig(newSelected || null); // 存在しない場合はnullに設定
  };

  const handleExpertClick = () => {
    navigate('/pc_expert_config');
    // 遷移前に必要な処理があればここに追加
    console.log('おまかせ構成が選択されました');
  };

  const handleCustomClick = () => {
    navigate('/pc_custom_config');
    // 遷移前に必要な処理があればここに追加
    console.log('カスタム構成が選択されました');
  };

  if (fetchedConfigurations.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-2">PC構成一覧</h1>
        <p className="text-gray-600 mb-6">データを読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {/* ページタイトルと説明 */}
      <h1 className="text-3xl font-bold mb-2">PC構成一覧</h1>
      <p className="text-gray-600 mb-6">PCの構成を確認することができます</p>

      <div className="flex">
        {/* 左半分: 構成リスト */}
        <div className="w-1/2 pr-4">
          <ul>
            {currentConfigs.map((config, index) => (
              <li
                key={config.id}
                className={`flex items-center p-2 cursor-pointer hover:bg-gray-200 ${
                  selectedConfig && selectedConfig.id === config.id ? 'bg-gray-300' : ''
                }`}
                onClick={() => setSelectedConfig(config)}
              >
                <span className="w-6">{index + 1}</span>
                <span className="ml-2">{config.name}</span>
              </li>
            ))}
          </ul>

          {/* ページネーション */}
          <Pagination total={totalPages} current={currentPage} onPageChange={handlePageChange} />

          {/* 区切り線 */}
          <hr className="my-4 border-gray-300" />

          {/* PC構成登録セクション */}
          <div className="flex flex-col space-y-4 p-4">
            {/* タイトル */}
            <h2 className="text-lg font-semibold text-center">PC構成登録</h2>

            {/* おまかせ構成ボタン */}
            <button
              className="w-full px-4 py-2 bg-custom-blue text-white rounded-md shadow hover:bg-green-500 transition-colors"
              onClick={handleExpertClick}
            >
              おまかせ構成
            </button>

            {/* カスタム構成ボタン */}
            <button
              className="w-full px-4 py-2 bg-custom-blue text-white rounded-md shadow hover:bg-blue-500 transition-colors"
              onClick={handleCustomClick}
            >
              カスタム構成
            </button>
          </div>
        </div>

        {/* 右半分: 構成詳細 */}
        <div className="w-full lg:w-1/2 pl-4 border-l">
      {selectedConfig ? (
        <>
          <h2 className="text-2xl font-semibold mb-6">{selectedConfig.name}</h2>
          
          {/* CPUロゴ画像 */}
          <div className="mb-4">
            <img
              src={selectedConfig.image}
              alt={`${selectedConfig.cpu} ロゴ`}
              className="w-24 h-24 object-contain"
            />
          </div>
          
          {/* 詳細情報のセクション */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-sm font-medium text-gray-600">OS</p>
              <p className="text-base text-gray-800">{selectedConfig.os}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">CPU</p>
              <p className="text-base text-gray-800">{selectedConfig.cpu}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">メモリ</p>
              <p className="text-base text-gray-800">{selectedConfig.memory}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">グラフィック</p>
              <p className="text-base text-gray-800">{selectedConfig.graphic}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">ストレージ</p>
              <p className="text-base text-gray-800">{selectedConfig.storage}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">費用</p>
              <p className="text-base text-gray-800">{selectedConfig.cost}</p>
            </div>
          </div>

          {/* メモセクション */}
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-600 mb-2">メモ</p>
            <div
              className="w-full p-2 border border-gray-300 rounded bg-gray-50 text-gray-800 overflow-auto"
              style={{ minHeight: '8rem', whiteSpace: 'pre-wrap' }}
            >
              {selectedConfig.memo || "メモがありません。"}
            </div>
          </div>

          {/* ボタン群 */}
          <div className="grid grid-cols-2 gap-4">
            <button
              className="px-4 py-2 bg-custom-blue text-white rounded hover:bg-blue-500 w-full"
              aria-label="詳細を見る"
            >
              詳細
            </button>
            <button
              className="px-4 py-2 bg-custom-blue text-white rounded hover:bg-orange-500 w-full"
              aria-label="編集する"
            >
              編集
            </button>
            <button
              className="px-4 py-2 bg-custom-blue text-white rounded hover:bg-red-500 w-full"
              aria-label="リセットする"
            >
              リセット
            </button>
            <button
              className="px-4 py-2 bg-custom-blue text-white rounded hover:bg-green-500 w-full"
              aria-label="出力する"
            >
              出力
            </button>
          </div>
        </>
      ) : (
        <p className="text-gray-600">選択された構成がありません。</p>
      )}
    </div>

      </div>
    </div>
  );
};

export default DashboardPage;
