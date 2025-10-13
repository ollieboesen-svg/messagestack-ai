import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import CryptoJS from 'crypto-js';

// Environment variables - in production these should be in environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'your-super-secret-encryption-key-change-in-production';
const SALT_ROUNDS = 12;

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  role: 'consultant' | 'user';
  passwordHash: string;
  createdAt: Date;
  lastLoginAt?: Date;
}

export interface UserSession {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  role: 'consultant' | 'user';
  isAuthenticated: boolean;
  sessionId: string;
  expiresAt: Date;
  isConsultant?: boolean;
  canImpersonate?: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  password: string;
}

// Password hashing utilities
export const hashPassword = async (password: string): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    throw new Error('Failed to hash password');
  }
};

export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    return false;
  }
};

// JWT token utilities
export const generateToken = (user: Omit<User, 'passwordHash'>, rememberMe: boolean = false): string => {
  const expiresIn = rememberMe ? '30d' : '24h';
  const sessionId = generateSessionId();

  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role,
    sessionId,
    type: 'access'
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

export const verifyToken = (token: string): any => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
};

// Session management
export const generateSessionId = (): string => {
  return CryptoJS.lib.WordArray.random(16).toString();
};

export const createUserSession = (user: Omit<User, 'passwordHash'>, rememberMe: boolean = false): UserSession => {
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + (rememberMe ? 24 * 30 : 24)); // 30 days or 24 hours

  const isConsultant = user.role === 'consultant';

  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    company: user.company,
    role: user.role,
    isAuthenticated: true,
    sessionId: generateSessionId(),
    expiresAt,
    isConsultant,
    canImpersonate: isConsultant
  };
};

// Data encryption utilities
export const encryptData = (data: string): string => {
  try {
    return CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString();
  } catch (error) {
    throw new Error('Failed to encrypt data');
  }
};

export const decryptData = (encryptedData: string): string => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    throw new Error('Failed to decrypt data');
  }
};

// Input validation and sanitization
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .slice(0, 1000); // Limit length
};

// Mock user database (in production, this would be a real database)
const mockUsers: User[] = [
  {
    id: 'consultant-1',
    firstName: 'Consultant',
    lastName: 'Admin',
    email: 'admin@messagestack.ai',
    company: 'MessageStack Consulting',
    role: 'consultant',
    passwordHash: '$2b$12$R1eexyP1kRPaXYu2N6mGieE0ei7e54b7e8.2nHHfCEH/7G1e/0rpy', // 'password123!'
    createdAt: new Date('2024-01-01'),
    lastLoginAt: new Date()
  },
  {
    id: 'user-1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'user@demo.com',
    company: 'Demo Company',
    role: 'user',
    passwordHash: '$2b$12$R1eexyP1kRPaXYu2N6mGieE0ei7e54b7e8.2nHHfCEH/7G1e/0rpy', // 'password123!'
    createdAt: new Date('2024-01-01'),
    lastLoginAt: new Date()
  },
  {
    id: 'user-2',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah@techcorp.com',
    company: 'TechCorp Solutions',
    role: 'user',
    passwordHash: '$2b$12$R1eexyP1kRPaXYu2N6mGieE0ei7e54b7e8.2nHHfCEH/7G1e/0rpy', // 'password123!'
    createdAt: new Date('2024-01-15'),
    lastLoginAt: new Date()
  },
  {
    id: 'user-3',
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'mike@growthstartup.io',
    company: 'Growth Startup',
    role: 'user',
    passwordHash: '$2b$12$R1eexyP1kRPaXYu2N6mGieE0ei7e54b7e8.2nHHfCEH/7G1e/0rpy', // 'password123!'
    createdAt: new Date('2024-01-20'),
    lastLoginAt: new Date()
  }
];

// Simple demo authentication
export const authenticateUser = async (credentials: LoginCredentials): Promise<{ success: boolean; user?: UserSession; token?: string; error?: string }> => {
  console.log('Demo auth attempt:', credentials.email);

  // Hardcoded demo login
  if (credentials.email === 'admin@messagestack.ai' && credentials.password === 'password123!') {
    return {
      success: true,
      user: {
        id: 'consultant-1',
        firstName: 'Consultant',
        lastName: 'Admin',
        email: 'admin@messagestack.ai',
        company: 'MessageStack Consulting',
        role: 'consultant',
        isAuthenticated: true,
        sessionId: 'demo-session-' + Date.now(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        isConsultant: true,
        canImpersonate: true
      },
      token: 'demo-token-consultant'
    };
  }

  if (credentials.email === 'user@demo.com' && credentials.password === 'password123!') {
    return {
      success: true,
      user: {
        id: 'user-1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'user@demo.com',
        company: 'Demo Company',
        role: 'user',
        isAuthenticated: true,
        sessionId: 'demo-session-' + Date.now(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        isConsultant: false,
        canImpersonate: false
      },
      token: 'demo-token-user1'
    };
  }

  console.log('Demo auth failed for:', credentials.email);
  return { success: false, error: 'Invalid email or password' };
};

export const registerUser = async (userData: SignupData): Promise<{ success: boolean; user?: UserSession; token?: string; error?: string }> => {
  try {
    // Validate input
    if (!validateEmail(userData.email)) {
      return { success: false, error: 'Invalid email format' };
    }

    // Simple password validation for demo environment
    if (userData.password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters long' };
    }

    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
    if (existingUser) {
      return { success: false, error: 'User with this email already exists' };
    }

    // Hash password
    const passwordHash = await hashPassword(userData.password);

    // Create new user
    const newUser: User = {
      id: `user-${Date.now()}`,
      firstName: sanitizeInput(userData.firstName),
      lastName: sanitizeInput(userData.lastName),
      email: userData.email.toLowerCase(),
      company: sanitizeInput(userData.company),
      role: 'user',
      passwordHash,
      createdAt: new Date(),
      lastLoginAt: new Date()
    };

    // Add to mock database
    mockUsers.push(newUser);

    // Create session
    const userSession = createUserSession(newUser);
    const token = generateToken(newUser);

    return {
      success: true,
      user: userSession,
      token
    };

  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, error: 'Registration failed' };
  }
};

// Simple session validation for demo
export const validateSession = (token: string): { isValid: boolean; user?: UserSession; error?: string } => {
  console.log('Validating token:', token);

  if (token === 'demo-token-consultant') {
    return {
      isValid: true,
      user: {
        id: 'consultant-1',
        firstName: 'Consultant',
        lastName: 'Admin',
        email: 'admin@messagestack.ai',
        company: 'MessageStack Consulting',
        role: 'consultant',
        isAuthenticated: true,
        sessionId: 'demo-session',
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        isConsultant: true,
        canImpersonate: true
      }
    };
  }

  if (token === 'demo-token-user1') {
    return {
      isValid: true,
      user: {
        id: 'user-1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'user@demo.com',
        company: 'Demo Company',
        role: 'user',
        isAuthenticated: true,
        sessionId: 'demo-session',
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        isConsultant: false,
        canImpersonate: false
      }
    };
  }

  return { isValid: false, error: 'Invalid token' };
};

// Secure storage utilities (client-side)
export const storeSecureToken = (token: string, rememberMe: boolean = false): void => {
  if (typeof window !== 'undefined') {
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem('auth_token', token);
  }
};

export const getSecureToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
  }
  return null;
};

export const removeSecureToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token');
    sessionStorage.removeItem('auth_token');
    localStorage.removeItem('userData'); // Remove old insecure data
  }
};
