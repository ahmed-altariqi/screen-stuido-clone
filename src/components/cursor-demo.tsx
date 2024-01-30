import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { useIsMobile } from '@/hooks/isMobile';
import {
  useAnimateCursor,
  useHideInactiveCursor,
  useLoopCursorPosition,
} from '@/hooks/use-cursor';

import { Icons } from '@/config/icons';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';

const CURSOR_DEMOS = [
  ['Movement style', CursorMovementStyle],
  ['Cursor size', CursorScale],
  ['Hide delay', CursorHideTimeout],
  ['', LoopCursorPosition],
  ['', LoopCursorCollection],
] as const;

export function CursorDemo({ index }: { index: number }) {
  const [showOptions, setShowOptions] = useState(false);
  const { isMobile } = useIsMobile();

  const [label, CursorDemoVariant] = CURSOR_DEMOS[index];
  const isCursorDemoHidden = isMobile || !CursorDemoVariant;

  if (isCursorDemoHidden) return null;

  return (
    <div className="w-min-content mx-auto flex  items-center gap-4 rounded-3xl bg-[#171925f9] px-4 py-3">
      <Label
        htmlFor="cursor-demo-switch"
        className="select-none whitespace-nowrap text-[13px] font-light opacity-55"
      >
        Cursor Demo
      </Label>
      <Switch
        checked={showOptions}
        onCheckedChange={setShowOptions}
        id="cursor-demo-switch"
      />

      {showOptions && (
        <>
          <div className="min-h-full min-w-px bg-white/10" />

          {label && (
            <span className="select-none whitespace-nowrap text-[13px] font-light opacity-55">
              {label}
            </span>
          )}

          <CursorDemoVariant />
        </>
      )}
    </div>
  );
}

const MOVEMENT_STYLES_CONFIG = {
  default: { duration: 1000, delay: 100 },
  rapid: { duration: 100, delay: 150 },
  quick: { duration: 200, delay: 10 },
  slow: { duration: 3000, delay: 200 },
};

type MovementStyle = keyof typeof MOVEMENT_STYLES_CONFIG;

function CursorMovementStyle() {
  const [selectedMovementStyle, setSelectedMovementStyle] =
    useState<MovementStyle>('default');

  const { duration, delay } = MOVEMENT_STYLES_CONFIG[selectedMovementStyle];

  useAnimateCursor({ duration, delay });

  return (
    <div className="flex items-center gap-2">
      {Object.keys(MOVEMENT_STYLES_CONFIG).map((movementStyle) => (
        <Button
          key={movementStyle}
          variant="cursor.demo"
          size="extraSmall"
          className={cn('capitalize', {
            'bg-[#ffffff24]': movementStyle === selectedMovementStyle,
          })}
          onClick={() =>
            setSelectedMovementStyle(movementStyle as MovementStyle)
          }
        >
          {movementStyle}
        </Button>
      ))}

      <CursorPortal>
        <Icons.defaultCursor />
      </CursorPortal>
    </div>
  );
}

function CursorScale() {
  const [scale, setScale] = useState(1);

  useAnimateCursor({ scale });

  function resizeCursor(values: number[]) {
    setScale(() => values[0] / 100);
  }

  return (
    <>
      <div className="min-w-[100px]">
        <Slider
          defaultValue={[scale]}
          value={[scale * 100]}
          max={100}
          min={1}
          onValueChange={resizeCursor}
        />
      </div>

      <CursorPortal>
        <Icons.defaultCursor />
      </CursorPortal>
    </>
  );
}

const TWO_SECONDS = 2000;
function CursorHideTimeout() {
  const [inactivityTimeout, setInactivityTimeout] = useState(TWO_SECONDS);

  useHideInactiveCursor({ inactivityTimeout });

  function changeHideCursorDelay(values: number[]) {
    setInactivityTimeout(values[0] * 10);
  }

  return (
    <>
      <div className="min-w-[100px]">
        <Slider
          defaultValue={[inactivityTimeout / 10]}
          value={[inactivityTimeout / 10]}
          max={500}
          min={10}
          onValueChange={changeHideCursorDelay}
        />
      </div>

      <CursorPortal>
        <Icons.defaultCursor />
      </CursorPortal>
    </>
  );
}

function LoopCursorPosition() {
  const [isLoopCursorPositionEnabled, setIsLoopCursorPositionEnabled] =
    useState(true);

  useLoopCursorPosition({ isEnabled: isLoopCursorPositionEnabled });

  function toggleShouldCyclePosition() {
    setIsLoopCursorPositionEnabled((s) => !s);
  }

  return (
    <>
      <div id="circle-container">
        <div id="circle" />
      </div>
      <Button
        variant="cursor.demo"
        size="extraSmall"
        className={cn({
          'bg-[#ffffff24]': isLoopCursorPositionEnabled,
        })}
        onClick={toggleShouldCyclePosition}
      >
        Loop {isLoopCursorPositionEnabled ? 'enabled' : 'disabled'}
      </Button>

      <CursorPortal>
        <Icons.defaultCursor />
      </CursorPortal>
    </>
  );
}

const CURSORS = [
  Icons.defaultCursor,
  Icons.pointerCursor,
  Icons.handCursor,
  Icons.iCursor,
];

const DEFAULT_CURSOR_INDEX = 0;
function LoopCursorCollection() {
  const [currentCursorIndex, setCurrentCursorIndex] =
    useState(DEFAULT_CURSOR_INDEX);

  const [isCursorCyclingEnabled, setIsCursorCyclingEnabled] = useState(false);

  useAnimateCursor({});

  const Cursor =
    CURSORS[isCursorCyclingEnabled ? currentCursorIndex : DEFAULT_CURSOR_INDEX];

  function toggleShouldCycleCursors() {
    setIsCursorCyclingEnabled((prev) => !prev);
  }

  useEffect(() => {
    if (!isCursorCyclingEnabled) return;

    const intervalId = setInterval(() => {
      setCurrentCursorIndex((i) => (i < 3 ? i + 1 : 0));
    }, 2500);

    return () => clearInterval(intervalId);
  }, [isCursorCyclingEnabled]);

  return (
    <>
      <Button
        variant="cursor.demo"
        size="extraSmall"
        className={cn({
          'bg-[#ffffff24]': isCursorCyclingEnabled,
        })}
        onClick={toggleShouldCycleCursors}
      >
        {isCursorCyclingEnabled
          ? 'Showing different cursors'
          : 'Not showing different cursors'}
      </Button>

      <CursorPortal>
        <Cursor />
      </CursorPortal>
    </>
  );
}

type CursorPortalProps = { children: React.ReactNode };
function CursorPortal({ children }: CursorPortalProps) {
  return createPortal(children, document.getElementById('cursor-container')!);
}
