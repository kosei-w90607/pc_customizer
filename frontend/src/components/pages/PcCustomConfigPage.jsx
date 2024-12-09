import React from 'react';
import { useNavigate } from 'react-router-dom';

const PcCustomConfigPage = () => {
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
      <h1 className="text-4xl font-bold mb-4 text-blue-600">カスタム構成</h1>

      {/* ページ説明 */}
      <div className="text-center text-lg mb-8 max-w-2xl text-blue-600">
        <p className="mb-4">
          構成するにあたってこだわりをお持ちの方に、最適なPC構成と選び方をご提案します。用途と予算を入力してください。
        </p>

        <p className="font-bold mb-2">【ゲーミングPC予算早見表】</p>
        <p className="mb-4">
          12万円：予算の下限。性能カツカツなのでオススメしない。<br />
          20万円：スターターならこのあたり。がんばってお金を貯めよう。<br />
          25万円：コスパ最大を狙うならこのあたり。考えるな買え。<br />
          50万円：このあたりで性能が飽和する。ここから先は沼。
        </p>

        <p className="font-bold mb-2">【前提条件】</p>
        <ul className="list-disc list-inside">
          <li>デスクトップ型、本体のみの価格。税込み。</li>
          <li>BTOで購入。サポート費用は別。</li>
          <li>モニタなどの周辺機器は別途必要。</li>
        </ul>
      </div>

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

export default PcCustomConfigPage;
