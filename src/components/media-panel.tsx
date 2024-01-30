import React, { useEffect, useRef, useState } from 'react';

import type { SelectableTapData } from '@/config';

import { useIsMobile } from '@/hooks/isMobile';

import { cn } from '@/lib/utils';

import { MediaDisplay } from '@/components/media-display';

const Y_TRANSFORM = {
  0: 'md:translate-y-[none]',
  1: 'md:translate-y-[46px]',
  2: 'md:translate-y-[92px]',
  3: 'md:translate-y-[138px]',
  4: 'md:translate-y-[186px]',
} as const;

type ValidYTransformValue = keyof typeof Y_TRANSFORM;

type SelectableMediaPanelProps = {
  data: SelectableTapData[];
  render?: (index: number) => React.ReactNode;
};

export function SelectableMediaPanel({
  data,
  render,
}: SelectableMediaPanelProps) {
  const [selectedTapIndex, setSelectedTapIndex] = useState<number>(0);

  const selectedTap = data[selectedTapIndex];

  function updateSelectedTapIndex(index: number) {
    setSelectedTapIndex(index);
  }

  return (
    <article className="flex flex-col gap-6 overflow-hidden md:flex-row">
      <div className="scroll-snap-type md:flex-[0.4] flex md:flex-col gap-2 flex-nowrap *:w-full overflow-x-auto relative">
        {data.map(({ title, description }, i) => (
          <SelectableTap
            key={i}
            index={i}
            title={title}
            description={description}
            selectedTapIndex={selectedTapIndex}
            updateSelectedTapIndex={updateSelectedTapIndex}
          />
        ))}
      </div>

      <div
        className={cn(
          'md:flex-[0.6] flex flex-col gap-6 order-first md:order-last relative transition-transform duration-500',
          Y_TRANSFORM[selectedTapIndex as ValidYTransformValue],
        )}
      >
        <MediaDisplay className="flex-[0.5]">
          {selectedTap.type === 'image' ? (
            <MediaDisplay.Image src={selectedTap.src} />
          ) : (
            <MediaDisplay.Video src={selectedTap.src} autoPlay={true} />
          )}
        </MediaDisplay>

        {render && <div>{render(selectedTapIndex)}</div>}
      </div>
    </article>
  );
}

type SelectableTapProps = {
  index: number;
  title: string;
  description: string;
  updateSelectedTapIndex: (index: number) => void;
  selectedTapIndex: number;
};

function SelectableTap({
  title,
  description,
  index,
  selectedTapIndex,
  updateSelectedTapIndex,
}: SelectableTapProps) {
  const { isMobile } = useIsMobile();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current || !isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            updateSelectedTapIndex(index);
          }
        });
      },
      {
        threshold: 1,
      },
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [isMobile, updateSelectedTapIndex, index]);

  return (
    <div
      ref={ref}
      key={title}
      onClick={() => updateSelectedTapIndex(index)}
      className={cn(
        'scroll-snap-align-start flex-[0.4] min-w-full flex flex-col items-start gap-2 text-left p-5 cursor-pointer transition-all hover:bg-[#ffffff14]',
        selectedTapIndex === index && 'bg-[#ffffff24]',
      )}
    >
      <h3 className="text-[17px] md:text-[17px] font-semibold">{title}</h3>
      <p className="text-[17px] md:text-[17px] opacity-55">{description}</p>
    </div>
  );
}
