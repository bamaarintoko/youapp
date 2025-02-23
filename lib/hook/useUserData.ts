import { useState, useEffect } from "react";
import { getFirestore, doc, onSnapshot, Timestamp } from "firebase/firestore";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

interface UserData {
    email: string;
    username: string;
    createdAt: Timestamp;
  }
export function useUserData() {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData|null>(null);
  const [loading, setLoading] = useState(true);
  const db = getFirestore();
  const auth = getAuth();

  useEffect(() => {
    // 🔥 Dengarkan perubahan auth state (Login/Logout)
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        setUserData(null);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!user) return;

    const userDocRef = doc(db, "users", user.uid);
    const unsubscribeFirestore = onSnapshot(
      userDocRef,
      (docSnap) => {
        setUserData(docSnap.exists() ? (docSnap.data() as UserData) : null);
        // setUserData(docSnap.exists() ? docSnap.data() : null);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    );

    return () => unsubscribeFirestore();
  }, [user]);

  return { user, userData, loading };
}
