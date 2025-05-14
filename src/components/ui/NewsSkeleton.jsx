import React from 'react';
import { Sprout } from 'lucide-react';

const NewsSkeleton= () => {
  // Array of 3 elements for skeleton cards
  const skeletonItems = [1, 2, 3];

  return (
    <div className="w-full bg-gradient-to-b from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-8 flex items-center">
          <div className="mr-3 h-8 w-8 animate-pulse rounded-full bg-gray-300"></div>
          <div className="h-8 w-60 animate-pulse rounded bg-gray-300"></div>
        </div>

        {/* Category Filters skeleton */}
        <div className="mb-10 flex flex-wrap items-center gap-3">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-10 w-24 animate-pulse rounded-full bg-gray-300"
              style={{ animationDelay: `${item * 100}ms` }}
            ></div>
          ))}
        </div>

        {/* News Grid skeleton with growing plant animation */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {skeletonItems.map((item) => (
            <div 
              key={item} 
              className="relative overflow-hidden rounded-lg bg-white shadow-md"
              style={{ animationDelay: `${item * 150}ms` }}
            >
              {/* Growing plant animation in the center */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                <Sprout className="h-12 w-12 animate-pulse text-green-200" />
              </div>
              
              <div className="h-48 animate-pulse bg-gray-200"></div>
              
              <div className="p-5">
                <div className="mb-2 flex items-center space-x-2">
                  <div className="h-6 w-20 animate-pulse rounded-full bg-gray-300"></div>
                  <div className="h-4 w-16 animate-pulse rounded bg-gray-200"></div>
                </div>
                
                <div className="mb-3 h-7 w-3/4 animate-pulse rounded bg-gray-300"></div>
                
                <div className="mb-4 space-y-2">
                  <div className="h-4 w-full animate-pulse rounded bg-gray-200"></div>
                  <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200"></div>
                </div>
                
                <div className="h-6 w-28 animate-pulse rounded bg-gray-300"></div>
              </div>
              
              {/* Soil growth animation at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-1 animate-grow-width bg-gradient-to-r from-brown-600 via-green-600 to-green-400"></div>
            </div>
          ))}
        </div>

        {/* Pagination skeleton */}
        <div className="mt-10 flex items-center justify-center space-x-4">
          <div className="h-10 w-10 animate-pulse rounded-full bg-gray-300"></div>
          <div className="h-8 w-16 animate-pulse rounded-full bg-gray-300"></div>
          <div className="h-10 w-10 animate-pulse rounded-full bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
};

export default NewsSkeleton;