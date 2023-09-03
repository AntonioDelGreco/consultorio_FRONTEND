import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, Timestamp} from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY_FIRESTORE,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MSGSENDERID,
  appId: import.meta.env.VITE_APPID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function getAllTurnos() {

  const myCollection = collection(db, 'turnos');
  const turnos = await getDocs(myCollection);

  return turnos.docs.map(doc => doc.data());
}

export async function addTurno(turnoDate){
  Timestamp.fromDate(turnoDate);
  const fecha = { turnoDate }
  const miColeccion = collection(db, "turnos");
  await addDoc(miColeccion, fecha);
}