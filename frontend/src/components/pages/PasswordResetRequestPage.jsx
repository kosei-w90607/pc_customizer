import React, { useState } from 'react';
import axios from 'axios';

const PasswordResetRequestPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleRequest = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/v1/auth/password', { email });
      if (response.data.success) {
        setMessage('パスワードリセットのリンクをメールで送信しました。');
      } else {
        setMessage(response.data.message || '予期しないエラーが発生しました。');
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message || 'メール送信に失敗しました。再度お試しください。');
      } else {
        setMessage('ネットワークエラーが発生しました。');
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex justify-center items-center bg-gray-100 py-8">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center text-blue-600">パスワードリセット</h1>
          <form onSubmit={handleRequest} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-gray-700">メールアドレス</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              リセットリンクを送信
            </button>
          </form>
          {message && <p className="text-center text-gray-600">{message}</p>}
        </div>
      </main>
    </div>
  );
};

export default PasswordResetRequestPage;
