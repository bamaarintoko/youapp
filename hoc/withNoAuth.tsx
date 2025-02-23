'use client'
import { useEffect } from "react";
// import { useRouter } from "next/router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/lib/firebaseConfig";
import { useRouter } from "next/navigation";
// import app from "next/app";
// import { app } from "../lib/firebase";

const auth = getAuth(app);

const withNoAuth = (WrappedComponent: React.FC) => {
    return function ProtectedRoute(props: any) {
        const router = useRouter();

        useEffect(() => {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                if (user) {
                    router.push("/"); 
                }
                // console.log('user : ', user)
            });

            return () => unsubscribe();
        }, [router]);

        return <WrappedComponent {...props} />;
    };
};

export default withNoAuth;
