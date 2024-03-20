import JoinRoomSection from "@/components/JoinRoomSection";
import BackButton from "@/components/ui/Buttons/BackButton";

export default function Home() {

  return (
    <main className="flex flex-col items-center justify-center w-3/4 h-screen p-4 space-y-4 sm:px-20 sm:py-10 sm:space-y-8 m-auto">
      <div className="flex justify-start w-full">
        <BackButton />
      </div>
      <JoinRoomSection />
    </main>
  );
}
