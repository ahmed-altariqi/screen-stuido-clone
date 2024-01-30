import {
  HORIZONTAL_SCROLL_DATA1,
  HORIZONTAL_SCROLL_DATA2,
  HORIZONTAL_SCROLL_DATA3,
} from '@/config';

import { Icons } from '@/config/icons';

import { cn } from '@/lib/utils';

import { MediaDisplay } from '@/components/media-display';

import { Typography } from './typography';

type HorizontalScrollAreaProps = {
  children: React.ReactNode;
  className?: string;
};

export function HorizontalScrollArea({
  children,
  className = '',
}: HorizontalScrollAreaProps) {
  return (
    <div
      className={cn(
        'overflow-x-auto px-4 py-8 flex gap-8 absolute inset-x-0 min-h-fit md:pl-56',
        className,
      )}
    >
      {children}
    </div>
  );
}

function Showcase1() {
  return (
    <>
      {HORIZONTAL_SCROLL_DATA1.map(
        ({
          name,
          handle,
          videoSrc,
          imageSrc,
          commentsCount,
          likeCount,
          viewCount,
        }) => (
          <div
            key={name}
            className="min-w-[380px] sm:min-w-[555px] h-[400px] flex flex-col  rounded-md space-y-4"
          >
            <MediaDisplay>
              <MediaDisplay.Video
                src={videoSrc}
                className="flex-[0.8]"
                hasControls
              />
            </MediaDisplay>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src={imageSrc} className="size-10 rounded-full" />
                  <div className="text-left">
                    <p className="text-[17px] md:text-[17px]">{name}</p>
                    <p className="opacity-45 -mt-1 font-semibold text-[17px] md:text-[17px]">
                      {handle}
                    </p>
                  </div>
                </div>
                {<Icons.link />}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 opacity-50">
                  {<Icons.comment />}
                  {commentsCount}
                </div>
                <div className="flex items-center gap-1 opacity-50">
                  {<Icons.heart />}
                  {likeCount}
                </div>
                <div className="flex items-center gap-1 opacity-50">
                  {<Icons.eye />}
                  {viewCount}
                </div>
              </div>
            </div>
          </div>
        ),
      )}
    </>
  );
}

function Showcase2() {
  return (
    <>
      {HORIZONTAL_SCROLL_DATA2.map(({ type, title, description, src }) => (
        <div key={title} className="flex min-w-fit flex-col space-y-4 ">
          <MediaDisplay className="max-h-[480px] max-w-[480px] flex-1">
            {type === 'video' ? (
              <MediaDisplay.Video
                src={src}
                className=" aspect-auto"
                hasControls
              />
            ) : (
              <MediaDisplay.Image src={src} />
            )}
          </MediaDisplay>
          <div className=" space-y-1">
            <Typography
              as="p"
              className=" font-semibold opacity-100 md:text-[17px]"
            >
              {title}
            </Typography>
            <Typography as="p">{description}</Typography>
          </div>
        </div>
      ))}
    </>
  );
}

function Showcase3() {
  return (
    <>
      {HORIZONTAL_SCROLL_DATA3.map(({ type, title, description, src }) => (
        <div key={title} className="space-y-4 min-w-fit flex flex-col">
          <MediaDisplay className="max-h-[480px] max-w-[480px] flex-1  size-full">
            {type === 'video' ? (
              <MediaDisplay.Video
                src={src}
                className=" aspect-auto"
                hasControls
              />
            ) : (
              <MediaDisplay.Image src={src} />
            )}
          </MediaDisplay>
          <div className=" space-y-1">
            <Typography
              as="p"
              className=" font-semibold opacity-100 md:text-[17px]"
            >
              {title}
            </Typography>
            <Typography as="p" className=" max-w-[43ch]">
              {description}
            </Typography>
          </div>
        </div>
      ))}
    </>
  );
}

HorizontalScrollArea.Showcase1 = Showcase1;
HorizontalScrollArea.Showcase2 = Showcase2;
HorizontalScrollArea.Showcase3 = Showcase3;
