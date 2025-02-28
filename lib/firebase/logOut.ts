import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { FirebaseError } from "firebase/app";
import { getFirebaseAuthErrorMessage } from "../functions";

/**
 * Fungsi Logout
 */
export const logoutUser = async () => {
  try {
    await signOut(auth);
    //   localStorage.removeItem("firebaseToken"); // Hapus token jika disimpan
  } catch (error) {
    let errorMessage = "Terjadi kesalahan yang tidak diketahui.";

    if (error instanceof FirebaseError) {
      errorMessage = getFirebaseAuthErrorMessage(error.code);
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    throw new Error("Logout gagal: " + (error as Error).message);
  }
};