// DashboardPage.jsx

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
  const [memo, setMemo] = useState(""); // メモの状態を追加

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
      setMemo(initialConfigurations[0].memo || ""); // メモを初期化
    }
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    const newSelected = fetchedConfigurations[(pageNumber - 1) * configurationsPerPage];
    setSelectedConfig(newSelected || null); // 存在しない場合はnullに設定
    setMemo(newSelected ? newSelected.memo || "" : ""); // メモを更新
  };

  const handleSave = () => {
    // 保存処理を実装（例: API コール）
    if (selectedConfig) {
      // 既存の構成を更新
      const updatedConfigurations = fetchedConfigurations.map(config =>
        config.id === selectedConfig.id ? { ...config, memo } : config
      );
      setFetchedConfigurations(updatedConfigurations);
      alert(`スロット ${selectedConfig.id} に保存しました`);
    } else {
      // 新規構成の保存処理
      const newConfig = {
        id: fetchedConfigurations.length + 1,
        name: `新しい構成 ${fetchedConfigurations.length + 1}`,
        image: '', // 適切な画像URLを設定
        os: '',
        cpu: '',
        memory: '',
        graphic: '',
        storage: '',
        cost: '',
        memo: memo
      };
      setFetchedConfigurations([...fetchedConfigurations, newConfig]);
      setSelectedConfig(newConfig);
      alert(`スロット ${newConfig.id} に新しい構成を保存しました`);
    }
  };

  if (fetchedConfigurations.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-2">PC構成保存</h1>
        <p className="text-gray-600 mb-6">データを読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {/* ページタイトルと説明 */}
      <h1 className="text-3xl font-bold mb-2">PC構成保存</h1>
      <p className="text-gray-600 mb-6">PCの構成の保存先を選択してください</p>

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
                onClick={() => {
                  setSelectedConfig(config);
                  setMemo(config.memo || "");
                }}
              >
                <span className="w-6">{index + 1}</span>
                <span className="ml-2">{config.name}</span>
              </li>
            ))}
          </ul>

          {/* ページネーション */}
          <Pagination total={totalPages} current={currentPage} onPageChange={handlePageChange} />
        </div>

        {/* 右半分: 構成詳細 */}
        <div className="w-full lg:w-1/2 pl-4 border-l">
          <>
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
                    <p className="text-base text-gray-800">{selectedConfig.os || "未設定"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">CPU</p>
                    <p className="text-base text-gray-800">{selectedConfig.cpu || "未設定"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">メモリ</p>
                    <p className="text-base text-gray-800">{selectedConfig.memory || "未設定"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">グラフィック</p>
                    <p className="text-base text-gray-800">{selectedConfig.graphic || "未設定"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">ストレージ</p>
                    <p className="text-base text-gray-800">{selectedConfig.storage || "未設定"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">費用</p>
                    <p className="text-base text-gray-800">{selectedConfig.cost || "未設定"}</p>
                  </div>
                </div>

                {/* メモセクション */}
                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-600 mb-2">メモ</p>
                  <div
                    className={`w-full p-2 border rounded bg-gray-50 text-gray-800 overflow-auto ${
                      selectedConfig ? '' : 'bg-white'
                    }`}
                    style={{ minHeight: '8rem', whiteSpace: 'pre-wrap' }}
                  >
                    {selectedConfig ? (
                      <textarea
                        className="w-full h-full bg-transparent"
                        value={memo}
                        onChange={(e) => setMemo(e.target.value)}
                        placeholder="メモを入力してください。"
                      />
                    ) : (
                      "メモがありません。"
                    )}
                  </div>
                </div>

                {/* ボタン */}
                <div className="flex justify-end">
                  <button
                    className="px-4 py-2 bg-custom-blue text-white rounded hover:bg-blue-500"
                    onClick={handleSave}
                    aria-label="ここに保存"
                  >
                    ここに保存
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-semibold mb-6">空いている保存スロット</h2>

                {/* 構成詳細の空欄表示 */}
                <div className="mb-4">
                  {/* 画像がない場合のプレースホルダー */}
                  <div className="w-24 h-24 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">画像なし</span>
                  </div>
                </div>

                {/* 詳細情報の空欄 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className="text-sm font-medium text-gray-600">OS</p>
                    <p className="text-base text-gray-800">未設定</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">CPU</p>
                    <p className="text-base text-gray-800">未設定</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">メモリ</p>
                    <p className="text-base text-gray-800">未設定</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">グラフィック</p>
                    <p className="text-base text-gray-800">未設定</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">ストレージ</p>
                    <p className="text-base text-gray-800">未設定</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">費用</p>
                    <p className="text-base text-gray-800">未設定</p>
                  </div>
                </div>

                {/* メモセクション（入力可能） */}
                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-600 mb-2">メモ</p>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded bg-white text-gray-800"
                    style={{ minHeight: '8rem', whiteSpace: 'pre-wrap' }}
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                    placeholder="メモを入力してください。"
                  />
                </div>

                {/* ボタン */}
                <div className="flex justify-end">
                  <button
                    className="px-4 py-2 bg-custom-blue text-white rounded hover:bg-blue-500"
                    onClick={handleSave}
                    aria-label="ここに保存"
                  >
                    ここに保存
                  </button>
                </div>
              </>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
