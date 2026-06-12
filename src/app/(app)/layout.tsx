import { AppHeader } from "@/components/AppHeader";
import { AuthGuard } from "@/components/AuthGuard";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="min-h-screen">
        <AppHeader />
        <div className="mx-auto max-w-2xl px-4 pb-24 pt-6">{children}</div>
      </div>
    </AuthGuard>
  );
}
