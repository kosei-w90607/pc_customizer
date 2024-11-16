import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
// api
import { signOut } from '../../lib/api/auth';
// context
import { AuthContext } from '../../App';
// component
import HeaderDrawer from './HeaderDrawer';

const Header = () => {
  const { isSignedIn, setIsSignedIn, currentUser, setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log('Header AuthContext:', { isSignedIn, currentUser });

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
        useEffect(() => {
          console.log('isSignedIn changed to:', isSignedIn);
          console.log('currentUser changed to:', currentUser);
        }, [isSignedIn, currentUser]);

      } else {
        console.log('ログアウトに失敗しました');
      }
    } catch (e) {
      console.error('ログアウト中にエラーが発生しました:', e);
    }
  };

  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const drawerItems = isSignedIn
    ? [
        { label: 'トップページ', path: '/' },
        { label: 'PC構成一覧', path: '/dashboard' },
        { label: 'おまかせ構成', path: '/omakase' },
        { label: 'カスタマイズ', path: '/customize' },
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
      <AppBar position="static" className="bg-custom-blue text-white">
        <Toolbar className="flex justify-between">
          {/* 左端: ロゴ */}
          <Link to="/" className="text-white no-underline">
            <Typography variant="h6">
              My App
            </Typography>
          </Link>

          {/* 右端: ハンバーガーメニューとボタン */}
          <Box className="flex items-center">
            {/* ログイン前のボタン */}
            {!isSignedIn && (
              <Box className="hidden md:flex space-x-4 mr-2">
                <Link to="/register" className="btn btn-white text-custom-blue">
                  会員登録
                </Link>
                <Link to="/login" className="btn btn-outline btn-white text-white">
                  ログイン
                </Link>
              </Box>
            )}

            {/* ログイン後のユーザー情報 */}
            {isSignedIn && currentUser && (
              <Box className="hidden md:flex mr-4">
                <Typography variant="body1">
                  {currentUser.uid}さんがログイン中
                </Typography>
              </Box>
            )}

            {/* ハンバーガーメニューアイコン */}
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
              className="md:ml-0"
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <HeaderDrawer
        open={open}
        handleDrawerToggle={handleDrawerToggle}
        drawerItem={drawerItems}
      />
    </>
  );
};

export default Header;
