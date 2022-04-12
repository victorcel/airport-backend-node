import admin  from "firebase-admin";
import ConfigHelper from "../Helpers/ConfigHelper";

const firebaseService = admin.initializeApp({
    credential: admin.credential.cert(new ConfigHelper().serviceAccount())
});
export { firebaseService };