import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { AuthContext } from '../../contexts/AuthContext';
import HeaderDrawer from './HeaderDrawer';

// API
import { signOut } from '../../lib/api/auth';

const Header = () => {
  const { isSignedIn, setIsSignedIn, currentUser, setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('isSignedIn changed to:', isSignedIn);
    console.log('currentUser changed to:', currentUser);
  }, [isSignedIn, currentUser]);

  const handleLogout = async () => {
    try {
      const res = await signOut();

      if (res.data.success) {
        Cookies.remove('_access_token');
        Cookies.remove('_client');
        Cookies.remove('_uid');

        setIsSignedIn(false);
        setCurrentUser(null);

        navigate('/login');
        console.log('ログアウトに成功しました');
      } else {
        console.log('ログアウトに失敗しました');
      }
    } catch (e) {
      console.error('ログアウト中にエラーが発生しました:', e);
    }
  };

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  const drawerItems = isSignedIn
    ? [
        { label: `👤 ${currentUser.uid}さんがログイン中`, isUserInfo: true },
        { label: 'トップページ', path: '/' },
        { label: 'PC構成一覧', path: '/dashboard' },
        { label: 'おまかせ構成', path: '/pc_expert_config' },
        { label: 'カスタマイズ', path: '/pc_custom_config' },
        { label: '構成出力', path: '/output' },
        { label: 'ログアウト', onClick: handleLogout },
      ]
    : [
        { label: 'トップページ', path: '/' },
        { label: '会員登録', path: '/register' },
        { label: 'ログイン', path: '/login' },
      ];

  return (
    <>
      <nav className="bg-custom-blue text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* 左側: ロゴとハンバーガーメニュー */}
            <div className="flex items-center space-x-4">
              {/* ロゴ */}
              <div className="flex-shrink-0">
                <Link to="/" className="text-white text-lg font-bold">
                  My App
                </Link>
              </div>
            </div>

            {/* 右側: ユーザー情報とログイン/ログアウト */}
            <div className="flex items-center space-x-4">
              {!isSignedIn ? (
                <>
                  <Link
                    to="/register"
                    className="btn btn-ghost text-white hover:bg-blue-700 rounded-md text-base"
                  >
                    会員登録
                  </Link>
                  <Link
                    to="/login"
                    className="btn btn-outline text-white border-white hover:bg-blue-700 hover:border-blue-700 rounded-md text-base"
                  >
                    ログイン
                  </Link>
                </>
              ) : (
                <div className="flex items-center space-x-2 hidden md:flex">
                  {currentUser && (
                    <span className="text-white text-base">
                      {currentUser.uid}さんがログイン中
                    </span>
                  )}
                </div>
              )}

              {/* ハンバーガーメニュー（常に表示） */}
              <button
                onClick={handleDrawerToggle}
                className="text-white hover:text-gray-300 focus:outline-none text-2xl"
                aria-label="メニューを開く"
              >
                {/* ハンバーガーアイコン */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isDrawerOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* HeaderDrawer コンポーネント */}
      <HeaderDrawer open={isDrawerOpen} handleDrawerToggle={handleDrawerToggle} drawerItems={drawerItems} />
    </>
  );
};

export default Header;
