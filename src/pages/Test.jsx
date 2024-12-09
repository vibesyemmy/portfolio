import React from 'react';
import { BackgroundBeams } from "../components/ui/background-beams";

export default function Test() {
  return (
    <div className="min-h-screen w-full bg-neutral-950 relative flex flex-col items-center justify-center antialiased py-20">
      {/* Monitor Frame */}
      <div className="relative w-[90%] max-w-4xl mx-auto">
        {/* Monitor Top Frame */}
        <div className="bg-gray-800 rounded-t-2xl p-4 flex items-center justify-between border-b-4 border-gray-700">
          <div className="flex items-center gap-2 ml-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="w-32 h-1.5 bg-gray-700 rounded-full mr-2"></div>
        </div>
        
        {/* Monitor Screen */}
        <div className="bg-gray-900 aspect-video w-full relative overflow-hidden shadow-xl">
          {/* Video */}
          <video 
            className="w-full h-full object-cover"
            autoPlay 
            loop 
            muted 
            playsInline
          >
            <source src="/images/p6.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Screen Glare Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none"></div>
        </div>
        
        {/* Monitor Stand */}
        <div className="relative mx-auto" style={{ width: '20%' }}>
          <div className="h-24 bg-gradient-to-b from-gray-800 to-gray-900 rounded-b-lg shadow-lg"></div>
          <div className="h-4 w-[140%] bg-gray-800 -mt-1 mx-auto rounded-lg -translate-x-[14%] shadow-xl"></div>
        </div>

        {/* Add a placeholder text if no video is present */}
        <div className="absolute inset-0 flex items-center justify-center text-white/50 pointer-events-none">
          <p className="text-lg">Add your video to /public/videos/your-video.mp4</p>
        </div>
      </div>
      
      <BackgroundBeams />
    </div>
  );
}
