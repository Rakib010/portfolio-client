"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // for tables, strikethrough, etc.
import rehypeHighlight from "rehype-highlight"; // optional for code syntax highlighting

type BlogDetailsCardProps = {
  blog: {
    _id: string;
    title: string;
    content: string;
    thumbnail: string;
    tags: string[];
    createdAt: string;
  };
};

export default function BlogDetailsCard({
  blog,
}: {
  blog: BlogDetailsCardProps["blog"];
}) {
  return (
    <article className="max-w-3xl sm:px-6 md:px-0 text-white">
      {/* Thumbnail */}
      {blog.thumbnail && (
        <div className="w-full h-64 md:h-96 relative mb-8 overflow-hidden rounded-lg shadow-lg">
          <img
            src={blog.thumbnail}
            alt={blog.title}
            className="object-cover w-full h-full"
          />
        </div>
      )}

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold mb-4">{blog.title}</h1>

      {/* Metadata */}
      <div className="flex items-center gap-4 text-gray-400 mb-8">
        <span>
          {new Date(blog.createdAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </span>
        {blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-700 text-white text-xs font-medium px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Markdown Content */}
      <div className="text-gray-300">
        <ReactMarkdown>{blog.content}</ReactMarkdown>
      </div>
    </article>
  );
}
