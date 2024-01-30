import { useRef, useState } from 'react';

import { Icons } from '@/config/icons';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';

type MediaDisplayProps = {
  children: React.ReactNode;
  className?: string;
};

export function MediaDisplay({ children, className = '' }: MediaDisplayProps) {
  return <div className={cn('size-full', className)}>{children}</div>;
}

interface VideoMediaProps extends React.ImgHTMLAttributes<HTMLVideoElement> {
  hasControls?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
}

export function VideoMedia({
  src,
  className = '',
  hasControls = true,
  autoPlay = false,
  loop = true,
  muted = true,
  ...props
}: VideoMediaProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(autoPlay);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  function togglePlay() {
    if (!videoRef.current) return;

    isPlaying ? videoRef.current.pause() : videoRef.current.play();
    setIsPlaying((isPlaying) => !isPlaying);
  }

  return (
    <div className="group relative">
      <video
        className={cn('aspect-video object-cover group rounded-xl', className)}
        ref={videoRef}
        src={src}
        loop={loop}
        autoPlay={autoPlay}
        muted={muted}
        onClick={togglePlay}
        {...props}
      />
      {hasControls && (
        <Button
          variant="video.player.controls"
          onKeyDown={(e) => e.code === 'Enter' && togglePlay()}
          className={cn('transition-all duration-300 ease-in-out', {
            'scale-75 opacity-0 select-none': isPlaying,
            ' group-hover:scale-100 group-hover:opacity-100 group-hover:select-all':
              isPlaying,
          })}
        >
          {isPlaying ? (
            <Icons.pause onClick={togglePlay} className="size-10" />
          ) : (
            <Icons.play onClick={togglePlay} className="size-10" />
          )}
        </Button>
      )}
    </div>
  );
}

interface ImageMediaProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

export function ImageMedia({ src, className = '', ...props }: ImageMediaProps) {
  return (
    <img
      className={cn('object-cover group rounded-xl', className)}
      src={src}
      {...props}
    />
  );
}

MediaDisplay.Video = VideoMedia;
MediaDisplay.Image = ImageMedia;
