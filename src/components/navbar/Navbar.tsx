"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function AuthButtons() {
  const pathname = usePathname();

  return (
    <div className="fixed top-4 right-6 z-50 flex gap-4">
      {pathname !== "/login" && (
        <Link
          href="/login"
          className="px-4 py-2 rounded-lg border border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-[#0a192f] transition text-sm shadow-md"
        >
          Login
        </Link>
      )}
      {pathname !== "/register" && (
        <Link
          href="/register"
          className="px-4 py-2 rounded-lg border border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-[#0a192f] transition text-sm shadow-md"
        >
          Register
        </Link>
      )}
    </div>
  );
}

export default AuthButtons;
