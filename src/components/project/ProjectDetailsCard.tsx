/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";

function ProjectDetailsCard({ project }: { project: any }) {
  return (
    <div className="max-w-5xl mx-auto  bg-[#0a192f] p-8 rounded-2xl shadow-xl text-white">
      <div className="flex flex-col md:flex-row gap-6 items-center mb-8">
        {/* Thumbnail */}
        {project.thumbnail && (
          <div className="relative w-full md:w-1/2 h-64 rounded-lg overflow-hidden">
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Title & Date */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{project.title}</h1>

          <p className="text-gray-400">
            <span className="font-semibold">Duration:</span> 12-October -
            12-November
          </p>
        </div>
      </div>

      {/* Description */}
      {project.description && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-gray-300">Description</h2>
          <p className="text-gray-400 leading-relaxed">{project.description}</p>
        </div>
      )}

      {/* Features */}
      {project.features && project.features.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl text-gray-300 font-semibold mb-2">Features</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-400">
            {project.features.map((feature: string, idx: number) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Links */}
      <div className="flex gap-4 mt-4">
        {project.liveLink && (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-600 transition"
          >
            Live Site
          </a>
        )}
        {project.repoLink && (
          <a
            href={project.repoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
          >
            Repository
          </a>
        )}
      </div>
    </div>
  );
}

export default ProjectDetailsCard;
