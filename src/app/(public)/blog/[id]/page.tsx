/* eslint-disable @typescript-eslint/no-explicit-any */
import BlogDetailsCard from "@/components/modules/blog/BlogDetailsCard";

export const generateStaticParams = async () => {
  const res = await fetch(`${process.env.BASE_API}/blog`, {
    next: { revalidate: 60 },
  });
  console.log("Fetching all blogs for static params:", res);
  const { data: blogs } = await res.json();

  return blogs.map((blog: any) => ({
    blogId: String(blog._id),
  }));
};

// Dynamic Metadata
export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}) => {
  const res = await fetch(`${process.env.BASE_API}/blog/${params.id}`, {
    next: { revalidate: 60 },
  });
  const blog = await res.json();

  return {
    title: blog?.title || "Blog Details",
    description: blog?.content?.slice(0, 150) || "Read the full blog post",
  };
};

export default async function BlogDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const res = await fetch(`${process.env.BASE_API}/blog/${params.id}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    return <div className="text-center py-20">Blog not found</div>;
  }

  const json = await res.json();
  return (
    <div className="max-w-4xl mx-auto">
      <BlogDetailsCard blog={json.data} />{" "}
    </div>
  );
}
