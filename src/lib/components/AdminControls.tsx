import { useState } from "react";
import MemeForm from "./MemeForm";

const AdminControls = () => {
  const [title, setTitle] = useState("General Memes");
  const [dbTitle, setDbTitle] = useState("General Memes");

  // helper for button style
  const getButtonClasses = (btnTitle: string) =>
    `cursor-pointer p-2 rounded-xl transition-all hover:scale-105 active:scale-95 ${
      title === btnTitle
        ? "bg-sky-500 text-white" // active styles
        : "bg-secondary hover:bg-sky-500 text-white" // inactive styles
    }`;

  return (
    <>
      {/* buttons */}
      <div className="flex justify-center items-center gap-4 text-white mb-4 mt-4">
        <button
          onClick={() => {
            setTitle("General Memes");
            setDbTitle("General Memes");
          }}
          className={getButtonClasses("General Memes")}
        >
          General meme
        </button>

        <button
          onClick={() => {
            setTitle("Hot Right Now");
            setDbTitle("Hot");
          }}
          className={getButtonClasses("Hot Right Now")}
        >
          Hot Right now
        </button>

        <button
          onClick={() => {
            setTitle("Top of the week");

            setDbTitle("Top");
          }}
          className={getButtonClasses("Top of the week")}
        >
          Top of the week
        </button>
      </div>

      <MemeForm title={title} dbTitle={dbTitle} />
    </>
  );
};

export default AdminControls;
