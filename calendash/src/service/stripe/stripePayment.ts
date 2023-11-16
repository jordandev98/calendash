import type {FirebaseApp} from "firebase/app";
import {addDoc, collection, getFirestore, onSnapshot,} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";

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


export const getPortalUrl = async (app: FirebaseApp): Promise<string> => {
    const auth = getAuth(app);
    const user = auth.currentUser;

    let dataWithUrl: any;
    try {
        const functions = getFunctions(app, "us-central1");
        const functionRef = httpsCallable(
            functions,
            "ext-firestore-stripe-payments-createPortalLink"
        );
        const { data } = await functionRef({
            customerId: user?.uid,
            returnUrl: window.location.origin,
        });

        // Add a type to the data
        dataWithUrl = data as { url: string };
        console.log("Reroute to Stripe portal: ", dataWithUrl.url);
    } catch (error) {
        console.error(error);
    }

    return new Promise<string>((resolve, reject) => {
        if (dataWithUrl.url) {
            resolve(dataWithUrl.url);
        } else {
            reject(new Error("No url returned"));
        }
    });
};