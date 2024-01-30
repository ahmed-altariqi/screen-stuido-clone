import { cn } from '@/lib/utils';

import { buttonVariants } from '@/components/ui/button';

import brandImage from '/brand.webp';

export function Header() {
  return (
    <header className="fixed z-[999] flex min-h-[70px] w-full justify-between  bg-black/80 px-4 backdrop-blur-2xl  transition-all duration-1000">
      <div className=" max-w-[1240px] mx-auto w-full min-h-full flex items-center justify-between">
        <a
          href="/"
          className="flex items-center gap-2 select-none cursor-pointer"
        >
          <img src={brandImage} className="size-6" />
          <span className="font-semibold">Screen Studio</span>
        </a>

        <div className="items-center gap-8 hidden md:flex">
          <nav>
            <ul className=" flex items-center gap-8">
              <li className="group flex flex-col gap-8">
                <a href="#">Products</a>
              </li>
              <li className="group flex flex-col gap-8">
                <a href="#">Help</a>
              </li>
              <li className="group flex flex-col gap-8">
                <a href="#">Pricing</a>
              </li>
              <li className="group flex flex-col gap-8">
                <a href="#">Twitter</a>
              </li>
            </ul>
          </nav>
          <a
            href="#"
            className={cn(
              buttonVariants({ variant: 'default' }),
              'rounded-[5px]',
            )}
          >
            Download
          </a>
        </div>
      </div>
    </header>
  );
}
