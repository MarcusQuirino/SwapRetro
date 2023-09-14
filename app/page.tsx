import { ModeToggle } from '@/components/modeTogle';
import { Button } from '@/components/ui/button';
import { IterationCw } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 space-y-10">
      <div className='flex flex-row space-x-8'>
        <h1 className="text-8xl text-foreground font-semibold">SwapRetro</h1>
        <IterationCw size={100} strokeWidth="3"/>
      </div>
      <p className='text-2xl'>Make your retro. Meet your teammates</p>
      <Link href="/retro">
        <Button size="lg">Start Retro</Button>
      </Link>
    </main>
  )
}
