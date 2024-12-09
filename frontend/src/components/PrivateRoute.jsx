// src/components/PrivateRoute.jsx
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext.jsx';

const PrivateRoute = ({ children }) => {
  const { isSignedIn, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    // ローディング中の表示（スピナーなど）
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  if (!isSignedIn) {
    // ログインしていない場合、ログインページへリダイレクト
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 認証済みの場合、子コンポーネントを表示
  return children;
};

export default PrivateRoute;
