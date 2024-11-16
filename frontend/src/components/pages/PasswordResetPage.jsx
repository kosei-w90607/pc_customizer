import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PasswordResetPage = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/users/password', {
        user: {
          reset_password_token: token,
          password,
          password_confirmation: passwordConfirmation,
        }
      });
      setMessage('パスワードがリセットされました。');
    } catch (error) {
      setMessage('パスワードリセットに失敗しました。再度お試しください。');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex justify-center items-center bg-gray-100 py-8">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center text-blue-600">パスワードリセット</h1>
          <form onSubmit={handleReset} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-gray-700">新しいパスワード</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="passwordConfirmation" className="block text-gray-700">パスワード確認</label>
              <input
                id="passwordConfirmation"
                type="password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              パスワードをリセット
            </button>
          </form>
          {message && <p className="text-center text-gray-600">{message}</p>}
        </div>
      </main>
    </div>
  );
};

export default PasswordResetPage;
