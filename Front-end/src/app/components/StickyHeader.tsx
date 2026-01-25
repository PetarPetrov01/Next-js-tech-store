import { usePathname } from 'next/navigation';
import { ReactElement, useEffect, useState } from 'react';

import useStickyHeader from '@/hooks/useStickyHeader';

const overSectionPaths = ['/', '/products'];

export default function StickyHeader({
  className,
  children,
}: {
  className?: string;
  children: ReactElement;
}) {
  const pathname = usePathname();
  const [overSection, setOverSection] = useState(false);

  const { headerRef, stickyState, shouldAnimate } = useStickyHeader(overSection);

  const cls = {
    atTop: 'top-auto translate-y-0',
    stickyVisible: 'top-0 translate-y-0',
    stickyHidden: `top-0 -translate-y-[calc(var(--header-height)+10px)]`,
  };

  const transitionCls = overSection || shouldAnimate ? ' transition-all duration-300' : '';

  useEffect(() => {
    setOverSection(overSectionPaths.includes(pathname));
  }, [pathname]);

  return (
    <header ref={headerRef} className={`sticky z-20 ${cls[stickyState] + transitionCls}`}>
      <div className={`${className}${overSection ? ' absolute top-0' : ''}`}>{children}</div>
    </header>
  );
}
