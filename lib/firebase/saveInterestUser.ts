import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";


export const saveInterestUser = async (userId: string, data: string[]) => {
    try {
        const interestUserRef = doc(db, "interestUser", userId);
        const docSnap = await getDoc(interestUserRef);

        if (docSnap.exists()) {
            // Jika dokumen ada, update data (merge: true agar tidak overwrite seluruh dokumen)
            await setDoc(interestUserRef, { tags: data, updatedAt: serverTimestamp() }, { merge: true });
            console.log("aboutUser updated successfully!");
        } else {
            // Jika dokumen tidak ada, buat baru
            await setDoc(interestUserRef, {
                tags: data, createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            });
            console.log("aboutUser added successfully!");
        }
    } catch (error) {
        console.error("Error saving aboutUser:", error);
    }
};