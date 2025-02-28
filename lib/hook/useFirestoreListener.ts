import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

export function useFirestoreListener<T>(collectionName: string, docId?: string | null) {
    const db = getFirestore();
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!docId) return; // Don't subscribe if docId is not provided

        setLoading(true);
        const docRef = doc(db, collectionName, docId);
        const unsubscribe = onSnapshot(
            docRef,
            (docSnap) => {
                if (docSnap.exists()) {
                    setData({ id: docSnap.id, ...docSnap.data() } as T);
                    setError(null);
                } else {
                    setData(null);
                    setError("Data not found");
                }
                setLoading(false);
            },
            (err) => {
                setError(`Failed to fetch data: ${err.message}`);
                setLoading(false);
            }
        );

        return () => unsubscribe(); // Unsubscribe when unmounting or docId changes
    }, [collectionName, docId]);

    return { data, loading, error };
}