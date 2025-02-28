import { collection, doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebaseConfig";
import { FirebaseError } from "firebase/app";
import { getFirebaseAuthErrorMessage } from "../functions";

// const [addOrUpdateUser, { data, loading, isSuccess, isFailed, error }] = useFirestoreAddOrUpdate("users");

// const handleSaveUser = async () => {
//     await addOrUpdateUser({
//       email: "example@email.com",
//       name: "John Doe",
//       age: 25
//     });
//   };

export function useFirestoreAddOrUpdate<T extends Record<string, unknown>>(
    collectionName: string,
) {
    const [state, setState] = useState<{
        data: T | null;
        loading: boolean;
        isSuccess: boolean;
        isFailed: boolean;
        error: string | null;
    }>({
        data: null,
        loading: false,
        isSuccess: false,
        isFailed: false,
        error: null,
    });

    const addOrUpdate = async (docId: string, newData: T) => {
        setState({ data: null, loading: true, isSuccess: false, isFailed: false, error: null });

        try {
            const collectionRef = collection(db, collectionName);
            const queryRef = doc(collectionRef, docId); // Use fieldToCheck as doc ID
            const existingDoc = await getDoc(queryRef);
            const timestamp = serverTimestamp();
            if (existingDoc.exists()) {
                // 🔹 Update if the document exists
                await updateDoc(queryRef, { ...newData, updatedAt: timestamp });
            } else {
                // 🔹 Add if the document does not exist
                await setDoc(queryRef, { ...newData, createdAt: timestamp, updatedAt: timestamp });
            }

            setState({
                data: { id: queryRef.id, ...newData },
                loading: false,
                isSuccess: true,
                isFailed: false,
                error: null,
            });
        } catch (error: unknown) {
            let errorMessage = "Terjadi kesalahan yang tidak diketahui.";

            if (error instanceof FirebaseError) {
                errorMessage = getFirebaseAuthErrorMessage(error.code);
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }
            setState({ data: null, loading: false, isSuccess: false, isFailed: true, error: errorMessage });
        }
    };

    return [addOrUpdate, state] as const; // Function first, state second
}