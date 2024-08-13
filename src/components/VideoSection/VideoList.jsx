import React, { useEffect, useState } from "react";
// import { useTheme } from "../../useContextHook/useTheme";
import { Link } from "react-router-dom";
import { formatDuration } from "../../utils/helper";
import { fetchApiForYoutubeData } from "../../utils/fetchApi";

const VideoList = ({ video }) => {
  // const { isDarkmode } = useTheme();
  const [channelData, setChannelData] = useState();

  const fetchChannelData = async () => {
   const data = await fetchApiForYoutubeData(`channels`,{
      part: 'snippet,contentDetails,statistics',
      id:video?.snippet?.channelId
    })
    setChannelData(data?.items[0])
  }

  useEffect(() => {
    fetchChannelData()
  },[video])
// Ensure video and channelData are defined before rendering
if (!video?.snippet || !channelData?.snippet) {
  return null; // or you can return a loading spinner or placeholder
}
  return (
    <div>
      <Link to={`video/${video.snippet.categoryId}/${video.id}`}>
        <div className="flex flex-col mb-8">
          <div className="relative md:rounded-xl overflow-hidden">
            <img
              src={video?.snippet?.thumbnails?.medium?.url}
              alt={video.snippet.title}
              className="w-full h-full object-cover rounded-md mb-2"
            />
            <span className="absolute bottom-4 right-4 bg-gray-800 text-white texxt-xs p-1 m-1 rounded">
              {formatDuration(video?.contentDetails.duration)}
            </span>
          </div>
          <div className="flex mt-3">
            <div className="flex items-center">
              <div className="flex h-9 w-9 rounded-full overflow-hidden">
                <img
                  src={channelData?.snippet?.thumbnails?.medium?.url}
                  alt={channelData.snippet.title}
                  className="w-full h-full object-cover rounded-md mb-2"
                />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default VideoList;
