import { useEffect, useState } from "react";
import { getFirestore, doc, onSnapshot, Timestamp } from "firebase/firestore";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

const db = getFirestore();
const auth = getAuth();

interface InterestUser {
    tags: string[];
    createdAt: Timestamp;
    updatedAt: Timestamp;
  }

export const useInterestUserListener = () => {
    const [user, setUser] = useState<User | null>(null);
    const [data, setData] = useState<InterestUser|null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribeAuth();
    }, []);

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }

        const interestRef = doc(db, "interestUser", user.uid);
        const unsubscribeFirestore = onSnapshot(
            interestRef,
            (docSnap) => {
                if (docSnap.exists()) {
                    const interestData = docSnap.data() as InterestUser;
                    setData(interestData);
                } else {
                    setData(null);
                }
                setLoading(false);
            },
            (error) => {
                setError(error.message);
                setLoading(false);
            }
        );

        return () => unsubscribeFirestore();
    }, [user]);

    return { user, data, loading, error };
};
