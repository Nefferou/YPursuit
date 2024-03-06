'use client';

import JoinRoomSection from "@/components/JoinRoomSection";
import {useRouter} from "next/navigation";

export default function Home() {
    const router = useRouter();

    return (
    <main>
      <h1>Join Game</h1>
        <JoinRoomSection />
        <button onClick={()=>{router.push('/play/multiplayer')}}>Retour</button>
    </main>
  );
}
