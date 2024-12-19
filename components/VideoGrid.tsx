import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Video {
  id: number;
  title: string;
  thumbnail: string;
  duration: string;
  slug: string; 
}

const VideoGrid = ({ videos }: { videos: Video[] }) => {
  return (
    <div>
      {videos.length === 0 ? (
        <p className="text-center text-gray-500">No videos found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {videos.map((video) => (
            <Link key={video.id} href={`/${video.slug}`} className="block">
              <Image
                width={300}
                height={300}
                src={video.thumbnail}
                alt={video.title}
                className="rounded"
              />
              <div className="mt-2">
                <h3 className="font-bold text-lg">{video.title}</h3>
                <p className="text-gray-500">{video.duration}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoGrid;
