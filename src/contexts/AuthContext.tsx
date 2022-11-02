import { createContext, ReactNode } from 'react';

interface UserProps {
  name: string;
  avatarUrl: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthContextDataProps {
  user: UserProps;
  signIn: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthProviderProps) {
  async function signIn() {}

  return (
    <AuthContext.Provider
      value={{
        signIn,
        user: {
          name: 'Felipe',
          avatarUrl: 'https://github.com/f3lip3.png'
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
