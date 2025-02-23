import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getFirebaseAuthErrorMessage } from "../functions";
import { FirebaseError } from "firebase/app";

/**
 * Login menggunakan username atau email
 */
export const loginWithUsernameOrEmail = async (usernameOrEmail: string, password: string) => {
    try {
        let email = usernameOrEmail;

        // Jika input bukan email, cari email berdasarkan username di Firestore
        if (!usernameOrEmail.includes("@")) {
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("username", "==", usernameOrEmail));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                throw new Error("useraname/email or password incorect");
            }

            const userData = querySnapshot.docs[0].data();
            email = userData.email;
        }

        // Login dengan email yang ditemukan
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error: unknown) {
        // ✅ Konversi error agar tidak bertipe unknown
        if (error instanceof FirebaseError) {
            // return getFirebaseAuthErrorMessage(error.code);
            throw new Error(getFirebaseAuthErrorMessage(error.code));
        } else {
            throw new Error("Terjadi kesalahan yang tidak diketahui.");
        }
    }
};