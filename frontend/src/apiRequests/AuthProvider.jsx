import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const refresh = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/refresh`, {
          method: "GET",
          credentials: "include"
        });
        const data = await response.json();
        if (response.ok && data.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Refresh failed:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    refresh();
  }, []);

  const login = async (email, password) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response.ok && data.user) {
      setUser(data.user);
      alert("Login successful");
    } else {
      alert("Login failed");
    }
    return data.user;
  };

  if (loading) return <div>Loading...</div>;

  const logOut = async () =>{
   
    try {
    const response = await fetch("http://localhost:5500/api/logout", {
      method: "POST",
      credentials: "include",
    });


    if (response.ok || response.status === 204) {
      setUser(null); // Clear user context
      localStorage.removeItem("accessToken"); // Optional: remove if you store access tokens
      alert("Logout successful");
    } else {
      alert("Logout failed");
    }
  } catch (error) {
    console.error("Logout error:", error);
    alert("An error occurred during logout");
  }
  
  }

  return (
    <AuthContext.Provider value={{ user, login, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
