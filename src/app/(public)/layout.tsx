import Sidebar from "@/components/navbar/Sidebar";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-h-screen px-[5%] py-25 ml-[calc(16%+20rem)] mt-10">
          {children}
        </main>
      </div>
    </>
  );
}
