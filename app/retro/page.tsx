'use client';

import { AddTeam } from '@/components/AddTeam';
import { useState } from 'react';

export default function RetroPage() {
  const [created, setCreated] = useState(false);
  const [team, setTeam] = useState<string[]>([]);

  const togleCreate = (teamNames: string[]) => {
    setCreated(!created);
    setTeam((prev) => [...prev, ...teamNames]);
  };

  return (
    <div className="flex h-full flex-col items-center p-24 space-y-10">
      {!created && team.length < 1 && <AddTeam handleClick={togleCreate} />}
      {created && team.length > 1 && (
        <ul>
          {team.map((m, key) => (
            <li key={key}>{m}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
