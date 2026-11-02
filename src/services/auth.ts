import { supabase } from './supabase';

export class AuthNotConfiguredError extends Error {
  constructor() {
    super('AUTH_NOT_CONFIGURED');
    this.name = 'AuthNotConfiguredError';
  }
}

/** Email + password sign-in. Session persistence is handled by the Supabase client. */
export async function signInWithEmail(email: string, password: string) {
  if (!supabase) throw new AuthNotConfiguredError();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
}

/** Google OAuth sign-in. Redirects the browser to Google and back to this app. */
export async function signInWithGoogle() {
  if (!supabase) throw new AuthNotConfiguredError();
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: `${window.location.origin}/` },
  });
  if (error) throw error;
}
