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
    <video
      ref={videoRef}
      className={`absolute inset-0 w-full h-full object-cover rounded-3xl ${className}`}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
    >
      <source src={src} type="video/mp4" />
      <div className="absolute inset-0 bg-omnitrix-dark rounded-3xl" />
    </video>
  );
};

export default VideoBackground;