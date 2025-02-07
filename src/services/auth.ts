import axios from 'axios';

const API_URL = 'https://sparrow-rapid-kingfish.ngrok-free.app';

axios.defaults.withCredentials = true;

export interface User {
  email: string;
  name: string;
}

export interface AuthResponse {
  message: string;
  user: User;
}

// Add token management
const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  delete axios.defaults.headers.common['Authorization'];
};

const setUser = (user: User) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

const removeUser = () => {
  localStorage.removeItem(USER_KEY);
};

export const register = async (
  email: string,
  password: string,
  name?: string
) => {
  const response = await axios.post<AuthResponse & { token: string }>(`${API_URL}/register_AI`, {
    email,
    password,
    name,
  });
  
  if (response.data.token) {
    setToken(response.data.token);
    setUser(response.data.user);
  }
  
  return response.data;
};

export const login = async (email: string, password: string) => {
  const response = await axios.post<AuthResponse & { token: string }>(`${API_URL}/login_AI`, {
    email,
    password,
  });
  
  if (response.data.token) {
    setToken(response.data.token);
    setUser(response.data.user);
  }
  
  return response.data;
};

export const logout = async () => {
  try {
    await axios.post<{ message: string }>(`${API_URL}/logout_AI`);
  } finally {
    removeToken();
    removeUser();
  }
};

export const checkAuth = async () => {
  try {
    // First try to get user from localStorage
    const storedUser = localStorage.getItem(USER_KEY);
    const token = localStorage.getItem(TOKEN_KEY);
    
    if (token && storedUser) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      return { authenticated: true, user: JSON.parse(storedUser) };
    }

    // If no stored credentials, check with server
    const response = await axios.get<{ authenticated: boolean; user: User }>(
      `${API_URL}/check-auth_AI`
    );

    if (response.data.authenticated && response.data.user) {
      setUser(response.data.user);
      return response.data;
    }

    return { authenticated: false, user: null };
  } catch {
    removeToken();
    removeUser();
    return { authenticated: false, user: null };
  }
};