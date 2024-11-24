
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyC8Tlw_Hc0iKiiaK-qaz7NAmAzGzvA9uIA",
  authDomain: "netflix-clone-55250.firebaseapp.com",
  projectId: "netflix-clone-55250",
  storageBucket: "netflix-clone-55250.appspot.com",
  messagingSenderId: "1051472292452",
  appId: "1:1051472292452:web:5b71345a6c0891de0e4d71",
  measurementId: "G-LV1KZZM9ZE"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async(name,email,password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user = res.user;
        await addDoc(collection(db, "user"),{
            uid: user.uid,
            name,
            EmailAuthProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}


const login = async (email,password)=>{
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = ()=>{
    signOut(auth);
}

export { auth, db, login, logout, signup };
