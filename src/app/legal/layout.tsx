import Link from "next/link";
import { Logo } from "@/components/Logo";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-2xl px-5 py-8">
      <div className="flex items-center justify-between">
        <Link href="/" aria-label="Dexy home">
          <Logo size={26} />
        </Link>
        <Link href="/" className="text-sm text-muted hover:text-cream">
          ← Back
        </Link>
      </div>
      <article className="prose-dexy mt-8 space-y-4 text-sm leading-relaxed text-muted [&_h1]:font-serif [&_h1]:text-3xl [&_h1]:text-cream [&_h2]:mt-6 [&_h2]:font-serif [&_h2]:text-xl [&_h2]:text-cream [&_p]:text-muted">
        {children}
      </article>
    </div>
  );
}
