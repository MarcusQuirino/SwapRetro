import { X } from 'lucide-react';

export function NameItem({
  name,
  removeItem,
}: {
  name: string;
  removeItem: (name: string) => void;
}) {
  return (
    <div className="flex flex-row w-full justify-between">
      {name}
      <X className="h-4 w-4" onClick={() => removeItem(name)} color="red" />
    </div>
  );
}
