// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      // Check local storage for mock session if demo mode
      const savedMock = localStorage.getItem('mbr_mock_admin');
      if (savedMock) {
        try {
          setUser(JSON.parse(savedMock));
        } catch {
          // ignore
        }
      }
      setLoading(false);
      return;
    }

    // 1. Get initial session from Supabase
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    }).catch(err => {
      console.error('Error fetching Supabase session:', err);
      setLoading(false);
    });

    // 2. Listen to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Login method
  const signIn = async (email, password) => {
    if (!isSupabaseConfigured || !supabase) {
      // Demo login fallback if Supabase credentials are not yet entered in .env
      if (email === 'admin@mitrabumi.com' && password === 'admin123') {
        const mockUser = {
          id: 'mock-admin-id',
          email: 'admin@mitrabumi.com',
          user_metadata: { role: 'admin', name: 'Admin PT Mitra Bumi Rejeki' },
        };
        localStorage.setItem('mbr_mock_admin', JSON.stringify(mockUser));
        setUser(mockUser);
        return { data: { user: mockUser }, error: null };
      }
      return {
        data: null,
        error: new Error('Kredensial Supabase belum diisi di file .env. Anda bisa coba login demo dengan email "admin@mitrabumi.com" dan password "admin123" untuk melihat tampilan dashboard lebih dahulu!'),
      };
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { data: null, error };
    }

    setUser(data.user);
    setSession(data.session);
    return { data, error: null };
  };

  // Logout method
  const signOut = async () => {
    localStorage.removeItem('mbr_mock_admin');
    setUser(null);
    setSession(null);

    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signIn,
        signOut,
        isSupabaseConfigured,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
