import { doc, DocumentData, getDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebaseConfig";

// const [fetchUser, { data, loading, isSuccess, isFailed, error }] = useFirestoreQuery<User>("users");

interface FirestoreState<T> {
    data: T | null;
    loading: boolean;
    isSuccess: boolean;
    isFailed: boolean;
    error: string | null;
}

export function useFirestoreQuery<T = DocumentData>(collectionName: string) {
    const [state, setState] = useState<FirestoreState<T>>({
        data: null,
        loading: false,
        isSuccess: false,
        isFailed: false,
        error: null,
    });

    const queryData = async (documentId: string) => {
        setState({ data: null, loading: true, isSuccess: false, isFailed: false, error: null });

        try {
            const docRef = doc(db, collectionName, documentId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setState({
                    data: { id: docSnap.id, ...docSnap.data() } as T,
                    loading: false,
                    isSuccess: true,
                    isFailed: false,
                    error: null
                });
            } else {
                setState({ data: null, loading: false, isSuccess: false, isFailed: true, error: "Document not found" });
            }
        } catch (err) {
            setState({ data: null, loading: false, isSuccess: false, isFailed: true, error: (err as Error).message });
        }
    };

    return [queryData, state] as const; // Function first, then state
}