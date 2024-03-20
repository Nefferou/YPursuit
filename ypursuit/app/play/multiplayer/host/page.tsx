'use client';

import CreateRoomSection from "@/components/CreateRoomSection";
import {useRouter} from "next/navigation";

export default function Home() {
    const router = useRouter();

    return (
    <main>
      <h1>Host Game</h1>
        <CreateRoomSection />
        <button onClick={()=>{router.push('/play/multiplayer')}}>Retour</button>
    </main>
  );
}
