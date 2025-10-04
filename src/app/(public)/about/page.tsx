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
    <div className="px-6">
      <div className="max-w-4xl mx-auto flex flex-col gap-12">
        {/* Bio */}
        <div className="bg-gray-800/40 backdrop-blur-md p-6 rounded-2xl shadow-md">
          {/* <h2 className="text-3xl font-semibold text-white mb-4">About Me</h2> */}
          <p className="text-gray-380 text-lg leading-relaxed whitespace-pre-line">
            {about[0].bio}
          </p>
        </div>

        {/* Education */}
        <div>
          <h2 className="text-2xl font-semibold  mb-6">Education</h2>
          <div className="bg-gray-800/40 backdrop-blur-md rounded-2xl shadow-md p-6 flex flex-col gap-2 border border-gray-700 hover:scale-[1.02] transition-transform duration-300">
            <h3 className="text-xl font-bold text-gray-300">
              BSc in Computer Science & Engineering
            </h3>
            <p className="text-gray-300">University of Scholars</p>
            <span className="text-gray-400 text-sm">
              2021 – 2025 (Expected)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
