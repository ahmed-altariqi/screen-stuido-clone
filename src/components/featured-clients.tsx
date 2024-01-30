import { Icons } from '@/config/icons';

import { Typography } from '@/components/typography';

const FEATURED_CLIENTS = [
  Icons.strip,
  Icons.microsoft,
  Icons.uber,
  Icons.threads,
  Icons.shopify,
  Icons.drop,
];

export function FeaturedClients() {
  return (
    <article className="py-12 flex flex-col items-center">
      <Typography as="p" className="md:text-[26px]">
        Helping people create beautiful videos at:
      </Typography>
      <div className="gap-x-4 md:gap-10 flex items-center justify-center flex-wrap">
        {FEATURED_CLIENTS.map((Icon, i) => (
          <Icon key={i} className="size-16 md:size-24" />
        ))}
      </div>
    </article>
  );
}
