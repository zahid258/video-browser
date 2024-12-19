'use client';

import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import VideoGrid from "../components/VideoGrid";

const Home = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<any[]>([]);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const videosPerPage = 6;

  useEffect(() => {
    fetch("/mockData.json")
      .then((res) => res.json())
      .then((data) => {
        setVideos(data);
        setFilteredVideos(data.slice(0, videosPerPage));
      });
  }, []);

  useEffect(() => {
    const lowercasedQuery = query.toLowerCase();
    const filtered = videos.filter((video) =>
      video.title.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredVideos(filtered.slice(0, page * videosPerPage));
  }, [query, page, videos]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const allVideosLoaded = filteredVideos.length >= videos.length;

  return (
    <div className="m-10">
      <div className="flex justify-center m-10 ">
        <SearchBar onSearch={(q) => setQuery(q)} />
      </div>
      <div className="flex justify-center items-center flex-col">
        <VideoGrid videos={filteredVideos} />
        <button
          onClick={loadMore}
          disabled={allVideosLoaded}
          className={`mt-4 px-4 py-2 rounded ${
            allVideosLoaded
              ? "bg-gray-500 text-white cursor-not-allowed"
              : "bg-blue-500 text-white"
          }`}
        >
          {allVideosLoaded ? "All videos loaded" : "Load More"}
        </button>
      </div>
    </div>
  );
};

export default Home;
