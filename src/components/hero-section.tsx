import { motion, useScroll, useTransform } from 'framer-motion';

import { Button } from '@/components/ui/button';

import { Typography } from './typography';

import brandImage from '/brand.webp';
import introImage from '/intro-img.webp';
import introVideo from '/intro-vid.mp4';

const initial = { y: -25, opacity: 0 };
const animate = { y: 25, opacity: 1 };

export function HeroSection() {
  const { scrollYProgress } = useScroll();
  const videoScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.61]);
  const videoX = useTransform(scrollYProgress, [0, 0.1], [0, -125]);
  const videoY = useTransform(scrollYProgress, [0, 0.1], [0, -60]);
  const imageScale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.2], [0.2, 1]);

  return (
    <section className="space-y-10 pt-20">
      <div className="flex justify-center items-center gap-4 flex-col">
        <motion.div
          initial={initial}
          animate={animate}
          transition={{ delay: 0.2, duration: 1.6 }}
        >
          <img src={brandImage} className="size-[120px] animate-spin-slow" />
        </motion.div>

        <motion.div
          initial={initial}
          animate={animate}
          transition={{ delay: 0.5, duration: 1.6 }}
        >
          <Typography as="h1">
            Beautiful Screen Recordings in Minutes
          </Typography>
        </motion.div>
        <motion.div
          initial={initial}
          animate={animate}
          transition={{ delay: 0.7, duration: 1.6 }}
        >
          <Typography as="p" className="md:text-[26px]">
            Creating high quality videos as easy as taking a screenshot.
            Designed for macOS.
          </Typography>
        </motion.div>
      </div>
      <motion.div
        initial={initial}
        animate={animate}
        transition={{ delay: 1, duration: 1.6 }}
        className="hidden md:flex space-y-1  flex-col items-center"
      >
        <Button className="p-7 text-lg font-semibold">
          Try Screen Studio for free
        </Button>

        <Typography as="p" className="text-[13px] md:text-[13px]">
          macOS Ventura 13.1v is recommended
        </Typography>
      </motion.div>
      <motion.article
        initial={initial}
        animate={animate}
        transition={{ delay: 1.3, duration: 1.6 }}
        className="justify-center h-[150vh]"
      >
        <div className="sticky mx-auto top-40 w-[90vw] h-[300px] sm:w-[900px] sm:h-[500px]">
          <motion.video
            style={{
              scale: videoScale,
              x: videoX,
              y: videoY,
            }}
            muted={true}
            autoPlay={true}
            loop={true}
            className="object-cover size-full z-20 absolute"
          >
            <source src={introVideo} />
          </motion.video>
          <motion.img
            style={{
              scale: imageScale,
              opacity: imageOpacity,
            }}
            src={introImage}
            className=" size-full object-cover"
          />
        </div>
      </motion.article>
    </section>
  );
}
