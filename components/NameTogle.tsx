import { Input } from "./ui/input";

export function NameTogle({ name }: { name: string}) {
    return (
        <div className="flex flex-row h-12 w-full items-center gap-6">
            <Input type="checkbox" className="w-8"/>
            <span className="text-xl">{name}</span>
        </div>
    )
}