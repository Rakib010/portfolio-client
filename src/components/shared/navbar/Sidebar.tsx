import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Sidebar() {
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
      <nav className="flex flex-col gap-6 text-gray-400 text-lg font-medium px-6">
        <Link
          href="/about"
          className="hover:text-teal-400 transition hover:underline"
        >
          About
        </Link>
        <Link
          href="/projects"
          className="hover:text-teal-400 transition hover:underline"
        >
          Projects
        </Link>
        <Link
          href="/blog"
          className="hover:text-teal-400 transition hover:underline"
        >
          Blog
        </Link>
        <Link
          href="/login"
          className="hover:text-teal-400 transition hover:underline"
        >
          Login
        </Link>
      </nav>

      {/* Bottom Social */}
      <div className="flex mt-20 px-6 gap-4 text-gray-400">
        <a href="https://github.com/" target="_blank" rel="noreferrer">
          <FaGithub className="w-6 h-6" />
        </a>
        <a href="https://linkedin.com/" target="_blank" rel="noreferrer">
          <FaLinkedin className="w-6 h-6" />
        </a>
      </div>
    </aside>
  );
}
