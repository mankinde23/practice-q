import React, {createContext, useState, useEffect} from 'react';

import {auth} from '@/config/firebase';
import {useNavigate} from 'react-router-dom';
import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  User,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  googleLogin: () => Promise<void>;
}
export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const [loadingUserState, setLoadingUserState] = useState(true);
  const [state, setState] = useState({
    loaded: false,
    user: null,
  });
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user: any) => {
        try {
          if (user) {
            setUser(user);
          } else {
            setUser(null);
          }
          setLoadingUserState(false);
        } catch (error) {
          console.error('Error handling auth state change:', error);
        }
      },
      error => {
        console.error('Error subscribing to auth state changes:', error);
      }
    );

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home');
    } catch (error: any) {
      if (error.code === 'auth/wrong-password') {
        throw new Error('Incorrect password.');
      } else if (error.code === 'auth/user-not-found') {
        throw new Error('No user found with this email.');
      } else {
        throw new Error('Incorrect credentials .');
      }
    }
  };
  const signUp = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/home');
    } catch (error) {
      console.error(error);
    }
  };
  const logout = async () => {
    try {
      await signOut(auth);
      setLoadingUserState(false);
    } catch (error) {}
  };
  const googleLogin = async () => {
    try {
      const googleProvider = new GoogleAuthProvider();
      await signInWithPopup(auth, googleProvider);
      navigate('/home');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <AuthContext.Provider
      value={{...state, user, login, signUp, logout, googleLogin}}
    >
      {children}
    </AuthContext.Provider>
  );
};
