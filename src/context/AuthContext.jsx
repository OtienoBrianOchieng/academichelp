import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const navigate = useNavigate();

  // Initialize auth state from sessionStorage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedUser = sessionStorage.getItem('user');
        const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';
        
        if (isAuthenticated && storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        clearAuth();
      } finally {
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, []);

  const setAuth = (userData, token) => {
    sessionStorage.setItem('isAuthenticated', 'true');
    sessionStorage.setItem('user', JSON.stringify(userData));
    sessionStorage.setItem('access_token', token);
    setUser(userData);
  };

  const clearAuth = () => {
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('access_token');
    setUser(null);
    navigate('/login');
    window.location.reload(); // Complete reset
  };

  const isAuthenticated = () => {
    return !!user && sessionStorage.getItem('isAuthenticated') === 'true';
  };

  return (
    <AuthContext.Provider value={{ 
      user,
      isAuthenticated,
      setAuth,
      clearAuth,
      isInitialized
    }}>
      {isInitialized ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}