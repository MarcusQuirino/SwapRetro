'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { DialogClose } from '@radix-ui/react-dialog';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { useState } from 'react';
import { NameItem } from './NameItem';

export function AddTeam({handleClick}: {handleClick: (teamNames: string[]) => void}) {
  const [name, setName] = useState('');
  const [names, setNames] = useState<string[]>([]);

  const clickHandler = () => {
    setNames((prev) => [...prev, name]);
    setName('');
  };

  const removeMamber = (name: string) => {
    setNames(names.filter((n) => n !== name));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-xl font-normal" size="lg">Add Team</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>add teamates</DialogTitle>
          <DialogDescription>
            click the add button to add more team mambers then press `Done` to
            shuffle the order!
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4 w-full">
          <div className="flex flex-col items-center gap-4 w-full">
            <ul className="w-full">
              {names.map((name, key) => (
                <li key={key}>
                  <Separator className="pb-2" />
                  <NameItem name={name} removeItem={removeMamber} />
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-2 w-full">
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setNames((prev) => [...prev, name]);
                    setName('');
                  }
                }}
              />
              <Button className="w-full" onClick={clickHandler}>
                add
              </Button>
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button type="submit" onClick={() => handleClick(names)}>Done</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
