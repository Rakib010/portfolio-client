import DashboardSidebar from "@/components/navbar/DashboardSidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex">
      <DashboardSidebar />
      <div className="flex-1 py-10 ml-64 ">
        {children}
      </div>
    </main>
  );
}
