// PcCustomizeEditPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PartSection from '../layouts/PartSection';
import partsData from '../../data/partsData';
import { v4 as uuidv4 } from 'uuid';

const PcCustomizeEditPage = () => {
  const navigate = useNavigate();

  const initialSelectedParts = partsData.reduce((acc, part) => {
    if (part.partName.toLowerCase().includes('storage')) {
      acc[part.partKey] = [
        {
          id: uuidv4(),
          name: '',
          price: '',
        },
      ];
    } else {
      acc[part.partKey] = '';
    }
    return acc;
  }, {});

  const [selectedParts, setSelectedParts] = useState(initialSelectedParts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [budget, setBudget] = useState('未設定');
  const [usage, setUsage] = useState('未設定');

  const handleSelect = (partKey, option, id = null) => {
    if (partKey.toLowerCase().includes('storage')) {
      setSelectedParts((prev) => ({
        ...prev,
        [partKey]: prev[partKey].map((storage) =>
          storage.id === id
            ? { ...storage, name: option.name, price: option.price }
            : storage
        ),
      }));
    } else {
      setSelectedParts((prev) => ({
        ...prev,
        [partKey]: option.name,
      }));
    }
  };

  const handleAdd = (partKey) => {
    if (partKey.toLowerCase().includes('storage')) {
      setSelectedParts((prev) => ({
        ...prev,
        [partKey]: [
          ...prev[partKey],
          {
            id: uuidv4(),
            name: '',
            price: '',
          },
        ],
      }));
    }
  };

  const handleDelete = (partKey, id) => {
    if (partKey.toLowerCase().includes('storage')) {
      setSelectedParts((prev) => ({
        ...prev,
        [partKey]: prev[partKey].filter((storage) => storage.id !== id),
      }));
    }
  };

  const formatSelectedParts = () => {
    const formatted = [];
    partsData.forEach((part) => {
      if (part.partName.toLowerCase().includes('storage')) {
        const storages = selectedParts[part.partKey]
          .filter(storage => storage.name)
          .map(storage => ({
            category: part.partName,
            part: storage.name,
            price: storage.price
          }));
        if (storages.length > 0) {
          formatted.push(...storages);
        } else {
          formatted.push({
            category: part.partName,
            part: '未選択',
            price: ''
          });
        }
      } else {
        const selectedOption = partsData
          .find(p => p.partKey === part.partKey)
          .options.find(o => o.name === selectedParts[part.partKey]);
        formatted.push({
          category: part.partName,
          part: selectedParts[part.partKey] || '未選択',
          price: selectedOption ? selectedOption.price : ''
        });
      }
    });
    return formatted;
  };

  const formattedSelectedParts = formatSelectedParts();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-3xl mx-auto">
        {/* ページタイトル */}
        <h1 className="text-3xl font-bold mb-4 text-blue-600 text-center">カスタマイズ編集</h1>

        {/* ページ説明 */}
        <p className="text-lg mb-8 text-blue-600 text-center">
          構成するにあたってこだわりのお持ちの方に、最適なPC構成と選び方をご提案します。
          用途と予算を選んでください。
        </p>

        {/* パーツセクション */}
        {partsData.map((part) => {
          if (part.partName.toLowerCase().includes('storage')) {
            return selectedParts[part.partKey].map((storage, index) => (
              <PartSection
                key={storage.id}
                partKey={part.partKey}
                partName={part.partName}
                description={part.description}
                options={part.options}
                selectedOption={storage.name}
                onSelect={(option) => handleSelect(part.partKey, option, storage.id)}
                onAdd={() => handleAdd(part.partKey)}
                onDelete={() => handleDelete(part.partKey, storage.id)}
                isMultiple
                showDeleteButton={index !== 0}
              />
            ));
          } else {
            return (
              <PartSection
                key={part.partKey}
                partKey={part.partKey}
                partName={part.partName}
                description={part.description}
                options={part.options}
                selectedOption={selectedParts[part.partKey]}
                onSelect={(option) => handleSelect(part.partKey, option)}
              />
            );
          }
        })}
      </div>

      {/* 固定ボタン */}
      <button
        className="fixed right-6 bottom-6 bg-white text-black border border-gray-300 px-4 py-2 rounded shadow-lg flex items-center space-x-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400"
        onClick={() => setIsDialogOpen(true)}
      >
        {/* 歯車アイコン */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M11.3 1.046a1 1 0 00-2.6 0l-.406 1.316a1 1 0 01-.95.69H4.5a1 1 0 00-1 .895l-.027.115a1 1 0 00.554.966l1.175.683a7.007 7.007 0 000 2.36l-1.175.683a1 1 0 00-.554.966l.027.115a1 1 0 001 .895h3.244a1 1 0 01.95.69l.406 1.316a1 1 0 002.6 0l.406-1.316a1 1 0 01.95-.69h3.244a1 1 0 001-.895l.027-.115a1 1 0 00-.554-.966l-1.175-.683a7.007 7.007 0 000-2.36l1.175-.683a1 1 0 00.554-.966l-.027-.115a1 1 0 00-1-.895h-3.244a1 1 0 01-.95-.69l-.406-1.316zM10 13a3 3 0 110-6 3 3 0 010 6z"
            clipRule="evenodd"
          />
        </svg>
        <span>構成を確認・保存</span>
      </button>

      {/* ダイアログ */}
      {isDialogOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-auto"
          onClick={() => setIsDialogOpen(false)} // 背景クリックでダイアログを閉じる
        >
          <div
            className="bg-white rounded-lg w-11/12 sm:w-10/12 md:w-8/12 lg:w-3/4 xl:w-2/3 2xl:w-1/2 p-6 relative shadow-lg max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()} // ダイアログ内部のクリックを停止
          >
            {/* ダイアログヘッダー */}
            <div className="flex justify-between items-center mb-4">
              {/* ダイアログタイトル */}
              <h2 className="text-2xl font-bold">構成のカスタマイズ詳細</h2>
              {/* 保存ボタン */}
              <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                onClick={() => {
                  // 保存処理をここに追加
                  navigate('/pc_save_config');

                  setIsDialogOpen(false);
                }}
              >
                保存する
              </button>
            </div>

            {/* 予算・用途 をテーブル形式に変更 */}
            <div className="mb-4 overflow-x-auto">
              <table className="min-w-full table-auto border-collapse text-sm">
                <thead>
                  <tr>
                    <th className="px-3 py-2 border-b-2 border-gray-300 text-left font-semibold bg-gray-100">予算</th>
                    <th className="px-3 py-2 border-b-2 border-gray-300 text-left font-semibold bg-gray-100">用途</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-3 py-2 border-b border-gray-200">{budget || '未設定'}</td>
                    <td className="px-3 py-2 border-b border-gray-200">{usage || '未設定'}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 詳細内容をテーブル形式に変更 */}
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse text-sm">
                <thead>
                  <tr>
                    <th className="px-3 py-2 border-b-2 border-gray-300 text-left font-semibold bg-gray-100">パーツのカテゴリ</th>
                    <th className="px-3 py-2 border-b-2 border-gray-300 text-left font-semibold bg-gray-100">選択したパーツ</th>
                    <th className="px-3 py-2 border-b-2 border-gray-300 text-left font-semibold bg-gray-100">金額</th>
                  </tr>
                </thead>
                <tbody>
                  {formattedSelectedParts.map((item, index) => (
                    <tr key={index}>
                      <td className="px-3 py-2 border-b border-gray-200">{item.category}</td>
                      <td className="px-3 py-2 border-b border-gray-200">{item.part}</td>
                      <td className="px-3 py-2 border-b border-gray-200">{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PcCustomizeEditPage;
