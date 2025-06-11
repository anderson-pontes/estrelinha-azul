// src/lib/firebase.ts

import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Padrão de inicialização mais robusto
// Criamos uma função para garantir que a inicialização ocorra apenas uma vez.
function initializeFirebaseApp() {
  const apps = getApps();
  if (apps.length > 0) {
    return apps[0]; // Retorna o app já inicializado
  }
  return initializeApp(firebaseConfig); // Inicializa o app se não existir
}

const app = initializeFirebaseApp();
const db = getFirestore(app);

export { db };