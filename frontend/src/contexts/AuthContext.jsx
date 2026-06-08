import { useState, useCallback } from 'react';
import { AuthContext } from './authContext';

const TOKEN_KEY = 'access_token';
const REFRESH_KEY = 'refresh_token';
const USERNAME_KEY = 'auth_username';

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!sessionStorage.getItem(TOKEN_KEY)
  );
  const [username, setUsername] = useState(
    () => sessionStorage.getItem(USERNAME_KEY) || ''
  );

  const login = useCallback(async (user, password) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: user, password }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.detail || 'Credenciales inválidas');
    }

    const data = await response.json();
    sessionStorage.setItem(TOKEN_KEY, data.access_token);
    sessionStorage.setItem(REFRESH_KEY, data.refresh_token);
    sessionStorage.setItem(USERNAME_KEY, user);
    setUsername(user);
    setIsAuthenticated(true);
    return data;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_KEY);
    sessionStorage.removeItem(USERNAME_KEY);
    setUsername('');
    setIsAuthenticated(false);
  }, []);

  const getToken = useCallback(() => sessionStorage.getItem(TOKEN_KEY), []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, login, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
}
