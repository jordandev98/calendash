import type {FirebaseApp} from "firebase/app";
import {addDoc, collection, getFirestore, onSnapshot,} from "firebase/firestore";


export const getCheckoutUrl = async (app: FirebaseApp, userId: string, priceId: string): Promise<string> => {

    if (!userId) throw new Error("User is not authenticated");

    const db = getFirestore(app);
    const checkoutSessionRef = collection(
        db,
        "customers",
        userId,
        "checkout_sessions"
    );

    const docRef = await addDoc(checkoutSessionRef, {
        price: priceId,
        mode: "subscription",
        success_url: `${import.meta.env.VITE_BASE_URL}/`,
        cancel_url: `${import.meta.env.VITE_BASE_URL}/`,
        client_reference_id: userId
    });

    return new Promise<string>((resolve, reject) => {
        const unsubscribe = onSnapshot(docRef, (snap) => {
            const {error, url} = snap.data() as {
                error?: { message: string };
                url?: string;
            };
            if (error) {
                unsubscribe();
                reject(new Error(`An error occurred: ${error.message}`));
            }
            if (url) {
                console.log("Stripe Checkout URL:", url);
                unsubscribe();
                resolve(url);
            }
        });
    });
};
