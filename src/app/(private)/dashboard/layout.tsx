import DashboardSidebar from "@/components/navbar/DashboardSidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex">
      <DashboardSidebar />
      {children}
    </main>
  );
}
