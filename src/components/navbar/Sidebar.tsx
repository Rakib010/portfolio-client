"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/about", label: "About" },
    { href: "/skills", label: "Skills" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <aside className="fixed top-0 left-[5%] h-full flex flex-col py-10 mt-20">
      {/* Top Section */}
      <div className="px-6 mb-26">
        <div className="flex flex-col gap-3">
          <h1 className="text-5xl font-bold text-white tracking-wide">
            Rakib Hossain
          </h1>
          <h2 className="text-xl font-semibold">FrontEnd Engineer</h2>
        </div>
      </div>

      {/* Middle Links */}
      <nav className="flex flex-col gap-6 text-lg font-medium px-6">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`transition ${
              pathname === link.href
                ? "text-teal-400 underline underline-offset-4 font-semibold"
                : "text-gray-400 hover:text-teal-400"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Bottom Social */}
      <div className="flex mt-30 px-6 gap-4 text-gray-400 font-bold ">
        <a href="https://github.com/Rakib010" target="_blank" rel="noreferrer">
          <FaGithub className="w-8 h-8" />
        </a>
        <a
          href="https://www.linkedin.com/in/rakib0011"
          target="_blank"
          rel="noreferrer"
        >
          <FaLinkedin className="w-8 h-8" />
        </a>
      </div>
    </aside>
  );
}
