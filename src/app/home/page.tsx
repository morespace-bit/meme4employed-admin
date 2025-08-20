"use client";

import { useRouter } from "next/navigation";
import useUserInfo from "@/lib/context/UserContext";
import { useEffect } from "react";
import AdminControls from "@/lib/components/AdminControls";
import MemeForm from "@/lib/components/MemeForm";
import MemeList from "@/lib/components/MemeList";

const MemesPage = () => {
  const { jwt, user, loading } = useUserInfo();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!jwt) {
        router.replace("/");
      }
    }
  }, [loading]);
  return (
    <div className="max-w-4xl mx-auto p-4 flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-center">Welcome Admin</h1>
      <AdminControls />
      <MemeForm />
      <MemeList />
    </div>
  );
};

export default MemesPage;
