import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import checkPassWordStrength from "../../utility/checkPassWordStrength";
import { AuthContext } from "../../context/AuthContext";

function RegisterPage() {
  const { handleSubmit, name, setName, email, setEmail, password, setPassword } =
    useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    handleSubmit(e);
  }

  return (
    <div
      className="min-h-screen bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1506193095-80bc749473f2?w=600&auto=format&fit=crop&q=60')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
        backgroundColor: "rgba(15, 23, 42, 0.85)",
      }}
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="bg-slate-100 p-3 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-slate-900"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
              />
            </svg>
          </div>
        </div>

        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-slate-200">
          Begin your timeless journey with us
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-100 bg-opacity-90 backdrop-blur-sm py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={onSubmit}>
            {/* Full Name */}
            <input
              type="text"
              placeholder="John Doe"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />

            {/* Email */}
            <input
              type="email"
              placeholder="john@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordStrength(checkPassWordStrength(e.target.value));
                }}
                className="w-full px-3 py-2 border rounded-md pr-10"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                {showPassword ? (
                  <EyeSlashIcon
                    className="h-5 w-5 text-gray-500 cursor-pointer"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <EyeIcon
                    className="h-5 w-5 text-gray-500 cursor-pointer"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
            </div>

            {/* Password Strength */}
            <p
              className={`text-sm mt-1 font-medium ${
                passwordStrength === "Weak"
                  ? "text-red-500"
                  : passwordStrength === "Medium"
                  ? "text-yellow-500"
                  : passwordStrength === "Strong"
                  ? "text-green-600"
                  : "text-gray-500"
              }`}
            >
              Password Strength: {passwordStrength || "N/A"}
            </p>

            {/* Submit Button */}
            <button className="w-full py-2 px-4 rounded-md text-white bg-slate-900 hover:bg-slate-800">
              Register
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              Already have an account? Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
