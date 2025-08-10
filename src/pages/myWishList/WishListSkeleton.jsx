import React from "react";

const WishListSkeleton = () => {
  // Simulate multiple loading cards
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="card card-compact rounded-2xl overflow-hidden relative flex flex-col border backdrop-blur-sm animate-pulse"
          style={{
            background:
              "linear-gradient(135deg, rgba(203,195,227,0.99), rgba(170,152,169,0.85))",
            border: "1.5px solid rgba(170, 152, 169, 0.5)",
          }}
        >
          {/* Image placeholder */}
          <div className="relative w-full h-48 bg-gray-300/50"></div>

          <div className="card-body flex flex-col px-5 py-4">
            {/* Title placeholder */}
            <div className="h-5 bg-gray-300/60 rounded-md w-3/4 mx-auto"></div>

            {/* Description placeholder */}
            <div className="h-4 bg-gray-300/50 rounded-md w-2/3 mx-auto mt-3"></div>

            {/* Author placeholder */}
            <div className="h-3 bg-gray-300/40 rounded-md w-1/2 mx-auto mt-3"></div>

            {/* Buttons placeholder */}
            <div className="flex justify-between mt-6 gap-4">
              <div className="h-8 bg-gray-300/60 rounded-lg flex-grow"></div>
              <div className="h-8 bg-gray-300/60 rounded-lg flex-grow"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WishListSkeleton;
