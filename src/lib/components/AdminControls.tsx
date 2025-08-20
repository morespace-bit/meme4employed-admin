import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/firebase_config";
const AdminControls = () => {
  const makeTopMeme = async () => {
    const q = query(
      collection(db, "memes"),
      orderBy("createdAt", "desc"),
      limit(1)
    );
    const snap = await getDocs(q);
    snap.forEach(async (docSnap) => {
      await updateDoc(doc(db, "memes", docSnap.id), { top: true });
    });
  };

  const makeHotMeme = async () => {
    const q = query(
      collection(db, "memes"),
      orderBy("createdAt", "desc"),
      limit(1)
    );
    const snap = await getDocs(q);
    snap.forEach(async (docSnap) => {
      await updateDoc(doc(db, "memes", docSnap.id), { hot: true });
    });
  };

  return (
    <div className="flex gap-3 p-4 border rounded-md">
      <button
        onClick={makeTopMeme}
        className="bg-green-500 text-white p-2 rounded"
      >
        Make Top Meme Post
      </button>
      <button
        onClick={makeHotMeme}
        className="bg-red-500 text-white p-2 rounded"
      >
        Make Hot Post
      </button>
    </div>
  );
};

export default AdminControls;
