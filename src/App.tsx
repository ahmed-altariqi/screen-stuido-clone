import {
  IMAGE_CARDS,
  SELECTABLE_TAPS_DATA1,
  SELECTABLE_TAPS_DATA2,
  SELECTABLE_TAPS_DATA3,
  VIDEO_CARDS,
} from '@/config/';

import { cn } from '@/lib/utils';

import { Cards } from '@/components/cards';
import { CursorDemo } from '@/components/cursor-demo';
import { AppleStyleDock } from '@/components/dock';
import { FeaturedClients } from '@/components/featured-clients';
import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { HorizontalScrollArea } from '@/components/horizontal-scroll-area';
import { MediaDisplay } from '@/components/media-display';
import { SelectableMediaPanel } from '@/components/media-panel';
import { Pricing } from '@/components/pricing';
import { Section } from '@/components/section';
import { Typography } from '@/components/typography';
import { buttonVariants } from '@/components/ui/button';

import recordingWidgetVideo from '/rw.mp4';

export default function App() {
  return (
    <>
      <Header />
      <main className="mx-auto flex size-full min-h-screen max-w-[1240px] flex-col gap-y-12 px-4 text-center">
        <HeroSection />
        <FeaturedClients />
        <Section className="pb-[600px]">
          <Section.Header>
            <Typography as="h2">Made with Screen Studio</Typography>
            <Typography as="p" className="max-w-[64ch] md:text-[26px]">
              Thousands of people use Screen Studio to create videos for their
              social media, YouTube channels, and businesses.
            </Typography>
          </Section.Header>
          <Section.Content>
            <HorizontalScrollArea>
              <HorizontalScrollArea.Showcase1 />
            </HorizontalScrollArea>
          </Section.Content>
        </Section>
        <div className="space-y-[128px]">
          <Section>
            <Section.Header>
              <Typography as="h2">
                High-quality videos. <div>Without video editing skills.</div>
              </Typography>

              <p className="max-w-[50ch] text-[18px] font-light tracking-wide md:text-[26px]">
                <strong>All the best design patterns baked in.</strong>
                <span className="ml-1 opacity-55">
                  Screen Studio is an opinionated tool that automatically makes
                  your screen recordings look beautiful.
                </span>
              </p>
              <p className="max-w-[50ch] text-[18px] font-light tracking-wide opacity-55 md:text-[26px]">
                Promo videos, tutorials, product updates, demos, or social media
                stories. All leveled up without extra effort.
              </p>
            </Section.Header>
            <Section.Content>
              <SelectableMediaPanel data={SELECTABLE_TAPS_DATA1} />
            </Section.Content>
          </Section>
          <Section>
            <Section.Header>
              <Typography as="h2">Professional look by default</Typography>
              <Typography as="p">
                Screen Studio applies high-quality effects to every recorded
                video. Creating those effects manually in standard video editing
                software would often take hours of manual work.
              </Typography>
            </Section.Header>
            <Section.Content>
              <SelectableMediaPanel
                data={SELECTABLE_TAPS_DATA2}
                render={(index) => <CursorDemo index={index} />}
              />
            </Section.Content>
          </Section>
          <Section>
            <Section.Header>
              <Typography as="h3" className="text-3xl">
                Add your style and branding
              </Typography>
              <Typography as="p" className="md:text-[22px]">
                Make your video stand out with your branding. Change background,
                outer spacing, shadow, inset, and more.
              </Typography>
            </Section.Header>
            <Section.Content>
              <Cards type="video" cards={VIDEO_CARDS} />
            </Section.Content>
          </Section>
          <Section>
            <Section.Header>
              <Typography as="h2">Easy recording.</Typography>
              <Typography as="p" className="opacity-100">
                <strong>Simple, but powerful.</strong>
                <span className="ml-1 opacity-55">
                  Screen Studio can record virtually anything on your Apple
                  computer or any connected device.
                </span>
              </Typography>
            </Section.Header>
            <Section.Content>
              <MediaDisplay>
                <MediaDisplay.Video
                  src={recordingWidgetVideo}
                  hasControls={false}
                  autoPlay={true}
                  className="h-[337px] w-full"
                />
              </MediaDisplay>
            </Section.Content>
          </Section>
          <Section>
            <Section.Header>
              <Typography as="h2">Add webcam, microphone and sound</Typography>
              <Typography as="p">
                Tutorials, presentations, tips, and tricks videos. All of them
                are better with your webcam video, voice, and system audio.
                Screen Studio makes it easy to add them to your videos.
              </Typography>
            </Section.Header>
            <Section.Content>
              <SelectableMediaPanel data={SELECTABLE_TAPS_DATA3} />
            </Section.Content>
          </Section>
          <Section className="pb-[600px]">
            <Section.Header>
              <Typography as="h2">Create iPhone or iPad videos</Typography>
              <Typography as="p">
                Level up recordings of your apps or mobile tutorials. Connect
                your device with a USB cable and start recording.
              </Typography>
            </Section.Header>
            <Section.Content>
              <HorizontalScrollArea>
                <HorizontalScrollArea.Showcase2 />
              </HorizontalScrollArea>
            </Section.Content>
          </Section>
          <Section>
            <Section.Header>
              <Typography as="h2">Export & Share. Smooth and easy.</Typography>
              <Typography as="p">
                Optimal exports settings baked in. Decide where to publish your
                video, and Screen Studio will adjust all technical settings for
                you.
              </Typography>
            </Section.Header>
            <Section.Content>
              <Cards type="image" cards={IMAGE_CARDS} />
            </Section.Content>
          </Section>
          <Section className="pb-[600px]">
            <Section.Header>
              <Typography as="h2">There is more.</Typography>
              <Typography as="p">
                Screen Studio is packed with useful features while we try to
                make it easy to use and beautiful.
              </Typography>
            </Section.Header>
            <Section.Content>
              <HorizontalScrollArea className="md:pl-56">
                <HorizontalScrollArea.Showcase3 />
              </HorizontalScrollArea>
            </Section.Content>
          </Section>
          <div className="flex flex-col items-center space-y-[180px]">
            <Section className="text-center">
              <Section.Header>
                <Typography as="h2">Designed for macOS.</Typography>
                <Typography as="p">
                  Built and designed to be fast, reliable and easy to use.
                </Typography>
              </Section.Header>
              <Section.Content>
                <AppleStyleDock />
              </Section.Content>
            </Section>
            <Section>
              <Section.Header>
                <Typography as="h2" className="text-center">
                  Pay once, use forever
                </Typography>
                <Typography
                  as="p"
                  className="mx-auto text-center md:text-[26px]"
                >
                  Screen Studio is a one-time purchase. You get all the features
                  in every plan.
                </Typography>
              </Section.Header>
              <Section.Content>
                <Pricing />
              </Section.Content>
            </Section>
          </div>
        </div>
      </main>
      <footer className="flex items-center justify-center py-12">
        <Typography as="p" className="text-center text-sm font-semibold">
          <span className="opacity-55">This</span>
          <a
            href="https://www.screen.studio/"
            target="_blank"
            className={cn(
              buttonVariants({ variant: 'link' }),
              'px-[3px] text-white',
            )}
          >
            Screen Studio
          </a>
          <span className="opacity-55">clone was built by</span>
          <a
            href="https://twitter.com/ahmed_altariqi"
            target="_blank"
            className={cn(
              buttonVariants({ variant: 'link' }),
              'px-[3px] text-white',
            )}
          >
            @ahmed_altariqi
          </a>
        </Typography>
      </footer>
    </>
  );
}
