/* eslint-disable @typescript-eslint/no-explicit-any */
import AllBlogGet from "@/components/dashboard/AllBlogGet";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Blogs | Next Blog",
  description: "New blog for teach student ",
};

const AllBlogGetPage = async () => {
  // ISR
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog`, {
    next: { revalidate: 60 },
  });

  const { data: blogs } = await res.json();

  return (
    <div className="px-10 max-w-7xl mx-auto">
      <div>
        <div className="flex flex-col gap-4 max-w-6xl mx-auto px-10 py-20">
          {blogs?.map((blog: any) => (
            <AllBlogGet key={blog?._id} post={blog} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllBlogGetPage;
