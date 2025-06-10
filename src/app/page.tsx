import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Home</h1>
      <div className="flex gap-2 items-center">
        Go to:
        <Button asChild className="w-fit" variant="outline" size="sm">
          <Link href="/weather">Weather</Link>
        </Button>
      </div>
    </div>
  );
}
