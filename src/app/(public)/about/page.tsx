/* eslint-disable @typescript-eslint/no-explicit-any */
const AboutPage = async () => {
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
    <div className="min-h-screen px-4 ">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        {/* Bio */}
        <div>
          <div className="text-gray-400 text-lg whitespace-pre-line">
            {about[0].bio}
          </div>
        </div>

        {/* Skills */}
        <div>
          <h2 className="text-3xl font-semibold text-white mb-4">Skills</h2>
          <div className="flex flex-wrap gap-3">
            {about[0].skills?.map((skill: string, idx: number) => (
              <span
                key={idx}
                className="text-gray-300 bg-opacity-20 bg-gray-700 px-4 py-2 rounded-full font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
