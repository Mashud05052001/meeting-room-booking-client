const SingleRoomSkeleton = () => {
  return (
    <div className="mt-6">
      <div className="w-60 h-6 ml-4 mb-4 bg-gray-300 rounded-md animate-pulse"></div>
      <div className="flex md:space-x-12 flex-col md:flex-row px-4">
        {/* Image Section Skeleton */}
        <div className="md:w-1/2 space-y-4">
          {/* Cover Image Skeleton */}
          <div className="w-full h-[25rem] bg-gray-300 rounded-lg animate-pulse"></div>
          {/* Thumbnails Skeleton */}
          <div className="flex space-x-3">
            {[...Array(3)].map((_, idx) => (
              <div
                key={idx}
                className="w-20 h-12 bg-gray-300 rounded-md animate-pulse"
              ></div>
            ))}
          </div>
        </div>

        {/* Information Section Skeleton */}
        <div className="md:w-1/2 md:mt-6 mt-14 mb-40">
          {/* Title Skeleton */}
          <div className="w-3/4 h-10 bg-gray-300 rounded-md animate-pulse mb-10"></div>
          {/* Info Grid Skeleton */}
          <div className="w-96 space-y-3 mb-3">
            <div className="w-48 h-6 bg-gray-300 rounded-md animate-pulse"></div>
            <div className="w-48 h-6 bg-gray-300 rounded-md animate-pulse"></div>
          </div>
          {/* Features Skeleton */}
          <div className="mb-6">
            <div className="md:w-8/12 ld:w-1/2 w-full h-20 bg-gray-300 rounded-md animate-pulse"></div>
          </div>

          {/* Button Skeleton */}
          <div className="w-40 h-8 bg-gray-300 rounded-md animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default SingleRoomSkeleton;
