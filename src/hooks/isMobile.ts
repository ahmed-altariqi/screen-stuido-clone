import { useEffect, useState } from 'react';

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 400);

  useEffect(() => {
    function handleWindowResize() {
      setIsMobile(window.innerWidth < 400);
    }

    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return { isMobile };
}
