import React, { useState, useEffect, useContext, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// ログイン前
import TopPage from './components/pages/TopPage';
import LoginPage from './components/pages/users/LoginPage';
import RegisterPage from './components/pages/users/RegisterPage';
// パスワードリセット
import PasswordResetRequestPage from './components/pages/PasswordResetRequestPage';
import PasswordResetPage from './components/pages/PasswordResetPage';
// ログイン後
import LoggedInTopPage from './components/pages/LoggedInTopPage';
import DashboardPage from './components/pages/DashboardPage';
// component
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';

import { getCurrentUser } from './lib/api/auth';

import { CircularProgress, Box } from '@mui/material';

export const AuthContext = createContext();

const App = () => {
  const [loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState();

  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser();

      if (res?.data.success === true) {
        setIsSignedIn(true);
        setCurrentUser(res?.data.data);

        console.log('Current user:', res?.data.data);
      } else {
        console.log('no current user');
      }
    } catch (e) {
      console.error('getCurrentUser エラー:', e);
      setIsSignedIn(false);
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetCurrentUser();
  }, []);

  const PrivateRoute = ({ element }) => {
    const { isSignedIn, loading } = useContext(AuthContext);

    if (loading) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      );
    }

    return isSignedIn ? element : <Navigate to="/login" />;
  };


  return (
    <AuthContext.Provider
      value={{
        loading,
        setLoading,
        isSignedIn,
        setIsSignedIn,
        currentUser,
        setCurrentUser,
      }}
    >
      <Router>
        <Header/>
          <Routes>
            <Route path="/" element={isSignedIn ? <LoggedInTopPage /> : <TopPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route path="/password_reset" element={<PasswordResetRequestPage />} />
            <Route path="/password_reset/:token" element={<PasswordResetPage />} />

            <Route path="/dashboard" element={<PrivateRoute element={<DashboardPage />} />} />

            {/* 他のルート */}
          </Routes>
        <Footer/>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
