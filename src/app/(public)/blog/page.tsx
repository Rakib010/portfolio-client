/* eslint-disable @typescript-eslint/no-explicit-any */
import BlogCard from "@/components/blog/BlogCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Blogs | Next Blog",
  description: "New blog for teach student ",
};

const AllBlogsPage = async () => {
  // ISR enabled fetch
  const res = await fetch(`${process.env.BASE_API}/blog`, {
    next: { revalidate: 60 },
  });

  const { data: blogs } = await res.json();

  return (
    <div className="mt-10 px-4 max-w-7xl mx-auto">
      <div>
        <div className="flex flex-col gap-4 max-w-6xl mx-auto my-8">
          {blogs?.map((blog: any) => (
            <BlogCard key={blog?._id} post={blog} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllBlogsPage;
