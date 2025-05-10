import React from "react";

function HeaderSkeletonDashboard() {
  return (
    <div className="text-white flex items-center justify-between animate-pulse">
      <div className="h-5 w-32 bg-gray-700 rounded" />

      <div className="flex items-center gap-4">
        <div className="relative">
          <span className="z-10 absolute text-xs bg-red-500 rounded-full w-2 h-2 -right-0.5 -top-0.5" />
          <div className="w-4 h-4 bg-gray-600 rounded" />
        </div>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-600 rounded-full" />
          <div className="h-4 w-24 bg-gray-700 rounded" />
        </div>
      </div>
    </div>
  );
}

export default HeaderSkeletonDashboard;
