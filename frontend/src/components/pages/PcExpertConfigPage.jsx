import React from 'react';
import { useNavigate } from 'react-router-dom';

const PcExpertConfigPage = () => {
  const navigate = useNavigate();

  const dropdowns = [
    {
      title: '普段使い、ビジネスに使う',
      description: [
        'webサイトやSNSの閲覧、officeでの資料作成',
        'ご予算に近いものをお選びください',
      ],
      buttons: [
        { text: '10万円以下のPC', budget: '10w' },
        { text: '10万円以上のPC', budget: '10w-plus' },
      ],
    },
    {
      title: 'ゲームプレイに使う',
      description: [
        'PCゲームやゲームの実況配信をする、ゲームに限らない全ての方へ',
        'ご予算に近いものをお選びください',
      ],
      buttons: [
        { text: '15万円以上のPC', budget: '15w-plus' },
        { text: '20万円以上のPC', budget: '20w-plus' },
        { text: '25万円以上のPC', budget: '25w-plus' },
      ],
    },
  ];

  const handleButtonClick = (budget) => {
    navigate(`/pc_expert_config/${budget}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      {/* ページタイトル */}
      <h1 className="text-4xl font-bold mb-4 text-blue-600">おまかせ構成</h1>

      {/* ページ説明 */}
      <p className="text-center text-lg mb-8 max-w-2xl text-blue-600">
        PC初心者の方や目的に合ったPCをお探しの方に、最適なPC構成をご提案します。用途と予算を選んでください。
      </p>

      {dropdowns.map((dropdown, idx) => (
        <div className="w-full max-w-md mb-4" key={idx}>
          <div className="collapse collapse-arrow border-2 border-dashed border-blue-500 bg-base-100 rounded-box shadow-md">
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium text-blue-600">
              {dropdown.title}
            </div>
            <div className="collapse-content">
              {dropdown.description.map((desc, dIdx) => (
                <p className="mb-2" key={dIdx}>{desc}</p>
              ))}
              <div className="flex flex-col space-y-2">
                {dropdown.buttons.map((button, bIdx) => (
                  <a
                    key={bIdx}
                    onClick={() => handleButtonClick(button.budget)}
                    className="btn btn-primary flex justify-between items-center px-4"
                  >
                    <span>{button.text}</span>
                    <span>&gt;</span> {/* > マークを使用 */}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PcExpertConfigPage;
