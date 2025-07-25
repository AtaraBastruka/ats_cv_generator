'use client';

import Link from 'next/link';
import { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

export default function ButtonLink({ 
  href, 
  children, 
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
  };

  return (
    <Link
      role="button"
      href={href}
      className={className}
      onClick={handleClick}
    >
      {loading ? <LoadingSpinner /> : children}
    </Link>
  );
}