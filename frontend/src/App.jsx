import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
import PcExpertConfigPage from './components/pages/PcExpertConfigPage';
import PcCustomConfigPage from './components/pages/PcCustomConfigPage';
import PcConfigDetailsPage from './components/pages/PcConfigDetailsPage';
import DetailsPage from './components/pages/details/DetailsPage';
import PcCustomizeEditPage from './components/pages/PcCustomizeEditPage';
import PcSaveConfigPage from './components/pages/PcSaveConfigPage';
// コンポーネント
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';

import { getCurrentUser } from './lib/api/auth';

import { AuthContext } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

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
          {/* パブリックルート */}
          <Route path="/" element={isSignedIn ? <LoggedInTopPage /> : <TopPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/password_reset" element={<PasswordResetRequestPage />} />
          <Route path="/password_reset/:token" element={<PasswordResetPage />} />

          {/* 保護されたルート */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/pc_expert_config"
            element={
              <PrivateRoute>
                <PcExpertConfigPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/pc_expert_config/:budget"
            element={
              <PrivateRoute>
                <PcConfigDetailsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/details/:id"
            element={
              <PrivateRoute>
                <DetailsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/pc_custom_config"
            element={
              <PrivateRoute>
                <PcCustomConfigPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/pc_customize_edit"
            element={
              <PrivateRoute>
                <PcCustomizeEditPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/pc_save_config"
            element={
              <PrivateRoute>
                <PcSaveConfigPage />
              </PrivateRoute>
            }
          />

          {/* 他のルート */}
        </Routes>
        <Footer/>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
