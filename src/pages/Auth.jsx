import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Auth = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  // login | signup | otpSignup | forgot | otpForgot | resetPassword
  const [mode, setMode] = useState("login");

  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState("");

  const [signupRole, setSignupRole] = useState("buyer");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    let { name, value } = e.target;

    // phone must be digits only, max 10
    if (name === "phone") {
      value = value.replace(/\D/g, "");
      if (value.length > 10) return;
    }

    // accept only @gmail.com
    if (name === "email") {
      if (value.includes("@") && !value.endsWith("@gmail.com")) return;
    }

    setForm({ ...form, [name]: value });
  };

  // Auto-hide password after 1 sec
  const togglePassword = () => {
    setShowPassword(true);
    setTimeout(() => setShowPassword(false), 1000);
  };

  // ---------------- LOGIN ----------------
  const handleLogin = (e) => {
    e.preventDefault();

    // Backend login will go here

    const userData = {
      id: "TEMP_USER",
      name: "Demo User",
      email: form.email,
      role: "buyer",
      avatar: "https://i.pravatar.cc/150?img=1",
    };

    login(userData);
    navigate("/");
  };

  // ---------------- SIGNUP STEP 1 ----------------
  const handleSignupStart = (e) => {
    e.preventDefault();

    // backend: send OTP to phone/email
    setMode("otpSignup");
  };

  // ---------------- VERIFY SIGNUP OTP ----------------
  const handleVerifySignupOtp = (e) => {
    e.preventDefault();

    // backend verify OTP here

    const userData = {
      id: "SIGNUP_USER",
      name: form.name,
      email: form.email,
      phone: form.phone,
      role: signupRole,
      avatar: "https://i.pravatar.cc/150?img=2",
    };

    login(userData);
    navigate("/");
  };

  // ---------------- FORGOT PASSWORD ----------------
  const handleForgotPassword = (e) => {
    e.preventDefault();

    // backend send otp
    setMode("otpForgot");
  };

  // ---------------- VERIFY FORGOT OTP ----------------
  const handleVerifyForgotOtp = (e) => {
    e.preventDefault();

    // backend verify otp
    setMode("resetPassword");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F1EB] px-4">

      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">

        {/* IMAGE SIDE */}
        <div
          className="hidden md:block w-1/2 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1721815693498-cc28507c0ba2?q=80&w=2080&auto=format&fit=crop')",
          }}
        ></div>

        {/* FORM SIDE */}
        <div className="w-full md:w-1/2 p-10 relative">

          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-black"
            onClick={() => navigate(-1)}
          >
            ✕
          </button>

          {/* TITLE */}
          <h2 className="text-3xl font-bold text-[#1B5E20] mb-2">
            {mode === "login" && "Welcome Back"}
            {mode === "signup" && "Create Account"}
            {mode === "otpSignup" && "Verify OTP"}
            {mode === "forgot" && "Reset Password"}
            {mode === "otpForgot" && "Verify OTP"}
            {mode === "resetPassword" && "New Password"}
          </h2>

          <p className="text-gray-600 mb-6">
            {mode === "login" && "Login to continue"}
            {mode === "signup" && "Sign up to get started"}
            {mode === "otpSignup" && `Enter the OTP sent to ${form.phone}`}
            {mode === "forgot" && "Enter your Gmail to get OTP"}
            {mode === "otpForgot" && "Enter the OTP sent to your Gmail"}
          </p>

          {/* ---------------- LOGIN ---------------- */}
          {mode === "login" && (
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                name="email"
                className="w-full border p-3 rounded-lg"
                placeholder="Email (@gmail.com only)"
                required
                onChange={handleChange}
              />

              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="w-full border p-3 rounded-lg"
                  placeholder="Password"
                  required
                  onChange={handleChange}
                />
                <span
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={togglePassword}
                >
                  👁
                </span>
              </div>

              <button className="w-full bg-[#1B5E20] text-white py-3 rounded-lg text-lg">
                Login
              </button>

              <p
                className="text-sm cursor-pointer mt-3 text-[#1B5E20]"
                onClick={() => setMode("forgot")}
              >
                Forgot Password?
              </p>

              <p className="text-sm text-center mt-3">
                New user?
                <span
                  className="text-[#1B5E20] cursor-pointer ml-1"
                  onClick={() => setMode("signup")}
                >
                  Sign Up
                </span>
              </p>
            </form>
          )}

          {/* ---------------- SIGNUP STEP 1 ---------------- */}
          {mode === "signup" && (
            <form onSubmit={handleSignupStart} className="space-y-4">
              <input
                name="name"
                className="w-full border p-3 rounded-lg"
                placeholder="Full Name"
                required
                onChange={handleChange}
              />

              <input
                name="email"
                className="w-full border p-3 rounded-lg"
                placeholder="Email (@gmail.com)"
                required
                onChange={handleChange}
              />

              <input
                name="phone"
                className="w-full border p-3 rounded-lg"
                placeholder="Phone (10 digits)"
                required
                onChange={handleChange}
              />

              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="w-full border p-3 rounded-lg"
                  placeholder="Password"
                  required
                  onChange={handleChange}
                />
                <span
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={togglePassword}
                >
                  👁
                </span>
              </div>

              {/* ROLE */}
              <div>
                <p className="text-gray-700 font-medium mb-2">Signup as:</p>
                <select
                  className="w-full border p-3 rounded-lg"
                  value={signupRole}
                  onChange={(e) => setSignupRole(e.target.value)}
                >
                  <option value="buyer">Buyer</option>
                  <option value="owner">Property Owner</option>
                  <option value="broker">Broker / Agent</option>
                </select>
              </div>

              <button className="w-full bg-[#1B5E20] text-white py-3 rounded-lg text-lg">
                Send OTP
              </button>

              <p className="text-sm text-center mt-3">
                Already have an account?
                <span
                  className="text-[#1B5E20] cursor-pointer ml-1"
                  onClick={() => setMode("login")}
                >
                  Login
                </span>
              </p>
            </form>
          )}

          {/* ---------------- SIGNUP OTP ---------------- */}
          {mode === "otpSignup" && (
            <form onSubmit={handleVerifySignupOtp} className="space-y-4">
              <input
                className="w-full border p-3 rounded-lg text-center text-xl tracking-widest"
                type="text"
                maxLength="6"
                placeholder="••••••"
                value={otp}
                onChange={(e) => {
                  if (/^\d*$/.test(e.target.value)) setOtp(e.target.value);
                }}
              />

              <button className="w-full bg-[#1B5E20] text-white py-3 rounded-lg text-lg">
                Verify & Create Account
              </button>
            </form>
          )}

          {/* ---------------- FORGOT PASSWORD ---------------- */}
          {mode === "forgot" && (
            <form onSubmit={handleForgotPassword} className="space-y-4">

              <input
                name="email"
                className="w-full border p-3 rounded-lg"
                placeholder="Gmail only"
                required
                onChange={handleChange}
              />

              <button className="w-full bg-[#1B5E20] text-white py-3 rounded-lg text-lg">
                Send OTP
              </button>
            </form>
          )}

          {/* ---------------- FORGOT OTP ---------------- */}
          {mode === "otpForgot" && (
            <form onSubmit={handleVerifyForgotOtp} className="space-y-4">

              <input
                className="w-full border p-3 rounded-lg text-center text-xl tracking-widest"
                type="text"
                maxLength="6"
                placeholder="••••••"
                value={otp}
                onChange={(e) => {
                  if (/^\d*$/.test(e.target.value)) setOtp(e.target.value);
                }}
              />

              <button className="w-full bg-[#1B5E20] text-white py-3 rounded-lg text-lg">
                Verify OTP
              </button>
            </form>
          )}

          {/* ---------------- RESET PASSWORD ---------------- */}
          {mode === "resetPassword" && (
            <form
              onSubmit={() => {
                // backend will save new password here
                setMode("login");
              }}
              className="space-y-4"
            >
              <div className="relative">
                <input
                  className="w-full border p-3 rounded-lg"
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  required
                />
                <span
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={togglePassword}
                >
                  👁
                </span>
              </div>

              <button className="w-full bg-[#1B5E20] text-white py-3 rounded-lg text-lg">
                Save Password
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
