import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Building2 } from 'lucide-react';

export function LandingHeader() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <Link href="/" className="flex items-center justify-center" prefetch={false}>
        <Building2 className="h-6 w-6 text-primary" />
        <span className="sr-only">OrgHQ</span>
      </Link>
      <div className="ml-auto flex items-center gap-4">
        <h1 className="text-xl font-bold font-headline">OrgHQ</h1>
      </div>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Button asChild variant="ghost">
          <Link href="/login" prefetch={false}>
            Login
          </Link>
        </Button>
        <Button asChild>
          <Link href="/register" prefetch={false}>
            Register
          </Link>
        </Button>
      </nav>
    </header>
  );
}
