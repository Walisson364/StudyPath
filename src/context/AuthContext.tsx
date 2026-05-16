import { Session, User } from '@supabase/supabase-js';
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { hasSupabaseConfig, supabase } from '../lib/supabase';

/* eslint-disable react-refresh/only-export-components */

type AuthContextValue = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<string | null>;
  signUp: (name: string, email: string, password: string) => Promise<string | null>;
  signInWithGoogle: () => Promise<string | null>;
  resetPassword: (email: string) => Promise<string | null>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(hasSupabaseConfig);

  useEffect(() => {
    if (!hasSupabaseConfig) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => data.subscription.unsubscribe();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user: session?.user ?? null,
      session,
      loading,
      async signIn(email, password) {
        if (!hasSupabaseConfig) return 'Configure o Supabase no arquivo .env para autenticar.';
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        return error?.message ?? null;
      },
      async signUp(name, email, password) {
        if (!hasSupabaseConfig) return 'Configure o Supabase no arquivo .env para cadastrar.';
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name },
            emailRedirectTo: `${window.location.origin}/app`,
          },
        });
        return error?.message ?? null;
      },
      async signInWithGoogle() {
        if (!hasSupabaseConfig) return 'Configure o Supabase no arquivo .env para usar Google OAuth.';
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: { redirectTo: `${window.location.origin}/app` },
        });
        return error?.message ?? null;
      },
      async resetPassword(email) {
        if (!hasSupabaseConfig) return 'Configure o Supabase no arquivo .env para recuperar senha.';
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/login`,
        });
        return error?.message ?? null;
      },
      async signOut() {
        if (hasSupabaseConfig) await supabase.auth.signOut();
        setSession(null);
      },
    }),
    [loading, session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}
