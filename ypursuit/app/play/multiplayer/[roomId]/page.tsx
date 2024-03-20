import React from 'react';
import RoomSection from "@/components/Play/RoomSection";

export default function Room() {
    return (
        <main className="flex flex-col items-center justify-center w-3/4 h-screen p-4 space-y-4 sm:px-20 sm:py-10 sm:space-y-8 m-auto">
            <RoomSection />
        </main>
    );
}
