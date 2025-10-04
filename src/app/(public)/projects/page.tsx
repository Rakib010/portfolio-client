/* eslint-disable @typescript-eslint/no-explicit-any */
import ProjectCard from "@/components/project/ProjectCard";

const ProjectPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/project`, {
    next: { revalidate: 60 },
  });

  const { data: projects } = await res.json();

  if (!projects || !Array.isArray(projects) || projects.length === 0) {
    return (
      <div className="mt-10 text-center text-gray-400">No projects found</div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-10 gap-6">
      <h1 className="text-3xl font-bold mb-6 text-center">My Projects</h1>

      {projects.map((project: any) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </div>
  );
};

export default ProjectPage;
