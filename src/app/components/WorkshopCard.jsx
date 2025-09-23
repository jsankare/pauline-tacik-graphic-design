"use client";

import Image from "next/image";
import { useState } from "react";

const WorkshopCard = ({ workshop, href }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  // Parse types
  const types = workshop.type ? workshop.type.split(',').map(type => type.trim()).filter(Boolean) : [];

  return (
    <div className="relative group overflow-hidden shadow-lg bg-gray-100">
      <div className="aspect-[1] relative">
        <Image
          fill
          alt={workshop.name}
          src={imageError ? "/placeholder.svg" : (workshop.thumbnail || "/placeholder.svg")}
          className={`object-cover transition-all duration-300 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
        
        {/* Loading state */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
          </div>
        )}

        {/* Image Overlay */}
          <div className="absolute inset-0 hover:bg-secondary/85 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="p-4 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <span className="text-white text-lg font-semibold text-center block drop-shadow-lg">
              {workshop.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkshopCard; 