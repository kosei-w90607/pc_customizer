import React from 'react';
import { Link } from 'react-router-dom';

const SignForm = (props) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
    signType,
    name,
    setName,
    passwordConfirmation,
    setPasswordConfirmation,
  } = props;

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex justify-center items-center bg-gray-100 py-4">
        <div className="w-full max-w-md p-6 space-y-4 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center text-blue-600">
            {signType === 'signUp' ? 'ユーザー登録' : 'ログイン'}
          </h1>
          {signType === 'signUp' && (
            <p className="text-center text-gray-600">〜構成の保存、出力がご利用いただけます〜</p>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            {signType === 'signUp' && (
              <div>
                <label htmlFor="name" className="block text-gray-700">
                  名前 <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            )}
            <div>
              <label htmlFor="email" className="block text-gray-700">
                メールアドレス <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700">
                パスワード <span className="text-red-500">*</span>
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            {signType === 'signUp' && (
              <div>
                <label htmlFor="passwordConfirmation" className="block text-gray-700">
                  パスワード確認 <span className="text-red-500">*</span>
                </label>
                <input
                  id="passwordConfirmation"
                  type="password"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            )}
            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              {signType === 'signUp' ? '登録' : 'ログイン'}
            </button>
            {signType === 'signIn' && (
              <>
                <button type="button" className="w-full p-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                  Googleでログインする
                </button>
                <p className="text-center text-gray-600">
                  <Link to="/register" className="text-blue-500 hover:underline">新規登録ページへ</Link>
                </p>
                <p className="text-center text-gray-600">
                  <Link to="/password_reset" className="text-orange-500 hover:underline">パスワードをお忘れの方はこちら</Link>
                </p>
              </>
            )}
            {signType === 'signUp' && (
              <p className="text-center text-gray-600">
                既にアカウントをお持ちですか？ <Link to="/login" className="text-blue-500 hover:underline">ログインページへ</Link>
              </p>
            )}
          </form>
        </div>
      </main>
    </div>
  );
};
export default SignForm;
