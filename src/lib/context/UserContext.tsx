"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { onAuthStateChanged, User } from "firebase/auth";

import { auth } from "../firebase/firebase_config";

interface IUserInfoContext {
  user: User | null;
  jwt: string | null;
  loading: boolean;
}
const UserInfoContext = createContext<IUserInfoContext | undefined>(undefined);

export function UserInfoProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [jwt, setJwt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          const token = await currentUser.getIdToken();
          setJwt(token);
        } catch (err) {
          console.error("Failed to get ID token:", err);
          setJwt(null);
        }
      } else {
        setJwt(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserInfoContext.Provider value={{ user, jwt, loading }}>
      {children}
    </UserInfoContext.Provider>
  );
}

function useUserInfo() {
  const context = useContext(UserInfoContext);
  if (!context) {
    throw new Error("useUserInfo must be used within a UserInfoProvider");
  }
  return context;
}

export default useUserInfo;
