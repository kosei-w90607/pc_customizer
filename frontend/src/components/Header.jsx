import React, { useState } from 'react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* 769px以上の画面サイズで表示されるコンテンツ */}
      <div className="hidden md:block">
        <header className="bg-custom-blue shadow-lg py-6">
          <div className="container mx-auto flex justify-between items-center px-4">
            <div className="flex items-center">
              <a href="/" className="text-white text-2xl font-bold">
                {/* ロゴ部分、後で画像を追加可能 */}
                My App
              </a>
            </div>
            <nav className="flex space-x-4">
              <a href="/login" className="btn btn-outline btn-white text-white">ログイン</a>
              <a href="/signup" className="btn btn-white text-custom-blue">会員登録</a>
            </nav>
          </div>
        </header>
      </div>

      {/* 768px以下の画面サイズで表示されるコンテンツ */}
      <div className="block md:hidden relative z-20">
        <header className="bg-custom-blue shadow-lg py-6">
          <div className="container mx-auto flex justify-between items-center px-4">
            <div className="flex items-center">
              <a href="/" className="text-white text-2xl font-bold">
                {/* ロゴ部分、後で画像を追加可能 */}
                My App
              </a>
            </div>
            <div className="md:hidden">
              <button
                className="text-white focus:outline-none"
                onClick={toggleMenu}
              >
                <svg
                  className="fill-current w-8 h-8"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {isOpen ? (
                    <>
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </>
                  ) : (
                    <>
                      <line x1="3" y1="12" x2="21" y2="12"></line>
                      <line x1="3" y1="6" x2="21" y2="6"></line>
                      <line x1="3" y1="18" x2="21" y2="18"></line>
                    </>
                  )}
                </svg>
              </button>
            </div>
            <nav
              className={`${
                isOpen ? 'translate-x-0' : 'translate-x-full'
              } fixed top-0 right-0 h-full w-48 bg-custom-blue transform transition-transform duration-300 ease-in-out md:static md:flex md:transform-none z-30`}
            >
              <div className="flex flex-col h-full">
                <button
                  className="text-white focus:outline-none self-end m-4 md:hidden"
                  onClick={toggleMenu}
                >
                  <svg
                    className="fill-current w-8 h-8"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
                <ul className="menu menu-compact p-4 space-y-4">
                  <li><a href="/login" className="text-white text-lg">ログイン</a></li>
                  <li><a href="/signup" className="text-white text-lg">会員登録</a></li>
                </ul>
              </div>
            </nav>
          </div>

          {/* オーバーレイ背景 */}
          {isOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-10"
              onClick={() => setIsOpen(false)}
            ></div>
          )}
        </header>
      </div>
    </>
  );
};

export default Header;
