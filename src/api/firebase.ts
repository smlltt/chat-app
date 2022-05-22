import { doc, updateDoc, setDoc } from "firebase/firestore";
import { auth, db, storage } from "config/firebase";
import {
  signOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  User,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  ref,
  StorageReference,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

const ApiFirebase = {
  createRef: (path: string) => ref(storage, path),
  createUser: (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password),
  createDocument: (collection: string, docId: string, data: {}) => {
    setDoc(doc(db, collection, docId), data);
  },
  detectLogin: (setUser: (user: User | null) => void) => {
    onAuthStateChanged(auth, (user) => setUser(user));
  },
  getDownloadURL: (path: string) => getDownloadURL(ref(storage, path)),
  signIn: (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password),
  signOut: () => {
    signOut(auth);
  },
  uploadFile: (
    fileReference: StorageReference,
    file: Blob | Uint8Array | ArrayBuffer
  ) => uploadBytes(fileReference, file),
  updateDocument: (collection: string, docId: string, data: {}) => {
    updateDoc(doc(db, collection, docId), data);
  },
};

export default ApiFirebase;
