import { useEffect, useState } from 'react';

type UseAnimateCursor = {
  duration?: number;
  delay?: number;
  scale?: number;
};

type UseLoopCursorPosition = {
  isEnabled: boolean;
  inactivityTimeout?: number;
};

type InactivityTimeout = { inactivityTimeout: number };

export function useAnimateCursor({
  scale,
  duration = 1000,
  delay = 100,
}: UseAnimateCursor) {
  const { x, y } = useCursorPosition();

  useEffect(() => {
    const cursorContainerElement = document.getElementById(
      'cursor-container',
    ) as HTMLDivElement | null;

    if (!cursorContainerElement) return;

    const transform =
      `translate(${x}px, ${y}px)` + (scale ? ` scale(${scale})` : '');

    cursorContainerElement.animate(
      {
        transform,
      },
      { duration, delay, fill: 'forwards' },
    );
  }, [x, y, duration, delay, scale]);
}

export function useHideInactiveCursor({
  inactivityTimeout,
}: InactivityTimeout) {
  const { x, y } = useCursorPosition();
  const status = useCursorActivityStatus({ inactivityTimeout });
  useAnimateCursor({});

  useEffect(() => {
    const cursorContainerElement = document.getElementById(
      'cursor-container',
    ) as HTMLDivElement | null;

    if (!cursorContainerElement) return;

    if (status === 'inactive') {
      cursorContainerElement.style.opacity = '0';
    }

    return () => {
      cursorContainerElement.style.opacity = '1';
    };
  }, [inactivityTimeout, status, x, y]);
}

export function useLoopCursorPosition({
  isEnabled,
  inactivityTimeout = 1500,
}: UseLoopCursorPosition) {
  const { x, y } = useCursorPosition();
  const status = useCursorActivityStatus({ inactivityTimeout });
  useAnimateCursor({});

  useEffect(() => {
    const cursorContainerElement = document.getElementById(
      'cursor-container',
    ) as HTMLDivElement | null;
    const circleContainerElement = document.getElementById(
      'circle-container',
    ) as HTMLDivElement | null;

    if (!isEnabled || !cursorContainerElement || !circleContainerElement) {
      return;
    }

    if (status === 'inactive') {
      const clientRects = [...circleContainerElement.getClientRects()][0];
      const circleY = clientRects.y;
      const circleX = clientRects.x;

      cursorContainerElement.animate(
        {
          transform: `translate(${circleX}px, ${circleY}px)`,
        },
        {
          duration: 1000,
          delay: 0,
          fill: 'backwards',
        },
      );
    }
  }, [isEnabled, status, x, y]);
}

function useCursorActivityStatus({ inactivityTimeout }: InactivityTimeout) {
  const [status, setStatus] = useState<'active' | 'inactive'>('active');
  const { x, y } = useCursorPosition();

  useEffect(() => {
    setStatus('active');

    const timeoutId = setTimeout(() => {
      setStatus('inactive');
    }, inactivityTimeout);

    return () => clearTimeout(timeoutId);
  }, [inactivityTimeout, x, y]);

  return status;
}

function useCursorPosition() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function trackCursorPosition(event: MouseEvent) {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    }

    window.addEventListener('mousemove', trackCursorPosition);

    return () => {
      window.removeEventListener('mousemove', trackCursorPosition);
    };
  }, []);

  return cursorPosition;
}
