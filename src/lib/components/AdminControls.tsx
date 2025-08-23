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
import MemeForm from "./MemeForm";
import { useState } from "react";
const AdminControls = () => {
  const [title, setTitle] = useState("");
  const [dbTitle, setDbTitle] = useState("");

  return (
    <>
      <div className="flex gap-3 p-4 border rounded-md"></div>

      <MemeForm title="General Memes" dbTitle="general" />
    </>
  );
};

export default AdminControls;
