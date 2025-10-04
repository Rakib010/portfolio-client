"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  FolderGit2,
  User,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Blogs", href: "/dashboard/blog", icon: FileText },
  { name: "Projects", href: "/dashboard/project", icon: FolderGit2 },
  { name: "About Me", href: "/dashboard/about", icon: User },
];

function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed top-0 h-screen w-64 bg-gray-900 text-white flex flex-col ">
      <Link
        href="/about"
        className="p-4 text-2xl font-bold border-b border-gray-700"
      >
        MyPortfolio
      </Link>

      {/* Menu Items */}
      <nav className="flex-1 mt-6">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                    isActive ? "bg-gray-700" : "hover:bg-gray-800"
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

export default DashboardSidebar;
