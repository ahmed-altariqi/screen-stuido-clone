import { useState } from 'react';

import { motion } from 'framer-motion';

import finderIcon from '/finder.webp';
import mailIcon from '/mail.webp';
import messagesIcon from '/messages.webp';
import safariIcon from '/safari.webp';
import screenStudioIcon from '/screenstudio.webp';

const APPS = [
  { id: 'Finder', icon: finderIcon },
  { id: 'Safari', icon: safariIcon },
  { id: 'Screen Studio', icon: screenStudioIcon },
  { id: 'Messages', icon: messagesIcon },
  { id: 'Mail', icon: mailIcon },
];

// DANG IT APPLE AND YOU TOO MATH -_-
export function AppleStyleDock() {
  const [cursorX, setCursorX] = useState<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setCursorX(e.clientX);
  };

  return (
    <motion.div
      layout="position"
      className=" flex items-center justify-center gap-1"
      onMouseMove={handleMouseMove}
    >
      {APPS.map((app, i) => (
        <DockIcon key={app.id} index={i} cursorX={cursorX} {...app} />
      ))}
    </motion.div>
  );
}

type DockIconProps = (typeof APPS)[number] & {
  index?: number;
  cursorX?: number | null;
};

function DockIcon({ id, icon }: DockIconProps) {
  // TODO: ASK FOR HELP LOL

  return (
    <motion.div
      whileHover={{ scale: 1.2 }}
      className="size-[55px] md:size-[77px] duration-300"
    >
      <img src={icon} alt={id} />
    </motion.div>
  );
}
