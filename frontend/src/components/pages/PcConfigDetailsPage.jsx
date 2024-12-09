// src/components/pages/PcConfigDetailsPage.jsx
import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import PcSlider from '../layouts/PcSlider'; // PcSliderのパスを確認してください
import { budgets } from '../../data/budgets';

const PcConfigDetailsPage = () => {
  const { budget } = useParams();

  // 現在の予算帯に対応するデータを取得
  const currentBudget = budgets.find((b) => b.id === budget) || budgets[0];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* ページタイトル */}
      <h1 className="text-4xl font-bold mb-4 text-blue-600 text-center">
        {currentBudget.title}
      </h1>

      {/* ページ説明 */}
      <p className="text-center text-lg mb-8 max-w-3xl mx-auto text-gray-700">
        {currentBudget.description}
      </p>

      {/* デスクトップPCセクション */}
      <div className="mb-8">
        <div className="bg-blue-200 p-4 rounded-md mb-4">
          <h2 className="text-2xl font-semibold text-blue-800">
            {currentBudget.sliderLabel}
          </h2>
        </div>
        <PcSlider budget={currentBudget.sliderBudget} /> {/* budgetプロップスを渡す */}
      </div>

      {/* ノートPCセクション */}
      <div className="mb-8">
        <div className="bg-blue-200 p-4 rounded-md mb-4">
          <h2 className="text-2xl font-semibold text-blue-800">
            {currentBudget.sliderLabel.replace('デスクトップ', 'ノート')} {/* 例としてデスクトップをノートに変更 */}
          </h2>
        </div>
        <PcSlider budget={currentBudget.sliderBudget} /> {/* 必要に応じてプロップスを渡す */}
      </div>

      {/* その他の予算からPCを選ぶセクション */}
      <div className="mb-8 p-6 border-2 border-blue-500 bg-white rounded-lg shadow-md w-2/3 mx-auto">
        <h3 className="text-xl font-medium text-blue-600 mb-4">
          その他の予算からPCを選ぶならこちら
        </h3>
        <div className="flex flex-col space-y-4">
          {currentBudget.links.map((link) => (
            <Link key={link.to} to={link.to} className="btn btn-primary">
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* ナビゲーションリンク */}
      <div className="flex justify-center space-x-4">
        <Link to="/pc_expert_config" className="text-blue-600 hover:underline">
          おまかせ構成に戻る
        </Link>
        <Link to="/" className="text-blue-600 hover:underline">
          Topページに戻る
        </Link>
      </div>
    </div>
  );
};

export default PcConfigDetailsPage;
