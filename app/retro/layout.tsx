import { ModeToggle } from '@/components/modeTogle';
import Link from 'next/link';

export default function RetroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-screen h-screen">
      <header className="flex flex-row justify-between h-24 p-8 border-b border-foreground">
        <Link href='/'>
          <span className="text-foreground text-2xl font-bold cursor-pointer">SwapRetro</span>
        </Link>
        <ModeToggle />
      </header>
      <main className="h-[calc(100vh-6rem)] w-full">{children}</main>
    </div>
  );
}
