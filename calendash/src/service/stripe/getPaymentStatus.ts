import {collection, getFirestore, onSnapshot, query, where} from "firebase/firestore";
import {initFirebase} from "../firebase/firebase.js"

export const handlePayment = async (userId: string) => {

}
const getPaymentStatus = async (userId: string): Promise<number> => {
    const app = initFirebase()
    if (!userId) throw new Error("User not logged in");

    const db = getFirestore(app);
    const paymentRef = collection(db, "customers", userId, "payments");
    const q = query(
        paymentRef,
        where("status", "in", ["succeeded"])
    );


    return new Promise<number>((resolve, reject) => {
        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                if (snapshot.docs.length === 0) {
                    resolve(-1);
                } else {

                    const paymentDoc = snapshot.docs[0];
                    const paymentData = paymentDoc.data();
                    resolve(paymentData.amount);
                }
                unsubscribe();
            },
            reject
        );
    });
};
