import { useEffect, useState } from "react";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase_config";

interface Meme {
  heading: string;
  shortDesc?: string;
  longDesc?: string;
  imageUrl?: string;
  videoLink?: string;
  hot?: boolean;
  top?: boolean;
}

const MemeList = () => {
  const [memes, setMemes] = useState<Meme[]>([]);

  useEffect(() => {
    const fetchMemes = async () => {
      const q = query(collection(db, "memes"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      const data = snap.docs.map((d) => d.data() as Meme);
      setMemes(data);
    };
    fetchMemes();
  }, []);

  return (
    <div className="p-4 grid gap-4">
      {memes.map((meme, idx) => (
        <div key={idx} className="border p-3 rounded-md">
          <h2 className="font-bold">{meme.heading}</h2>
          {meme.imageUrl && (
            <img src={meme.imageUrl} alt={meme.heading} className="my-2" />
          )}
          <p>{meme.shortDesc}</p>
          <p>{meme.longDesc}</p>
          {meme.videoLink && (
            <a
              href={meme.videoLink}
              target="_blank"
              className="text-blue-500 underline"
            >
              Video Link
            </a>
          )}
          {meme.hot && <span className="text-red-500 font-bold">HOT</span>}
          {meme.top && (
            <span className="text-green-500 font-bold ml-2">TOP</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default MemeList;
