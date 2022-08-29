import {
  collection,
  doc,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
  addDoc,
  orderBy,
} from "firebase/firestore";
import { app, auth, db, storage } from "config/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import {
  deleteObject,
  getDownloadURL,
  ref,
  StorageReference,
  uploadBytes,
} from "firebase/storage";
import { ChatType, UserType } from "./types";
import { CollectionReference } from "@firebase/firestore";

const ApiFirebase = {
  createRef: (path: string) => ref(storage, path),
  createUser: (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password),
  createDocument: (collection: string, docId: string, data: {}) => {
    setDoc(doc(db, collection, docId), data);
  },
  deleteFile: (path: string) => deleteObject(ref(storage, path)),
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
  userRef: (uid: string | undefined) =>
    doc(getFirestore(app), "users", uid || ""),
  availableUsersQuery: (currentUserUid: string) =>
    query<UserType>(
      collection(db, "users") as CollectionReference<UserType>,
      where("uid", "!=", currentUserUid)
    ),
  addMessage: (conversationId: string, data: {}) => {
    addDoc(collection(db, "messages", conversationId, "chats"), data);
  },
  chatsRef: (conversationId: string) =>
    query<ChatType>(
      collection(
        db,
        "messages",
        conversationId,
        "chats"
      ) as CollectionReference<ChatType>,
      orderBy("createdAt", "asc")
    ),
  lastMessageRef: (conversationId: string | undefined) =>
    doc(getFirestore(app), "lastMessage", conversationId || ""),
};

export default ApiFirebase;
