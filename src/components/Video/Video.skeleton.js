import React from 'react';

const VideoSkeleton = ({ error }) => (
  <div className="skeleton__video">
    {error ?
      ""
      :
      <div>Loading...</div>
    }
  </div>
);

export default VideoSkeleton;
