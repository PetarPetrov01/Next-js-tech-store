import { useEffect, useRef, useState } from 'react';

interface StickyHeader {
  headerRef: React.RefObject<HTMLElement>;
  stickyState: 'atTop' | 'stickyVisible' | 'stickyHidden';
  shouldAnimate: boolean;
}

export default function useStickyHeader(overSection: boolean = false): StickyHeader {
  const headerRef = useRef<HTMLElement>(null);
  const overSectionRef = useRef(overSection);
  const prevStickyState = useRef<StickyHeader['stickyState']>('atTop');
  const headerBounds = useRef({ top: 0, bottom: 0 });
  const lastScroll = useRef(0);

  const [stickyState, setStickyState] = useState<StickyHeader['stickyState']>('atTop');

  const shouldAnimate =
    (prevStickyState.current === 'stickyVisible' && stickyState === 'stickyHidden') ||
    (prevStickyState.current === 'stickyHidden' && stickyState === 'stickyVisible');

  const onScroll = () => {
    const scrollTop = window.pageYOffset;
    const goingDown = scrollTop > lastScroll.current;

    const top = headerBounds.current.top;
    const bottom = overSectionRef.current ? top : headerBounds.current.bottom;

    if (!goingDown && scrollTop <= top) {
      if (prevStickyState.current !== 'atTop') setStickyState('atTop');
      lastScroll.current = scrollTop;
      return;
    }

    if (scrollTop > bottom) {
      if (goingDown) {
        if (stickyState !== 'stickyHidden') setStickyState('stickyHidden');
      } else {
        if (stickyState !== 'stickyVisible') setStickyState('stickyVisible');
      }
    }

    lastScroll.current = scrollTop;
  };

  useEffect(() => {
    if (!headerRef.current) return;

    const child = headerRef.current?.firstElementChild as HTMLElement | null;

    let resizeTimeout: ReturnType<typeof setTimeout> | undefined;
    const updateHeight = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const h = child?.offsetHeight || 0;
        document.documentElement.style.setProperty('--header-height', `${h}px`);
      }, 100);
    };

    updateHeight();

    const observer = new IntersectionObserver((entries) => {
      headerBounds.current = entries[0].intersectionRect;
      observer.disconnect();
    });

    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(headerRef.current);

    observer.observe(headerRef.current);

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    overSectionRef.current = overSection;
  }, [overSection]);

  useEffect(() => {
    prevStickyState.current = stickyState;
  }, [stickyState]);

  return { headerRef, stickyState, shouldAnimate };
}
