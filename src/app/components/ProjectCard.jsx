"use client";

import Image from "next/image";
import { useState } from "react";

const ProjectCard = ({ project, href }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  // Parse types
  const types = project.type ? project.type.split(',').map(type => type.trim()).filter(Boolean) : [];

  return (
    <div className="relative overflow-hidden">
      {/* Mobile title above card */}
      <div className="md:hidden mb-2">
        <span className="text-primary text-base font-semibold font-aracau block">
          {project.title}
        </span>
      </div>

      <div className="relative group overflow-hidden shadow-lg bg-gray-100">
        <div className="aspect-[1] relative">
          <Image
            fill
            alt={project.title}
            src={imageError ? "/placeholder.svg" : (project.thumbnail || "/placeholder.svg")}
            className={`object-cover transition-all duration-300 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 40vw, 25vw"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />

          {/* Loading state */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
            </div>
          )}

          {/* Image Overlay (desktop only) */}
          <div className="absolute inset-0 hidden md:flex hover:bg-secondary/85 items-center justify-center opacity-0 md:group-hover:opacity-100 transition-all duration-300">
            <div className="p-4 w-full transform translate-y-2 md:group-hover:translate-y-0 transition-transform duration-300">
              <span className="text-white text-lg font-semibold text-center block drop-shadow-lg mb-2 font-aracau">
                {project.title}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard; 