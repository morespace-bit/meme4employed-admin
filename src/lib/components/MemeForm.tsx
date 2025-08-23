import { useState, ChangeEvent, FormEvent } from "react";
import { db } from "../firebase/firebase_config";
import {
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  setDoc,
  doc,
} from "firebase/firestore";

const MemeForm = ({ title, dbTitle }: { title: string; dbTitle: string }) => {
  const [heading, setHeading] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [longDesc, setLongDesc] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  // Preview image before upload
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!heading || !image) return;

    try {
      setLoading(true);
      let imageUrl: string | null = null;

      // Upload to Cloudinary
      if (image) {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "meme_upload"); // your unsigned preset
        formData.append("cloud_name", "dygq6yakl");

        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dygq6yakl/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await res.json();
        imageUrl = data.secure_url;
      }

      // Prepare data for Firestore
      const memeData: any = {
        heading,
        shortDesc,
        longDesc,
        videoLink,
        createdAt: serverTimestamp(),
      };

      if (imageUrl) memeData.imageUrl = imageUrl;
      if (dbTitle == "General Memes") {
        await addDoc(collection(db, dbTitle), memeData);
      } else {
        await setDoc(doc(db, dbTitle, "meme"), memeData);
      }

      // Reset form
      setHeading("");
      setShortDesc("");
      setLongDesc("");
      setVideoLink("");
      setImage(null);
      setPreview(null);
      alert("Meme added!");
    } catch (err) {
      console.error(err);
      alert("Error uploading meme");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-secondary text-white p-7 rounded-2xl">
      <h1 className="text-3xl flex items-center justify-center mb-3 font-heading ">
        {title}
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-white">
        <input
          type="text"
          placeholder="Heading"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          className="bg-third p-3 rounded-xl font-semibold font-secondary focus:outline-2 outline-amber-300"
          required
        />

        <input
          type="file"
          onChange={handleImageChange}
          className="bg-third p-3 rounded-xl font-semibold font-secondary focus:outline-2 outline-amber-300"
          required
        />

        {preview && (
          <img src={preview} alt="Preview" className="w-32 h-32 object-cover" />
        )}

        <input
          type="text"
          placeholder="Short Description"
          value={shortDesc}
          onChange={(e) => setShortDesc(e.target.value)}
          className="bg-third p-3 rounded-xl font-semibold font-secondary focus:outline-2 outline-amber-300"
        />

        <textarea
          placeholder="Long Description"
          value={longDesc}
          onChange={(e) => setLongDesc(e.target.value)}
          className="bg-third p-3 rounded-xl font-semibold font-secondary focus:outline-2 outline-amber-300"
        />

        <input
          type="text"
          placeholder="Video Link"
          value={videoLink}
          onChange={(e) => setVideoLink(e.target.value)}
          className="bg-third p-3 rounded-xl font-semibold font-secondary focus:outline-2 outline-amber-300"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded cursor-pointer"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Add Meme"}
        </button>
      </form>
    </div>
  );
};

export default MemeForm;
