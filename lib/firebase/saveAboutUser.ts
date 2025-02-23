import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export interface AboutUser {
    name: string;
    birthday: string;
    gender: string;
    height: string;
    weight: string;
    horoscope: string;
    zodiac: string;
}

export const saveAboutUser = async (userId: string, data: AboutUser) => {
    try {
        const aboutUserRef = doc(db, "aboutUser", userId);
        const docSnap = await getDoc(aboutUserRef);

        if (docSnap.exists()) {
            // Jika dokumen ada, update data (merge: true agar tidak overwrite seluruh dokumen)
            await setDoc(aboutUserRef, data, { merge: true });
            // console.log("aboutUser updated successfully!");
        } else {
            // Jika dokumen tidak ada, buat baru
            await setDoc(aboutUserRef, data);
            // console.log("aboutUser added successfully!");
        }
    } catch (error) {
        console.error("Error saving aboutUser:", error);
    }
};