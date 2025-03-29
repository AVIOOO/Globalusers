const SkeletonLoader = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="border p-6 rounded-lg shadow-lg bg-white flex flex-col items-center w-full h-48 animate-pulse"
        >
          <div className="w-24 h-24 rounded-lg bg-gray-300 mb-4"></div>
          <div className="w-32 h-5 bg-gray-300 rounded mb-2"></div>
          <div className="w-40 h-4 bg-gray-300 rounded"></div>
          <div className="mt-4 flex gap-2">
            <div className="w-16 h-8 bg-gray-300 rounded"></div>
            <div className="w-16 h-8 bg-gray-300 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
