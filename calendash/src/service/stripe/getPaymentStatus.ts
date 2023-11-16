import {collection, getDocs, getFirestore, query, where} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import {FirebaseApp} from "firebase/app";


export const getPremiumStatus = async (app: FirebaseApp) => {
    const auth = getAuth(app);
    const userId = auth.currentUser?.uid;
    if (!userId) throw new Error("User not logged in");

    const db = getFirestore(app);
    const subscriptionsRef = collection(db, "customers", userId, "subscriptions");
    const q = query(
        subscriptionsRef,
        where("status", "in", ["trialing", "active"])
    );


    try {
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            return null;
        }
        const subscriptionData = snapshot.docs[0].data();
        const planId = subscriptionData.items ? subscriptionData.items[0].plan.id : null;
        return {
            renewDate : subscriptionData.current_period_end,
            autoRenew :  subscriptionData.cancel_at_period_end,
            planId : planId,
            status : subscriptionData.status

        }



    } catch (error) {
        return null;
    }
};
