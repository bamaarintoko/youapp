import { useEffect, useState } from "react";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { AboutUser } from "../firebase/saveAboutUser";

// 👇 Custom hook untuk listen perubahan `aboutUser`
export function useAboutUserListener() {
    const auth = getAuth();
    const db = getFirestore();
    const [user, setUser] = useState<User | null>(null);
    const [aboutUser, setAboutUser] = useState<AboutUser | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // 🔥 Listen perubahan user login
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // 🔥 Listen perubahan `aboutUser` di Firestore
    useEffect(() => {
        if (!user) {
            setIsLoading(false);
            return;
        }

        const aboutUserRef = doc(db, "aboutUser", user.uid);
        const unsubscribe = onSnapshot(
            aboutUserRef,
            (docSnap) => {
                if (docSnap.exists()) {
                    const aboustUserData = docSnap.data() as AboutUser
                    setAboutUser(aboustUserData);
                    setMessage(null);
                } else {
                    setAboutUser(null)
                    setMessage("Data tidak ditemukan");
                }
            },
            (error) => {
                setMessage(`Gagal mengambil data: ${error.message}`);
            }
        );

        return () => unsubscribe(); // Hapus listener saat komponen unmount
    }, [user]);

    return { user, aboutUser, message, isLoading };
}