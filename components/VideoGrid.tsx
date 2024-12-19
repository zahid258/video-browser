
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

interface Video {
  id: number;
  title: string;
  thumbnail: string;
  duration: string;
  slug: string;
}

const VideoGrid = ({ videos }: { videos: Video[] }) => {
  const [likedVideos, setLikedVideos] = useState<number[]>(() => {
    if (typeof window !== "undefined") {
      const storedLikes = localStorage.getItem("likedVideos");
      return storedLikes ? JSON.parse(storedLikes) : [];
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("likedVideos", JSON.stringify(likedVideos));
    }
  }, [likedVideos]);

  const toggleLike = (id: number) => {
    setLikedVideos((prev) =>
      prev.includes(id) ? prev.filter((vid) => vid !== id) : [...prev, id]
    );
  };

  const hasVideos = videos.length > 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {hasVideos ? (
        videos.map((video) => (
          <div key={video.id} className="relative">
            <Link href={`/${video.slug}`}>
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
            <button
              onClick={() => toggleLike(video.id)}
              className={`absolute top-2 right-2 p-2 rounded-full ${
                likedVideos.includes(video.id) ? "bg-red-500" : "bg-gray-300"
              }`}
              title={likedVideos.includes(video.id) ? "Unlike" : "Like"}
              aria-pressed={likedVideos.includes(video.id)}
              aria-label={likedVideos.includes(video.id) ? "Unlike this video" : "Like this video"}
              tabIndex={0}
            >
              ❤️
            </button>
          </div>
        ))
      ) : (
        <p>No videos match your search criteria.</p> 
      )}
    </div>
  );
};

export default VideoGrid;
