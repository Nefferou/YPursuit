'use client';

import { useRouter } from "next/navigation";
import Button from "@/components/ui/Buttons/Button";
import BackButton from "@/components/ui/Buttons/BackButton";
import Buzzy from "@/assets/images/character/buzzy.svg";
import Dally from "@/assets/images/character/dally.svg";
import Rusty from "@/assets/images/character/rusty.svg";
import Wapy from "@/assets/images/character/wapy.svg";
import Image from "next/image";

export default function Home() {

  const router = useRouter();

  return (
    <main className="relative flex flex-col items-center justify-center w-full h-full p-4">
    <h1 className="text-2xl font-extrabold italic">MultiJoueur</h1>
    <BackButton />
    <div className="flex justify-between w-full">
      <div className="flex items-center">
        <Image src={Rusty} alt="rusty" width={180} height={75} className="brightness-0" />
      </div>
      <div className="flex items-center">
        <Image src={Wapy} alt="wapy" width={180} height={75} className="brightness-0"/>
        <Image src={Buzzy} alt="buzzy" width={180} height={75} className="brightness-0"/>
        <Image src={Dally} alt="dally" width={180} height={75} className="brightness-0"/>
      </div>
    </div>
    <div className="relative z-10" style={{ display: "flex", gap: "100px" }}>
      <Button handleClick={() => { router.push('multiplayer/join') }} title="Button" design="simple">Créer une room</Button>
      <Button handleClick={() => { router.push('multiplayer/host') }} title="Button" design="simple">Joindre une room</Button>
    </div>
  </main>
  );
}