
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { collection, setDoc, doc, query, where, getDocs } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { getFirebaseAuthErrorMessage } from "../functions";
// Simpan data dengan addDoc (auto-generate ID)
export interface User {
    name: string;
    email: string;
    createdAt: Date;
}

export const registerUser = async (form: { email: string; username: string; password: string }) => {
    try {
        // 1️⃣ Check if the username already exists in Firestore
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("username", "==", form.username));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            // ❌ Username already taken, return custom error
            throw new FirebaseError("auth/invalid-credential", "Username already exists.");
        }

        // 2️⃣ Create user with email & password in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
        const user = userCredential.user;

        // 3️⃣ Store additional user data in Firestore
        await setDoc(doc(db, "users", user.uid), {
            email: form.email,
            username: form.username,
            createdAt: new Date().toISOString(),
        });

        return user;
    } catch (error: unknown) {
        // ✅ Konversi error agar tidak bertipe unknown
        if (error instanceof FirebaseError) {
            throw new Error(getFirebaseAuthErrorMessage(error.code));
        } else {
            throw new Error("Terjadi kesalahan yang tidak diketahui.");
        }
    }
};