import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { AboutUser } from "./saveAboutUser";

export const getAboutUser = async (userId: string): Promise<{ status: string; data?: AboutUser; message?: string }> => {
    try {
        const aboutUserRef = doc(db, "aboutUser", userId);
        const docSnap = await getDoc(aboutUserRef);

        if (docSnap.exists()) {
            return { status: "success", data: docSnap.data() as AboutUser };
        } else {
            return { status: "error", message: "Data tidak ditemukan" };
        }
    } catch (error) {
        console.log('error : ', error)
        return { status: "error", message: "Gagal mengambil data" };
    }
};