import { doc, updateDoc, setDoc } from "firebase/firestore";
import { auth, db } from "config/firebase";
import {
  signOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  User,
  signInWithEmailAndPassword,
} from "firebase/auth";

const ApiFirebase = {
  createUser: (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password),
  createDocument: (collection: string, docId: string, data: {}) => {
    setDoc(doc(db, collection, docId), data);
  },
  detectLogin: (setUser: (user: User | null) => void) => {
    onAuthStateChanged(auth, (user) => setUser(user));
  },
  signIn: (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password),
  signOut: () => {
    signOut(auth);
  },
  updateDocument: (collection: string, docId: string, data: {}) => {
    updateDoc(doc(db, collection, docId), data);
  },
};

export default ApiFirebase;
