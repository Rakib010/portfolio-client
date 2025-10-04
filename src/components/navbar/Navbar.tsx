"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { LogOut } from "lucide-react"; // for logout icon

function AuthButtons() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  return (
    <div className="fixed top-4 right-6 z-50 flex gap-4">
      {/* Show Login button only if not logged in */}
      {status !== "authenticated" && pathname !== "/login" && (
        <Link
          href="/login"
          className="px-4 py-2 rounded-lg border border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-[#0a192f] transition text-sm shadow-md"
        >
          Login
        </Link>
      )}

      {/* Show Logout button when logged in */}
      {status === "authenticated" && (
        <button
          onClick={() => signOut()}
          className="px-4 py-2 rounded-lg border border-red-400 text-red-400 hover:bg-red-400 hover:text-[#0a192f] transition text-sm shadow-md flex items-center gap-2"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      )}
    </div>
  );
}

export default AuthButtons;
