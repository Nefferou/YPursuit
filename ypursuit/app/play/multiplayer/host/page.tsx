'use client';

import CreateRoomSection from "@/components/Play/CreateRoomSection";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center w-full h-full p-4 space-y-4 sm:px-20 sm:py-10 sm:space-y-8">
      <CreateRoomSection />
    </main>
  );
}
