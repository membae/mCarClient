import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

function Auth({ children }) {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    role: "buyer",
    location: "Nairobi",
  });

  const API_URL = "http://127.0.0.1:5000";

  // Load session
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // LOGIN
  const handleLogin = async () => {
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.msg || "Invalid credentials");
        return;
      }

      // Store user and access token
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("access_token", data.access_token);
      setUser(data.user);
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  // SIGNUP
  const handleSignup = async () => {
    try {
      const res = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.msg || "Signup failed");
        return;
      }

      // Auto-login after signup is optional; here we store user only
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    setUser(null);
  };

  const value = { user, logout };

  // LOGGED-IN VIEW
  if (user) {
    return (
      <AuthContext.Provider value={value}>
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center gap-4">
          <h2 className="text-2xl font-semibold">
            Welcome {user.first_name} 👋
          </h2>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-xl transition"
          >
            Logout
          </button>
          {children}
        </div>
      </AuthContext.Provider>
    );
  }

  // LOGIN/SIGNUP FORM
  return (
    <AuthContext.Provider value={value}>
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            {isLogin ? "Welcome Back 👋" : "Create Account 🚀"}
          </h2>

          <div className="space-y-4">
            {!isLogin && (
              <>
                <input
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
                />
              </>
            )}

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={isLogin ? handleLogin : handleSignup}
              className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg font-semibold transition"
            >
              {isLogin ? "Login" : "Signup"}
            </button>

            <p
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-center text-gray-400 cursor-pointer hover:text-white"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Login"}
            </p>
          </div>
        </div>
      </div>
    </AuthContext.Provider>
  );
}

export default Auth;