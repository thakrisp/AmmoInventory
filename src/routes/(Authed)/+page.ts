import type { PageLoad } from "./$types";
import { getAuth } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../../firebase"


export const load: PageLoad = async () => {
    const user = getAuth().currentUser?.uid;

    if (user !== undefined) {
        const docRef = doc(db, 'ammo', `${user}`);
        const docSnap = await getDoc(docRef);

        const data = docSnap.data()?.ammo


        return data
    }
}