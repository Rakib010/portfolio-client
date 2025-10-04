import ProjectDetailsCard from "@/components/project/ProjectDetailsCard";

// Dynamic Metadata
export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/project/${params.id}`,
    {
      next: { revalidate: 60 },
    }
  );
  const project = await res.json();

  return {
    title: project?.title || "Project Details",
    description:
      project?.description?.slice(0, 150) || "Read the full project details",
  };
};

export default async function ProjectDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/project/${params.id}`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    return <div className="text-center py-20">Blog not found</div>;
  }

  const json = await res.json();
  return (
    <div className="max-w-4xl mx-auto ">
      <ProjectDetailsCard project={json.data} />{" "}
    </div>
  );
}
