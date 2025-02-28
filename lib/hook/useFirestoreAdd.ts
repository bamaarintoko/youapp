import { addDoc, collection, DocumentData, FirestoreError, WithFieldValue } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebaseConfig";

// const [createUser, { data, loading, isSuccess, isFailed, error }] = useFirestoreAdd<User>("users");

type FirestoreDocument<T> = T & { id: string };

interface FirestoreState<T> {
    data: FirestoreDocument<T> | null;
    loading: boolean;
    isSuccess: boolean;
    isFailed: boolean;
    error: string | null;
}

export function useFirestoreAdd<T extends DocumentData>(collectionName: string) {
    const [state, setState] = useState<FirestoreState<T>>({
        data: null,
        loading: false,
        isSuccess: false,
        isFailed: false,
        error: null,
    });

    const addDocument = async (newData: WithFieldValue<T>) => {
        setState({ data: null, loading: true, isSuccess: false, isFailed: false, error: null });

        try {
            const docRef = await addDoc(collection(db, collectionName), newData);
            setState({
                data: { id: docRef.id, ...newData } as FirestoreDocument<T>,
                loading: false,
                isSuccess: true,
                isFailed: false,
                error: null,
            });
        } catch (err) {
            setState({
                data: null,
                loading: false,
                isSuccess: false,
                isFailed: true,
                error: (err as FirestoreError).message,
            });
        }
    };

    return [addDocument, state] as const; // Function first, then state
}