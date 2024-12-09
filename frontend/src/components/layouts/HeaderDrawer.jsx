import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const HeaderDrawer = ({ open, handleDrawerToggle, drawerItems }) => {
  // ESCキーでドロワーを閉じる
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape' && open) {
        handleDrawerToggle();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [open, handleDrawerToggle]);

  return (
    <>
      {/* オーバーレイ */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={handleDrawerToggle}
          aria-label="ドロワーを閉じる"
        ></div>
      )}

      {/* ドロワー */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-custom-blue shadow-lg z-50 transform ${
          open ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="p-4">
          <div className="flex justify-end xl:justify-center mb-4">
            <button
              onClick={handleDrawerToggle}
              className="text-white hover:text-gray-300 focus:outline-none"
              aria-label="ドロワーを閉じる"
            >
              {/* 閉じるアイコン */}
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
          </div>
          <nav className="flex flex-col space-y-2">
            {drawerItems.map((item, index) =>
              item.isUserInfo ? (
                // ユーザー情報をテキストとして表示
                <div key={index} className="text-white p-2 rounded-md text-center border border-white">
                  {item.label}
                </div>
              ) : item.path ? (
                <Link
                  key={index}
                  to={item.path}
                  onClick={handleDrawerToggle}
                  className="text-white hover:bg-gray-200 p-2 rounded"
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={index}
                  onClick={() => {
                    if (item.onClick) item.onClick();
                    handleDrawerToggle();
                  }}
                  className="text-white hover:bg-gray-200 p-2 rounded text-left"
                >
                  {item.label}
                </button>
              )
            )}
          </nav>
        </div>
      </div>
    </>
  );
};

HeaderDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
  drawerItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string,
      onClick: PropTypes.func,
      isUserInfo: PropTypes.bool, // 追加
    })
  ).isRequired,
};

export default HeaderDrawer;
