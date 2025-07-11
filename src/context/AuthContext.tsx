import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  _id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: 'customer' | 'vendor' | 'admin';
  isActive: boolean;
  avatar?: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
}

interface RegisterData {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  phone?: string;
  role: 'customer' | 'vendor';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user && !!token;

  // Load user from localStorage on app start
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Demo credentials check first
      const demoUsers = {
        "customer@demo.com": {
          _id: "demo_customer_1",
          email: "customer@demo.com",
          username: "customer1",
          firstName: "Customer",
          lastName: "Demo",
          role: "customer" as const,
          isActive: true,
          avatar: "",
          createdAt: new Date().toISOString(),
        },
        "vendor@demo.com": {
          _id: "demo_vendor_1", 
          email: "vendor@demo.com",
          username: "vendor1",
          firstName: "Vendor",
          lastName: "Demo",
          role: "vendor" as const,
          isActive: true,
          avatar: "",
          createdAt: new Date().toISOString(),
        },
        "admin@demo.com": {
          _id: "demo_admin_1",
          email: "admin@demo.com", 
          username: "admin",
          firstName: "Admin",
          lastName: "System",
          role: "admin" as const,
          isActive: true,
          avatar: "",
          createdAt: new Date().toISOString(),
        },
      };

      // Check demo credentials
      if (email in demoUsers && password === "password123") {
        const userData = demoUsers[email as keyof typeof demoUsers];
        const demoToken = `demo_token_${userData._id}`;
        
        setUser(userData);
        setToken(demoToken);
        
        // Store in localStorage
        localStorage.setItem('token', demoToken);
        localStorage.setItem('user', JSON.stringify(userData));
        return;
      }

      // Try API login if demo fails
      const response = await fetch('http://localhost:5002/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Email atau password salah');
      }

      const { user: userData, token: userToken } = data.data;
      
      setUser(userData);
      setToken(userToken);
      
      // Store in localStorage
      localStorage.setItem('token', userToken);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error: any) {
      // If API fails and not demo credentials, show error
      if (!email.includes("@demo.com") || password !== "password123") {
        throw new Error("Email atau password salah. Coba gunakan akun demo: customer@demo.com / vendor@demo.com / admin@demo.com dengan password: password123");
      } else {
        throw error;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5002/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      const { user: newUser, token: userToken } = data.data;
      
      setUser(newUser);
      setToken(userToken);
      
      // Store in localStorage
      localStorage.setItem('token', userToken);
      localStorage.setItem('user', JSON.stringify(newUser));
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
