'use client';

import {useRouter} from "next/navigation";

export default function Home() {

    const router = useRouter();

    return (
    <main>
      <h1>Multiplayer</h1>
        <div style={{display: "flex", gap: "20px"}}>
            <button onClick={()=>{router.push('multiplayer/join')}}>Join a room</button>
            <button onClick={()=>{router.push('multiplayer/host')}}>Create a room</button>
        </div>
    </main>
  );
}
