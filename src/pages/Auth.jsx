import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Auth = () => {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'customer',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (isLogin) {
      // Login
      const result = await login({
        email: formData.email,
        password: formData.password,
      });

      if (result.success) {
        navigate('/');
      } else {
        setError(result.message);
      }
    } else {
      // Register - Format phone with +91
      const result = await register({
        ...formData,
        phone: `+91 ${formData.phone}`,
      });

      if (result.success) {
        navigate(`/dashboard/${formData.role}`);
      } else {
        setError(result.message);
      }
    }

    setLoading(false);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    try {
      // Simulate sending reset email (replace with real API call later)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSuccessMessage(`Password reset link sent to ${formData.email}`);
      setFormData({ ...formData, email: '' });

      // Return to login after 3 seconds
      setTimeout(() => {
        setIsForgotPassword(false);
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF8F5] to-[#F5F1EB] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Logo / Heading */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-[#1B5E20] to-[#2E7D32] rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-2xl">E</span>
            </div>
            <span className="text-3xl font-bold text-[#1B5E20]">EstateHub</span>
          </div>
          {!isForgotPassword ? (
            <>
              <h2 className="text-2xl font-bold text-gray-900">
                {isLogin ? 'Welcome Back!' : 'Create Account'}
              </h2>
              <p className="text-gray-600 mt-2">
                {isLogin ? 'Login to continue to your account' : 'Sign up to get started'}
              </p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-gray-900">Reset Password</h2>
              <p className="text-gray-600 mt-2">
                Enter your email and we&apos;ll send you a reset link
              </p>
            </>
          )}
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* FORGOT PASSWORD VIEW */}
          {isForgotPassword ? (
            <>
              {/* Success Message */}
              {successMessage && (
                <div className="mb-4 p-3 bg-green-50 border-2 border-green-200 rounded-lg">
                  <p className="text-green-600 text-sm font-medium">{successMessage}</p>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border-2 border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm font-medium">{error}</p>
                </div>
              )}

              <form onSubmit={handleForgotPassword} className="space-y-4">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent"
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[#1B5E20] text-white rounded-lg hover:bg-[#2E7D32] transition-colors font-semibold shadow-md hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>

                {/* Back to Login */}
                <button
                  type="button"
                  onClick={() => {
                    setIsForgotPassword(false);
                    setError('');
                    setSuccessMessage('');
                  }}
                  className="w-full py-2 text-[#1B5E20] hover:text-[#2E7D32] font-medium"
                >
                  ← Back to Login
                </button>
              </form>
            </>
          ) : (
            <>
              {/* LOGIN/SIGNUP VIEW */}

              {/* Tab Toggle */}
              <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(true);
                    setError('');
                  }}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                    isLogin
                      ? 'bg-white text-[#1B5E20] shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(false);
                    setError('');
                  }}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                    !isLogin
                      ? 'bg-white text-[#1B5E20] shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Sign Up
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border-2 border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm font-medium">{error}</p>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name (Register only) */}
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent"
                      required={!isLogin}
                    />
                  </div>
                )}

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent"
                    required
                  />
                </div>

                {/* Phone (Register only) */}
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center">
                        <span className="text-gray-700 font-medium">🇮🇳</span>
                        <span className="ml-2 text-gray-500 font-medium">+91</span>
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9]/g, '');
                          if (value.length <= 10) {
                            setFormData({
                              ...formData,
                              phone: value,
                            });
                          }
                        }}
                        onKeyPress={(e) => {
                          if (!/[0-9]/.test(e.key)) {
                            e.preventDefault();
                          }
                        }}
                        placeholder="98765 43210"
                        maxLength="10"
                        pattern="[0-9]{10}"
                        className="w-full pl-24 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent"
                        required={!isLogin}
                      />
                      {formData.phone.length > 0 && formData.phone.length < 10 && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                      {formData.phone.length === 10 && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-green-600">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-gray-500">Enter 10-digit mobile number</p>
                      {formData.phone.length > 0 && (
                        <p className="text-xs text-gray-500">
                          {formData.phone.length}/10 digits
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent"
                    required
                  />
                </div>

                {/* Role Selection (Register only) */}
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">I am a</label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent"
                    >
                      <option value="customer">Customer</option>
                      <option value="owner">Property Owner</option>
                      <option value="broker">Broker</option>
                    </select>
                  </div>
                )}

                {/* Forgot Password (Login only) */}
                {isLogin && (
                  <div className="text-right">
                    <button
                      type="button"
                      onClick={() => {
                        setIsForgotPassword(true);
                        setError('');
                        setSuccessMessage('');
                      }}
                      className="text-sm text-[#1B5E20] hover:text-[#2E7D32] font-medium hover:underline"
                    >
                      Forgot Password?
                    </button>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[#1B5E20] text-white rounded-lg hover:bg-[#2E7D32] transition-colors font-semibold shadow-md hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Please wait...
                    </span>
                  ) : isLogin ? (
                    'Login'
                  ) : (
                    'Create Account'
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="flex items-center justify-center px-4 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">Google</span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center px-4 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">Facebook</span>
                </button>
              </div>
            </>
          )}
        </div>

        {/* Demo Note */}
        <div className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-lg p-4 text-center">
          <p className="text-sm text-blue-800 font-medium">
            💡 <strong>Demo Mode:</strong> Use any email/password to test
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;































