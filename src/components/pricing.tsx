import { Icons } from '@/config/icons';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';

const PRICING = [
  {
    type: 'Standard',
    price: '$89',
    description: 'Pay-once license for you.',
    perks: [
      '1 macOS device',
      'Pay once, use forever',
      'All Screen Studio features',
      '1 year of updates',
    ],
    cta: 'Get Started',
  },
  {
    type: 'Extended',
    price: '$189',
    description: 'Great for multi-devices setups & small teams.',
    perks: [
      '3 macOS device',
      'Pay once, use forever',
      'All Screen Studio features',
      '1 year of updates',
    ],
    cta: 'Get Started',
  },
  {
    type: 'Teams',
    price: 'Get in touch',
    description: 'Pay per seat for your team.',
    perks: [
      'Unlimited macOS devices',
      'All Screen Studio features',
      'App updates during the subscription',
    ],
    cta: 'Contact',
  },
];

export function Pricing() {
  return (
    <article className="flex flex-col justify-between gap-4 md:flex-row text-left">
      {PRICING.map((item) => (
        <PricingCard key={item.type} {...item} />
      ))}
    </article>
  );
}

type PricingCardProps = (typeof PRICING)[number];

function PricingCard({
  type,
  price,
  description,
  perks,
  cta,
}: PricingCardProps) {
  return (
    <div
      className={cn('flex flex-[0.33] flex-col gap-[45px] p-12 bg-[#13151b]', {
        'gap-[42px]': type === 'Extended',
      })}
    >
      <div className="space-y-2">
        <h5
          className={cn('text-2xl', { 'text-[#a091fa]': type === 'Extended' })}
        >
          {type}
        </h5>
        <h4 className="text-5xl font-bold">{price}</h4>
        <p className=" text-[17px] opacity-55 max-w-[26ch]">{description}</p>
      </div>
      <div>
        {perks.map((perk, i) => (
          <div key={i}>
            <div className="flex items-center gap-2">
              <Icons.checkMark className="text-[#a091fa]" />
              <p>{perk}</p>
            </div>
          </div>
        ))}
      </div>
      <Button variant={type === 'Extended' ? 'default' : 'ghost'}>{cta}</Button>
    </div>
  );
}
