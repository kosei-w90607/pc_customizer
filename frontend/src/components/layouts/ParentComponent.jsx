// ParentComponent.jsx
import React, { useState } from 'react';
import PCSlider from './PCSlider';

const ParentComponent = () => {
  const [selectedBudget, setSelectedBudget] = useState('10w-plus'); // 例として初期値を設定

  return (
    <div>
      {/* 予算を選択するUI（例: セレクトボックス） */}
      <select value={selectedBudget} onChange={(e) => setSelectedBudget(e.target.value)}>
        <option value="10w">10万円</option>
        <option value="10w-plus">10万円以上</option>
        <option value="15w-plus">15万円以上</option>
        <option value="20w-plus">20万円以上</option>
        <option value="25w-plus">25万円以上</option>
      </select>

      {/* PCSliderコンポーネントにbudgetを渡す */}
      <PCSlider budget={selectedBudget} />
    </div>
  );
}

export default ParentComponent;
