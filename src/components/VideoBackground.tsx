import { useEffect, useRef } from 'react';

interface VideoBackgroundProps {
  src: string;
  className?: string;
}

const VideoBackground = ({ src, className = "" }: VideoBackgroundProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch((error) => {
        console.log('Video autoplay failed:', error);
      });
    }
  }, []);

  return (
    <>
      <video
        ref={videoRef}
        className={`video-background ${className}`}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src={src} type="video/mp4" />
        <div className="absolute inset-0 bg-omnitrix-dark" />
      </video>
      <div className="video-overlay" />
    </>
  );
};

export default VideoBackground;