/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Link from "next/link";

function ProjectCard({ project }: { project: any }) {
  return (
    <Link href={`/projects/${project._id}`} passHref>
      <div className="group relative rounded-xl border-1 border-gray-700 overflow-hidden transition-transform transform hover:scale-105 hover:bg-[#0a192f] hover:shadow-lg cursor-pointer flex flex-col md:flex-row mt-6 gap-6 p-8">
        {/* Thumbnail */}
        {project.thumbnail ? (
          <div className="relative w-full md:w-48 h-48 md:h-32 flex-shrink-0">
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
              priority={false}
            />
          </div>
        ) : (
          <div className="w-full md:w-48 h-48 md:h-32 bg-gray-800 flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}

        {/* Project Details */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-300 mb-2">
              {project.title}
            </h2>
            <p className="text-gray-400 line-clamp-3">{project.description}</p>
          </div>

          {/* Links */}
          <div className="flex gap-4 mt-4">
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg border border-teal-400 text-teal-400  hover:text-gray-300 transition text-sm shadow-md"
                onClick={(e) => e.stopPropagation()} 
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
                onClick={(e) => e.stopPropagation()}
              >
                Repo
              </a>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProjectCard;
