/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";

type BlogCardProps = {
  post: {
    _id: string;
    title: string;
    thumbnail: string;
    createdAt: string;
  };
};

export default function BlogCard({ post }: { post: BlogCardProps["post"] }) {
  return (
    <Link
      href={`/blog/${post._id}`}
      className="group flex items-center gap-4 border border-gray-700 rounded-lg p-6 hover:border-teal-400 transition"
    >
      {/* Thumbnail Left */}
      <div className="relative w-28 h-18 flex-shrink-0">
        <Image
          src={post.thumbnail}
          alt={post.title}
          fill
          className="object-cover rounded-md group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Right Content */}
      <div className="flex flex-col">
        <h3 className="text-base font-medium text-white group-hover:text-teal-400 transition">
          {post.title}
        </h3>
        <p className="text-sm text-gray-400 mt-2">
          {new Date(post.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>
    </Link>
  );
}
