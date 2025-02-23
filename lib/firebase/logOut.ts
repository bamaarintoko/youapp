import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

/**
 * Fungsi Logout
 */
export const logoutUser = async () => {
    try {
      await signOut(auth);
    //   localStorage.removeItem("firebaseToken"); // Hapus token jika disimpan
    } catch (error) {
      throw new Error("Logout gagal: " + (error as Error).message);
    }
  };