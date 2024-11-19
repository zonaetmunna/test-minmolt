'use client';

import { usePathname } from 'next/navigation';

export default function CanonicalLink() {
  const pathname = usePathname();
  const canonicalUrl = `https://www.mindmolt.com${pathname}`;
  return <link rel="canonical" href={canonicalUrl} />;
}
