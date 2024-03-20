import PanelPlay from '@/components/PanelPlay';

export default function Home() {
  return (
    <main className="flex flex-row items-center justify-center w-full h-full p-4 space-y-4 sm:px-20 sm:py-10 sm:space-y-8">
      <PanelPlay design='solo' />
      <PanelPlay design='multi' />
    </main>
  );
}
