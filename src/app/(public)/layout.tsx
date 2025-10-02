import Sidebar from "@/components/navbar/Sidebar";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="min-h-dvh">
        <Sidebar />
        {children}
      </main>
    </>
  );
}
