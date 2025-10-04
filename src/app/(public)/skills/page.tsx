const SkillsPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/about`, {
    next: { revalidate: 60 },
  });

  const { data: about } = await res.json();

  if (!about || !about[0]) {
    return (
      <div className="mt-10 text-center text-gray-400">No data available</div>
    );
  }

  return (
    <div className="min-h-screen px-6  ">
      <div className="max-w-5xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl font-bold mb-6 ">My Skills</h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-12">
          Here are the technologies and tools I’ve worked with, helping me build
          fast, scalable, and modern web applications.
        </p>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {about[0].skills?.map((skill: string, idx: number) => (
            <div
              key={idx}
              className="rounded-xl p-4 flex items-center justify-center text-lg font-semibold text-gray-300 hover:text-teal-400 hover:bg-white/10 transition transform hover:scale-105 border-gray-700 border"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsPage;
