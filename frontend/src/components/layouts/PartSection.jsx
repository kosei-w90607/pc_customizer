// PartSection.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { FiTrash2, FiPlus } from 'react-icons/fi'; // プラスと削除アイコン

const PartSection = ({
  partKey,
  partName,
  description,
  options,
  selectedOption,
  onSelect,
  onAdd,
  onDelete,
  isMultiple = false,
  showDeleteButton = false,
}) => {
  // オプションがカテゴリ化されているかどうかをチェック
  const isCategorized = options.some(
    (option) => option.categoryName && option.options
  );

  return (
    <div className="max-w-3xl mx-auto mb-8 flex flex-col shadow-lg bg-gray-100">
      {/* セクションヘッダー */}
      <div className="bg-gray-200 text-black py-4 px-8 w-full flex justify-between items-center rounded-t-lg">
        <h2 className="text-2xl font-semibold">{partName}</h2>
        <div className="flex items-center space-x-2">
          {isMultiple && (
            <button
              onClick={onAdd}
              className="text-green-500 hover:text-green-700 focus:outline-none"
              title="追加"
            >
              <FiPlus size={24} />
            </button>
          )}
          {isMultiple && showDeleteButton && (
            <button
              onClick={onDelete}
              className="text-red-500 hover:text-red-700 focus:outline-none"
              title="削除"
            >
              <FiTrash2 size={24} />
            </button>
          )}
        </div>
      </div>

      {/* 選択済みオプションの表示 */}
      {selectedOption && (
        <div className="bg-blue-100 text-blue-800 py-2 px-4">
          選択済み: {selectedOption} {/* 必要に応じて価格も表示 */}
        </div>
      )}

      {/* セクション内容 */}
      <div className="rounded-b-lg p-8 bg-white w-full">
        {/* パーツの説明 */}
        <p className="mb-6 text-lg text-black">{description}</p>

        {/* オプションの表示 */}
        {isCategorized ? (
          // カテゴリ化されたオプションの場合
          <div className="flex flex-col gap-4">
            {options.map((category, idx) => (
              <div
                className="collapse collapse-arrow border-2 border-dashed border-blue-500 bg-base-100 rounded-box shadow-md"
                key={idx}
              >
                <input type="checkbox" />
                <div className="collapse-title text-xl font-medium text-blue-600">
                  {category.categoryName}
                </div>
                <div className="collapse-content">
                  <div className="flex flex-col space-y-2">
                    {category.options.map((option, bIdx) => (
                      <button
                        key={bIdx}
                        className={`w-full px-6 py-4 border rounded-lg
                          ${
                            selectedOption === option.name
                              ? 'border-blue-600 bg-blue-100'
                              : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
                          } text-black text-lg`}
                        onClick={() => onSelect(option)}
                      >
                        <div className="flex justify-between">
                          <span>{option.name}</span>
                          <span>{option.price}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // 単純なオプションの場合
          <div className="flex flex-col gap-4">
            {options.map((option, index) => (
              <button
                key={index}
                className={`w-full px-6 py-4 border rounded-lg
                  ${
                    selectedOption === option.name
                      ? 'border-blue-600 bg-blue-100'
                      : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
                  } text-black text-lg`}
                onClick={() => onSelect(option)}
              >
                <div className="flex justify-between">
                  <span>{option.name}</span>
                  <span>{option.price}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

PartSection.propTypes = {
  partKey: PropTypes.string,
  partName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  selectedOption: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object, // { name: '', price: '' }
  ]),
  onSelect: PropTypes.func.isRequired,
  onAdd: PropTypes.func,
  onDelete: PropTypes.func,
  isMultiple: PropTypes.bool,
  showDeleteButton: PropTypes.bool,
};

export default PartSection;
