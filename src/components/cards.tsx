import { Card } from '@/config';

import { MediaDisplay } from '@/components/media-display';

type CardsProps = {
  type: 'video' | 'image';
  cards: Card[];
};

export function Cards({ type, cards }: CardsProps) {
  return (
    <div className="flex flex-wrap items-stretch gap-8">
      {cards.map(({ title, description, src }) => (
        <article
          key={title}
          className="flex flex-col bg-[#13151b] gap-x-12 max-w-[576px] min-h-full"
        >
          <div className="space-y-2 p-6 md:p-12 flex-[0.5]">
            <h4 className="text-[17px] font-semibold">{title}</h4>
            <p className=" opacity-55">{description}</p>
          </div>
          <MediaDisplay className="flex-[0.5]">
            {type === 'video' ? (
              <MediaDisplay.Video
                src={src}
                autoPlay={false}
                className="rounded-none"
              />
            ) : (
              <MediaDisplay.Image src={src} />
            )}
          </MediaDisplay>
        </article>
      ))}
    </div>
  );
}
