'use client';

import React, { useEffect, useState } from 'react';

const VideoDetails = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [video, setVideo] = useState<any>(null);

  useEffect(() => {
    fetch('/mockData.json')
      .then((res) => res.json())
      .then((data) => {
        const selectedVideo = data.find((v: any) => v.slug === id);
        setVideo(selectedVideo);
      });
  }, [id]);

  if (!video) return <p>Loading...</p>;

  return (
    <div className="m-10">
      <iframe
        src={`https://www.youtube.com/embed/${video.url.split('v=')[1]}`}
        className="w-1/2 aspect-video mb-4"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={video.title}
      />
      <h1 className="text-2xl font-bold">{video.title}</h1>
      <p className="text-gray-600">{video.description}</p>
    </div>
  );
};

export default VideoDetails;